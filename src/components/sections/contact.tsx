"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, ArrowRight, Check, Loader2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input, Label, Select } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { useReveal } from "@/hooks/use-reveal";

const LEAD_ENDPOINT = "/api/lead";
const BOOKING_URL =
  "https://api.leadconnectorhq.com/widget/booking/WU0ds4ulezO5mCurDzGU";

const FATURAMENTO = [
  "Até R$ 50 mil",
  "R$ 50k – R$ 100k",
  "R$ 100k – R$ 500k",
  "R$ 500k – R$ 1mi",
  "Acima de R$ 1mi",
];

const PROMISES = [
  "Análise gratuita do seu funil comercial",
  "Plano de ação personalizado",
  "Sem compromisso, sem enrolação",
];

type FormData = {
  nome: string;
  email: string;
  whatsapp: string;
  empresa: string;
  faturamento: string;
};

export function Contact() {
  const ref = useReveal<HTMLElement>({ stagger: 0.09 });
  const [data, setData] = useState<FormData>({
    nome: "",
    email: "",
    whatsapp: "",
    empresa: "",
    faturamento: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const [showBooking, setShowBooking] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const set = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");

    try {
      const res = await fetch(LEAD_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));

      if (!res.ok || !json?.ok) {
        setError(
          json?.error ??
            "Não conseguimos registrar seus dados. Tente novamente em instantes.",
        );
        setSending(false);
        return;
      }
    } catch {
      setError(
        "Falha de conexão. Verifique sua internet e tente novamente.",
      );
      setSending(false);
      return;
    }

    setSending(false);
    setShowBooking(true);
  };

  const handleBooked = useCallback(() => {
    setShowBooking(false);
    setShowSuccess(true);
  }, []);

  useEffect(() => {
    if (!showBooking) return;
    const onMsg = (e: MessageEvent) => {
      // Só aceita mensagens vindas do widget de agendamento.
      if (!e.origin.endsWith(".leadconnectorhq.com")) return;
      if (
        typeof e.data === "string" &&
        (e.data.includes("booking") ||
          e.data.includes("confirmed") ||
          e.data.includes("scheduled"))
      ) {
        handleBooked();
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [showBooking, handleBooked]);

  return (
    <>
      <section
        ref={ref}
        id="contato"
        className="relative overflow-hidden py-24 lg:py-32"
      >
        <div className="pointer-events-none absolute top-10 right-[-10%] size-[520px] rounded-full bg-orange-vx-600/18 blur-[140px]" />
        <div className="pointer-events-none absolute bottom-0 left-[-8%] size-[420px] rounded-full bg-orange-vx-500/12 blur-[130px]" />

        <div className="wrap grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="lg:pt-6">
            <div className="reveal">
              <Badge tone="orange">
                <span className="size-1.5 rounded-full bg-current" />
                Diagnóstico gratuito
              </Badge>
            </div>
            <h2 className="reveal mt-6 text-[clamp(30px,3.8vw,48px)]">
              Vamos conversar sobre{" "}
              <span className="text-gradient-vx">seus números.</span>
            </h2>
            <p className="reveal mt-6 max-w-[460px] text-[17px] leading-relaxed text-mist-300">
              Em 30 minutos, mostramos exatamente onde está travando seu
              faturamento — e o que fazer nos próximos 90 dias.
            </p>

            <ul className="reveal mt-9 flex flex-col gap-3.5">
              {PROMISES.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15.5px] text-mist-300">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-orange-vx-500/15 text-orange-vx-400">
                    <Check className="size-3.5" strokeWidth={3} />
                  </span>
                  {p}
                </li>
              ))}
            </ul>
          </div>

          <div className="reveal glass-card rounded-[22px] p-7 shadow-[0_40px_100px_-50px_rgba(0,0,0,0.9)] sm:p-9">
            <h3 className="text-[24px] text-white">Agende seu diagnóstico</h3>
            <p className="mt-2 text-[14.5px] text-mist-500">
              Resposta em até 24 horas úteis.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-5">
              <div>
                <Label htmlFor="nome">Nome completo</Label>
                <Input
                  id="nome"
                  required
                  value={data.nome}
                  onChange={set("nome")}
                  placeholder="Seu nome"
                  autoComplete="name"
                />
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={data.email}
                    onChange={set("email")}
                    placeholder="voce@empresa.com"
                    autoComplete="email"
                  />
                </div>
                <div>
                  <Label htmlFor="whatsapp">WhatsApp</Label>
                  <Input
                    id="whatsapp"
                    type="tel"
                    required
                    value={data.whatsapp}
                    onChange={set("whatsapp")}
                    placeholder="(11) 99999-9999"
                    autoComplete="tel"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="empresa">Empresa</Label>
                <Input
                  id="empresa"
                  value={data.empresa}
                  onChange={set("empresa")}
                  placeholder="Nome da sua empresa"
                  autoComplete="organization"
                />
              </div>

              <div>
                <Label htmlFor="faturamento">Faturamento mensal aproximado</Label>
                <Select
                  id="faturamento"
                  value={data.faturamento}
                  onChange={set("faturamento")}
                >
                  <option value="">Selecione uma faixa</option>
                  {FATURAMENTO.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </Select>
              </div>

              {error && (
                <p
                  role="alert"
                  className="flex items-start gap-2.5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-[14px] leading-snug text-red-200"
                >
                  <AlertCircle className="mt-0.5 size-4 shrink-0" />
                  {error}
                </p>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="mt-1 w-full"
              >
                {sending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Enviando…
                  </>
                ) : (
                  <>
                    Quero meu diagnóstico gratuito
                    <ArrowRight className="size-4" />
                  </>
                )}
              </Button>

              <p className="flex items-center justify-center gap-2 font-mono text-[11px] tracking-[0.1em] text-mist-600 uppercase">
                <ShieldCheck className="size-3.5" />
                Seus dados estão seguros · LGPD compliant
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Modal de agendamento */}
      <Dialog open={showBooking} onOpenChange={(o) => !o && handleBooked()}>
        <DialogContent className="h-[min(88vh,760px)] w-[min(96vw,860px)] overflow-hidden p-0">
          <DialogTitle className="sr-only">Agendar diagnóstico</DialogTitle>
          <iframe
            src={BOOKING_URL}
            title="Agendar diagnóstico"
            className="size-full rounded-[22px] border-0 bg-white"
          />
        </DialogContent>
      </Dialog>

      {/* Sucesso */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowSuccess(false)}
            className="fixed inset-0 z-102 grid cursor-pointer place-items-center bg-ink-950/92 backdrop-blur-lg"
          >
            <motion.div
              initial={{ scale: 0.9, y: 18 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="px-6 text-center"
            >
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.12, type: "spring", stiffness: 240 }}
                className="mx-auto grid size-24 place-items-center rounded-full border-2 border-orange-vx-500/60 bg-orange-vx-500/10 shadow-[0_0_70px_-10px_rgba(255,107,26,0.8)]"
              >
                <Check className="size-11 text-orange-vx-400" strokeWidth={2.5} />
              </motion.span>
              <h3 className="mt-8 text-[32px] text-white">Boas-vindas à VX</h3>
              <p className="mt-3 text-[16px] text-mist-300">
                Entraremos em contato em breve.
              </p>
              <p className="mt-8 font-mono text-[11px] tracking-[0.18em] text-mist-600 uppercase">
                Toque para fechar
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
