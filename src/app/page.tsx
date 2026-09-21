import { Nav } from "@/components/sections/nav";
import { Hero } from "@/components/sections/hero";
import { Clients } from "@/components/sections/clients";
import { Proof } from "@/components/sections/proof";
import { Instagram } from "@/components/sections/instagram";
import { Problem } from "@/components/sections/problem";
import { Solution } from "@/components/sections/solution";
import { Method } from "@/components/sections/method";
import { Services } from "@/components/sections/services";
import { Benefits } from "@/components/sections/benefits";
import { Tech } from "@/components/sections/tech";
import { Contact } from "@/components/sections/contact";
import { Location } from "@/components/sections/location";
import { FinalCta } from "@/components/sections/final-cta";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Clients />
        <Proof />
        <Instagram />
        <Problem />
        <Solution />
        <Method />
        <Services />
        <Benefits />
        <Tech />
        <Contact />
        <Location />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
