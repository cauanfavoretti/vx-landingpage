import "server-only";
import { createHash } from "node:crypto";

const sha = (value: string) =>
  createHash("sha256").update(value.trim().toLowerCase()).digest("hex");

type Lead = { nome: string; email: string; whatsapp: string; eventId: string };

/** Called after GHL accepts the contact; Meta failures never reject a signup. */
export async function enviarLeadMeta(req: Request, lead: Lead): Promise<void> {
  const token = process.env.META_CAPI_TOKEN;
  if (!token) {
    console.error("[meta] META_CAPI_TOKEN ausente no ambiente");
    return;
  }
  try {
    const digits = lead.whatsapp.replace(/\D/g, "");
    const phone = digits.length <= 11 ? `55${digits}` : digits;
    const cookies = Object.fromEntries(
      (req.headers.get("cookie") ?? "").split(";").flatMap((entry) => {
        const index = entry.indexOf("=");
        return index < 0 ? [] : [[entry.slice(0, index).trim(), entry.slice(index + 1).trim()]];
      }),
    );
    const names = lead.nome.trim().split(/\s+/);
    const first = names[0];
    const last = names.length > 1 ? names[names.length - 1] : "";
    const response = await fetch("https://graph.facebook.com/v23.0/1571877514692417/events", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      signal: AbortSignal.timeout(5000),
      body: JSON.stringify({
        data: [{
          event_name: "Lead",
          event_time: Math.floor(Date.now() / 1000),
          event_id: lead.eventId,
          action_source: "website",
          event_source_url: req.headers.get("referer") ?? "https://www.vxconsultoria.com/",
          user_data: {
            em: [sha(lead.email)], ph: [sha(phone)],
            fn: first ? [sha(first)] : undefined,
            ln: last ? [sha(last)] : undefined,
            country: [sha("br")],
            client_ip_address: req.headers.get("x-forwarded-for")?.split(",")[0].trim() || undefined,
            client_user_agent: req.headers.get("user-agent") ?? undefined,
            fbp: cookies._fbp, fbc: cookies._fbc,
          },
        }],
        ...(process.env.META_TEST_EVENT_CODE ? { test_event_code: process.env.META_TEST_EVENT_CODE } : {}),
      }),
    });
    if (!response.ok) console.error("[meta] envio recusado", response.status);
  } catch {
    // Never log request/response bodies or errors that could expose credentials.
    console.error("[meta] falha de conexão ou tempo limite");
  }
}
