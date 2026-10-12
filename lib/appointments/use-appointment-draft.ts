"use client";

import { useCallback, useMemo, useState } from "react";
import { isUnavailable } from "@/lib/appointments/schedule";
import { submitAppointment } from "@/lib/appointments/submit";
import {
  emptyDraft,
  toAppointmentInsert,
  type AppointmentDraft,
  type AppointmentErrors,
  type ContactChannel,
  type VisitorOrigin,
} from "@/lib/appointments/types";
import { validateStep } from "@/lib/appointments/validate";
import type { Locale, ServiceId } from "@/lib/content";

export function useAppointmentDraft(locale: Locale, prefill: ServiceId | null = null) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [draft, setDraft] = useState<AppointmentDraft>(emptyDraft);
  const [errors, setErrors] = useState<AppointmentErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const resolved = useMemo<AppointmentDraft>(
    () => ({
      ...draft,
      serviceId: draft.serviceId ?? prefill,
    }),
    [draft, prefill],
  );

  const selectService = useCallback((serviceId: ServiceId) => {
    setDraft((current) => ({ ...current, serviceId }));
    setErrors((current) => ({ ...current, serviceId: undefined }));
  }, []);

  const selectDate = useCallback((date: string) => {
    setDraft((current) => ({
      ...current,
      date,
      time:
        current.time && !isUnavailable(date, current.time, new Date()) ? current.time : null,
    }));
    setErrors((current) => ({ ...current, date: undefined, time: undefined }));
  }, []);

  const selectTime = useCallback((time: string) => {
    setDraft((current) => ({ ...current, time }));
    setErrors((current) => ({ ...current, time: undefined }));
  }, []);

  const selectSlot = useCallback((date: string, time: string) => {
    setDraft((current) => ({ ...current, date, time }));
    setErrors((current) => ({ ...current, date: undefined, time: undefined }));
  }, []);

  const setField = useCallback(
    (field: "fullName" | "phone" | "email" | "note", value: string) => {
      setDraft((current) => ({ ...current, [field]: value }));
      if (field !== "note") {
        setErrors((current) => ({ ...current, [field]: undefined }));
      }
    },
    [],
  );

  const setChannel = useCallback((channel: ContactChannel) => {
    setDraft((current) => ({ ...current, channel }));
  }, []);

  const setVisitor = useCallback((visitor: VisitorOrigin) => {
    setDraft((current) => ({ ...current, visitor }));
  }, []);

  const setConsent = useCallback((consent: boolean) => {
    setDraft((current) => ({ ...current, consent }));
    setErrors((current) => ({ ...current, consent: undefined }));
  }, []);

  const next = useCallback(() => {
    const nextErrors = validateStep(step, resolved);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    setDirection(1);
    setStep((current) => Math.min(current + 1, 2));
  }, [resolved, step]);

  const back = useCallback(() => {
    setDirection(-1);
    setErrors({});
    setStep((current) => Math.max(current - 1, 0));
  }, []);

  /** Yalnızca tamamlanmış adımlara geri dönülebilir. */
  const goTo = useCallback(
    (target: number) => {
      if (target >= step) return;
      setDirection(-1);
      setErrors({});
      setStep(target);
    },
    [step],
  );

  const submit = useCallback(async () => {
    const nextErrors = validateStep(2, resolved);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const { id } = await submitAppointment(toAppointmentInsert(resolved, locale));
      setReference(id.slice(0, 8).toUpperCase());
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }, [resolved, locale]);

  const reset = useCallback(() => {
    setDraft(emptyDraft());
    setErrors({});
    setStep(0);
    setDirection(1);
    setStatus("idle");
    setReference(null);
  }, []);

  return {
    step,
    direction,
    draft: resolved,
    errors,
    status,
    reference,
    selectService,
    selectDate,
    selectTime,
    selectSlot,
    setField,
    setChannel,
    setVisitor,
    setConsent,
    next,
    back,
    goTo,
    submit,
    reset,
  };
}
