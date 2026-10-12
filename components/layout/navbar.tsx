"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { Mark } from "@/components/brand/mark";
import { useIntro } from "@/components/motion/intro-context";
import { OnlineBookingLink } from "@/components/ui/online-booking";
import { useLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/cn";
import { tx, type Locale } from "@/lib/content";
import { treatments } from "@/lib/treatments";

function subscribeScroll(onStoreChange: () => void) {
  window.addEventListener("scroll", onStoreChange, { passive: true });
  return () => window.removeEventListener("scroll", onStoreChange);
}

function getScrolled() {
  return window.scrollY > 24;
}

function getServerScrolled() {
  return false;
}

type Rgb = { r: number; g: number; b: number; a: number };

function parseBackground(color: string): Rgb | null {
  const match = color.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?))?\s*\)/i);
  if (!match) return null;
  const alphaRaw = match[4];
  const alpha =
    alphaRaw === undefined ? 1 : alphaRaw.endsWith("%") ? Number(alphaRaw.slice(0, -1)) / 100 : Number(alphaRaw);
  return { r: Number(match[1]), g: Number(match[2]), b: Number(match[3]), a: alpha };
}

function isDarkColor({ r, g, b }: Rgb) {
  const channel = (value: number) => {
    const s = value / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  const luminance = 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
  return luminance < 0.4;
}

function pageSurfaceColor(node: Element) {
  if (!(node instanceof HTMLElement)) return null;
  if (node.closest("[data-nav-chrome]")) return null;
  if (node.getBoundingClientRect().width < window.innerWidth * 0.65) return null;
  const parsed = parseBackground(window.getComputedStyle(node).backgroundColor);
  if (!parsed || parsed.a < 0.72) return null;
  return parsed;
}

function readDarkSurface() {
  const chrome = document.querySelector("[data-nav-chrome]");
  const bottom = chrome?.getBoundingClientRect().bottom ?? 80;
  const y = Math.min(window.innerHeight - 1, Math.max(0, bottom + 12));
  const stack = document.elementsFromPoint(window.innerWidth / 2, y);
  for (const node of stack) {
    const color = pageSurfaceColor(node);
    if (!color) continue;
    return isDarkColor(color);
  }
  return false;
}

const corporateLinks = [
  { href: "/about", key: "about" },
  { href: "/ekibimiz", key: "team" },
  { href: "/klinigimiz", key: "clinic" },
] as const;

const links = [
  { href: "/kurumsal", key: "corporate" },
  { href: "/tedaviler", key: "services" },
  { href: "/blog", key: "blog" },
  { href: "/contact", key: "contact" },
] as const;

function isCorporatePath(pathname: string) {
  return corporateLinks.some((link) => link.href === pathname);
}

export function Navbar() {
  const pathname = usePathname();
  const { phase } = useIntro();
  const { locale, setLocale, t } = useLocale();
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled);
  const [darkSurface, setDarkSurface] = useState(false);
  const [menuOwner, setMenuOwner] = useState<string | null>(null);
  const [langOwner, setLangOwner] = useState<string | null>(null);
  const [treatOpen, setTreatOpen] = useState(false);
  const [corpOpen, setCorpOpen] = useState(false);
  const [mobileTreatOpen, setMobileTreatOpen] = useState(false);
  const [mobileCorpOpen, setMobileCorpOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const corpTimer = useRef<number | null>(null);
  const menuOpen = menuOwner === pathname;
  const langOpen = langOwner === pathname;

  useEffect(() => {
    if (!langOpen) return;
    const close = (event: MouseEvent) => {
      if (!langRef.current?.contains(event.target as Node)) setLangOwner(null);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLangOwner(null);
    };
    window.addEventListener("mousedown", close);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("keydown", onKey);
    };
  }, [langOpen]);

  useEffect(() => {
    setTreatOpen(false);
    setCorpOpen(false);
    setMobileTreatOpen(false);
    setMobileCorpOpen(false);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
      if (corpTimer.current) window.clearTimeout(corpTimer.current);
    };
  }, []);

  useEffect(() => {
    let frame = 0;
    let alive = true;

    const read = () => {
      frame = 0;
      if (!alive) return;
      const next = readDarkSurface();
      setDarkSurface((current) => (current === next ? current : next));
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(document.body);

    return () => {
      alive = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      observer.disconnect();
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname, phase]);

  function openTreatments() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    if (corpTimer.current) window.clearTimeout(corpTimer.current);
    setCorpOpen(false);
    setTreatOpen(true);
  }

  function scheduleCloseTreatments() {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setTreatOpen(false), 140);
  }

  function openCorporate() {
    if (corpTimer.current) window.clearTimeout(corpTimer.current);
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setTreatOpen(false);
    setCorpOpen(true);
  }

  function scheduleCloseCorporate() {
    if (corpTimer.current) window.clearTimeout(corpTimer.current);
    corpTimer.current = window.setTimeout(() => setCorpOpen(false), 140);
  }

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  const onHero = pathname === "/" && !scrolled && !menuOpen;
  const solid = !onHero;
  const menuDark = darkSurface || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid && !menuOpen
          ? "border-b border-line/80 bg-paper/75 shadow-[0_10px_40px_rgba(7,17,31,0.04)] backdrop-blur-xl"
          : "bg-transparent",
      )}
    >
      <div data-nav-chrome className="relative z-50 mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className={cn("flex items-center gap-3", onHero || menuOpen ? "text-foam" : "text-navy-950")}>
          <Mark className="h-8 w-8" />
          <span className="font-serif text-[1.65rem] tracking-[0.22em]">AUREUM</span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main">
          {links.map((link) => {
            const active =
              link.key === "corporate"
                ? isCorporatePath(pathname)
                : pathname === link.href || pathname.startsWith(`${link.href}/`);
            if (link.key === "corporate") {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openCorporate}
                  onMouseLeave={scheduleCloseCorporate}
                  onFocus={openCorporate}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setCorpOpen(false);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={corpOpen}
                    aria-haspopup="true"
                    className={cn(
                      "group relative inline-flex items-center gap-1 text-[12px] tracking-[0.16em] uppercase",
                      corpOpen
                        ? onHero
                          ? "text-gold-300"
                          : "text-gold-600"
                        : onHero
                          ? "text-white/80 hover:text-white"
                          : "text-ink/75 hover:text-ink",
                      active && !corpOpen && (onHero ? "text-white" : "text-ink"),
                    )}
                  >
                    {t.nav.corporate}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", corpOpen && "rotate-180")} />
                    <span
                      className={cn(
                        "absolute -bottom-2 left-0 h-px bg-gold-500 transition-all duration-300",
                        active && !corpOpen ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {corpOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 z-50 w-[15.5rem] -translate-x-1/2 pt-3"
                      >
                        <div
                          className={cn(
                            "rounded-[1.35rem] px-3 py-3",
                            menuDark
                              ? "bg-navy-950 text-foam shadow-[0_24px_60px_rgba(7,17,31,0.35)]"
                              : "bg-foam text-ink shadow-[0_22px_55px_rgba(7,17,31,0.16)]",
                          )}
                        >
                          {corporateLinks.map((item) => {
                            const current = pathname === item.href;
                            return (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setCorpOpen(false)}
                                className={cn(
                                  "block rounded-xl px-3 py-2.5 text-[15px] leading-snug transition-colors",
                                  menuDark
                                    ? "text-white/78 hover:bg-white/5 hover:text-white"
                                    : "text-muted hover:bg-paper hover:text-navy-950",
                                  current && (menuDark ? "font-medium text-gold-300" : "font-medium text-navy-950"),
                                )}
                              >
                                {t.nav[item.key]}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            if (link.href === "/tedaviler") {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={openTreatments}
                  onMouseLeave={scheduleCloseTreatments}
                  onFocus={openTreatments}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setTreatOpen(false);
                  }}
                >
                  <Link
                    href={link.href}
                    aria-expanded={treatOpen}
                    aria-haspopup="true"
                    className={cn(
                      "group relative inline-flex items-center gap-1 text-[12px] tracking-[0.16em] uppercase",
                      onHero ? "text-white/80 hover:text-white" : "text-ink/75 hover:text-ink",
                      active && (onHero ? "text-white" : "text-ink"),
                    )}
                  >
                    {t.nav[link.key]}
                    <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", treatOpen && "rotate-180")} />
                    <span
                      className={cn(
                        "absolute -bottom-2 left-0 h-px bg-gold-500 transition-all duration-300",
                        active ? "w-full" : "w-0 group-hover:w-full",
                      )}
                    />
                  </Link>
                  <AnimatePresence>
                    {treatOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-1/2 z-50 w-[17.5rem] -translate-x-1/2 pt-4"
                      >
                        <div
                          className={cn(
                            "relative max-h-[min(70vh,38rem)] overflow-y-auto py-3",
                            menuDark
                              ? "bg-navy-950 text-foam shadow-[0_24px_60px_rgba(7,17,31,0.35)]"
                              : "bg-foam text-ink shadow-[0_22px_55px_rgba(7,17,31,0.16)]",
                          )}
                        >
                          <span
                            className={cn(
                              "absolute -top-2 left-1/2 -translate-x-1/2 border-x-8 border-b-8 border-x-transparent",
                              menuDark ? "border-b-navy-950" : "border-b-foam",
                            )}
                          />
                          {treatments.map((treatment) => {
                            const current = pathname === `/tedaviler/${treatment.id}`;
                            return (
                              <Link
                                key={treatment.id}
                                href={`/tedaviler/${treatment.id}`}
                                onClick={() => setTreatOpen(false)}
                                className={cn(
                                  "block px-6 py-2.5 text-[15px] leading-snug transition-colors",
                                  menuDark
                                    ? "text-white/78 hover:bg-white/5 hover:text-white"
                                    : "text-muted hover:bg-paper hover:text-navy-950",
                                  current && (menuDark ? "text-gold-300" : "font-medium text-navy-950"),
                                )}
                              >
                                {tx(treatment.name, locale)}
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "group relative text-[12px] tracking-[0.16em] uppercase",
                  onHero ? "text-white/80 hover:text-white" : "text-ink/75 hover:text-ink",
                  active && (onHero ? "text-white" : "text-ink"),
                )}
              >
                {t.nav[link.key]}
                <span
                  className={cn(
                    "absolute -bottom-2 left-0 h-px bg-gold-500 transition-all duration-300",
                    active ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3 sm:gap-4">
          <div ref={langRef} className="relative">
            <button
              type="button"
              aria-haspopup="listbox"
              aria-expanded={langOpen}
              aria-label={t.lang.label}
              onClick={() => setLangOwner(langOpen ? null : pathname)}
              className={cn(
                "flex items-center gap-1 text-[12px] tracking-[0.18em]",
                onHero || menuOpen ? "text-foam" : "text-ink",
              )}
            >
              {locale.toUpperCase()}
              <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", langOpen && "rotate-180")} />
            </button>
            <AnimatePresence>
              {langOpen && (
                <motion.ul
                  role="listbox"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className={cn(
                    "absolute right-0 mt-3 w-40 overflow-hidden rounded-2xl border p-1 shadow-2xl backdrop-blur-xl",
                    menuDark ? "border-white/10 bg-navy-950/95 text-foam" : "border-line bg-foam text-ink",
                  )}
                >
                  {(["tr", "en"] as Locale[]).map((code) => (
                    <li key={code}>
                      <button
                        type="button"
                        role="option"
                        aria-selected={locale === code}
                        onClick={() => {
                          setLocale(code);
                          setLangOwner(null);
                        }}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm",
                          locale === code ? (menuDark ? "text-gold-300" : "text-gold-600") : "hover:bg-gold-400/10",
                        )}
                      >
                        {t.lang[code]}
                        <span className="text-[10px] tracking-[0.16em]">{code.toUpperCase()}</span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="hidden sm:block">
            <OnlineBookingLink href="/appointment" surface={onHero || menuOpen ? "dark" : "light"}>
              {t.nav.book}
            </OnlineBookingLink>
          </div>

          <button
            type="button"
            className={cn("grid h-10 w-10 place-items-center lg:hidden", onHero || menuOpen ? "text-foam" : "text-ink")}
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => {
              setLangOwner(null);
              setMenuOwner(menuOpen ? null : pathname);
            }}
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-navy-950 text-foam lg:hidden"
          >
            <nav className="flex h-full flex-col gap-5 overflow-y-auto px-8 pt-28 pb-16">
              {links.map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  {link.key === "corporate" ? (
                    <div>
                      <button
                        type="button"
                        className="flex items-center gap-3 font-serif text-5xl"
                        aria-expanded={mobileCorpOpen}
                        onClick={() => setMobileCorpOpen((open) => !open)}
                      >
                        {t.nav.corporate}
                        <ChevronDown className={cn("h-6 w-6 transition-transform", mobileCorpOpen && "rotate-180")} />
                      </button>
                      {mobileCorpOpen && (
                        <div className="mt-4 flex flex-col gap-3 pl-1">
                          {corporateLinks.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn("text-lg", pathname === item.href ? "text-gold-300" : "text-white/75")}
                            >
                              {t.nav[item.key]}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : link.href === "/tedaviler" ? (
                    <div>
                      <button
                        type="button"
                        className="flex items-center gap-3 font-serif text-5xl"
                        aria-expanded={mobileTreatOpen}
                        onClick={() => setMobileTreatOpen((open) => !open)}
                      >
                        {t.nav[link.key]}
                        <ChevronDown className={cn("h-6 w-6 transition-transform", mobileTreatOpen && "rotate-180")} />
                      </button>
                      {mobileTreatOpen && (
                        <div className="mt-4 flex flex-col gap-3 pl-1">
                          <Link href="/tedaviler" className="text-lg text-gold-300">
                            {t.servicesHome.explore}
                          </Link>
                          {treatments.map((treatment) => (
                            <Link key={treatment.id} href={`/tedaviler/${treatment.id}`} className="text-lg text-white/75">
                              {tx(treatment.name, locale)}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link href={link.href} className="font-serif text-5xl">
                      {t.nav[link.key]}
                    </Link>
                  )}
                </motion.div>
              ))}
              <OnlineBookingLink href="/appointment" surface="dark" className="mt-4 w-fit">
                {t.nav.book}
              </OnlineBookingLink>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
