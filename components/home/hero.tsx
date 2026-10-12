"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { CtaLink } from "@/components/ui/cta-link";

export function Hero() {
  const { t } = useLocale();
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce) {
      video.pause();
      return;
    }
    video.play().catch(() => undefined);
  }, [reduce]);

  return (
    <section className="grain relative min-h-[100svh] overflow-hidden bg-navy-950 text-foam">
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          className="h-full w-full object-cover object-[64%_center]"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/hero-exam.jpg"
          aria-hidden
        >
          <source src="/media/hero-exam.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-navy-950/35" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-950/72 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/90 via-transparent to-navy-950/55" />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-center px-5 pt-28 pb-16 sm:px-8">
        <div className="max-w-3xl">
          <p className="text-[11px] tracking-[0.42em] text-gold-300 uppercase">{t.hero.eyebrow}</p>
          <h1 className="mt-6 max-w-4xl font-serif text-[clamp(3.5rem,7.4vw,7.4rem)] leading-[0.88] font-medium [text-shadow:0_22px_60px_rgba(7,17,31,0.72)]">
            {t.hero.titleLead} <span className="italic text-gold-300">{t.hero.titleEmphasis}</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-white/88 sm:text-lg [text-shadow:0_10px_28px_rgba(7,17,31,0.65)]">
            {t.hero.lede}
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CtaLink href="/tedaviler" tone="dark">
              {t.hero.cta}
            </CtaLink>
            <CtaLink href="/klinigimiz" tone="ghost">
              {t.hero.secondary}
            </CtaLink>
          </div>
        </div>
      </div>
    </section>
  );
}
