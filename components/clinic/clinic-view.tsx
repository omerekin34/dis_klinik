"use client";

import {
  Bone,
  Clock,
  Layers,
  MapPin,
  Microscope,
  Scan,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { RoomGallery } from "@/components/clinic/room-gallery";
import { FadeIn } from "@/components/motion/fade-in";
import { CtaLink } from "@/components/ui/cta-link";
import { useLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/cn";
import { clinicRooms, technologies, tx, type Technology } from "@/lib/content";

const techIcons: Record<Technology["icon"], typeof Sparkles> = {
  sparkles: Sparkles,
  scan: Scan,
  microscope: Microscope,
  layers: Layers,
  bone: Bone,
  shield: ShieldCheck,
};

const floorCount = new Set(clinicRooms.map((room) => room.area.tr)).size;

function Eyebrow({
  children,
  light = false,
  centered = false,
}: {
  children: React.ReactNode;
  light?: boolean;
  centered?: boolean;
}) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase",
        light ? "text-gold-300" : "text-gold-600",
        centered && "justify-center",
      )}
    >
      <span className={cn("h-px w-8", light ? "bg-gold-300/60" : "bg-gold-500/60")} />
      {children}
      {centered && <span className="h-px w-8 bg-gold-500/60" />}
    </p>
  );
}

function SplitTitle({ text, as: Tag, className }: { text: string; as: "h1" | "h2"; className?: string }) {
  const match = text.match(/^(.+?[,.])\s+(.+)$/);
  if (!match) return <Tag className={className}>{text}</Tag>;
  return (
    <Tag className={className}>
      {match[1]} <em className="block text-gold-600 italic">{match[2]}</em>
    </Tag>
  );
}

