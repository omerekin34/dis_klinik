import type { Locale, ServiceId } from "@/lib/content";

export type ContactChannel = "phone" | "whatsapp" | "email";
export type VisitorOrigin = "local" | "abroad";

/** Supabase `appointments` satırı ile birebir. */
export type AppointmentInsert = {
  service_id: ServiceId;
  appointment_date: string;
  appointment_time: string;
  full_name: string;
  phone: string;
  email: string;
  note: string | null;
  contact_channel: ContactChannel;
  visitor_origin: VisitorOrigin;
  locale: Locale;
  status: "pending";
  source: "website";
};

export type AppointmentDraft = {
  serviceId: ServiceId | null;
  date: string | null;
  time: string | null;
  fullName: string;
  phone: string;
  email: string;
  note: string;
  channel: ContactChannel;
  visitor: VisitorOrigin;
  consent: boolean;
};

export const emptyDraft = (): AppointmentDraft => ({
  serviceId: null,
  date: null,
  time: null,
  fullName: "",
  phone: "",
  email: "",
  note: "",
  channel: "whatsapp",
  visitor: "local",
  consent: false,
});

export type AppointmentErrors = Partial<{
  serviceId: "service";
  date: "date";
  time: "time";
  fullName: "name";
  phone: "phone";
  email: "email";
  consent: "consent";
}>;

export function toAppointmentInsert(
  draft: AppointmentDraft,
  locale: Locale,
): AppointmentInsert {
  if (!draft.serviceId || !draft.date || !draft.time) {
    throw new Error("Incomplete appointment draft");
  }

  return {
    service_id: draft.serviceId,
    appointment_date: draft.date,
    appointment_time: draft.time,
    full_name: draft.fullName.trim(),
    phone: draft.phone.trim(),
    email: draft.email.trim(),
    note: draft.note.trim() || null,
    contact_channel: draft.channel,
    visitor_origin: draft.visitor,
    locale,
    status: "pending",
    source: "website",
  };
}
