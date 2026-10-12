"use client";

import { ArrowUp, ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { useSyncExternalStore, type ComponentType, type ReactNode } from "react";
import { FacebookGlyph, InstagramGlyph, Mark, WhatsAppGlyph } from "@/components/brand/mark";
import { useLocale } from "@/components/providers/locale-provider";
import { services, tx } from "@/lib/content";
import { clinic, whatsappHref } from "@/lib/site";

function subscribeYear(onStoreChange: () => void) {
  window.addEventListener("focus", onStoreChange);
  return () => window.removeEventListener("focus", onStoreChange);
}

function getYear() {
  return new Date().getFullYear();
}

function getServerYear() {
  return 2026;
}

function ContactCard({
  href,
  icon: Icon,
  label,
  value,
  hint,
  external,
}: {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: ReactNode;
  hint?: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className="group relative flex items-start gap-4 bg-navy-950 p-6 transition-colors duration-300 hover:bg-navy-900 lg:p-7"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold-400/30 text-gold-300 transition-colors duration-300 group-hover:border-gold-300 group-hover:bg-gold-300 group-hover:text-navy-950">
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-[11px] tracking-[0.28em] text-gold-400 uppercase">{label}</span>
        <span className="mt-2 block font-serif text-lg leading-snug break-words text-foam">{value}</span>
        {hint ? <span className="mt-1 block text-xs text-white/50">{hint}</span> : null}
      </span>
      <ArrowUpRight className="h-4 w-4 shrink-0 text-white/25 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold-300" />
    </a>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center transition-colors hover:text-gold-300">
      <span className="h-px w-0 bg-gold-300 transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
      {children}
    </Link>
  );
}

export function Footer() {
  const { locale, t } = useLocale();
  const year = useSyncExternalStore(subscribeYear, getYear, getServerYear);

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-foam">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-48 left-1/2 h-96 w-[56rem] max-w-full -translate-x-1/2 rounded-full bg-gold-500/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 sm:px-8 lg:pt-20">
        <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard
            href={`tel:${clinic.phoneTel}`}
            icon={Phone}
            label={t.footer.call}
            value={clinic.phoneDisplay}
            hint={t.hours[0].time}
          />
          <ContactCard
            href={whatsappHref(t.floating.whatsappMessage)}
            icon={WhatsAppGlyph}
            label={t.footer.whatsapp}
            value={t.footer.whatsappValue}
            hint={clinic.phoneDisplay}
            external
          />
          <ContactCard
            href={`mailto:${clinic.email}`}
            icon={Mail}
            label={t.footer.mail}
            value={clinic.email}
          />
          <ContactCard
            href={clinic.mapsDirections}
            icon={MapPin}
            label={t.footer.visit}
            value={t.address[1]}
            hint={t.address[0]}
            external
          />
        </div>
      </div>

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pt-16 pb-10 sm:px-8 md:grid-cols-2 lg:grid-cols-12 lg:pt-20">
        <div className="lg:col-span-4">
          <Link href="/" className="flex items-center gap-3 text-gold-300">
            <Mark className="h-8 w-8" />
            <span className="font-serif text-3xl tracking-[0.2em] text-foam">AUREUM</span>
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-7 text-white/65">{t.footer.blurb}</p>

          <div className="mt-8 max-w-xs border-t border-white/10 pt-6">
            <p className="flex items-center gap-2 text-[11px] tracking-[0.28em] text-gold-400 uppercase">
              <Clock className="h-3.5 w-3.5" />
              {t.footer.hours}
            </p>
            <dl className="mt-4 space-y-2.5 text-sm">
              {t.hours.map((row) => (
                <div key={row.days} className="flex items-baseline gap-3">
                  <dt className="text-white/65">{row.days}</dt>
                  <span aria-hidden className="flex-1 translate-y-[-3px] border-b border-dotted border-white/15" />
                  <dd className="text-foam">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="mt-8 flex gap-3">
            <a
              href={clinic.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-gold-300 transition-colors duration-300 hover:border-gold-300 hover:bg-gold-300 hover:text-navy-950"
            >
              <InstagramGlyph className="h-4 w-4" />
            </a>
            <a
              href={clinic.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-gold-300 transition-colors duration-300 hover:border-gold-300 hover:bg-gold-300 hover:text-navy-950"
            >
              <FacebookGlyph className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="lg:col-span-2 lg:col-start-6">
          <p className="text-[11px] tracking-[0.28em] text-gold-400 uppercase">{t.footer.explore}</p>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            <li><FooterLink href="/">{t.nav.home}</FooterLink></li>
            <li><FooterLink href="/about">{t.nav.about}</FooterLink></li>
            <li><FooterLink href="/ekibimiz">{t.nav.team}</FooterLink></li>
            <li><FooterLink href="/klinigimiz">{t.nav.clinic}</FooterLink></li>
            <li><FooterLink href="/tedaviler">{t.nav.services}</FooterLink></li>
            <li><FooterLink href="/blog">{t.nav.blog}</FooterLink></li>
            <li><FooterLink href="/contact">{t.nav.contact}</FooterLink></li>
            <li><FooterLink href="/appointment">{t.nav.book}</FooterLink></li>
          </ul>
        </div>

        <div className="md:col-span-2 lg:col-span-5">
          <p className="text-[11px] tracking-[0.28em] text-gold-400 uppercase">{t.footer.care}</p>
          <ul className="mt-5 gap-x-8 text-sm text-white/75 sm:columns-2">
            {services.map((service) => (
              <li key={service.id} className="mb-3 break-inside-avoid">
                <FooterLink href={`/tedaviler/${service.id}`}>{tx(service.name, locale)}</FooterLink>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden
        className="pointer-events-none relative -mb-[0.18em] text-center font-serif text-[clamp(4rem,17vw,15rem)] leading-none tracking-[0.18em] pl-[0.18em] text-white/[0.035] select-none"
      >
        AUREUM
      </p>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-xs tracking-wide text-white/45 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {year} Aureum. {t.footer.rights}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group inline-flex items-center gap-2 self-start tracking-[0.2em] uppercase transition-colors hover:text-gold-300 sm:self-auto"
          >
            {t.footer.backToTop}
            <span className="grid h-7 w-7 place-items-center rounded-full border border-white/15 transition-colors group-hover:border-gold-300">
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </span>
          </button>
          <p className="sm:pr-36">Nişantaşı, İstanbul</p>
        </div>
      </div>
    </footer>
  );
}

export function QuietBar() {
  const { t } = useLocale();
  return (
    <footer className="border-t border-line bg-foam">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="tracking-[0.18em] text-[11px] text-gold-600 uppercase">{t.quiet.label}</p>
        <a href={`tel:${clinic.phoneTel}`} className="text-ink">{clinic.phoneDisplay}</a>
        <p>{t.address[1]}</p>
      </div>
    </footer>
  );
}
