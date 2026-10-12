"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FadeIn } from "@/components/motion/fade-in";
import { CtaLink } from "@/components/ui/cta-link";
import { useLocale } from "@/components/providers/locale-provider";
import { doctors, tx } from "@/lib/content";

const CREW_PREVIEW = 5;

export function TeamView() {
  const { locale, t } = useLocale();
  const crew = doctors.slice(0, CREW_PREVIEW);
  const hiddenCount = doctors.length - crew.length;
  const branchCount = new Set(doctors.map((doctor) => doctor.role.tr)).size;
  const stats = [
    { value: String(doctors.length), label: t.team.statDoctors },
    { value: String(branchCount), label: t.team.statBranches },
    { value: "1:1", label: t.team.statFile },
  ];
  const moreLinks = [
    { href: "/about", title: t.nav.about, body: t.team.aboutCardBody },
    { href: "/klinigimiz", title: t.about.clinicCardTitle, body: t.about.clinicCardBody },
  ];

  return (
    <main>
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-48 right-[-12%] h-[560px] w-[560px] rounded-full bg-gold-300/25 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pt-36 pb-16 sm:px-8 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-7">
            <p className="flex items-center gap-3 text-[11px] tracking-[0.32em] text-gold-600 uppercase">
              <span aria-hidden className="h-px w-10 bg-gold-500" />
              {t.team.eyebrow}
            </p>
            <h1 className="mt-5 font-serif text-[clamp(3.2rem,7vw,6.2rem)] leading-[0.92] text-navy-950">
              {t.team.title}
              <span className="block text-gold-600 italic">{t.team.titleAccent}</span>
            </h1>
            <p className="mt-8 max-w-2xl border-l-2 border-gold-400/60 pl-5 text-lg leading-8 text-muted">
              {t.team.lede}
            </p>
            <ul className="mt-8 flex flex-wrap gap-2">
              {doctors.map((doctor) => (
                <li
                  key={doctor.id}
                  className="rounded-full border border-line bg-foam/80 px-3.5 py-1.5 text-[10px] tracking-[0.16em] text-ink uppercase"
                >
                  {tx(doctor.role, locale)}
                </li>
              ))}
            </ul>
          </FadeIn>

          <FadeIn className="lg:col-span-5" delay={0.1}>
            <div className="relative rounded-2xl border border-line bg-foam p-7 shadow-[0_24px_60px_rgba(7,17,31,0.08)] sm:p-8">
              <span
                aria-hidden
                className="absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent"
              />
              <p className="text-[11px] tracking-[0.28em] text-gold-600 uppercase">{t.team.crewLabel}</p>
              <div className="mt-5 flex items-center">
                <div className="flex -space-x-3">
                  {crew.map((doctor) => (
                    <span
                      key={doctor.id}
                      className="relative h-14 w-14 overflow-hidden rounded-full border-2 border-foam bg-navy-900 shadow-[0_6px_16px_rgba(7,17,31,0.18)]"
                    >
                      <Image src={doctor.photo} alt={doctor.name} fill sizes="56px" className="object-cover object-top" />
                    </span>
                  ))}
                </div>
                {hiddenCount > 0 ? (
                  <span className="-ml-3 grid h-14 w-14 place-items-center rounded-full border-2 border-foam bg-navy-950 font-serif text-lg text-gold-300">
                    +{hiddenCount}
                  </span>
                ) : null}
              </div>
              <dl className="mt-7 grid grid-cols-3 divide-x divide-line border-t border-line pt-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col-reverse gap-1 px-3 first:pl-0 last:pr-0">
                    <dt className="text-[10px] leading-4 tracking-[0.14em] text-muted uppercase">{stat.label}</dt>
                    <dd className="font-serif text-4xl leading-none text-navy-950 lining-nums">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </FadeIn>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
        <div className="mt-8 grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {doctors.map((doctor, index) => (
            <FadeIn key={doctor.id} delay={index * 0.05}>
              <article className="group">
                <div className="relative pb-12">
                  <div className="relative ml-6 aspect-[3/4] overflow-hidden bg-navy-900">
                    <Image
                      src={doctor.photo}
                      alt={doctor.name}
                      fill
                      sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-navy-950/55 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                  <div className="absolute bottom-0 left-0 w-[82%] overflow-hidden bg-foam px-6 py-5 shadow-[0_18px_40px_rgba(7,17,31,0.08)] transition-[transform,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2 group-hover:shadow-[0_26px_50px_rgba(7,17,31,0.16)]">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gold-500 transition-transform duration-500 group-hover:scale-x-100"
                    />
                    <h2 className="font-serif text-2xl leading-tight text-navy-950">{doctor.name}</h2>
                    <p className="mt-1 text-[11px] tracking-[0.16em] text-gold-600 uppercase">{tx(doctor.role, locale)}</p>
                  </div>
                </div>
                <div className="pt-6 pl-6">
                  <p className="text-sm text-ink">{tx(doctor.focus, locale)}</p>
                  <p className="mt-3 text-sm leading-7 text-muted">{tx(doctor.bio, locale)}</p>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="grain relative overflow-hidden bg-navy-950 text-foam">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-32 h-[26rem] w-[26rem] rounded-full bg-gold-500/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 -bottom-48 h-[30rem] w-[30rem] rounded-full bg-navy-700/50 blur-3xl"
        />
        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <FadeIn className="lg:col-span-7">
              <p className="flex items-center gap-3 text-[11px] tracking-[0.32em] text-gold-300 uppercase">
                <span aria-hidden className="h-px w-10 bg-gold-400" />
                {t.team.noteEyebrow}
              </p>
              <h2 className="mt-5 font-serif text-[clamp(2.6rem,5vw,4.4rem)] leading-[1.02]">
                {t.team.noteTitle}
                <span className="block text-gold-300 italic">{t.team.noteAccent}</span>
              </h2>
              <p className="mt-6 max-w-xl leading-7 text-white/70">{t.team.noteBody}</p>
            </FadeIn>
            <FadeIn className="lg:col-span-5 lg:justify-self-end" delay={0.08}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <CtaLink href="/appointment" tone="dark">
                  {t.team.cta}
                </CtaLink>
                <CtaLink href="/contact" tone="ghost">
                  {t.team.contact}
                </CtaLink>
              </div>
            </FadeIn>
          </div>

          <ol className="mt-16 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
            {t.team.steps.map((step, index) => (
              <li key={step.title} className="relative">
                <FadeIn delay={index * 0.08}>
                  <div className="flex items-center gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-400/50 font-serif text-lg text-gold-300 lining-nums">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    {index < t.team.steps.length - 1 ? (
                      <span aria-hidden className="hidden h-px flex-1 bg-gradient-to-r from-gold-400/50 to-transparent sm:block" />
                    ) : null}
                  </div>
                  <h3 className="mt-5 font-serif text-2xl text-foam">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-white/60">{step.body}</p>
                </FadeIn>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
        <FadeIn>
          <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.team.moreEyebrow}</p>
        </FadeIn>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {moreLinks.map((link, index) => (
            <FadeIn key={link.href} delay={index * 0.08}>
              <Link
                href={link.href}
                className="group flex h-full flex-col justify-between border border-line bg-foam p-8 transition-colors hover:border-gold-400 sm:p-10"
              >
                <div>
                  <h2 className="font-serif text-4xl text-navy-950">{link.title}</h2>
                  <p className="mt-4 max-w-sm text-muted">{link.body}</p>
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
