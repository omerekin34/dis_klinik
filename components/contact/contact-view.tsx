"use client";

import { ArrowUpRight, BedDouble, Check, Clock, ExternalLink, Mail, MapPin, Phone, Plane, TrainFront } from "lucide-react";
import { useState } from "react";
import { WhatsAppGlyph } from "@/components/brand/mark";
import { FadeIn } from "@/components/motion/fade-in";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { useLocale } from "@/components/providers/locale-provider";
import { useClinicNow } from "@/lib/appointments/clock";
import { cn } from "@/lib/cn";
import {
  submitContact,
  toContactInsert,
  validateContact,
  type ContactDraft,
  type ContactErrors,
} from "@/lib/contact/submit";
import { clinic, clinicStatus, whatsappHref } from "@/lib/site";

const empty: ContactDraft = { fullName: "", email: "", phone: "", subject: "", message: "" };

const fieldClass =
  "mt-2 w-full border border-line bg-paper px-5 py-3.5 text-sm text-ink outline-none transition-[border-color,background-color,box-shadow] duration-300 placeholder:text-ink/35 hover:border-gold-400/70 focus:border-gold-500 focus:bg-foam focus:shadow-[0_0_0_4px_rgba(196,163,90,0.14)]";

const travelIcons = [TrainFront, Plane, BedDouble];

const pad = (value: number) => String(value).padStart(2, "0");

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[11px] tracking-[0.32em] uppercase",
        light ? "text-gold-300" : "text-gold-600",
      )}
    >
      <span className={cn("h-px w-8", light ? "bg-gold-300/60" : "bg-gold-500/60")} />
      {children}
    </p>
  );
}

