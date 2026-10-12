"use client";

import { usePathname } from "next/navigation";
import { Footer, QuietBar } from "@/components/layout/footer";
import { FloatingContact } from "@/components/layout/floating-contact";
import { Navbar } from "@/components/layout/navbar";
import { CustomCursor } from "@/components/motion/custom-cursor";
import { IntroProvider } from "@/components/motion/intro-context";
import { LocaleProvider } from "@/components/providers/locale-provider";

export function SiteProviders({ children }: { children: React.ReactNode }) {
  return (
    <LocaleProvider>
      <IntroProvider>
        <Chrome>{children}</Chrome>
      </IntroProvider>
    </LocaleProvider>
  );
}

function Chrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const focused = pathname === "/appointment";
  const treatmentDetail = pathname.startsWith("/tedaviler/");

  return (
    <>
      <CustomCursor />
      <Navbar />
      <div id="icerik">{children}</div>
      <div className={treatmentDetail ? "pb-20" : undefined}>{focused ? <QuietBar /> : <Footer />}</div>
      <FloatingContact />
    </>
  );
}
