"use client";

import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { dragScrollerClassName, useDragScroller } from "@/components/motion/use-drag-scroller";
import { useLocale } from "@/components/providers/locale-provider";
import { CtaLink } from "@/components/ui/cta-link";
import { cn } from "@/lib/cn";
import { doctors, tx } from "@/lib/content";

const cardWidth = "w-[min(76vw,300px)] md:w-[calc((100%-4rem)/3)]";
const arrowButton =
  "absolute top-[calc(50%-1.5rem)] z-10 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-line bg-foam text-navy-950 shadow-[0_12px_30px_rgba(7,17,31,0.1)] transition-[opacity,background-color,color,border-color] duration-300 hover:border-navy-950 hover:bg-navy-950 hover:text-foam disabled:pointer-events-none disabled:opacity-0";

export function TeamStrip() {
  const { locale, t } = useLocale();
  const { atStart, atEnd, scrollByCard, scrollerProps } = useDragScroller();

  return (
    <section className="relative overflow-hidden bg-paper">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-gold-200/40 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <FadeIn className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.teamHome.eyebrow}</p>
            <h2 className="mt-4 font-serif text-5xl leading-none text-navy-950 sm:text-6xl">
              <span className="relative inline-block">
                {t.teamHome.title}
                <span aria-hidden className="absolute -bottom-2 left-0 h-[3px] w-1/2 bg-gold-400" />
              </span>
            </h2>
          </div>
          <CtaLink href="/ekibimiz" className="self-start sm:self-auto">
            {t.teamHome.link}
          </CtaLink>
        </FadeIn>

        <FadeIn className="relative mt-14" delay={0.1}>
          <button
            type="button"
            aria-label={t.teamHome.prev}
            disabled={atStart}
            onClick={() => scrollByCard(-1)}
            className={cn(arrowButton, "-left-2 sm:-left-4 2xl:-left-20")}
          >
            <ArrowLeft className="h-4 w-4" />
          </button>

          <div {...scrollerProps} className={cn(dragScrollerClassName, "gap-8")}>
            {doctors.map((doctor) => (
              <Link
                key={doctor.id}
                data-card
                href="/ekibimiz"
                draggable={false}
                className={cn("group relative block shrink-0 snap-start pb-12 select-none", cardWidth)}
              >
                <div className="relative ml-6 aspect-[3/4] overflow-hidden bg-navy-900">
                  <Image
                    src={doctor.photo}
                    alt={doctor.name}
                    fill
                    sizes="(min-width: 768px) 28vw, 76vw"
                    draggable={false}
                    className="pointer-events-none object-cover object-top select-none transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </div>
                <div className="absolute bottom-0 left-0 w-[82%] overflow-hidden bg-foam px-6 py-5 shadow-[0_18px_40px_rgba(7,17,31,0.08)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:shadow-[0_26px_50px_rgba(7,17,31,0.16)]">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold-500 transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <h3 className="font-serif text-2xl leading-tight text-navy-950">{doctor.name}</h3>
                  <p className="mt-1 text-[11px] tracking-[0.16em] text-gold-600 uppercase">{tx(doctor.role, locale)}</p>
                </div>
              </Link>
            ))}

            <Link
              data-card
              href="/ekibimiz"
              draggable={false}
              className={cn("group relative block shrink-0 snap-start select-none", cardWidth)}
            >
              <div className="relative ml-6 flex h-full flex-col justify-between overflow-hidden bg-navy-950 p-7 text-foam transition-colors duration-500 group-hover:text-navy-950">
                <span
                  aria-hidden
                  className="absolute inset-0 translate-y-full bg-gold-300 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0"
                />
                <span aria-hidden className="absolute inset-3 border border-white/10 transition-colors duration-500 group-hover:border-navy-950/15" />

                <div className="relative">
                  <p className="text-[10px] tracking-[0.3em] text-gold-300 uppercase transition-colors duration-500 group-hover:text-navy-800">
                    {t.teamHome.cardEyebrow}
                  </p>
                  <div className="mt-5 flex -space-x-3">
                    {doctors.slice(0, 4).map((doctor) => (
                      <span
                        key={doctor.id}
                        className="relative h-11 w-11 overflow-hidden rounded-full ring-2 ring-navy-950 transition-[box-shadow] duration-500 group-hover:ring-gold-300"
                      >
                        <Image src={doctor.photo} alt="" fill sizes="44px" draggable={false} className="object-cover object-top" />
                      </span>
                    ))}
                    <span className="relative grid h-11 w-11 place-items-center rounded-full bg-gold-400 text-[12px] font-medium text-navy-950 ring-2 ring-navy-950 transition-[box-shadow,background-color] duration-500 group-hover:bg-foam group-hover:ring-gold-300">
                      +{Math.max(0, doctors.length - 4)}
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <h3 className="font-serif text-4xl leading-none">{t.teamHome.cardTitle}</h3>
                  <p className="mt-3 max-w-[16rem] text-[13px] leading-6 text-white/65 transition-colors duration-500 group-hover:text-navy-900/75">
                    {t.teamHome.cardBody}
                  </p>
                  <span className="mt-6 grid h-12 w-12 place-items-center rounded-full bg-gold-400 text-navy-950 transition-[transform,background-color,color] duration-500 group-hover:rotate-45 group-hover:bg-navy-950 group-hover:text-gold-300">
                    <ArrowUpRight className="h-5 w-5" />
                  </span>
                </div>
              </div>
            </Link>
          </div>

          <button
            type="button"
            aria-label={t.teamHome.next}
            disabled={atEnd}
            onClick={() => scrollByCard(1)}
            className={cn(arrowButton, "-right-2 sm:-right-4 2xl:-right-20")}
          >
            <ArrowRight className="h-4 w-4" />
          </button>
        </FadeIn>
      </div>
    </section>
  );
}
