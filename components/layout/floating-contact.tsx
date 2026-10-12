"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { WhatsAppGlyph } from "@/components/brand/mark";
import { useLocale } from "@/components/providers/locale-provider";
import { clinic, whatsappHref } from "@/lib/site";

export function FloatingContact() {
  const { t } = useLocale();
  const pathname = usePathname();
  const lift = pathname.startsWith("/tedaviler/");
  const booking = pathname === "/appointment";
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const panelId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className={`fixed right-4 z-[86] flex flex-col items-end sm:right-6 ${lift ? "bottom-24" : booking ? "bottom-24 lg:bottom-6" : "bottom-4 sm:bottom-6"}`}
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            id={panelId}
            role="dialog"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="mb-3 w-[min(20.75rem,calc(100vw-2rem))] origin-bottom-right rounded-[1.35rem] border border-gold-300/70 bg-foam p-5 text-ink shadow-[0_22px_50px_rgba(7,17,31,0.22)]"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id={titleId} className="text-[1.05rem] font-semibold tracking-tight text-navy-950">
                {t.floating.title}
              </h2>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t.floating.close}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-muted transition-colors hover:bg-paper hover:text-navy-950"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2.5 text-[0.92rem] leading-relaxed text-muted">{t.floating.body}</p>
            <div className="mt-4 flex flex-col gap-2.5">
              <a
                href={whatsappHref(t.floating.whatsappMessage)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border border-gold-300 bg-gold-200 px-4 py-3 text-sm font-medium text-navy-950 transition-colors hover:bg-gold-300"
              >
                <WhatsAppGlyph className="h-[1.15rem] w-[1.15rem] text-bronze" />
                {t.floating.whatsapp}
              </a>
              <a
                href={`mailto:${clinic.email}`}
                className="flex items-center gap-3 rounded-xl border border-line bg-foam px-4 py-3 text-sm text-ink transition-colors hover:border-gold-400 hover:bg-paper"
              >
                <Mail className="h-4 w-4 text-gold-600" strokeWidth={1.75} />
                {t.floating.email}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-xl border border-line bg-paper px-4 py-3 text-sm text-ink transition-colors hover:border-gold-400"
              >
                <MessageCircle className="h-4 w-4 text-gold-600" strokeWidth={1.75} />
                {t.floating.contact}
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2.5 rounded-full bg-gold-400 px-5 py-3.5 text-[0.95rem] font-medium text-navy-950 shadow-[0_16px_36px_rgba(7,17,31,0.28)] transition-colors hover:bg-gold-300"
      >
        <MessageCircle className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.75} />
        {t.floating.title}
      </button>
    </div>
  );
}
