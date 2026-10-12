"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import { FadeIn } from "@/components/motion/fade-in";
import { dragScrollerClassName, useDragScroller } from "@/components/motion/use-drag-scroller";
import { useLocale } from "@/components/providers/locale-provider";
import { CtaLink } from "@/components/ui/cta-link";
import { cn } from "@/lib/cn";
import { tx } from "@/lib/content";
import { treatments, type Treatment } from "@/lib/treatments";

const spring = { stiffness: 160, damping: 18, mass: 0.6 };

export function TreatmentsStrip() {
  const { t } = useLocale();
  const { atStart, atEnd, scrollByCard, scrollerProps } = useDragScroller();

  return (
    <section className="bg-foam">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <FadeIn className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-md shrink-0">
            <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.servicesHome.eyebrow}</p>
            <h2 className="mt-4 font-serif text-5xl leading-none text-navy-950 sm:text-6xl">{t.servicesHome.title}</h2>
          </div>
          <p className="max-w-sm text-sm leading-7 text-muted lg:mb-2">{t.servicesHome.lede}</p>
          <div className="flex items-center gap-2 lg:mb-1">
            <button
              type="button"
              aria-label={t.servicesHome.prev}
              disabled={atStart}
              onClick={() => scrollByCard(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper text-navy-950 transition-colors hover:border-gold-500 disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label={t.servicesHome.next}
              disabled={atEnd}
              onClick={() => scrollByCard(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-paper text-navy-950 transition-colors hover:border-gold-500 disabled:pointer-events-none disabled:opacity-35"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </FadeIn>

        <div {...scrollerProps} className={cn(dragScrollerClassName, "mt-9 gap-4 pt-3 pb-8")}>
          {treatments.map((treatment, index) => (
            <StripCard key={treatment.id} treatment={treatment} index={index} total={treatments.length} />
          ))}
        </div>

        <FadeIn className="mt-2">
          <CtaLink href="/tedaviler">{t.servicesHome.viewAll}</CtaLink>
        </FadeIn>
      </div>
    </section>
  );
}

function StripCard({ treatment, index, total }: { treatment: Treatment; index: number; total: number }) {
  const { locale, t } = useLocale();
  const reduce = useReducedMotion();

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const px = useMotionValue(-400);
  const py = useMotionValue(-400);

  const rotateX = useSpring(useTransform(my, [0, 1], [5, -5]), spring);
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), spring);
  const imageX = useSpring(useTransform(mx, [0, 1], [10, -10]), spring);
  const imageY = useSpring(useTransform(my, [0, 1], [8, -8]), spring);
  const spotlight = useMotionTemplate`radial-gradient(320px circle at ${px}px ${py}px, rgba(196,163,90,0.22), transparent 65%)`;

  const handleMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    mx.set(x / rect.width);
    my.set(y / rect.height);
    px.set(x);
    py.set(y);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      data-card
      className="w-[min(78vw,280px)] shrink-0 snap-start"
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <Link
        href={`/tedaviler/${treatment.id}`}
        draggable={false}
        className="group relative block aspect-[3/4] overflow-hidden bg-navy-900 ring-1 ring-transparent transition-[box-shadow] duration-500 select-none hover:shadow-[0_30px_50px_-28px_rgba(7,17,31,0.55)] hover:ring-gold-400/60 focus-visible:ring-gold-400"
      >
        <motion.div
          className="pointer-events-none absolute -inset-[5%]"
          style={reduce ? undefined : { x: imageX, y: imageY }}
        >
          <Image
            src={treatment.image}
            alt={tx(treatment.imageAlt, locale)}
            fill
            sizes="280px"
            draggable={false}
            className="object-cover select-none transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-hover:saturate-[1.1]"
          />
        </motion.div>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950 from-5% via-navy-950/45 via-38% to-transparent to-62%" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-navy-950/70 via-navy-950/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-[1300ms] ease-out group-hover:translate-x-[520%]"
        />

        <div className="pointer-events-none absolute inset-x-5 top-5 flex items-start justify-between">
          <span className="font-serif text-lg leading-none text-foam/90 drop-shadow-[0_1px_6px_rgba(7,17,31,0.45)]">
            {String(index + 1).padStart(2, "0")}
            <span className="text-xs text-foam/60"> / {String(total).padStart(2, "0")}</span>
          </span>
          <span className="grid h-10 w-10 place-items-center rounded-full border border-foam/40 bg-navy-950/20 text-foam backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-300 group-hover:bg-gold-400 group-hover:text-navy-950">
            <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
          </span>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 text-foam select-none">
          <p className="flex items-center gap-3 text-[10px] tracking-[0.28em] text-gold-300 uppercase">
            <span className="h-px w-4 bg-gold-300 transition-all duration-500 group-hover:w-8" />
            {t.servicesPage.eyebrow}
          </p>
          <h3 className="mt-2 font-serif text-[2rem] leading-[1.05]">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
              {tx(treatment.name, locale)}
            </span>
          </h3>
          <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:grid-rows-[1fr]">
            <dl className="overflow-hidden text-[11px] leading-5">
              {[
                { label: t.treatmentPage.visits, value: tx(treatment.visits, locale) },
                { label: t.treatmentPage.comfort, value: tx(treatment.comfort, locale) },
              ].map((item, i) => (
                <div
                  key={item.label}
                  className="flex translate-y-3 gap-2 pt-1.5 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] first:pt-3 group-hover:translate-y-0 group-hover:opacity-100"
                  style={{ transitionDelay: `${120 + i * 80}ms` }}
                >
                  <dt className="shrink-0 tracking-[0.18em] text-gold-300 uppercase">{item.label}</dt>
                  <dd className="text-foam/90">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-linear-to-r from-gold-500 via-gold-300 to-gold-600 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />
      </Link>
    </motion.div>
  );
}
