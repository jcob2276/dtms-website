import { getDictionary } from "../i18n";
import Hero from "@/components/sections/Hero";
import UpcomingCourses from '@/components/sections/UpcomingCourses';
import Services from '@/components/sections/Services';
import FireBrigade from '@/components/sections/FireBrigade';
import HowWeWork from '@/components/sections/HowWeWork';
import Reviews from "@/components/sections/Reviews";


export const metadata = {
  title: "DTMS - Професійне навчання UDT Кросно | Навантажувачі, Підйомники, Крани",
  description: "Професійні курси сертифікації оператора UDT у Кросно, Польща. Отримайте сертифікат на навантажувачі, підйомні платформи, мостові крани та HDS.",
};

export default async function Home() {
  const lang = 'ua';
  const dict = getDictionary(lang);

  return (
    <>
      <h1 className="sr-only">Професійне навчання UDT Кросно — Навантажувачі, Підйомні платформи, Мостові крани, Крани HDS</h1>
      <Hero dict={dict} lang={lang} />
      <UpcomingCourses dict={dict} lang={lang} />
      <Services dict={dict} lang={lang} />
      <FireBrigade dict={dict} lang={lang} />
      <HowWeWork dict={dict} lang={lang} />
      <Reviews dict={dict} lang={lang} />
    </>
  );
}
