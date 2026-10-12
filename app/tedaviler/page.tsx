import type { Metadata } from "next";
import { ServicesView } from "@/components/services/services-view";

export const metadata: Metadata = {
  title: "Tedavilerimiz",
  description:
    "Ortodonti, pedodonti, implant, estetik, kanal tedavisi, diş eti ve sedasyon. Her tedavinin kendi sayfası, hekimi ve randevusu.",
};

export default function TreatmentsPage() {
  return <ServicesView />;
}
