import type { Metadata } from "next";
import { ClinicView } from "@/components/clinic/clinic-view";

export const metadata: Metadata = {
  title: "Kliniğimiz",
  description: "Aureum’un Nişantaşı kliniği. Dijital gülüş planı, tomografi, mikroskop ve CAD/CAM. Teşvikiye Caddesi.",
};

export default function ClinicPage() {
  return <ClinicView />;
}
