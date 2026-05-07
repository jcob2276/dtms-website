import { getDictionary } from "../i18n";
import Hero from "@/components/sections/Hero";
import UpcomingCourses from '@/components/sections/UpcomingCourses';
import Services from '@/components/sections/Services';
import FireBrigade from '@/components/sections/FireBrigade';
import HowWeWork from '@/components/sections/HowWeWork';
import Reviews from "@/components/sections/Reviews";


export const metadata = {
  title: "DTMS - Professional UDT Training Krosno | Forklifts, Platforms, Cranes",
  description: "Professional UDT operator certification courses in Krosno, Poland. Get certified for forklifts, mobile platforms, overhead cranes and HDS. High pass rate, experienced instructors.",
};

export default async function Home() {
  const lang = 'en';
  const dict = getDictionary(lang);

  return (
    <>
      <h1 className="sr-only">Professional UDT Training Krosno — Forklifts, Mobile Platforms, Overhead Cranes, HDS Cranes</h1>
      <Hero dict={dict} lang={lang} />
      <UpcomingCourses dict={dict} lang={lang} />
      <Services dict={dict} lang={lang} />
      <FireBrigade dict={dict} lang={lang} />
      <HowWeWork dict={dict} lang={lang} />
      <Reviews dict={dict} lang={lang} />
    </>
  );
}
