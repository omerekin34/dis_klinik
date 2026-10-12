"use client";

import { CtaLink } from "@/components/ui/cta-link";
import { useLocale } from "@/components/providers/locale-provider";

export function NotFoundView() {
  const { t } = useLocale();

  return (
    <main className="mx-auto flex min-h-[100svh] max-w-3xl flex-col justify-center px-5 py-32 sm:px-8">
      <p className="text-[11px] tracking-[0.32em] text-gold-600 uppercase">{t.notFound.eyebrow}</p>
      <h1 className="mt-4 font-serif text-6xl text-navy-950">{t.notFound.title}</h1>
      <p className="mt-5 max-w-md text-muted">{t.notFound.body}</p>
      <div className="mt-8">
        <CtaLink href="/">{t.notFound.home}</CtaLink>
      </div>
    </main>
  );
}
