import type { Metadata, Viewport } from "next";
import Script from "next/script";
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
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/uploads/icon.png", type: "image/png", sizes: "500x500" },
    ],
    apple: "/apple-touch-icon.png",
  },
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
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement;if(!matchMedia('(prefers-reduced-motion: reduce)').matches){d.classList.add('js-anim');setTimeout(function(){if(!d.classList.contains('anim-ready'))d.classList.remove('js-anim')},6000)}}catch(e){}`,
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} antialiased`}
      >
        <Script id="meta-pixel" strategy="afterInteractive">{`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1571877514692417');
fbq('track', 'PageView');
`}</Script>
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element -- Meta tracking beacon. */}
          <img height="1" width="1" style={{ display: "none" }} alt=""
            src="https://www.facebook.com/tr?id=1571877514692417&ev=PageView&noscript=1" />
        </noscript>
        <ScrollProgress />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
