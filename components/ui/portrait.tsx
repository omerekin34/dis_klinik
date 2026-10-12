"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/cn";

const tones = {
  navy: "from-[#07111f] via-[#16324f] to-[#8c6a3d]",
  bronze: "from-[#2a1c12] via-[#6d5130] to-[#e8d5a3]",
  slate: "from-[#101820] via-[#3d5164] to-[#d4bc7d]",
} as const;

export function Portrait({
  initials,
  tone,
  label,
  photo,
  name,
}: {
  initials: string;
  tone: keyof typeof tones;
  label: string;
  photo?: string;
  name?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (photo && !failed) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden bg-navy-900">
        <Image
          src={photo}
          alt={name ?? label}
          fill
          sizes="(min-width: 1024px) 22vw, 80vw"
          className="object-cover object-top"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  return (
    <div className={cn("relative aspect-[3/4] overflow-hidden bg-gradient-to-b", tones[tone])}>
      <div className="absolute inset-6 rounded-[40%] border border-white/15" />
      <svg viewBox="0 0 200 260" className="absolute inset-x-0 bottom-0 h-[78%] w-full text-white/80" aria-hidden>
        <ellipse cx="100" cy="78" rx="38" ry="46" fill="currentColor" opacity="0.9" />
        <path d="M40 250c8-58 28-86 60-86s52 28 60 86" fill="currentColor" opacity="0.9" />
      </svg>
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5 text-foam">
        <span className="font-serif text-3xl tracking-wide">{initials}</span>
        <span className="text-[10px] tracking-[0.28em] uppercase text-gold-200">{label}</span>
      </div>
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/10" />
    </div>
  );
}
