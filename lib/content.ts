import type { ServiceId } from "@/lib/treatments";

export type Locale = "tr" | "en";

export type Localized = {
  tr: string;
  en: string;
};

export function tx(value: Localized, locale: Locale) {
  return value[locale];
}

export type { Service, ServiceIcon, ServiceId } from "@/lib/treatments";
export { getService, isServiceId, services } from "@/lib/treatments";

export type Doctor = {
  id: string;
  name: string;
  initials: string;
  photo: string;
  tone: "navy" | "bronze" | "slate";
  role: Localized;
  focus: Localized;
  bio: Localized;
};

export const doctors: Doctor[] = [
  {
    id: "selin-acar",
    name: "Dr. Selin Acar",
    initials: "SA",
    photo: "/doctors/selin.jpg",
    tone: "navy",
    role: { tr: "Estetik diş hekimi", en: "Aesthetic dentist" },
    focus: { tr: "Gülüş planı, lamina, beyazlatma", en: "Smile planning, veneers, whitening" },
    bio: {
      tr: "Gülüşü yüz oranı ve diş eti çizgisinden kurar. Lamina, zirkonyum ve beyazlatmanın hangi sırayla geleceğine o karar verir.",
      en: "She builds a smile from facial proportion and the gum line, and decides the order of veneers, zirconia and whitening.",
    },
  },
  {
    id: "kerem-yilmaz",
    name: "Dr. Kerem Yılmaz",
    initials: "KY",
    photo: "/doctors/kerem.jpg",
    tone: "bronze",
    role: { tr: "Ağız, diş ve çene cerrahı", en: "Oral surgeon" },
    focus: { tr: "İmplant, gömük diş, sedasyon", en: "Implants, impacted teeth, sedation" },
    bio: {
      tr: "İmplantı ve gömük dişi tomografi üzerinden planlar. Uzun cerrahide sedasyonu, işlemin yanına ayrı bir güvenlik adımı olarak koyar.",
      en: "He plans implants and impacted teeth from the scan, and places sedation beside a long surgery as its own safety step.",
    },
  },
  {
    id: "elif-demir",
    name: "Dr. Elif Demir",
    initials: "ED",
    photo: "/doctors/elif.jpg",
    tone: "slate",
    role: { tr: "Restoratif diş hekimi", en: "Restorative dentist" },
    focus: { tr: "Dolgu, inley, dişin kendi dokusu", en: "Fillings, inlays, keeping tooth tissue" },
    bio: {
      tr: "Çürüğü, dişi küçültmeden kapatır. Kompozitin rengini ve kenarını, komşu dişin ışığına göre katman katman kurar.",
      en: "She closes decay without reducing the tooth, and layers composite colour and edge to the light of the neighbouring tooth.",
    },
  },
  {
    id: "deniz-kaya",
    name: "Dr. Deniz Kaya",
    initials: "DK",
    photo: "/doctors/deniz.jpg",
    tone: "navy",
    role: { tr: "Ortodontist", en: "Orthodontist" },
    focus: { tr: "Tel, şeffaf plak, Invisalign First", en: "Braces, clear aligners, Invisalign First" },
    bio: {
      tr: "Kapanışı tel ya da plakla planlar. Çocuktaki erken faz ile erişkindeki hizalamayı aynı ölçüm diliyle ayırır.",
      en: "She plans the bite with braces or aligners, and separates a child’s early phase from adult alignment in the same language of measurement.",
    },
  },
  {
    id: "ayse-nur-koc",
    name: "Dr. Ayşe Nur Koç",
    initials: "AK",
    photo: "/doctors/ayse-nur.jpg",
    tone: "bronze",
    role: { tr: "Pedodontist", en: "Paediatric dentist" },
    focus: { tr: "Süt dişi, fissür örtücü, çocuk plağı", en: "Baby teeth, sealants, children’s aligners" },
    bio: {
      tr: "İlk dişi, düşecek diye bırakmaz. Çocuğun seansını yaşına böler; Invisalign First vakalarında ortodontistle birlikte durur.",
      en: "She does not leave a first tooth because it will fall out. She divides a child’s visit by age, and stands with the orthodontist on Invisalign First cases.",
    },
  },
  {
    id: "leyla-sen",
    name: "Dr. Leyla Şen",
    initials: "LŞ",
    photo: "/doctors/leyla-sen.jpg",
    tone: "slate",
    role: { tr: "Endodontist", en: "Endodontist" },
    focus: { tr: "Kanal tedavisi, mikroskop", en: "Root canal treatment, microscope" },
    bio: {
      tr: "Kök kanallarını mikroskop altında temizler. Dişi çekmeden önce, kanalın gerçekten bitip bitmediğini filmle kapatır.",
      en: "She cleans root canals under a microscope, and closes the question of whether a canal is truly finished on a radiograph before a tooth is extracted.",
    },
  },
  {
    id: "mert-aslan",
    name: "Dr. Mert Aslan",
    initials: "MA",
    photo: "/doctors/mert.jpg",
    tone: "navy",
    role: { tr: "Periodontolog", en: "Periodontist" },
    focus: { tr: "Diş eti, diş taşı, bakım", en: "Gums, calculus, maintenance" },
    bio: {
      tr: "Kanayan diş etini ölçmeden tedavi etmez. Taş temizliğini, kemik kaybı varsa periodontal bakımın önüne koyar.",
      en: "He does not treat a bleeding gum without measuring it, and he puts a scale and polish in front of periodontal maintenance when bone has already been lost.",
    },
  },
  {
    id: "caner-usta",
    name: "Dr. Caner Usta",
    initials: "CU",
    photo: "/doctors/caner-usta.jpg",
    tone: "bronze",
    role: { tr: "Çene eklemi hekimi", en: "Jaw joint clinician" },
    focus: { tr: "Splint, kas ağrısı, kapanış", en: "Splints, muscle pain, the bite" },
    bio: {
      tr: "Çene ağrısını önce kas ve splint ile ele alır. Dişi küçültmeyi, ağrı susmadan konuşmaz.",
      en: "He meets jaw pain first with the muscle and a splint. He does not discuss reducing a tooth until the pain is quiet.",
    },
  },
];

