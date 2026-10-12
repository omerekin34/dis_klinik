export const clinic = {
  brand: "AUREUM",
  phoneDisplay: "+90 212 555 01 90",
  phoneTel: "+902125550190",
  whatsappNumber: "902125550190",
  email: "hello@aureum.dental",
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",
  mapsEmbed:
    "https://maps.google.com/maps?q=41.0522,28.9946&z=15&output=embed",
  mapsLink: "https://www.google.com/maps/search/?api=1&query=41.0522,28.9946",
  mapsDirections: "https://www.google.com/maps/dir/?api=1&destination=41.0522,28.9946",
} as const;

export function whatsappHref(message: string) {
  return `https://wa.me/${clinic.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Dictionary `hours` satırlarıyla aynı tutulmalı. */
const OPENING = { closedWeekday: "Sun", open: 9 * 60, close: 19 * 60 } as const;

const istanbulClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/Istanbul",
  weekday: "short",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export function clinicStatus(now: number) {
  const parts = Object.fromEntries(istanbulClock.formatToParts(now).map((part) => [part.type, part.value]));
  const minutes = Number(parts.hour) * 60 + Number(parts.minute);
  const closedDay = parts.weekday === OPENING.closedWeekday;
  return {
    open: !closedDay && minutes >= OPENING.open && minutes < OPENING.close,
    closedDay,
    time: `${parts.hour}:${parts.minute}`,
  };
}
