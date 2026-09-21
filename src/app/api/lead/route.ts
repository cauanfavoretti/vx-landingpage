import { NextResponse } from "next/server";

/**
 * Recebe o formulário da LP e cria/atualiza o contato no GHL.
 *
 * Roda apenas no servidor: o token nunca chega ao browser e não há
 * requisição cross-origin no cliente (portanto, sem problema de CORS).
 */

const GHL_API = "https://services.leadconnectorhq.com";
const GHL_VERSION = "2021-07-28";

/** Campo de texto livre "Qual a média de faturamento mensal da sua empresa?" */
const CF_FATURAMENTO = "8iwrZAOctIMCP7NS0QHu";

/** Funil "1. Funil de Vendas", estágio de entrada "Novo Contato". */
const PIPELINE_ID = process.env.GHL_PIPELINE_ID || "3kJ3KNqlbjwk3XvMye24";
const STAGE_ID =
  process.env.GHL_PIPELINE_STAGE_ID || "636861c4-eeac-4629-81a6-d787c7015870";

/** Origem gravada na oportunidade. */
const OPPORTUNITY_SOURCE = "site";

function ghlHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Version: GHL_VERSION,
    "Content-Type": "application/json",
    Accept: "application/json",
  };
}

/**
 * Cria a oportunidade no funil de vendas, a menos que o contato já tenha uma
 * aberta neste mesmo funil — evita duplicar quem preenche o formulário 2x.
 * Devolve o id criado, "existing" se já havia, ou null se falhou.
 */
async function createOpportunity(
  token: string,
  locationId: string,
  contactId: string,
  nome: string,
  empresa: string,
): Promise<string | "existing" | null> {
  try {
    const search = await fetch(
      `${GHL_API}/opportunities/search?location_id=${locationId}&contact_id=${contactId}`,
      { headers: ghlHeaders(token) },
    );
    if (search.ok) {
      const { opportunities = [] } = await search.json();
      const jaAberta = opportunities.some(
        (o: { pipelineId?: string; status?: string }) =>
          o.pipelineId === PIPELINE_ID && o.status === "open",
      );
      if (jaAberta) return "existing";
    }

    const res = await fetch(`${GHL_API}/opportunities/`, {
      method: "POST",
      headers: ghlHeaders(token),
      body: JSON.stringify({
        pipelineId: PIPELINE_ID,
        pipelineStageId: STAGE_ID,
        locationId,
        contactId,
        name: empresa ? `${nome} — ${empresa}` : nome,
        status: "open",
        source: OPPORTUNITY_SOURCE,
      }),
    });

    const text = await res.text();
    if (!res.ok) {
      console.error(
        `[lead] falha ao criar oportunidade (${res.status}): ${text.slice(0, 500)}`,
      );
      return null;
    }
    const json = JSON.parse(text);
    return json?.opportunity?.id ?? json?.id ?? "created";
  } catch (err) {
    console.error("[lead] erro de rede ao criar oportunidade:", err);
    return null;
  }
}

type Payload = {
  nome?: unknown;
  email?: unknown;
  whatsapp?: unknown;
  empresa?: unknown;
  faturamento?: unknown;
};

const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

/**
 * Telefone brasileiro -> E.164 (+55DDDNUMERO). Devolve "" se implausível.
 * Aceita: 10-11 dígitos (DDD + número) ou 12-13 já com o código do país.
 */
function toE164BR(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    return `+${digits}`;
  }
  if (digits.length === 10 || digits.length === 11) return `+55${digits}`;
  return "";
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export async function POST(request: Request) {
  const token = process.env.GHL_API_TOKEN;
  const locationId = process.env.GHL_LOCATION_ID;

  if (!token || !locationId) {
    console.error("[lead] GHL_API_TOKEN ou GHL_LOCATION_ID ausente no ambiente");
    return NextResponse.json(
      { ok: false, error: "Integração indisponível no momento." },
      { status: 500 },
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Requisição inválida." },
      { status: 400 },
    );
  }

  const nome = str(body.nome);
  const email = str(body.email);
  const whatsapp = str(body.whatsapp);
  const empresa = str(body.empresa);
  const faturamento = str(body.faturamento);

  const errors: string[] = [];
  if (nome.length < 2) errors.push("Informe seu nome completo.");
  if (!isEmail(email)) errors.push("Informe um e-mail válido.");
  const phone = toE164BR(whatsapp);
  if (!phone) errors.push("Informe um WhatsApp válido com DDD.");

  if (errors.length) {
    return NextResponse.json(
      { ok: false, error: errors.join(" ") },
      { status: 422 },
    );
  }

  const [firstName, ...rest] = nome.split(/\s+/);

  const contact: Record<string, unknown> = {
    locationId,
    firstName,
    lastName: rest.join(" "),
    name: nome,
    email,
    phone,
    source: "Landing Page VX",
    tags: ["landing-page-vx", "diagnostico-gratuito"],
  };

  if (empresa) contact.companyName = empresa;
  if (faturamento) {
    // Tag facilita segmentação; o campo guarda o texto exato escolhido.
    (contact.tags as string[]).push(`faturamento: ${faturamento}`);
    contact.customFields = [{ id: CF_FATURAMENTO, field_value: faturamento }];
  }

  try {
    // upsert: se o e-mail/telefone já existe, atualiza em vez de duplicar.
    const res = await fetch(`${GHL_API}/contacts/upsert`, {
      method: "POST",
      headers: ghlHeaders(token),
      body: JSON.stringify(contact),
    });

    const text = await res.text();

    if (!res.ok) {
      // Loga o detalhe no servidor; o visitante recebe mensagem genérica.
      console.error(`[lead] GHL respondeu ${res.status}: ${text.slice(0, 500)}`);
      return NextResponse.json(
        { ok: false, error: "Não conseguimos registrar seus dados. Tente novamente." },
        { status: 502 },
      );
    }

    let contactId: string | undefined;
    try {
      const json = JSON.parse(text);
      contactId = json?.contact?.id ?? json?.id;
    } catch {
      // resposta sem JSON não invalida o sucesso
    }

    console.log(`[lead] contato registrado no GHL${contactId ? ` (${contactId})` : ""}`);

    // O contato já está salvo. Se a oportunidade falhar, o lead não se perde:
    // registramos o erro no servidor e seguimos o fluxo do visitante.
    let opportunity: string | "existing" | null = null;
    if (contactId) {
      opportunity = await createOpportunity(
        token,
        locationId,
        contactId,
        nome,
        empresa,
      );
      if (opportunity === "existing") {
        console.log("[lead] contato já possuía oportunidade aberta no funil");
      } else if (opportunity) {
        console.log(`[lead] oportunidade criada (${opportunity})`);
      }
    }

    return NextResponse.json({ ok: true, contactId, opportunity });
  } catch (err) {
    console.error("[lead] falha de rede ao chamar o GHL:", err);
    return NextResponse.json(
      { ok: false, error: "Não conseguimos registrar seus dados. Tente novamente." },
      { status: 502 },
    );
  }
}