export function ContactView() {
  const { locale, t } = useLocale();
  const status = clinicStatus(useClinicNow());
  const [draft, setDraft] = useState<ContactDraft>(empty);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const update = (field: keyof ContactDraft, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors = validateContact(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setFormState("submitting");
    try {
      await submitContact(toContactInsert(draft, locale));
      setFormState("success");
      setDraft(empty);
    } catch {
      setFormState("error");
    }
  };

  const [street, district, city] = t.address;
  const todayRow = status.closedDay ? t.hours.length - 1 : 0;
  const stats = [
    { label: t.contact.stats.reply, value: t.contact.stats.replyValue },
    { label: t.contact.stats.week, value: t.contact.stats.weekValue },
    { label: t.contact.stats.languages, value: t.contact.stats.languagesValue },
  ];

  return (
    <main>
      <header className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-gold-200/50 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pt-36 pb-16 sm:px-8 lg:grid-cols-12 lg:items-end">
          <FadeIn className="lg:col-span-7">
            <Eyebrow>{t.contact.eyebrow}</Eyebrow>
            <h1 className="mt-6 font-serif text-[clamp(3.2rem,7vw,6rem)] leading-[0.95] text-navy-950">
              {t.contact.title}
            </h1>
            <div className="mt-8 inline-flex flex-wrap items-center gap-x-3 gap-y-1 rounded-full border border-line bg-foam/80 py-2 pr-5 pl-3 backdrop-blur-sm">
              <span className="relative flex h-2.5 w-2.5">
                {status.open && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#3f8f6b] opacity-60" />
                )}
                <span
                  className={cn("relative inline-flex h-2.5 w-2.5 rounded-full", status.open ? "bg-[#3f8f6b]" : "bg-ink/30")}
                />
              </span>
              <span className="text-sm font-medium text-navy-950">
                {status.open ? t.contact.openNow : t.contact.closedNow}
              </span>
              <span className="text-sm text-muted">
                · {t.contact.localTime} <span className="tabular-nums text-navy-950">{status.time}</span>
              </span>
            </div>
          </FadeIn>
          <FadeIn className="lg:col-span-5" delay={0.1}>
            <p className="border-l border-gold-400/60 pl-6 text-lg leading-8 text-muted">{t.contact.lede}</p>
            <dl className="mt-10 grid grid-cols-3 divide-x divide-line border-y border-line">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse px-4 py-5 first:pl-0 sm:px-6">
                  <dt className="mt-1 text-[10px] tracking-[0.24em] text-muted uppercase">{stat.label}</dt>
                  <dd className="font-serif text-2xl text-navy-950 sm:text-3xl">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 pb-6 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <ChannelCard
            index={0}
            href={whatsappHref(t.floating.whatsappMessage)}
            external
            featured
            badge={t.contact.recommended}
            icon={<WhatsAppGlyph className="h-5 w-5" />}
            label={t.contact.whatsappLabel}
            value={clinic.phoneDisplay}
            note={t.contact.whatsappBody}
            action={t.contact.actions.write}
          />
          <ChannelCard
            index={1}
            href={`tel:${clinic.phoneTel}`}
            icon={<Phone className="h-5 w-5" strokeWidth={1.5} />}
            label={t.contact.phoneLabel}
            value={clinic.phoneDisplay}
            note={`${t.hours[0].days} · ${t.hours[0].time}`}
            action={t.contact.actions.call}
          />
          <ChannelCard
            index={2}
            href={`mailto:${clinic.email}`}
            icon={<Mail className="h-5 w-5" strokeWidth={1.5} />}
            label={t.contact.emailLabel}
            value={clinic.email}
            note={t.contact.emailNote}
            action={t.contact.actions.mail}
          />
          <ChannelCard
            index={3}
            href={clinic.mapsDirections}
            external
            icon={<MapPin className="h-5 w-5" strokeWidth={1.5} />}
            label={t.contact.addressLabel}
            value={street}
            note={`${district} / ${city}`}
            action={t.contact.directions}
          />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pt-4 pb-28 sm:px-8">
        <div className="grid gap-4 lg:grid-cols-12">
          <FadeIn
            delay={0.06}
            className="rounded-3xl border border-line bg-foam p-6 shadow-[0_24px_60px_rgba(7,17,31,0.05)] sm:p-10 lg:col-span-7"
          >
            {formState === "success" ? (
              <div className="flex h-full min-h-[420px] flex-col items-start justify-center">
                <span className="grid h-14 w-14 place-items-center rounded-full border border-gold-400/60 bg-gold-200/50 text-gold-600">
                  <Check className="h-6 w-6" strokeWidth={1.5} />
                </span>
                <p className="mt-8 font-serif text-4xl text-navy-950">{t.contact.successTitle}</p>
                <p className="mt-4 max-w-md text-sm leading-7 text-muted">{t.contact.successBody}</p>
                <Button variant="line" className="mt-8" onClick={() => setFormState("idle")}>
                  {t.contact.newMessage}
                </Button>
              </div>
            ) : (
              <>
                <Eyebrow>{t.contact.formTitle}</Eyebrow>
                <h2 className="mt-5 font-serif text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.05] text-navy-950">
                  {t.contact.formHeading}
                </h2>
                <p className="mt-3 max-w-lg text-sm leading-7 text-muted">{t.contact.formLede}</p>

                <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      label={t.contact.name}
                      value={draft.fullName}
                      placeholder={t.contact.namePh}
                      autoComplete="name"
                      error={errors.fullName ? t.errors[errors.fullName] : undefined}
                      onChange={(value) => update("fullName", value)}
                    />
                    <Field
                      label={t.contact.phone}
                      type="tel"
                      value={draft.phone}
                      placeholder={t.contact.phonePh}
                      autoComplete="tel"
                      onChange={(value) => update("phone", value)}
                    />
                  </div>
                  <Field
                    label={t.contact.email}
                    type="email"
                    value={draft.email}
                    placeholder={t.contact.emailPh}
                    autoComplete="email"
                    error={errors.email ? t.errors[errors.email] : undefined}
                    onChange={(value) => update("email", value)}
                  />
                  <div>
                    <Field
                      label={t.contact.subject}
                      value={draft.subject}
                      placeholder={t.contact.subjectPh}
                      onChange={(value) => update("subject", value)}
                    />
                    <div className="mt-3 flex flex-wrap gap-2">
                      {t.contact.topics.map((topic) => {
                        const active = draft.subject === topic;
                        return (
                          <button
                            key={topic}
                            type="button"
                            aria-pressed={active}
                            onClick={() => update("subject", active ? "" : topic)}
                            className={cn(
                              "rounded-full border px-4 py-1.5 text-xs transition-colors duration-300",
                              active
                                ? "border-navy-950 bg-navy-950 text-foam"
                                : "border-line bg-paper text-muted hover:border-gold-500 hover:text-navy-950",
                            )}
                          >
                            {topic}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <label className="block">
                    <FieldLabel>{t.contact.message}</FieldLabel>
                    <textarea
                      value={draft.message}
                      placeholder={t.contact.messagePh}
                      rows={5}
                      onChange={(event) => update("message", event.target.value)}
                      className={cn(fieldClass, "resize-y rounded-2xl")}
                    />
                    {errors.message ? <ErrorText>{t.errors[errors.message]}</ErrorText> : null}
                  </label>
                  {formState === "error" ? <ErrorText>{t.contact.error}</ErrorText> : null}
                  <div className="flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="max-w-xs text-xs leading-6 text-muted">{t.contact.privacy}</p>
                    <Button type="submit" variant="dark" disabled={formState === "submitting"} className="group">
                      {formState === "submitting" ? t.contact.sending : t.contact.send}
                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45"
                        strokeWidth={1.75}
                      />
                    </Button>
                  </div>
                </form>
              </>
            )}
          </FadeIn>

          <div className="flex flex-col gap-4 lg:col-span-5">
            <FadeIn delay={0.12}>
              <div className="grain relative overflow-hidden rounded-3xl bg-navy-950 p-8 text-foam sm:p-10">
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full bg-gold-500/15 blur-3xl"
                />
                <div className="relative">
                  <Eyebrow light>{t.contact.visitEyebrow}</Eyebrow>
                  <address className="mt-5 not-italic">
                    {t.address.map((line) => (
                      <span key={line} className="block font-serif text-2xl leading-snug sm:text-[1.7rem]">
                        {line}
                      </span>
                    ))}
                  </address>
                  <div className="my-7 h-px bg-gradient-to-r from-gold-400/40 via-white/10 to-transparent" />
                  <p className="flex items-center gap-2 text-[10px] tracking-[0.28em] text-gold-300/80 uppercase">
                    <Clock className="h-3.5 w-3.5" strokeWidth={1.5} />
                    {t.contact.hoursLabel}
                  </p>
                  <ul className="mt-3 text-sm">
                    {t.hours.map((row, index) => (
                      <li key={row.days} className="flex items-baseline gap-3 py-2">
                        <span className={index === todayRow ? "text-foam" : "text-white/60"}>{row.days}</span>
                        {index === todayRow && (
                          <span className="rounded-full border border-gold-300/40 px-2 py-0.5 text-[9px] tracking-[0.2em] text-gold-300 uppercase">
                            {t.contact.today}
                          </span>
                        )}
                        <span aria-hidden className="flex-1 -translate-y-1 border-b border-dotted border-white/15" />
                        <span className={/\d/.test(row.time) ? "text-gold-300" : "text-white/40"}>{row.time}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 text-sm leading-6 text-white/55">
                    {status.open ? t.contact.openUntil : t.contact.closedNote}
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.18} className="flex flex-1">
              <div className="group relative min-h-[340px] w-full overflow-hidden rounded-3xl border border-line bg-foam">
                <iframe
                  title={t.contact.mapLabel}
                  src={clinic.mapsEmbed}
                  className="absolute inset-0 h-full w-full border-0 grayscale-[0.85] sepia-[0.25] transition-[filter] duration-700 group-hover:grayscale-0 group-hover:sepia-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="pointer-events-none absolute inset-x-3 top-3 flex items-center justify-between gap-3 rounded-2xl border border-white/70 bg-foam/90 py-3 pr-3 pl-5 shadow-[0_18px_40px_rgba(7,17,31,0.14)] backdrop-blur-md">
                  <div className="min-w-0">
                    <p className="text-[10px] tracking-[0.28em] text-gold-600 uppercase">{clinic.brand}</p>
                    <p className="truncate font-serif text-lg text-navy-950">{street}</p>
                  </div>
                  <a
                    href={clinic.mapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="pointer-events-auto inline-flex shrink-0 items-center gap-2 rounded-full bg-navy-950 px-4 py-2.5 text-[11px] font-medium tracking-[0.18em] text-foam uppercase transition-colors hover:bg-gold-500 hover:text-navy-950"
                  >
                    {t.contact.openMap}
                    <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </a>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-foam">
        <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8">
          <FadeIn className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <Eyebrow>{t.contact.travelEyebrow}</Eyebrow>
              <h2 className="mt-5 font-serif text-[clamp(2.4rem,4.5vw,3.6rem)] leading-[1] text-navy-950">
                {t.contact.travelTitle}
              </h2>
            </div>
            <p className="max-w-sm text-base leading-7 text-muted lg:col-span-4 lg:col-start-9 lg:justify-self-end">
              {t.contact.travelLede}
            </p>
          </FadeIn>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {t.contact.travel.map((item, index) => {
              const Icon = travelIcons[index] ?? MapPin;
              return (
                <FadeIn key={item.title} className="h-full" delay={index * 0.06}>
                  <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-paper p-8 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-gold-400/50 hover:shadow-[0_24px_50px_rgba(7,17,31,0.08)]">
                    <div className="flex items-start justify-between">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-gold-400/40 bg-gold-200/40 text-gold-600 transition-colors duration-500 group-hover:border-navy-950 group-hover:bg-navy-950 group-hover:text-gold-300">
                        <Icon className="h-5 w-5" strokeWidth={1.5} />
                      </span>
                      <span className="font-serif text-lg text-gold-400/60 transition-colors duration-500 group-hover:text-gold-500">
                        {pad(index + 1)}
                      </span>
                    </div>
                    <h3 className="mt-8 font-serif text-[1.75rem] leading-tight text-navy-950">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted">{item.body}</p>
                    <span
                      aria-hidden
                      className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-[width] duration-700 group-hover:w-full"
                    />
                  </article>
                </FadeIn>
              );
            })}
          </div>
          <FadeIn className="mt-12 flex justify-center" delay={0.1}>
            <CtaLink href="/appointment">{t.contact.book}</CtaLink>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}

function ChannelCard({
  index,
  href,
  external = false,
  featured = false,
  badge,
  icon,
  label,
  value,
  note,
  action,
}: {
  index: number;
  href: string;
  external?: boolean;
  featured?: boolean;
  badge?: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
  action: string;
}) {
  return (
    <FadeIn className="h-full" delay={index * 0.06}>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1",
          featured
            ? "grain border-navy-950 bg-navy-950 text-foam hover:shadow-[0_24px_50px_rgba(7,17,31,0.28)]"
            : "border-line bg-foam hover:border-gold-400/50 hover:shadow-[0_24px_50px_rgba(7,17,31,0.08)]",
        )}
      >
        <div className="relative flex items-start justify-between">
          <span
            className={cn(
              "grid h-12 w-12 place-items-center rounded-2xl border transition-colors duration-500",
              featured
                ? "border-gold-300/30 bg-white/[0.04] text-gold-300 group-hover:bg-gold-400 group-hover:text-navy-950"
                : "border-gold-400/40 bg-gold-200/40 text-gold-600 group-hover:border-navy-950 group-hover:bg-navy-950 group-hover:text-gold-300",
            )}
          >
            {icon}
          </span>
          {badge ? (
            <span className="rounded-full bg-gold-400 px-2.5 py-1 text-[9px] font-medium tracking-[0.2em] text-navy-950 uppercase">
              {badge}
            </span>
          ) : (
            <span className="font-serif text-lg text-gold-400/60 transition-colors duration-500 group-hover:text-gold-500">
              {pad(index + 1)}
            </span>
          )}
        </div>
        <p
          className={cn(
            "relative mt-7 text-[10px] font-medium tracking-[0.28em] uppercase",
            featured ? "text-gold-300/80" : "text-muted",
          )}
        >
          {label}
        </p>
        <p
          className={cn(
            "relative mt-2 font-serif text-[1.45rem] leading-tight break-words",
            featured ? "text-foam" : "text-navy-950",
          )}
        >
          {value}
        </p>
        <p className={cn("relative mt-2 text-sm leading-6", featured ? "text-white/60" : "text-muted")}>{note}</p>
        <span className="relative mt-auto pt-6">
          <span
            className={cn(
              "flex items-center justify-between border-t pt-4 text-[11px] font-medium tracking-[0.2em] uppercase",
              featured ? "border-white/10 text-gold-300" : "border-line text-navy-950",
            )}
          >
            {action}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.75} />
          </span>
        </span>
        <span
          aria-hidden
          className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-gold-500 to-gold-300 transition-[width] duration-700 group-hover:w-full"
        />
      </a>
    </FadeIn>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[10px] font-medium tracking-[0.24em] text-navy-950 uppercase">{children}</span>;
}

function ErrorText({ children }: { children: React.ReactNode }) {
  return <span className="mt-2 block text-sm text-[#8f3d3d]">{children}</span>;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
  error,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        onChange={(event) => onChange(event.target.value)}
        className={cn(fieldClass, "rounded-full", error && "border-[#8f3d3d]/50")}
      />
      {error ? <ErrorText>{error}</ErrorText> : null}
    </label>
  );
}
