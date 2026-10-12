"use client";

import dynamic from "next/dynamic";
import { FadeIn } from "@/components/motion/fade-in";
import { useLocale } from "@/components/providers/locale-provider";

const GlassToothStage = dynamic(
  () => import("@/components/home/glass-tooth-stage").then((mod) => mod.GlassToothStage),
  { ssr: false },
);

export function AnatomySection() {
  const { t } = useLocale();

  return (
    <section className="relative overflow-hidden bg-navy-950 text-foam">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_68%_48%,rgba(212,188,125,0.16),transparent_46%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-4 px-5 py-20 sm:px-8 lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.05fr)] lg:py-28">
        <FadeIn>
          <p className="text-[11px] tracking-[0.42em] text-gold-300 uppercase">{t.anatomy.eyebrow}</p>
          <h2 className="mt-5 max-w-md font-serif text-5xl leading-[0.95] sm:text-6xl">{t.anatomy.title}</h2>
          <p className="mt-6 max-w-md text-base leading-8 text-white/72">{t.anatomy.body}</p>
          <p className="mt-8 text-xs tracking-wide text-white/45">{t.anatomy.hint}</p>
        </FadeIn>
        <FadeIn delay={0.08} className="relative">
          <div className="relative mx-auto h-[min(92vw,560px)] w-full max-w-[560px]">
            <div className="pointer-events-none absolute inset-[18%] rounded-full bg-gold-400/20 blur-3xl" />
            <GlassToothStage mode="orbit" />
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
