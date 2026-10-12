import type { Locale } from "@/lib/content";

const CLOSED_WEEKDAYS = [0];

export function toISODate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function listOpenDays(count: number, from: Date) {
  const days: string[] = [];
  const cursor = new Date(from);
  cursor.setHours(12, 0, 0, 0);

  while (days.length < count) {
    if (!CLOSED_WEEKDAYS.includes(cursor.getDay())) {
      days.push(toISODate(cursor));
    }
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}

export function timeSlots() {
  const slots: string[] = [];
  for (let minutes = 9 * 60; minutes <= 18 * 60 + 30; minutes += 30) {
    const hours = String(Math.floor(minutes / 60)).padStart(2, "0");
    const mins = String(minutes % 60).padStart(2, "0");
    const slot = `${hours}:${mins}`;
    if (slot >= "13:00" && slot < "14:00") continue;
    slots.push(slot);
  }
  return slots;
}

export function isPastSlot(date: string, time: string, now: Date) {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const slot = new Date(year, month - 1, day, hours, minutes, 0, 0);
  return slot.getTime() < now.getTime();
}

/** Demo doluluk. Supabase uygunluk sorgusu bunun yerine geçer. */
export function isSlotFull(date: string, time: string) {
  let hash = 0;
  const key = `${date}${time}`;
  for (let index = 0; index < key.length; index += 1) {
    hash = (hash * 31 + key.charCodeAt(index)) >>> 0;
  }
  return hash % 5 === 0;
}

export function isUnavailable(date: string, time: string, now: Date) {
  return isPastSlot(date, time, now) || isSlotFull(date, time);
}

export function countOpenSlots(date: string, now: Date) {
  return timeSlots().filter((slot) => !isUnavailable(date, slot, now)).length;
}

export function firstOpenSlot(days: string[], now: Date) {
  const slots = timeSlots();
  for (const date of days) {
    const time = slots.find((slot) => !isUnavailable(date, slot, now));
    if (time) return { date, time };
  }
  return null;
}

export function formatDayParts(iso: string, locale: Locale) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  const loc = locale === "tr" ? "tr-TR" : "en-GB";
  return {
    weekday: new Intl.DateTimeFormat(loc, { weekday: "short" }).format(date),
    day: String(day),
    month: new Intl.DateTimeFormat(loc, { month: "short" }).format(date),
  };
}

export function formatLongDate(iso: string, locale: Locale) {
  const [year, month, day] = iso.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  return new Intl.DateTimeFormat(locale === "tr" ? "tr-TR" : "en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(date);
}
