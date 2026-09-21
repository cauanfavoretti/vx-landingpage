import Image from "next/image";

const LINKS = [
  { href: "#", label: "Privacidade" },
  { href: "#", label: "Termos" },
  { href: "#contato", label: "Contato" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/8 bg-ink-950 py-10">
      <div className="wrap flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
        <Image
          src="/uploads/logo-vazada.png"
          alt="VX Consultoria"
          width={90}
          height={24}
          className="h-6 w-auto opacity-80"
        />
        <p className="order-3 text-center font-mono text-[12px] text-mist-600 sm:order-none">
          © {new Date().getFullYear()} VX Consultoria · Multiplique suas vendas
        </p>
        <nav className="flex gap-6">
          {LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[13.5px] text-mist-500 transition-colors hover:text-orange-vx-400"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
