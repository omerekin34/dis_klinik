import type { Metadata } from "next";
import { HomeView } from "@/components/home/home-view";

export const metadata: Metadata = {
  description:
    "Aureum, Nişantaşı'nda sağlık turizmine göre planlanan estetik diş kliniği. Gülüş tasarımı, implant ve zirkonyum.",
};

export default function HomePage() {
  return <HomeView />;
}
