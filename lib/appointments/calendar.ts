const SLOT_MINUTES = 30;

function stamp(date: string, time: string, addMinutes = 0) {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);
  const value = new Date(year, month - 1, day, hours, minutes + addMinutes);
  const pad = (part: number) => String(part).padStart(2, "0");
  return `${value.getFullYear()}${pad(value.getMonth() + 1)}${pad(value.getDate())}T${pad(value.getHours())}${pad(value.getMinutes())}00`;
}

function escapeText(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/([,;])/g, "\\$1");
}

export function downloadAppointmentIcs({
  reference,
  date,
  time,
  title,
  description,
  location,
}: {
  reference: string;
  date: string;
  time: string;
  title: string;
  description: string;
  location: string;
}) {
  const now = new Date().toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Aureum//Appointment//TR",
    "BEGIN:VEVENT",
    `UID:${reference}@aureum.dental`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=Europe/Istanbul:${stamp(date, time)}`,
    `DTEND;TZID=Europe/Istanbul:${stamp(date, time, SLOT_MINUTES)}`,
    `SUMMARY:${escapeText(title)}`,
    `DESCRIPTION:${escapeText(description)}`,
    `LOCATION:${escapeText(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `aureum-${reference}.ics`;
  link.click();
  URL.revokeObjectURL(url);
}