export type Technology = {
  icon: "sparkles" | "scan" | "microscope" | "layers" | "bone" | "shield";
  title: Localized;
  body: Localized;
};

export const technologies: Technology[] = [
  {
    icon: "sparkles",
    title: { tr: "Dijital gülüş", en: "Digital smile" },
    body: {
      tr: "Fotoğraf ve tarama üzerinden bitiş, tedaviye başlamadan konuşulur.",
      en: "The finish is discussed from photographs and a scan before treatment begins.",
    },
  },
  {
    icon: "scan",
    title: { tr: "3D tomografi", en: "3D tomography" },
    body: {
      tr: "Kemik ve sinüs ilişkisi, implant öncesi tek karede netleşir.",
      en: "Bone and sinus relationships are settled in one view before an implant.",
    },
  },
  {
    icon: "microscope",
    title: { tr: "Mikroskop", en: "Microscope" },
    body: {
      tr: "Kenar ve bitiş detayları büyütme altında ilerler.",
      en: "Margins and finish lines are worked under magnification.",
    },
  },
  {
    icon: "layers",
    title: { tr: "CAD/CAM", en: "CAD/CAM" },
    body: {
      tr: "Kron ve geçiciler klinikte, aynı gün içinde üretilir.",
      en: "Crowns and temporaries are milled in the clinic, often the same day.",
    },
  },
  {
    icon: "bone",
    title: { tr: "Cerrahi rehber", en: "Surgical guide" },
    body: {
      tr: "İmplant konumu dijital plandan sahaya aynı açıyla iner.",
      en: "Implant position moves from the digital plan to the mouth at the same angle.",
    },
  },
  {
    icon: "shield",
    title: { tr: "Steril protokol", en: "Sterile protocol" },
    body: {
      tr: "Her ünite için kayıtlı bir sterilizasyon döngüsü tutulur.",
      en: "Each surgery keeps a recorded sterilisation cycle.",
    },
  },
];

