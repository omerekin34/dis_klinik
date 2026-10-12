"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useIntro } from "@/components/motion/intro-context";
import { useLocale } from "@/components/providers/locale-provider";

const EASE = [0.76, 0, 0.24, 1] as [number, number, number, number];

export function Preloader() {
  const { t } = useLocale();
  const { phase, skip } = useIntro();
  const reduce = useReducedMotion();

  if (phase === "done" || reduce) return null;

  return (
    <>
      <motion.div
        role="dialog"
        aria-label="AUREUM"
        aria-hidden={phase !== "intro"}
        className="aureum-intro fixed inset-0 z-[70] overflow-hidden bg-navy-950"
        initial={false}
        animate={{ opacity: phase === "intro" ? 1 : 0 }}
        transition={{ duration: 1.05, ease: EASE }}
        style={{ pointerEvents: phase === "intro" ? "auto" : "none" }}
      >
        <div className="grain absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,188,125,0.18),transparent_42%)]" />
        <p className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-[12px] tracking-[0.62em] text-gold-300">
          AUREUM
        </p>
        <motion.div
          className="absolute bottom-0 left-0 z-10 h-px w-full origin-left bg-gold-400/80"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </motion.div>
      {phase === "intro" && (
        <button
          type="button"
          onClick={skip}
          className="fixed bottom-8 left-1/2 z-[88] -translate-x-1/2 text-[11px] tracking-[0.35em] text-white/55 uppercase transition-colors hover:text-gold-200"
        >
          {t.preloader.skip}
        </button>
      )}
    </>
  );
}
