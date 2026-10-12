import type { Metadata } from "next";
import { TeamView } from "@/components/team/team-view";

export const metadata: Metadata = {
  title: "Ekibimiz",
  description: "Aureum hekimleri. Her branş kendi hekiminde: estetik, cerrahi, restoratif, ortodonti, pedodonti, endodonti ve periodontoloji.",
};

export default function TeamPage() {
  return <TeamView />;
}
