"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CtaLink } from "@/components/ui/cta-link";
import { OnlineBookingLink } from "@/components/ui/online-booking";
import { FadeIn } from "@/components/motion/fade-in";
import { useLocale } from "@/components/providers/locale-provider";
import { doctors, tx } from "@/lib/content";
import { getTreatment, treatments, type Treatment } from "@/lib/treatments";

function Prose({ text }: { text: string }) {
  return (
    <div className="space-y-4">
      {text.split("\n\n").map((paragraph) => (
        <p key={paragraph.slice(0, 48)} className="text-[1.05rem] leading-8 text-ink/85">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export function TreatmentView({ id }: { id: string }) {
  const treatment = getTreatment(id);
  if (!treatment) return null;
  return <TreatmentArticle treatment={treatment} />;
}

function TreatmentArticle({ treatment }: { treatment: Treatment }) {
  const { locale, t } = useLocale();
  const copy = t.treatmentPage;
  const sections = [
    { id: "sebep", title: copy.causes, body: treatment.causes },
    { id: "amac", title: copy.goals, body: treatment.goals },
    { id: "yontem", title: copy.methods, body: treatment.methods },
    { id: "uygulama", title: copy.application, body: treatment.application },
    { id: "disler", title: copy.teeth, body: treatment.teeth },
    { id: "sonrasi", title: copy.aftercare, body: treatment.aftercare },
  ] as const;
  const team = treatment.doctorIds
    .map((doctorId) => doctors.find((doctor) => doctor.id === doctorId))
    .filter((doctor) => doctor !== undefined);
  const index = treatments.findIndex((item) => item.id === treatment.id);
  const related = [1, 2, 3].map((offset) => treatments[(index + offset) % treatments.length]);
  const facts = [
    { label: copy.duration, value: treatment.duration },
    { label: copy.visits, value: treatment.visits },
    { label: copy.comfort, value: treatment.comfort },
  ];

  return (
    <main>
      <header className="relative min-h-[100svh] bg-navy-950 text-foam">
        <Image
          src={treatment.image}
          alt={tx(treatment.imageAlt, locale)}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/55 to-navy-950/25" />
        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pt-32 pb-28 sm:px-8">
          <Link href="/tedaviler" className="text-[11px] tracking-[0.28em] text-gold-300 uppercase">
            {copy.back}
          </Link>
          <h1 className="mt-4 max-w-4xl font-serif text-[clamp(3.2rem,7vw,6.4rem)] leading-[0.92]">
            {tx(treatment.name, locale)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/78">{tx(treatment.summary, locale)}</p>
        </div>
      </header>

      <section className="border-b border-line bg-foam">
        <div className="mx-auto grid max-w-7xl sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label} className="border-line px-5 py-7 sm:px-8 sm:[&:not(:first-child)]:border-l">
              <p className="text-[11px] tracking-[0.24em] text-gold-600 uppercase">{fact.label}</p>
              <p className="mt-2 font-serif text-3xl text-navy-950">{tx(fact.value, locale)}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-12 lg:py-24">
        <aside className="hidden lg:col-span-3 lg:block">
          <nav className="sticky top-28 space-y-3" aria-label={tx(treatment.name, locale)}>
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="block text-sm leading-6 text-muted transition-colors hover:text-navy-950"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </aside>

        <article className="lg:col-span-8 lg:col-start-5">
          <FadeIn>
            <Prose text={tx(treatment.lede, locale)} />
            <blockquote className="mt-10 border-l-2 border-gold-500 pl-5">
              <p className="font-serif text-2xl leading-snug text-navy-950 italic">{tx(treatment.note, locale)}</p>
              <p className="mt-3 text-[11px] tracking-[0.22em] text-gold-600 uppercase">{copy.note}</p>
            </blockquote>
          </FadeIn>

          <div className="mt-14 space-y-14">
            {sections.map((section, index) => (
              <section key={section.id} id={section.id} className="scroll-mt-28">
                <FadeIn>
                  <p className="font-serif text-3xl text-gold-500">0{index + 1}</p>
                  <h2 className="mt-2 font-serif text-4xl leading-tight text-navy-950">{section.title}</h2>
                  <div className="mt-5">
                    <Prose text={tx(section.body, locale)} />
                  </div>
                </FadeIn>
                {index === 2 ? (
                  <div className="relative mt-10 aspect-[16/10] overflow-hidden bg-navy-900">
                    <Image
                      src={treatment.aside}
                      alt={tx(treatment.asideAlt, locale)}
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
              </section>
            ))}
          </div>

          <p className="mt-14 text-sm leading-7 text-muted">{copy.disclaimer}</p>

          <section className="mt-16">
            <p className="text-[11px] tracking-[0.28em] text-gold-600 uppercase">{copy.doctorsEyebrow}</p>
            <h2 className="mt-3 font-serif text-4xl text-navy-950">{copy.doctorsTitle}</h2>
            <div className={`mt-8 grid gap-x-8 gap-y-16 ${team.length > 1 ? "sm:grid-cols-2" : "max-w-sm"}`}>
              {team.map((doctor, position) => (
                <FadeIn key={doctor.id} delay={position * 0.05}>
                  <article className="group">
                    <div className="relative pb-12">
                      <div className="relative ml-6 aspect-[3/4] overflow-hidden bg-navy-900">
                        <Image
                          src={doctor.photo}
                          alt={doctor.name}
                          fill
                          sizes="(min-width: 640px) 30vw, 90vw"
                          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05]"
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
        </article>
      </div>

      <section className="relative overflow-hidden border-b border-white/10 bg-navy-950 text-foam">
        <div className="pointer-events-none absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-gold-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">
          <FadeIn>
            <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="flex items-center gap-3 text-[11px] tracking-[0.32em] text-gold-300 uppercase">
                  <span className="h-px w-10 bg-gold-500" />
                  {copy.relatedEyebrow}
                </p>
                <h2 className="mt-5 font-serif text-[clamp(2.6rem,5vw,4.4rem)] leading-[0.95]">{copy.related}</h2>
                <p className="mt-5 text-base leading-7 text-white/65">{copy.relatedLede}</p>
              </div>
              <CtaLink href="/tedaviler" tone="dark" className="shrink-0 self-start md:self-auto">
                {copy.relatedAll}
              </CtaLink>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {related.map((item, position) => (
              <FadeIn key={item.id} delay={position * 0.08}>
                <Link
                  href={`/tedaviler/${item.id}`}
                  className="group relative block aspect-[4/5] overflow-hidden bg-navy-900"
                >
                  <Image
                    src={item.image}
                    alt={tx(item.imageAlt, locale)}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/45 to-navy-950/35 transition-opacity duration-500 group-hover:opacity-90" />
                  <div className="absolute inset-0 border border-white/10 transition-colors duration-500 group-hover:border-gold-400/60" />

                  <span className="absolute top-6 left-6 font-serif text-4xl text-gold-300/90">0{position + 1}</span>

                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <p className="flex items-center gap-3 text-[10px] tracking-[0.22em] text-gold-300 uppercase">
                      <span className="h-px w-8 shrink-0 bg-gold-500 transition-all duration-500 group-hover:w-14" />
                      {tx(item.duration, locale)}
                    </p>
                    <h3 className="mt-3 font-serif text-3xl leading-tight">{tx(item.name, locale)}</h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-white/70">{tx(item.summary, locale)}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-[11px] tracking-[0.22em] text-gold-300 uppercase">
                      {copy.relatedRead}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-[80] border-t border-white/10 bg-navy-950/95 text-foam backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.28em] text-gold-300 uppercase">{copy.barKicker}</p>
            <p className="truncate font-serif text-xl sm:text-2xl">{tx(treatment.name, locale)}</p>
            <p className="hidden text-sm text-white/60 sm:block">{copy.barBody}</p>
          </div>
          <OnlineBookingLink href={`/appointment?service=${treatment.id}`} className="shrink-0">
            {t.nav.book}
          </OnlineBookingLink>
        </div>
      </div>
    </main>
  );
}