export function ClinicView() {
  const { locale, t } = useLocale();
  const stats = [
    { label: t.clinic.stats.spaces, value: clinicRooms.length },
    { label: t.clinic.stats.floors, value: floorCount },
    { label: t.clinic.stats.tech, value: technologies.length },
  ];

  return (
    <main>
      <header className="mx-auto max-w-7xl px-5 pt-36 pb-14 text-center sm:px-8">
        <FadeIn>
          <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.clinic.galleryEyebrow}</p>
          <h1 className="mt-4 font-serif text-[clamp(3rem,6vw,5.4rem)] leading-[0.95] text-navy-950">
            {t.clinic.galleryTitle}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-muted">{t.clinic.galleryLede}</p>
        </FadeIn>
      </header>

      <RoomGallery />

      <section className="relative overflow-hidden border-t border-line">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 -right-32 h-[520px] w-[520px] rounded-full bg-gold-200/50 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-28 sm:px-8 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-7">
            <Eyebrow>{t.clinic.eyebrow}</Eyebrow>
            <SplitTitle
              as="h2"
              text={t.clinic.title}
              className="mt-6 font-serif text-[clamp(2.8rem,5.6vw,5rem)] leading-[0.95] text-navy-950"
            />
          </FadeIn>
          <FadeIn className="lg:col-span-5" delay={0.1}>
            <p className="border-l border-gold-400/60 pl-6 text-lg leading-8 text-muted">{t.clinic.lede}</p>
            <dl className="mt-10 grid grid-cols-3 divide-x divide-line border-y border-line">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse px-4 py-5 first:pl-0 sm:px-6">
                  <dt className="mt-1 text-[10px] tracking-[0.24em] text-muted uppercase">{stat.label}</dt>
                  <dd className="font-serif text-4xl text-navy-950">{String(stat.value).padStart(2, "0")}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </section>

      <section className="border-y border-line bg-foam">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <FadeIn className="mx-auto max-w-2xl text-center">
            <Eyebrow centered>{t.clinic.spacesEyebrow}</Eyebrow>
            <SplitTitle
              as="h2"
              text={t.clinic.spacesTitle}
              className="mt-5 font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1] text-navy-950"
            />
          </FadeIn>
          <ol className="relative mt-16 grid gap-10 lg:grid-cols-3 lg:gap-6">
            <span
              aria-hidden
              className="absolute top-7 right-[16.66%] left-[16.66%] hidden h-px bg-gradient-to-r from-gold-400/20 via-gold-400/70 to-gold-400/20 lg:block"
            />
            {t.clinic.spaces.map((space, index) => (
              <li key={space.title}>
                <FadeIn className="group flex h-full flex-col items-center" delay={index * 0.08}>
                  <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full border border-gold-400/60 bg-foam font-serif text-xl text-gold-600 transition-colors duration-500 group-hover:border-navy-950 group-hover:bg-navy-950 group-hover:text-gold-300">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <article className="mt-6 flex w-full flex-1 flex-col items-center rounded-2xl border border-line bg-paper px-8 py-10 text-center transition-[border-color,box-shadow,transform] duration-500 group-hover:-translate-y-1 group-hover:border-gold-400/50 group-hover:shadow-[0_24px_50px_rgba(7,17,31,0.08)]">
                    <h3 className="font-serif text-3xl text-navy-950">{space.title}</h3>
                    <span className="mt-4 h-px w-10 bg-gold-400 transition-[width] duration-500 group-hover:w-20" />
                    <p className="mt-5 max-w-xs text-sm leading-7 text-muted">{space.body}</p>
                  </article>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
        <FadeIn className="grid gap-6 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Eyebrow>{t.clinic.techEyebrow}</Eyebrow>
            <SplitTitle
              as="h2"
              text={t.clinic.techTitle}
              className="mt-5 font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1] text-navy-950"
            />
          </div>
          <p className="max-w-sm text-base leading-7 text-muted lg:col-span-4 lg:col-start-9 lg:justify-self-end">
            {t.clinic.techLede}
          </p>
        </FadeIn>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {technologies.map((item, index) => {
            const Icon = techIcons[item.icon];
            return (
              <FadeIn key={item.title.tr} className="h-full" delay={(index % 3) * 0.06}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-foam p-8 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-[0_24px_50px_rgba(7,17,31,0.10)]">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -top-20 -right-20 h-48 w-48 rounded-full bg-gold-200/0 blur-2xl transition-colors duration-700 group-hover:bg-gold-200/70"
                  />
                  <div className="relative flex items-start justify-between">
                    <span className="grid h-14 w-14 place-items-center rounded-2xl border border-gold-400/40 bg-gold-200/40 text-gold-600 transition-colors duration-500 group-hover:border-navy-950 group-hover:bg-navy-950 group-hover:text-gold-300">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <span className="font-serif text-lg text-gold-400/60 transition-colors duration-500 group-hover:text-gold-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="relative mt-8 font-serif text-[1.75rem] leading-tight text-navy-950">
                    {tx(item.title, locale)}
                  </h3>
                  <p className="relative mt-3 text-sm leading-7 text-muted">{tx(item.body, locale)}</p>
                  <span
                    aria-hidden
                    className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-[width] duration-700 group-hover:w-full"
                  />
                </article>
              </FadeIn>
            );
          })}
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-navy-950 text-foam">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-48 -left-40 h-[520px] w-[520px] rounded-full bg-gold-500/10 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] rounded-full bg-navy-700/40 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 lg:grid-cols-12 lg:items-center">
          <FadeIn className="lg:col-span-6">
            <Eyebrow light>{t.clinic.visitEyebrow}</Eyebrow>
            <h2 className="mt-5 font-serif text-[clamp(2.6rem,5vw,4.2rem)] leading-[1]">{t.clinic.visitTitle}</h2>
            <p className="mt-6 max-w-md text-base leading-7 text-white/65">{t.clinic.visitBody}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CtaLink href="/contact" tone="dark">
                {t.clinic.contact}
              </CtaLink>
              <CtaLink href="/appointment" tone="ghost">
                {t.clinic.book}
              </CtaLink>
            </div>
          </FadeIn>
          <FadeIn className="lg:col-span-5 lg:col-start-8" delay={0.1}>
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-10">
              <div className="flex gap-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-300/30 text-gold-300">
                  <MapPin className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-[10px] tracking-[0.28em] text-gold-300/80 uppercase">{t.contact.addressLabel}</p>
                  <address className="mt-3 not-italic">
                    {t.address.map((line) => (
                      <span key={line} className="block font-serif text-2xl leading-snug text-foam sm:text-[1.7rem]">
                        {line}
                      </span>
                    ))}
                  </address>
                </div>
              </div>
              <div className="my-8 h-px bg-gradient-to-r from-gold-400/40 via-white/10 to-transparent" />
              <div className="flex gap-5">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-300/30 text-gold-300">
                  <Clock className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.28em] text-gold-300/80 uppercase">{t.contact.hoursLabel}</p>
                  <ul className="mt-3 text-sm">
                    {t.hours.map((row) => (
                      <li key={row.days} className="flex items-baseline gap-3 py-2">
                        <span className="text-white/75">{row.days}</span>
                        <span aria-hidden className="flex-1 -translate-y-1 border-b border-dotted border-white/15" />
                        <span className={/\d/.test(row.time) ? "text-gold-300" : "text-white/40"}>{row.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