export type ClinicRoom = {
  id: string;
  image: string;
  area: Localized;
  title: Localized;
  body: Localized;
  treatmentIds: ServiceId[];
};

export const clinicRooms: ClinicRoom[] = [
  {
    id: "reception",
    image: "/clinic/reception.jpg",
    area: { tr: "Giriş katı", en: "Ground floor" },
    title: { tr: "Karşılama & Resepsiyon", en: "Reception" },
    body: {
      tr: "Kapıdan girdiğiniz ilk an. Kaydınız, dosyanız ve günün programı burada hazır sizi bekler.",
      en: "The first moment through the door. Your file and the day’s programme are ready here.",
    },
    treatmentIds: [],
  },
  {
    id: "lounge",
    image: "/clinic/lounge.jpg",
    area: { tr: "Giriş katı", en: "Ground floor" },
    title: { tr: "Misafir Salonu", en: "Guest lounge" },
    body: {
      tr: "Gün ışığı alan, sessiz bir salon. Bir kahve eşliğinde nefeslenip randevunuza hazırlanırsınız.",
      en: "A quiet, daylit lounge. A coffee, a breath, and you are ready for your visit.",
    },
    treatmentIds: [],
  },
  {
    id: "consultation",
    image: "/clinic/consultation-room.jpg",
    area: { tr: "1. kat", en: "First floor" },
    title: { tr: "Konsültasyon Odası", en: "Consultation room" },
    body: {
      tr: "Hekiminizle yüz yüze oturduğunuz oda. Beklentileriniz dinlenir, seçenekler açıkça konuşulur.",
      en: "Where you sit down with your clinician. Your wishes are heard and every option is explained.",
    },
    treatmentIds: ["estetik-dis-hekimligi", "ortodonti", "cene-eklem-tedavisi"],
  },
  {
    id: "planning",
    image: "/clinic/planning.jpg",
    area: { tr: "1. kat", en: "First floor" },
    title: { tr: "Dijital Gülüş Stüdyosu", en: "Digital smile studio" },
    body: {
      tr: "Ağız içi tarama ve yüz analiziyle yeni gülüşünüzü, tedaviye başlamadan ekranda görürsünüz.",
      en: "An intraoral scan and facial analysis show your new smile on screen before treatment begins.",
    },
    treatmentIds: ["estetik-dis-hekimligi", "telsiz-ortodonti", "invisalign-first"],
  },
  {
    id: "imaging",
    image: "/clinic/imaging.jpg",
    area: { tr: "1. kat", en: "First floor" },
    title: { tr: "Görüntüleme & Röntgen", en: "Imaging & radiology" },
    body: {
      tr: "Düşük dozlu dijital röntgen ve 3D tomografi. Kemik ve kök yapısı tek karede netleşir.",
      en: "Low-dose digital X-ray and 3D tomography. Bone and roots become clear in a single view.",
    },
    treatmentIds: ["dental-implant", "endodonti", "agiz-dis-cene-cerrahisi"],
  },
  {
    id: "treatment-aesthetic",
    image: "/clinic/treatment-aesthetic.jpg",
    area: { tr: "2. kat", en: "Second floor" },
    title: { tr: "Estetik Tedavi Ünitesi", en: "Aesthetic treatment suite" },
    body: {
      tr: "Lamina, zirkonyum ve beyazlatma için ayrılmış, doğal ışık alan aydınlık bir ünite.",
      en: "A bright suite with natural light, set aside for veneers, zirconia and whitening.",
    },
    treatmentIds: ["estetik-dis-hekimligi", "dis-beyazlatma"],
  },
  {
    id: "treatment-restorative",
    image: "/clinic/treatment-restorative.jpg",
    area: { tr: "2. kat", en: "Second floor" },
    title: { tr: "Genel Tedavi Ünitesi", en: "General treatment suite" },
    body: {
      tr: "Dolgu, kanal ve diş eti tedavileri ergonomik koltuklarda, konforunuz gözetilerek ilerler.",
      en: "Fillings, root canals and gum care in ergonomic chairs, with your comfort in mind.",
    },
    treatmentIds: ["konservatif-dis-tedavisi", "endodonti", "periodontoloji", "dis-tasi-temizligi", "pedodonti"],
  },
  {
    id: "surgery",
    image: "/clinic/surgery.jpg",
    area: { tr: "3. kat", en: "Third floor" },
    title: { tr: "Cerrahi & İmplant Odası", en: "Surgery & implant room" },
    body: {
      tr: "Steril protokolle çalışan, implant ve cerrahi işlemler için ayrılmış özel oda.",
      en: "A dedicated room for implants and surgery, run under a strict sterile protocol.",
    },
    treatmentIds: ["dental-implant", "agiz-dis-cene-cerrahisi", "sedasyon"],
  },
  {
    id: "laboratory",
    image: "/clinic/laboratory.jpg",
    area: { tr: "3. kat", en: "Third floor" },
    title: { tr: "Diş Laboratuvarı", en: "Dental laboratory" },
    body: {
      tr: "Kron, köprü ve implant üstü protezler CAD/CAM ile klinik içinde, titizlikle üretilir.",
      en: "Crowns, bridges and implant restorations are milled in-house with CAD/CAM precision.",
    },
    treatmentIds: ["dental-implant", "estetik-dis-hekimligi"],
  },
];

