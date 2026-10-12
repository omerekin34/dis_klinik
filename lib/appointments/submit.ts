import type { AppointmentInsert } from "@/lib/appointments/types";

const STORAGE_KEY = "aureum.appointments";

/**
 * Supabase bağlanınca bu gövde değişir:
 *
 * const { data, error } = await supabase
 *   .from("appointments")
 *   .insert(payload)
 *   .select("id")
 *   .single();
 * if (error) throw error;
 * return { id: data.id };
 */
export async function submitAppointment(payload: AppointmentInsert) {
  await new Promise((resolve) => setTimeout(resolve, 800));

  const id = crypto.randomUUID();
  const row = { id, ...payload, created_at: new Date().toISOString() };

  try {
    const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]") as unknown[];
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([row, ...previous].slice(0, 50)),
    );
  } catch {
    // Depolama kapalıysa demo yine bir referans döner.
  }

  return { id };
}
