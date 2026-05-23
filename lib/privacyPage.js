import { PRIVACY_CONTENT } from '@/lib/constants/privacyContent';
import { validateLocale } from '@/lib/localeLayout';

export function getPrivacyMetadata(lang) {
  validateLocale(lang);
  const content = PRIVACY_CONTENT[lang];

  return {
    title: `${content.title} | DTMS`,
    alternates: {
      canonical: `/${lang}/polityka-prywatnosci/`,
      languages: {
        'pl-PL': '/pl/polityka-prywatnosci/',
        'en-US': '/en/polityka-prywatnosci/',
        'uk-UA': '/ua/polityka-prywatnosci/',
      },
    },
  };
}

export async function PrivacyPageContent({ lang }) {
  validateLocale(lang);
  const content = PRIVACY_CONTENT[lang];

  return (
    <div className="pt-48 pb-24 bg-white">
      <div className="container max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-black mb-12 text-slate-900">{content.title}</h1>
        <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-12 font-medium">
          {content.sections.map((section) => (
            <section key={section.h}>
              <h2 className="text-2xl font-bold text-blue-600 mb-4">{section.h}</h2>
              {section.p.map((paragraph) => (
                <p key={paragraph} className="mb-4">{paragraph}</p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
