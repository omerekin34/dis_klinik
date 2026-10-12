"use client";

import { FadeIn } from "@/components/motion/fade-in";
import { CtaLink } from "@/components/ui/cta-link";
import { AnatomySection } from "@/components/home/anatomy-section";
import { Hero } from "@/components/home/hero";
import { StatsCounter } from "@/components/home/stats-counter";
import { TeamStrip } from "@/components/home/team-strip";
import { TreatmentsStrip } from "@/components/home/treatments-strip";
import { useLocale } from "@/components/providers/locale-provider";
import { getService, services, testimonials, tx } from "@/lib/content";
import { formatLongDate } from "@/lib/appointments/schedule";

const journeyOffsets = ["lg:mt-36", "lg:mt-24", "lg:mt-12", "lg:mt-0"];

export function HomeView() {
  const { locale, t } = useLocale();
  const ticker = [...services, ...services];

  return (
    <main>
      <Hero />
      <StatsCounter />

      <div className="overflow-hidden border-b border-line bg-foam">
        <div className="marquee-track flex w-max gap-10 py-4">
          {ticker.map((service, index) => (
            <span key={`${service.id}-${index}`} className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">
              {tx(service.name, locale)}
              <span className="ml-10 text-gold-400">✦</span>
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:py-32">
        <FadeIn className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.intro.eyebrow}</p>
          <h2 className="mt-4 font-serif text-5xl leading-[0.95] text-navy-950 sm:text-6xl">{t.intro.title}</h2>
        </FadeIn>
        <FadeIn className="lg:col-span-6 lg:col-start-7" delay={0.1}>
          <p className="text-lg leading-8 text-muted">{t.intro.body}</p>
          <CtaLink href="/klinigimiz" className="mt-10">
            {t.intro.link}
          </CtaLink>
        </FadeIn>
      </section>

      <AnatomySection />

      <TreatmentsStrip />

      <TeamStrip />

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <FadeIn>
          <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.journey.eyebrow}</p>
          <h2 className="mt-4 max-w-3xl font-serif text-5xl leading-[0.95] text-navy-950">{t.journey.title}</h2>
        </FadeIn>
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          {t.journey.steps.map((step, index) => {
            const total = t.journey.steps.length;
            const number = String(index + 1).padStart(2, "0");
            return (
              <li key={step.title} className={journeyOffsets[index] ?? ""}>
                <FadeIn delay={index * 0.1} className="h-full">
                  <article className="group relative flex h-full flex-col border border-line bg-foam p-7 transition-all duration-300 hover:-translate-y-1 hover:border-gold-400 hover:shadow-[0_24px_48px_-28px_rgba(7,17,31,0.35)]">
                    <div className="flex items-center justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-full border border-gold-400/60 font-serif text-lg text-gold-600 lining-nums transition-colors duration-300 group-hover:border-navy-950 group-hover:bg-navy-950 group-hover:text-gold-300">
                        {number}
                      </span>
                      <span className="text-[11px] tracking-[0.24em] text-muted lining-nums">
                        {number} / {String(total).padStart(2, "0")}
                      </span>
                    </div>
                    <div aria-hidden className="mt-6 flex gap-1.5">
                      {t.journey.steps.map((_, barIndex) => (
                        <span
                          key={barIndex}
                          className={`h-0.5 flex-1 ${barIndex <= index ? "bg-gold-500" : "bg-line"}`}
                        />
                      ))}
                    </div>
                    <h3 className="mt-6 font-serif text-2xl text-navy-950">{step.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{step.body}</p>
                  </article>
                </FadeIn>
              </li>
            );
          })}
        </ol>
      </section>

      <Reviews />

      <section className="bg-navy-950 text-foam">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 px-5 py-24 sm:px-8 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn>
            <p className="text-[11px] tracking-[0.32em] text-gold-300 uppercase">{t.closing.eyebrow}</p>
            <h2 className="mt-4 max-w-2xl font-serif text-5xl leading-[0.95] sm:text-6xl">{t.closing.title}</h2>
            <p className="mt-6 max-w-md text-white/65">{t.closing.body}</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <CtaLink href="/appointment" tone="dark">
              {t.closing.cta}
            </CtaLink>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

function Reviews() {
  const { locale, t } = useLocale();
  const loop = [...testimonials, ...testimonials];

  return (
    <section className="border-t border-line bg-foam py-20">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.reviews.eyebrow}</p>
          <h2 className="mt-3 font-serif text-5xl text-navy-950">{t.reviews.title}</h2>
        </div>
        <p className="text-sm text-muted">
          <span className="mr-2 font-serif text-4xl text-navy-950">{t.reviews.score}</span>
          {t.reviews.scoreLabel}
        </p>
      </div>
      <div className="mt-10 overflow-hidden">
        <div className="marquee-track flex w-max gap-5 px-5">
          {loop.map((item, index) => (
            <article
              key={`${item.id}-${index}`}
              className="w-[340px] shrink-0 border border-line bg-paper p-6 sm:w-[380px]"
            >
              <div className="flex items-center justify-between">
                <Stars rating={item.rating} />
                <span className="text-[11px] tracking-[0.16em] text-gold-600 uppercase">
                  {tx(getService(item.serviceId).name, locale)}
                </span>
              </div>
              <p className="mt-5 font-serif text-xl leading-8 text-navy-950">“{tx(item.quote, locale)}”</p>
              <div className="mt-6 flex items-center justify-between text-sm">
                <div>
                  <p className="text-ink">{item.name}</p>
                  <p className="text-muted">{item.country}</p>
                </div>
                <p className="text-muted">{formatLongDate(item.date, locale)}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-gold-500" aria-label={`${rating} / 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <svg key={index} viewBox="0 0 20 20" className="h-3.5 w-3.5" aria-hidden>
          <path
            d="M10 1.6 12.4 7l5.8.5-4.4 3.8 1.4 5.6L10 14.2 4.8 16.9 6.2 11.3 1.8 7.5 7.6 7 10 1.6z"
            fill={index < rating ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );
}
