import type { Metadata } from "next";
import { ContactView } from "@/components/contact/contact-view";

export const metadata: Metadata = {
  title: "İletişim",
  description: "Aureum adres, çalışma saatleri, harita ve mesaj formu. Teşvikiye Caddesi, Nişantaşı.",
};

export default function ContactPage() {
  return <ContactView />;
}
