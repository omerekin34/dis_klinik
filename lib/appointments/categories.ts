import type { Localized, ServiceId } from "@/lib/content";

export type ServiceCategory = {
  id: string;
  label: Localized;
  serviceIds: ServiceId[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    id: "aesthetic",
    label: { tr: "Estetik", en: "Aesthetic" },
    serviceIds: ["estetik-dis-hekimligi", "dis-beyazlatma"],
  },
  {
    id: "orthodontics",
    label: { tr: "Ortodonti", en: "Orthodontics" },
    serviceIds: ["ortodonti", "telsiz-ortodonti", "invisalign-first"],
  },
  {
    id: "surgery",
    label: { tr: "Cerrahi & İmplant", en: "Surgery & implants" },
    serviceIds: ["dental-implant", "agiz-dis-cene-cerrahisi", "sedasyon"],
  },
  {
    id: "general",
    label: { tr: "Genel tedavi", en: "General care" },
    serviceIds: [
      "konservatif-dis-tedavisi",
      "endodonti",
      "periodontoloji",
      "dis-tasi-temizligi",
      "cene-eklem-tedavisi",
    ],
  },
  {
    id: "children",
    label: { tr: "Çocuk", en: "Children" },
    serviceIds: ["pedodonti", "invisalign-first"],
  },
];

export function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("tr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .trim();
}
