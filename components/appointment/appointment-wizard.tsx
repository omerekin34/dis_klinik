"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarPlus,
  Check,
  Clock,
  House,
  Mail,
  Phone,
  Plane,
  Search,
  Stethoscope,
  SunMedium,
  Sunset,
  UserRound,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { WhatsAppGlyph } from "@/components/brand/mark";
import { useLocale } from "@/components/providers/locale-provider";
import { serviceIcons } from "@/components/services/icons";
import { Button } from "@/components/ui/button";
import { CtaLink } from "@/components/ui/cta-link";
import { downloadAppointmentIcs } from "@/lib/appointments/calendar";
import { normalizeSearch, serviceCategories } from "@/lib/appointments/categories";
import { useClinicNow } from "@/lib/appointments/clock";
import {
  countOpenSlots,
  firstOpenSlot,
  formatDayParts,
  formatLongDate,
  isPastSlot,
  isSlotFull,
  listOpenDays,
  timeSlots,
} from "@/lib/appointments/schedule";
import type { ContactChannel, VisitorOrigin } from "@/lib/appointments/types";
import { useAppointmentDraft } from "@/lib/appointments/use-appointment-draft";
import { doctors, getService, isServiceId, services, tx, type ServiceId } from "@/lib/content";
import { cn } from "@/lib/cn";
import { clinic, whatsappHref } from "@/lib/site";
import { treatments } from "@/lib/treatments";

type Form = ReturnType<typeof useAppointmentDraft>;

const inputClass =
  "mt-2 w-full rounded-full border border-line bg-paper px-5 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-gold-500 focus:bg-foam";

const channelIcons: Record<ContactChannel, React.ReactNode> = {
  whatsapp: <WhatsAppGlyph className="h-3.5 w-3.5" />,
  phone: <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />,
  email: <Mail className="h-3.5 w-3.5" strokeWidth={1.75} />,
};

function doctorsFor(serviceId: ServiceId) {
  const ids = treatments.find((treatment) => treatment.id === serviceId)?.doctorIds ?? [];
  return doctors.filter((doctor) => ids.includes(doctor.id));
}

export function AppointmentWizard() {
  const params = useSearchParams();
  const { locale, t } = useLocale();
  const requested = params.get("service");
  const prefill = isServiceId(requested) ? requested : null;
  const form = useAppointmentDraft(locale, prefill);
  const now = new Date(useClinicNow());
  const days = listOpenDays(18, now);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const element = formRef.current;
    if (!element) return;
    const top = element.getBoundingClientRect().top;
    if (top < 0) window.scrollTo({ top: top + window.scrollY - 120, behavior: "smooth" });
  }, [form.step]);

  if (form.status === "success" && form.reference) {
    return <SuccessView form={form} />;
  }

  return (
    <main className="mx-auto min-h-[100svh] max-w-6xl px-5 pt-32 pb-24 sm:px-8">
      <header className="max-w-2xl">
        <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.appointment.eyebrow}</p>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] text-navy-950 sm:text-6xl">{t.appointment.title}</h1>
        <p className="mt-4 max-w-lg text-muted">{t.appointment.lede}</p>
      </header>

      <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
        <form
          ref={formRef}
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            if (form.step < 2) form.next();
            else void form.submit();
          }}
        >
          <StepIndicator form={form} />

          <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-foam p-5 sm:p-8">
            <p className="text-[10px] font-medium tracking-[0.28em] text-gold-600 uppercase">
              {t.appointment.stepCount} {form.step + 1} / 3
            </p>
            <h2 className="mt-2 font-serif text-3xl text-navy-950 sm:text-4xl">{t.appointment.stepTitles[form.step]}</h2>

            <AnimatePresence mode="wait" custom={form.direction}>
              <motion.div
                key={form.step}
                custom={form.direction}
                initial={{ opacity: 0, x: form.direction * 28 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: form.direction * -28 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-7"
              >
                {form.step === 0 && <ServiceStep form={form} />}
                {form.step === 1 && <TimeStep form={form} days={days} now={now} />}
                {form.step === 2 && <DetailsStep form={form} />}
              </motion.div>
            </AnimatePresence>

            {form.status === "error" ? <p className="mt-6 text-sm text-[#8f3d3d]">{t.appointment.error}</p> : null}
          </div>

          <div className="sticky bottom-0 z-10 -mx-5 mt-6 flex items-center justify-between gap-4 border-t border-line bg-paper/90 px-5 py-4 backdrop-blur-md sm:static sm:mx-0 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none">
            {form.step > 0 ? (
              <button
                type="button"
                onClick={form.back}
                className="text-[12px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-navy-950"
              >
                {t.appointment.back}
              </button>
            ) : (
              <span />
            )}
            <Button type="submit" variant="dark" disabled={form.status === "submitting"}>
              {form.step < 2 ? t.appointment.next : form.status === "submitting" ? t.appointment.submitting : t.appointment.submit}
            </Button>
          </div>
          <p className="mt-5 text-xs text-muted">{t.appointment.privacy}</p>
        </form>

        <Aside form={form} />
      </div>
    </main>
  );
}

