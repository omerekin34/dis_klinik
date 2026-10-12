import type { Metadata } from "next";
import { AboutView } from "@/components/about/about-view";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Aureum’un Nişantaşı’ndaki ölçüsü. Her branş kendi hekiminde, plan uçuştan önce, takip dönüşten sonra da sürer.",
};

export default function AboutPage() {
  return <AboutView />;
}
