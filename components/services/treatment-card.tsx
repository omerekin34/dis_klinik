"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { PointerEvent } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { tx } from "@/lib/content";
import type { Treatment } from "@/lib/treatments";

const spring = { stiffness: 160, damping: 18, mass: 0.6 };

export function TreatmentCard({
  treatment,
  index,
  total,
}: {
  treatment: Treatment;
  index: number;
  total: number;
}) {
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
  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${px}px ${py}px, rgba(196,163,90,0.16), transparent 65%)`;

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

  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="h-full"
      style={reduce ? undefined : { rotateX, rotateY, transformPerspective: 1100 }}
      whileHover={reduce ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <Link
        href={`/tedaviler/${treatment.id}`}
        className="group relative flex h-full flex-col overflow-hidden bg-foam shadow-[0_1px_0_rgba(7,17,31,0.04)] ring-1 ring-line/60 transition-[box-shadow] duration-500 hover:shadow-[0_40px_70px_-35px_rgba(7,17,31,0.5)] hover:ring-gold-400/60 focus-visible:ring-gold-400"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{ background: spotlight }}
        />

        <div className="relative aspect-[4/3] overflow-hidden bg-navy-900">
          <motion.div className="absolute -inset-[5%]" style={reduce ? undefined : { x: imageX, y: imageY }}>
            <Image
              src={treatment.image}
              alt={tx(treatment.imageAlt, locale)}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.07] group-hover:saturate-[1.1]"
            />
          </motion.div>

          <div className="absolute inset-0 bg-linear-to-t from-navy-950/85 via-navy-950/10 to-transparent opacity-30 transition-opacity duration-700 group-hover:opacity-100" />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/3 -skew-x-12 bg-linear-to-r from-transparent via-white/30 to-transparent transition-transform duration-[1300ms] ease-out group-hover:translate-x-[520%]"
          />

          <div className="absolute inset-x-5 top-5 flex items-start justify-between">
            <span className="font-serif text-lg leading-none text-foam/90 drop-shadow-[0_1px_6px_rgba(7,17,31,0.45)]">
              {number}
              <span className="text-xs text-foam/60"> / {String(total).padStart(2, "0")}</span>
            </span>
            <span className="grid h-11 w-11 place-items-center rounded-full border border-foam/40 bg-navy-950/20 text-foam backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:border-gold-300 group-hover:bg-gold-400 group-hover:text-navy-950">
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.6} />
            </span>
          </div>

          <dl className="absolute inset-x-5 bottom-5 space-y-1.5 text-[12px] leading-5 text-foam">
            {[
              { label: t.treatmentPage.visits, value: tx(treatment.visits, locale) },
              { label: t.treatmentPage.comfort, value: tx(treatment.comfort, locale) },
            ].map((item, i) => (
              <div
                key={item.label}
                className="flex translate-y-4 gap-2 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100"
                style={{ transitionDelay: `${120 + i * 80}ms` }}
              >
                <dt className="tracking-[0.18em] text-gold-300 uppercase">{item.label}</dt>
                <dd className="text-foam/90">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative z-10 flex flex-1 flex-col p-6">
          <p className="flex items-center gap-3 text-[11px] tracking-[0.2em] text-gold-600 uppercase">
            <span className="h-px w-5 bg-gold-500 transition-all duration-500 group-hover:w-10" />
            {t.servicesPage.durationLabel} · {tx(treatment.duration, locale)}
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-navy-950">
            <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[length:100%_1px]">
              {tx(treatment.name, locale)}
            </span>
          </h2>
          <p className="mt-3 flex-1 text-sm leading-7 text-muted transition-colors duration-500 group-hover:text-ink">
            {tx(treatment.summary, locale)}
          </p>
          <div className="mt-6 flex items-center justify-between border-t border-line pt-5">
            <span className="inline-flex items-center gap-2 text-[12px] tracking-[0.16em] text-navy-950 uppercase transition-[letter-spacing] duration-500 group-hover:tracking-[0.24em]">
              {t.servicesPage.read}
            </span>
            <span className="relative h-4 w-4 overflow-hidden text-gold-600">
              <ArrowUpRight className="absolute inset-0 h-4 w-4 transition-transform duration-500 group-hover:translate-x-4 group-hover:-translate-y-4" />
              <ArrowUpRight className="absolute inset-0 h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
            </span>
          </div>
        </div>

        <span
          aria-hidden
          className="absolute bottom-0 left-0 z-10 h-[2px] w-full origin-left scale-x-0 bg-linear-to-r from-gold-500 via-gold-300 to-gold-600 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
        />
      </Link>
    </motion.div>
  );
}