export type Testimonial = {
  id: string;
  name: string;
  country: string;
  rating: number;
  date: string;
  serviceId: ServiceId;
  quote: Localized;
};

export const testimonials: Testimonial[] = [
  {
    id: "elena",
    name: "Elif Y.",
    country: "United Kingdom",
    rating: 5,
    date: "2026-02-18",
    serviceId: "estetik-dis-hekimligi",
    quote: {
      tr: "Planı uçmadan gördüm. İstanbul’da geçirdiğim altı günün temposu netti, sonuç da mock-up ile aynıydı.",
      en: "I saw the plan before I flew. The six days in Istanbul had a clear rhythm, and the result matched the mock-up.",
    },
  },
  {
    id: "markus",
    name: "Mert K.",
    country: "Germany",
    rating: 5,
    date: "2026-01-09",
    serviceId: "dental-implant",
    quote: {
      tr: "İmplant konumunu tomografi üzerinden anlattılar. Aceleye getirilmedi, bu da güven verdi.",
      en: "They walked me through the implant position on the scan. Nothing was rushed, and that was what I trusted.",
    },
  },
  {
    id: "sofia",
    name: "Selin A.",
    country: "Italy",
    rating: 5,
    date: "2025-11-21",
    serviceId: "estetik-dis-hekimligi",
    quote: {
      tr: "Diş etimin çizgisi bozulmadan lamina oturdu. Renk, kendi dişlerimden seçildi.",
      en: "The veneers sat without disturbing my gum line. The shade was taken from my own teeth.",
    },
  },
  {
    id: "james",
    name: "Kerem D.",
    country: "Ireland",
    rating: 5,
    date: "2025-10-02",
    serviceId: "estetik-dis-hekimligi",
    quote: {
      tr: "Dört kron tek tek prova edildi. Klinikteki sakinlik, sokağın temposuna benzemiyor.",
      en: "Four crowns were tried in, one by one. The clinic is quieter than the street outside.",
    },
  },
  {
    id: "amira",
    name: "Ayşe T.",
    country: "France",
    rating: 5,
    date: "2026-03-04",
    serviceId: "dis-beyazlatma",
    quote: {
      tr: "Tek seans, abartısız bir beyaz. Fotoğrafta hâlâ ben duruyorum.",
      en: "One session, a white that doesn’t shout. I still look like myself in photographs.",
    },
  },
  {
    id: "nora",
    name: "Zeynep Ş.",
    country: "Netherlands",
    rating: 5,
    date: "2025-12-14",
    serviceId: "dental-implant",
    quote: {
      tr: "Havalimanından kliniğe aktarım hazırdı. Kontrol, dönüş uçuşumdan önceye konmuştu.",
      en: "The transfer from the airport was already arranged. My review sat before the flight home.",
    },
  },
];
