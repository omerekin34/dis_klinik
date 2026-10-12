import { isUnavailable } from "@/lib/appointments/schedule";
import type {
  AppointmentDraft,
  AppointmentErrors,
} from "@/lib/appointments/types";

export function validateStep(step: number, draft: AppointmentDraft) {
  const errors: AppointmentErrors = {};

  if (step === 0 && !draft.serviceId) {
    errors.serviceId = "service";
  }

  if (step === 1) {
    if (!draft.date) errors.date = "date";
    if (!draft.time) errors.time = "time";
    if (draft.date && draft.time && isUnavailable(draft.date, draft.time, new Date())) {
      errors.time = "time";
    }
  }

  if (step === 2) {
    if (draft.fullName.trim().length < 2) errors.fullName = "name";
    const digits = draft.phone.replace(/\D/g, "");
    if (digits.length < 8 || digits.length > 15) errors.phone = "phone";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) {
      errors.email = "email";
    }
    if (!draft.consent) errors.consent = "consent";
  }

  return errors;
}
