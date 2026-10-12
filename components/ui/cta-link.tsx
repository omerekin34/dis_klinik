import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const tones = {
  light: {
    root: "border-navy-950/15 bg-foam text-navy-950 shadow-[0_12px_30px_rgba(7,17,31,0.06)] hover:border-navy-950 hover:text-foam hover:shadow-[0_20px_44px_rgba(7,17,31,0.2)]",
    sweep: "bg-navy-950",
    icon: "bg-gold-400 text-navy-950 group-hover:bg-gold-300",
  },
  dark: {
    root: "border-foam/20 bg-foam text-navy-950 shadow-[0_12px_30px_rgba(0,0,0,0.25)] hover:border-gold-400 hover:shadow-[0_20px_44px_rgba(154,123,60,0.35)]",
    sweep: "bg-gold-400",
    icon: "bg-gold-400 text-navy-950 group-hover:bg-navy-950 group-hover:text-gold-300",
  },
  ghost: {
    root: "border-white/25 bg-white/[0.04] text-foam backdrop-blur-sm hover:border-foam hover:text-navy-950 hover:shadow-[0_20px_44px_rgba(0,0,0,0.3)]",
    sweep: "bg-foam",
    icon: "bg-gold-400 text-navy-950 group-hover:bg-gold-300",
  },
} as const;

type Tone = keyof typeof tones;

export function CtaLink({
  href,
  children,
  tone = "light",
  className,
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) {
  const style = tones[tone];

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex items-center justify-between gap-5 overflow-hidden rounded-2xl border py-2 pr-2 pl-7 text-[12px] font-medium tracking-[0.2em] uppercase transition-[color,border-color,box-shadow,transform] duration-500 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold-500",
        style.root,
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 -translate-x-[105%] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0",
          style.sweep,
        )}
      />
      <span className="relative">{children}</span>
      <span
        className={cn(
          "relative grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-[transform,background-color,color] duration-500 group-hover:rotate-45",
          style.icon,
        )}
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
}
