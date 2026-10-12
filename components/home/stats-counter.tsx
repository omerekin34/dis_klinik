"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLocale } from "@/components/providers/locale-provider";
import type { Locale } from "@/lib/content";
import type { ClinicStat } from "@/lib/i18n/dictionary";

const COUNT_MS = 1600;
const EASE = [0.22, 1, 0.36, 1] as const;

function formatCount(value: number, locale: Locale, grouped?: boolean) {
  return new Intl.NumberFormat(locale === "en" ? "en-US" : "tr-TR", {
    maximumFractionDigits: 0,
    useGrouping: Boolean(grouped),
  }).format(value);
}

function useCountUp(to: number, active: boolean, instant: boolean) {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (instant) {
      setValue(to);
      setDone(true);
      return;
    }

    if (!active) return;

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / COUNT_MS);
      const eased = 1 - (1 - progress) ** 4;

      if (progress >= 1) {
        setValue(to);
        setDone(true);
        return;
      }

      setValue(to * eased);
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, instant, to]);

  return { value, done };
}

function StatFigure({ stat, locale }: { stat: ClinicStat; locale: Locale }) {
  const reduce = useReducedMotion() === true;
  const [active, setActive] = useState(false);
  const { value, done } = useCountUp(stat.to, active, reduce);
  const current = formatCount(Math.round(value), locale, stat.grouped);
  const finalText = formatCount(stat.to, locale, stat.grouped);
  const spoken = `${finalText}${stat.suffix ?? ""}${stat.mark ?? ""} ${stat.label}`;

  return (
    <motion.div
      className="flex flex-col items-center px-3 lg:border-l lg:border-white/10 lg:first:border-l-0"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.65 }}
      onViewportEnter={() => setActive(true)}
      variants={{
        hidden: { opacity: 0, y: 28 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0 : 0.75, ease: EASE },
        },
      }}
    >
      <p className="font-serif text-[clamp(3.5rem,5.2vw,5.5rem)] leading-none font-medium tracking-tight text-gold-300">
        <span className="inline-flex items-baseline justify-center whitespace-nowrap" aria-hidden>
          <span className="inline-grid">
            <span className="invisible col-start-1 row-start-1 tabular-nums">{finalText}</span>
            <span className="col-start-1 row-start-1 text-right tabular-nums">{current}</span>
          </span>
          <motion.span
            className="inline-flex items-baseline"
            initial={false}
            animate={{ opacity: done ? 1 : 0, y: done ? 0 : 8 }}
            transition={{ duration: reduce ? 0 : 0.55, ease: EASE }}
          >
            {stat.suffix ? <span>{stat.suffix}</span> : null}
            {stat.mark ? (
              <span className="ml-1 font-serif text-[0.38em] tracking-normal text-gold-200/75">{stat.mark}</span>
            ) : null}
          </motion.span>
        </span>
        <span className="sr-only">{spoken}</span>
      </p>
      <p className="mt-4 max-w-[16rem] font-sans text-sm leading-6 font-light tracking-widest text-white/55 uppercase">
        {stat.label}
      </p>
    </motion.div>
  );
}

export function StatsCounter({ eyebrow }: { eyebrow?: string } = {}) {
  const { locale, t } = useLocale();
  const reduce = useReducedMotion() === true;

  return (
    <section aria-labelledby="clinic-stats" className="grain relative overflow-hidden border-t border-gold-400/20 bg-navy-950 text-foam">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,188,125,0.09),transparent_62%)]" />
      {eyebrow ? (
        <motion.h2
          id="clinic-stats"
          className="relative z-10 pt-16 text-center text-[11px] tracking-[0.32em] text-gold-300 uppercase md:pt-20"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
        >
          {eyebrow}
        </motion.h2>
      ) : (
        <h2 id="clinic-stats" className="sr-only">
          {t.statsTitle}
        </h2>
      )}
      <div
        className={`relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-14 px-5 pb-20 text-center sm:px-8 md:grid-cols-2 md:gap-x-0 md:gap-y-16 md:pb-24 lg:grid-cols-4 ${
          eyebrow ? "pt-12 md:pt-14" : "pt-20 md:pt-24"
        }`}
      >
        {t.stats.map((stat) => (
          <StatFigure key={stat.label} stat={stat} locale={locale} />
        ))}
      </div>
    </section>
  );
}
