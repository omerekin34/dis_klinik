import Link from "next/link";
import { ToothIcon } from "@/components/brand/mark";
import { cn } from "@/lib/cn";

export function ToothGlyph({ className }: { className?: string }) {
  return <ToothIcon className={className} />;
}

type Surface = "dark" | "light";

export function OnlineBookingLink({
  href,
  children,
  className,
  surface = "dark",
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  surface?: Surface;
}) {
  const onDark = surface === "dark";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full py-1.5 pr-4 pl-1.5 text-[14.5px] font-medium leading-none tracking-normal whitespace-nowrap transition-[background-color,color,box-shadow] duration-500",
        onDark
          ? "bg-gold-400 text-navy-950 shadow-[0_10px_24px_rgba(154,123,60,0.32)] hover:bg-gold-300"
          : "bg-navy-950 text-foam shadow-[0_10px_24px_rgba(7,17,31,0.16)] hover:bg-navy-800",
        className,
      )}
    >
      <span
        className={cn(
          "grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors duration-500",
          onDark ? "bg-navy-950 text-gold-200" : "bg-gold-400 text-navy-950",
        )}
      >
        <ToothGlyph className="h-[18px] w-[15px]" />
      </span>
      {children}
    </Link>
  );
}
