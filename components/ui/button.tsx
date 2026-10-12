import { cn } from "@/lib/cn";

const variants = {
  gold: "bg-gold-400 text-navy-950 hover:bg-gold-300",
  ghost: "border border-white/25 text-white hover:border-gold-300 hover:text-gold-200",
  dark: "bg-navy-950 text-foam hover:bg-navy-800",
  line: "border border-line bg-transparent text-ink hover:border-gold-500",
} as const;

type Variant = keyof typeof variants;

type ButtonProps = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  children,
  variant = "gold",
  className,
  type = "button",
  onClick,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[12px] font-medium tracking-[0.18em] uppercase transition-colors disabled:pointer-events-none disabled:opacity-40",
        variants[variant],
        className,
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