function StepIndicator({ form }: { form: Form }) {
  const { t } = useLocale();

  return (
    <ol className="grid grid-cols-3 gap-3">
      {t.appointment.steps.map((label, index) => {
        const state = index < form.step ? "done" : index === form.step ? "current" : "upcoming";
        return (
          <li key={label}>
            <button
              type="button"
              disabled={state !== "done"}
              onClick={() => form.goTo(index)}
              className="group flex w-full items-center gap-2 text-left disabled:cursor-default"
            >
              <span
                className={cn(
                  "grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs transition-colors",
                  state === "upcoming" && "border border-line text-muted",
                  state === "current" && "bg-navy-950 text-gold-300",
                  state === "done" && "bg-gold-400 text-navy-950 group-hover:bg-gold-300",
                )}
              >
                {state === "done" ? <Check className="h-3.5 w-3.5" /> : index + 1}
              </span>
              <span
                className={cn(
                  "truncate text-[12px] tracking-[0.14em] uppercase",
                  state === "upcoming" ? "text-muted" : "text-ink",
                  state === "done" && "group-hover:text-gold-600",
                )}
              >
                {label}
              </span>
            </button>
            <div className="mt-3 h-px bg-line">
              <div className={cn("h-px bg-gold-500 transition-all duration-500", state === "upcoming" ? "w-0" : "w-full")} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ServiceStep({ form }: { form: Form }) {
  const { locale, t } = useLocale();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);

  const visible = useMemo(() => {
    const needle = normalizeSearch(query);
    const allowed = category ? serviceCategories.find((item) => item.id === category)?.serviceIds : null;
    return services.filter((service) => {
      if (allowed && !allowed.includes(service.id)) return false;
      if (!needle) return true;
      const haystack = normalizeSearch(`${service.name.tr} ${service.name.en} ${tx(service.summary, locale)}`);
      return haystack.includes(needle);
    });
  }, [query, category, locale]);

  return (
    <div>
      <label className="relative block">
        <span className="sr-only">{t.appointment.searchPh}</span>
        <Search className="pointer-events-none absolute top-1/2 left-5 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.75} />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t.appointment.searchPh}
          className={cn(inputClass, "mt-0 pl-12")}
        />
      </label>

      <div className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
        <Chip active={category === null} onClick={() => setCategory(null)}>
          {t.appointment.filterAll}
        </Chip>
        {serviceCategories.map((item) => (
          <Chip key={item.id} active={category === item.id} onClick={() => setCategory(item.id)}>
            {tx(item.label, locale)}
          </Chip>
        ))}
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {visible.map((service) => {
          const Icon = serviceIcons[service.icon];
          const selected = form.draft.serviceId === service.id;
          return (
            <button
              key={service.id}
              type="button"
              aria-pressed={selected}
              onClick={() => form.selectService(service.id)}
              className={cn(
                "relative flex gap-4 rounded-2xl border p-4 text-left transition-colors",
                selected ? "border-gold-500 bg-gold-200/40" : "border-line bg-paper hover:border-gold-400 hover:bg-foam",
              )}
            >
              <span
                className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors",
                  selected ? "bg-navy-950 text-gold-300" : "bg-gold-200 text-bronze",
                )}
              >
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
              <span className="min-w-0 flex-1 pr-6">
                <span className="block font-serif text-xl leading-tight text-navy-950">{tx(service.name, locale)}</span>
                <span className="mt-1 line-clamp-2 block text-[13px] leading-5 text-muted">{tx(service.summary, locale)}</span>
                <span className="mt-2 block text-[10px] tracking-[0.16em] text-gold-600 uppercase">
                  {tx(service.duration, locale)}
                </span>
              </span>
              <span
                className={cn(
                  "absolute top-4 right-4 grid h-5 w-5 place-items-center rounded-full border transition-colors",
                  selected ? "border-navy-950 bg-navy-950 text-gold-300" : "border-line",
                )}
              >
                {selected ? <Check className="h-3 w-3" /> : null}
              </span>
            </button>
          );
        })}
        {visible.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-line px-5 py-8 text-center text-sm text-muted sm:col-span-2">
            {t.appointment.noResults}
          </p>
        ) : null}
      </div>

      {form.errors.serviceId ? <p className="mt-4 text-sm text-[#8f3d3d]">{t.errors.service}</p> : null}
      <p className="mt-6 flex gap-3 text-[13px] leading-6 text-muted">
        <Stethoscope className="mt-1 h-4 w-4 shrink-0 text-gold-600" strokeWidth={1.75} />
        {t.appointment.notSure}
      </p>
    </div>
  );
}

function TimeStep({ form, days, now }: { form: Form; days: string[]; now: Date }) {
  const { locale, t } = useLocale();
  const first = firstOpenSlot(days, now);
  const slots = timeSlots();
  const groups = [
    { label: t.appointment.morning, icon: SunMedium, slots: slots.filter((slot) => slot < "13:00") },
    { label: t.appointment.afternoon, icon: Sunset, slots: slots.filter((slot) => slot >= "13:00") },
  ];
  const firstIsSelected = first && form.draft.date === first.date && form.draft.time === first.time;

  return (
    <div>
      {first && !firstIsSelected ? (
        <div className="flex flex-col gap-4 rounded-2xl bg-navy-950 p-5 text-foam sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-400 text-navy-950">
              <Clock className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <div>
              <p className="text-[10px] tracking-[0.28em] text-gold-300 uppercase">{t.appointment.firstAvailable}</p>
              <p className="mt-1 font-serif text-xl">
                {formatLongDate(first.date, locale)} · {first.time}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => form.selectSlot(first.date, first.time)}
            className="self-start rounded-full bg-gold-400 px-5 py-2.5 text-[11px] font-medium tracking-[0.18em] text-navy-950 uppercase transition-colors hover:bg-gold-300 sm:self-auto"
          >
            {t.appointment.firstAvailableCta}
          </button>
        </div>
      ) : null}

      <p className="mt-8 text-[10px] font-medium tracking-[0.28em] text-navy-950 uppercase">{t.appointment.days}</p>
      <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
        {days.map((day) => {
          const parts = formatDayParts(day, locale);
          const open = countOpenSlots(day, now);
          const selected = form.draft.date === day;
          return (
            <button
              key={day}
              type="button"
              disabled={open === 0}
              aria-pressed={selected}
              onClick={() => form.selectDate(day)}
              className={cn(
                "rounded-xl border px-2 py-3 text-center transition-colors",
                selected && "border-navy-950 bg-navy-950 text-foam",
                !selected && open > 0 && "border-line bg-paper text-ink hover:border-gold-400",
                open === 0 && "cursor-not-allowed border-line bg-paper text-muted/50",
              )}
            >
              <span className={cn("block text-[10px] tracking-[0.14em] uppercase", selected ? "text-gold-300" : "text-muted")}>
                {parts.weekday}
              </span>
              <span className="mt-0.5 block font-serif text-3xl leading-none">{parts.day}</span>
              <span className="mt-1 block text-[10px] uppercase">{parts.month}</span>
              <span
                className={cn(
                  "mt-2 block text-[10px] tracking-[0.08em]",
                  selected ? "text-gold-200" : open === 0 ? "text-muted/50" : "text-gold-600",
                )}
              >
                {open === 0 ? t.appointment.dayFull : `${open} ${t.appointment.openCount}`}
              </span>
            </button>
          );
        })}
      </div>
      {form.errors.date ? <p className="mt-3 text-sm text-[#8f3d3d]">{t.errors.date}</p> : null}
      <p className="mt-3 text-xs text-muted">{t.appointment.scheduleNote}</p>

      <p className="mt-8 text-[10px] font-medium tracking-[0.28em] text-navy-950 uppercase">{t.appointment.times}</p>
      {form.draft.date ? (
        <div className="mt-3 space-y-5">
          {groups.map((group) => (
            <div key={group.label}>
              <p className="flex items-center gap-2 text-[12px] text-muted">
                <group.icon className="h-3.5 w-3.5 text-gold-600" strokeWidth={1.75} />
                {group.label}
              </p>
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-5">
                {group.slots.map((slot) => {
                  const past = isPastSlot(form.draft.date!, slot, now);
                  const full = !past && isSlotFull(form.draft.date!, slot);
                  const disabled = past || full;
                  const selected = form.draft.time === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      disabled={disabled}
                      aria-pressed={selected}
                      onClick={() => form.selectTime(slot)}
                      title={disabled ? (past ? t.appointment.past : t.appointment.full) : undefined}
                      className={cn(
                        "rounded-xl border py-2.5 text-sm transition-colors",
                        selected && "border-navy-950 bg-navy-950 text-foam",
                        !selected && !disabled && "border-line bg-paper hover:border-gold-400",
                        disabled && "cursor-not-allowed border-line/60 text-muted/40 line-through",
                      )}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 rounded-2xl border border-dashed border-line px-5 py-6 text-sm text-muted">{t.appointment.pickDate}</p>
      )}
      {form.errors.time ? <p className="mt-3 text-sm text-[#8f3d3d]">{t.errors.time}</p> : null}
    </div>
  );
}

function DetailsStep({ form }: { form: Form }) {
  const { locale, t } = useLocale();
  const { draft } = form;

  return (
    <div>
      {draft.serviceId && draft.date && draft.time ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-paper px-5 py-4 text-sm lg:hidden">
          <p>
            <span className="text-[10px] tracking-[0.2em] text-gold-600 uppercase">{t.appointment.summary}</span>
            <span className="mt-1 block text-ink">
              {tx(getService(draft.serviceId).name, locale)} · {formatLongDate(draft.date, locale)} · {draft.time}
            </span>
          </p>
          <button type="button" onClick={() => form.goTo(1)} className="text-[11px] tracking-[0.16em] text-gold-600 uppercase">
            {t.appointment.edit}
          </button>
        </div>
      ) : null}

      <div className="mt-6 space-y-5 lg:mt-0">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label={t.contact.name}
            value={draft.fullName}
            placeholder={t.contact.namePh}
            error={form.errors.fullName ? t.errors.name : undefined}
            onChange={(value) => form.setField("fullName", value)}
            autoComplete="name"
          />
          <Field
            label={t.contact.phone}
            type="tel"
            value={draft.phone}
            placeholder={t.contact.phonePh}
            error={form.errors.phone ? t.errors.phone : undefined}
            onChange={(value) => form.setField("phone", value)}
            autoComplete="tel"
          />
        </div>
        <Field
          label={t.contact.email}
          type="email"
          value={draft.email}
          placeholder={t.contact.emailPh}
          error={form.errors.email ? t.errors.email : undefined}
          onChange={(value) => form.setField("email", value)}
          autoComplete="email"
        />

        <fieldset>
          <legend>
            <FieldLabel>{t.appointment.channelLabel}</FieldLabel>
          </legend>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {(["whatsapp", "phone", "email"] as ContactChannel[]).map((channel) => (
              <Segment key={channel} active={draft.channel === channel} onClick={() => form.setChannel(channel)}>
                {channelIcons[channel]}
                {t.appointment.channels[channel]}
              </Segment>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <FieldLabel>{t.appointment.visitorLabel}</FieldLabel>
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {(["local", "abroad"] as VisitorOrigin[]).map((visitor) => (
              <Segment key={visitor} active={draft.visitor === visitor} onClick={() => form.setVisitor(visitor)}>
                {visitor === "local" ? (
                  <House className="h-3.5 w-3.5" strokeWidth={1.75} />
                ) : (
                  <Plane className="h-3.5 w-3.5" strokeWidth={1.75} />
                )}
                {t.appointment.visitors[visitor]}
              </Segment>
            ))}
          </div>
          {draft.visitor === "abroad" ? (
            <p className="mt-3 rounded-2xl bg-gold-200/50 px-4 py-3 text-[13px] leading-6 text-ink">{t.appointment.abroadHint}</p>
          ) : null}
        </fieldset>

        <label className="block">
          <FieldLabel>{t.appointment.note}</FieldLabel>
          <textarea
            value={draft.note}
            placeholder={t.appointment.notePh}
            rows={3}
            onChange={(event) => form.setField("note", event.target.value)}
            className="mt-2 w-full resize-y rounded-2xl border border-line bg-paper px-5 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink/35 focus:border-gold-500 focus:bg-foam"
          />
        </label>

        <div>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={draft.consent}
              onChange={(event) => form.setConsent(event.target.checked)}
              className="peer sr-only"
            />
            <span
              aria-hidden
              className={cn(
                "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md border transition-colors peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-500",
                draft.consent ? "border-navy-950 bg-navy-950 text-gold-300" : "border-line bg-paper",
              )}
            >
              {draft.consent ? <Check className="h-3 w-3" /> : null}
            </span>
            <span className="text-[13px] leading-6 text-muted">{t.appointment.consent}</span>
          </label>
          {form.errors.consent ? <p className="mt-2 text-sm text-[#8f3d3d]">{t.errors.consent}</p> : null}
        </div>
      </div>
    </div>
  );
}

function Aside({ form }: { form: Form }) {
  const { locale, t } = useLocale();
  const { draft } = form;
  const service = draft.serviceId ? getService(draft.serviceId) : null;
  const team = draft.serviceId ? doctorsFor(draft.serviceId) : [];
  const Icon = service ? serviceIcons[service.icon] : Stethoscope;

  const rows: { label: string; value: string | null; step: number }[] = [
    { label: t.appointment.asideDoctor, value: team.length ? team.map((doctor) => doctor.name).join(", ") : null, step: 0 },
    { label: t.appointment.asideDuration, value: service ? tx(service.duration, locale) : null, step: 0 },
    { label: t.appointment.asideDate, value: draft.date ? formatLongDate(draft.date, locale) : null, step: 1 },
    { label: t.appointment.asideTime, value: draft.time, step: 1 },
    { label: t.appointment.asideContact, value: form.step === 2 ? t.appointment.channels[draft.channel] : null, step: 2 },
  ];

  return (
    <aside className="space-y-4 lg:sticky lg:top-28">
      <div className="rounded-2xl bg-navy-950 p-6 text-foam">
        <p className="text-[10px] tracking-[0.28em] text-gold-300 uppercase">{t.appointment.asideTitle}</p>
        <div className="mt-5 flex items-center gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold-400 text-navy-950">
            <Icon className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="text-[10px] tracking-[0.2em] text-white/45 uppercase">{t.appointment.asideTreatment}</p>
            <p className={cn("font-serif text-2xl leading-tight", service ? "text-foam" : "text-white/35")}>
              {service ? tx(service.name, locale) : t.appointment.asideEmpty}
            </p>
          </div>
        </div>
        <dl className="mt-6 divide-y divide-white/10 border-t border-white/10">
          {rows.map((row) => (
            <div key={row.label} className="flex items-baseline justify-between gap-4 py-3">
              <dt className="shrink-0 text-[10px] tracking-[0.2em] text-white/45 uppercase">{row.label}</dt>
              <dd className="text-right text-sm">
                {row.value ? (
                  row.step < form.step ? (
                    <button
                      type="button"
                      onClick={() => form.goTo(row.step)}
                      className="text-foam underline-offset-4 transition-colors hover:text-gold-300 hover:underline"
                    >
                      {row.value}
                    </button>
                  ) : (
                    <span className="text-foam">{row.value}</span>
                  )
                ) : (
                  <span className="text-white/30">—</span>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="rounded-2xl border border-line bg-foam p-6">
        <p className="text-[10px] font-medium tracking-[0.28em] text-gold-600 uppercase">{t.appointment.afterTitle}</p>
        <ol className="mt-4 space-y-4">
          {t.appointment.afterSteps.map((step, index) => (
            <li key={step} className="flex gap-3 text-[13px] leading-6 text-muted">
              <span className="font-serif text-xl leading-6 text-gold-500">0{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>
      </div>

      <div className="rounded-2xl border border-line bg-foam p-6">
        <p className="font-serif text-2xl text-navy-950">{t.appointment.helpTitle}</p>
        <p className="mt-2 text-[13px] leading-6 text-muted">{t.appointment.helpBody}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <a
            href={`tel:${clinic.phoneTel}`}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-line py-3 text-[11px] font-medium tracking-[0.16em] text-navy-950 uppercase transition-colors hover:border-gold-500"
          >
            <Phone className="h-3.5 w-3.5" strokeWidth={1.75} />
            {t.appointment.call}
          </a>
          <a
            href={whatsappHref(t.appointment.whatsappMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-navy-950 py-3 text-[11px] font-medium tracking-[0.16em] text-foam uppercase transition-colors hover:bg-navy-800"
          >
            <WhatsAppGlyph className="h-3.5 w-3.5" />
            {t.appointment.whatsapp}
          </a>
        </div>
        <ul className="mt-5 space-y-1 border-t border-line pt-4 text-[12px] text-muted">
          {t.hours.map((row) => (
            <li key={row.days} className="flex justify-between gap-3">
              <span>{row.days}</span>
              <span className="text-ink">{row.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

function SuccessView({ form }: { form: Form }) {
  const { locale, t } = useLocale();
  const { draft, reference } = form;

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  if (!draft.serviceId || !draft.date || !draft.time || !reference) return null;

  const service = getService(draft.serviceId);
  const serviceName = tx(service.name, locale);
  const longDate = formatLongDate(draft.date, locale);
  const code = `AU-${reference}`;
  const team = doctorsFor(draft.serviceId);
  const address = t.address.join(", ");
  const confirmMessage = `${t.appointment.whatsappMessage}\n${t.appointment.reference}: ${code}\n${serviceName} · ${longDate} · ${draft.time}`;

  return (
    <main className="mx-auto grid min-h-[100svh] max-w-6xl items-center gap-12 px-5 py-32 sm:px-8 lg:grid-cols-[minmax(0,1fr)_400px]">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-gold-400 text-navy-950">
          <Check className="h-5 w-5" />
        </span>
        <p className="mt-8 text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.appointment.eyebrow}</p>
        <h1 className="mt-3 font-serif text-5xl leading-[0.95] text-navy-950 sm:text-6xl">{t.appointment.successTitle}</h1>
        <p className="mt-5 max-w-md text-muted">{t.appointment.successBody}</p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <Button
            variant="dark"
            onClick={() =>
              downloadAppointmentIcs({
                reference: code,
                date: draft.date!,
                time: draft.time!,
                title: `${t.appointment.calendarTitle} · ${serviceName}`,
                description: `${t.appointment.calendarNote}\n${t.appointment.reference}: ${code}\n${clinic.phoneDisplay}`,
                location: address,
              })
            }
          >
            <CalendarPlus className="h-4 w-4" strokeWidth={1.75} />
            {t.appointment.addCalendar}
          </Button>
          <a
            href={whatsappHref(confirmMessage)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-7 py-3.5 text-[12px] font-medium tracking-[0.18em] text-ink uppercase transition-colors hover:border-gold-500"
          >
            <WhatsAppGlyph className="h-4 w-4" />
            {t.appointment.whatsappConfirm}
          </a>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={form.reset}
            className="text-[12px] tracking-[0.16em] text-muted uppercase transition-colors hover:text-navy-950"
          >
            {t.appointment.again}
          </button>
          <CtaLink href="/">{t.appointment.home}</CtaLink>
        </div>
        <p className="mt-10 max-w-md text-xs leading-6 text-muted">{t.appointment.demoNote}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="rounded-2xl bg-navy-950 p-7 text-foam"
      >
        <p className="text-[10px] tracking-[0.28em] text-gold-300 uppercase">{t.appointment.reference}</p>
        <p className="mt-2 font-serif text-4xl tracking-wide">{code}</p>
        <dl className="mt-7 space-y-4 border-t border-dashed border-white/15 pt-6 text-sm">
          <TicketRow icon={<Stethoscope className="h-4 w-4" strokeWidth={1.75} />} label={t.appointment.asideTreatment} value={serviceName} />
          {team.length ? (
            <TicketRow
              icon={<UserRound className="h-4 w-4" strokeWidth={1.75} />}
              label={t.appointment.asideDoctor}
              value={team.map((doctor) => doctor.name).join(", ")}
            />
          ) : null}
          <TicketRow icon={<CalendarPlus className="h-4 w-4" strokeWidth={1.75} />} label={t.appointment.asideDate} value={longDate} />
          <TicketRow icon={<Clock className="h-4 w-4" strokeWidth={1.75} />} label={t.appointment.asideTime} value={draft.time} />
          <TicketRow icon={channelIcons[draft.channel]} label={t.appointment.asideContact} value={t.appointment.channels[draft.channel]} />
        </dl>
        <p className="mt-7 border-t border-dashed border-white/15 pt-5 text-[12px] leading-6 text-white/55">{address}</p>
      </motion.div>
    </main>
  );
}

function TicketRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 text-gold-300">{icon}</span>
      <div>
        <dt className="text-[10px] tracking-[0.2em] text-white/45 uppercase">{label}</dt>
        <dd className="mt-0.5 text-foam">{value}</dd>
      </div>
    </div>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-[11px] tracking-[0.14em] whitespace-nowrap uppercase transition-colors",
        active ? "border-navy-950 bg-navy-950 text-gold-300" : "border-line bg-paper text-muted hover:border-gold-400 hover:text-ink",
      )}
    >
      {children}
    </button>
  );
}

function Segment({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full border px-3 py-3 text-[12px] transition-colors",
        active ? "border-navy-950 bg-navy-950 text-foam" : "border-line bg-paper text-ink hover:border-gold-400",
      )}
    >
      {children}
    </button>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className="text-[10px] font-medium tracking-[0.24em] text-navy-950 uppercase">{children}</span>;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  error,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  error?: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        type={type}
        value={value}
        autoComplete={autoComplete}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={inputClass}
      />
      {error ? <span className="mt-2 block text-sm text-[#8f3d3d]">{error}</span> : null}
    </label>
  );
}

export function AppointmentFallback() {
  return <div className="min-h-[100svh] bg-paper" />;
}
