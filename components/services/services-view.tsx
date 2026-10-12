"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { useLocale } from "@/components/providers/locale-provider";
import { treatments } from "@/lib/treatments";
import { TreatmentCard } from "./treatment-card";

export function ServicesView() {
  const { t } = useLocale();

  return (
    <main>
      <header className="mx-auto max-w-7xl px-5 pt-36 pb-10 sm:px-8">
        <FadeIn>
          <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.servicesPage.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(3rem,6vw,5.8rem)] leading-[0.95] text-navy-950">
            {t.servicesPage.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">{t.servicesPage.lede}</p>
        </FadeIn>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment, index) => (
            <FadeIn key={treatment.id} delay={(index % 3) * 0.05} className="h-full">
              <TreatmentCard treatment={treatment} index={index} total={treatments.length} />
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
