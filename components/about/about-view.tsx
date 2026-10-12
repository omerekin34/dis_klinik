"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { StatsCounter } from "@/components/home/stats-counter";
import { FadeIn } from "@/components/motion/fade-in";
import { useLocale } from "@/components/providers/locale-provider";

const paths = [
  { href: "/ekibimiz", title: "teamCardTitle", body: "teamCardBody" },
  { href: "/klinigimiz", title: "clinicCardTitle", body: "clinicCardBody" },
] as const;

export function AboutView() {
  const { t } = useLocale();

  return (
    <main>
      <header className="mx-auto max-w-7xl px-5 pt-36 pb-16 sm:px-8">
        <FadeIn>
          <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.about.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(3.2rem,7vw,6.5rem)] leading-[0.92] text-navy-950">
            {t.about.title}
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-muted">{t.about.lede}</p>
        </FadeIn>
      </header>

      <section className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-12">
        <FadeIn className="lg:col-span-5">
          <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.about.storyEyebrow}</p>
          <h2 className="mt-4 max-w-md font-serif text-5xl leading-[0.95] text-navy-950">{t.about.storyTitle}</h2>
        </FadeIn>
        <div className="space-y-6 lg:col-span-6 lg:col-start-7">
          {t.about.story.map((paragraph, index) => (
            <FadeIn key={paragraph} delay={index * 0.06}>
              <p className="text-lg leading-8 text-muted">{paragraph}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      <StatsCounter eyebrow={t.about.statsEyebrow} />

      <section className="border-b border-line bg-foam">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <FadeIn className="max-w-2xl">
            <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.about.principlesEyebrow}</p>
            <h2 className="mt-3 font-serif text-5xl text-navy-950">{t.about.principlesTitle}</h2>
          </FadeIn>
          <ol className="mt-12 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {t.about.principles.map((item, index) => (
              <li key={item.title} className="bg-foam p-8 sm:p-10">
                <FadeIn delay={index * 0.05}>
                  <span className="font-serif text-3xl text-gold-500">0{index + 1}</span>
                  <h3 className="mt-5 font-serif text-3xl text-navy-950">{item.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-muted">{item.body}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-navy-950 text-foam">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-8">
          <FadeIn>
            <blockquote className="font-serif text-4xl leading-tight italic sm:text-5xl">
              “{t.about.quote}”
            </blockquote>
            <p className="mt-6 text-[11px] tracking-[0.28em] text-gold-300 uppercase">{t.about.quoteBy}</p>
          </FadeIn>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <FadeIn>
          <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.about.pathsEyebrow}</p>
        </FadeIn>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {paths.map((path, index) => (
            <FadeIn key={path.href} delay={index * 0.08}>
              <Link
                href={path.href}
                className="group flex h-full flex-col justify-between border border-line bg-foam p-8 transition-colors hover:border-gold-400 sm:p-10"
              >
                <div>
                  <h2 className="font-serif text-4xl text-navy-950">{t.about[path.title]}</h2>
                  <p className="mt-4 max-w-sm text-muted">{t.about[path.body]}</p>
                </div>
                <span className="mt-10 inline-flex items-center gap-2 text-[12px] tracking-[0.18em] text-navy-950 uppercase">
                  {t.about.read}
                  <ArrowUpRight className="h-4 w-4 text-gold-600 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>
    </main>
  );
}
