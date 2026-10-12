import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import { SiteProviders } from "@/components/providers/site-providers";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin", "latin-ext"],
  variable: "--font-outfit",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

export const metadata: Metadata = {
  title: {
    default: "AUREUM | İstanbul Estetik Diş Kliniği",
    template: "%s · AUREUM",
  },
  description:
    "Nişantaşı'nda sağlık turizmine uygun, dijital planlı estetik diş hekimliği. İmplant, zirkonyum, lamina ve gülüş tasarımı.",
  applicationName: "AUREUM",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      suppressHydrationWarning
      className={`${outfit.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-paper font-sans text-ink">
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
