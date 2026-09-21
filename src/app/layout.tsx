import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/providers/smooth-scroll";
import { ScrollProgress } from "@/components/visuals/scroll-progress";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const description =
  "VX Consultoria Comercial — Diagnóstico, método e execução para times comerciais que querem previsibilidade e crescimento real.";

export const metadata: Metadata = {
  metadataBase: new URL("https://vxconsultoria.com.br"),
  title: "VX Consultoria · Multiplique suas vendas",
  description,
  keywords: [
    "consultoria comercial",
    "gestão comercial",
    "playbook de vendas",
    "treinamento de vendas",
    "Manaus",
    "VX Consultoria",
  ],
  icons: { icon: "/uploads/icon.png" },
  openGraph: {
    title: "VX Consultoria · Multiplique suas vendas",
    description,
    locale: "pt_BR",
    type: "website",
    images: [{ url: "/uploads/logo-vazada.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "VX Consultoria · Multiplique suas vendas",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#04070f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href="/uploads/fabio1.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-anim');setTimeout(function(){if(!d.classList.contains('anim-ready'))d.classList.remove('js-anim')},6000)}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
      >
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
