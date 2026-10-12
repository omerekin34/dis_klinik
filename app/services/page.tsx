import type { Metadata } from "next";
import { ServicesView } from "@/components/services/services-view";

export const metadata: Metadata = {
  title: "Hizmetlerimiz",
  description: "İmplant, zirkonyum, beyazlatma, lamina, şeffaf plak ve Hollywood Smile protokolleri.",
};

export default function ServicesPage() {
  return <ServicesView />;
}
