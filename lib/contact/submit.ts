import type { Locale } from "@/lib/content";

/** Supabase `contact_messages` satırı ile birebir. */
export type ContactInsert = {
  full_name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  locale: Locale;
  status: "new";
  source: "website";
};

export type ContactDraft = {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

export type ContactErrors = Partial<{
  fullName: "name";
  email: "email";
  message: "message";
}>;

const STORAGE_KEY = "aureum.messages";

export function validateContact(draft: ContactDraft) {
  const errors: ContactErrors = {};
  if (draft.fullName.trim().length < 2) errors.fullName = "name";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email.trim())) errors.email = "email";
  if (draft.message.trim().length < 10) errors.message = "message";
  return errors;
}

export function toContactInsert(draft: ContactDraft, locale: Locale): ContactInsert {
  return {
    full_name: draft.fullName.trim(),
    email: draft.email.trim(),
    phone: draft.phone.trim() || null,
    subject: draft.subject.trim() || null,
    message: draft.message.trim(),
    locale,
    status: "new",
    source: "website",
  };
}

/**
 * Supabase bağlanınca:
 * supabase.from("contact_messages").insert(payload)
 */
export async function submitContact(payload: ContactInsert) {
  await new Promise((resolve) => setTimeout(resolve, 700));
  const id = crypto.randomUUID();
  try {
    const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown[];
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id, ...payload, created_at: new Date().toISOString() }, ...previous].slice(0, 50)),
    );
  } catch {
    // Depolama kapalıysa demo yine başarılı döner.
  }
  return { id };
}
