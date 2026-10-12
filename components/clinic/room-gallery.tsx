"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/providers/locale-provider";
import { OnlineBookingLink } from "@/components/ui/online-booking";
import { cn } from "@/lib/cn";
import { clinicRooms, tx, type ClinicRoom } from "@/lib/content";
import { getTreatment, type Treatment } from "@/lib/treatments";

const CARD_TAG_LIMIT = 3;

const pad = (value: number) => String(value).padStart(2, "0");

const floors = Array.from(new Map(clinicRooms.map((room) => [room.area.tr, room.area])).values());

const roomNumbers = new Map(clinicRooms.map((room, index) => [room.id, pad(index + 1)]));

function slideVariants(distance: number) {
  return {
    enter: (delta: number) => ({ opacity: 0, x: delta * distance }),
    center: { opacity: 1, x: 0 },
    exit: (delta: number) => ({ opacity: 0, x: -delta * distance }),
  };
}

function roomTreatments(room: ClinicRoom) {
  return room.treatmentIds.map(getTreatment).filter((item): item is Treatment => Boolean(item));
}

export function RoomGallery() {
  const { locale, t } = useLocale();
  const g = t.clinic.gallery;
  const reduce = useReducedMotion();

  const [floor, setFloor] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [direction, setDirection] = useState(0);

  const visible = floor ? clinicRooms.filter((room) => room.area.tr === floor) : clinicRooms;
  const activeIndex = visible.findIndex((room) => room.id === activeId);
  const active = activeIndex >= 0 ? visible[activeIndex] : null;

  const filters = [
    { key: null, label: g.all, count: clinicRooms.length },
    ...floors.map((area) => ({
      key: area.tr,
      label: tx(area, locale),
      count: clinicRooms.filter((room) => room.area.tr === area.tr).length,
    })),
  ];

  const close = useCallback(() => setActiveId(null), []);

  const step = useCallback(
    (delta: number) => {
      if (activeIndex < 0) return;
      setDirection(delta);
      setActiveId(visible[(activeIndex + delta + visible.length) % visible.length].id);
    },
    [activeIndex, visible],
  );

  return (
    <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-8">
      <div role="group" aria-label={g.filterLabel} className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {filters.map((filter) => {
          const selected = floor === filter.key;
          return (
            <button
              key={filter.key ?? "all"}
              type="button"
              aria-pressed={selected}
              onClick={() => setFloor(filter.key)}
              className={cn(
                "relative rounded-full border px-4 py-2 text-[11px] tracking-[0.2em] uppercase transition-colors duration-300",
                selected
                  ? "border-navy-950 text-foam"
                  : "border-line bg-foam text-navy-950 hover:border-gold-400 hover:text-gold-600",
              )}
            >
              {selected && (
                <motion.span
                  layoutId="room-floor-pill"
                  className="absolute inset-0 rounded-full bg-navy-950"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                {filter.label}
                <span className={cn("tabular-nums", selected ? "text-gold-300" : "text-gold-600/70")}>
                  {pad(filter.count)}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <motion.div layout={!reduce} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((room) => (
            <motion.div
              key={room.id}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="h-full"
            >
              <RoomCard
                room={room}
                onOpen={() => {
                  setDirection(0);
                  setActiveId(room.id);
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {active && (
          <RoomLightbox
            key="room-lightbox"
            room={active}
            index={activeIndex}
            rooms={visible}
            direction={direction}
            onClose={close}
            onStep={step}
            onSelect={(id, delta) => {
              setDirection(delta);
              setActiveId(id);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function RoomCard({ room, onOpen }: { room: ClinicRoom; onOpen: () => void }) {
  const { locale, t } = useLocale();
  const g = t.clinic.gallery;
  const title = tx(room.title, locale);
  const related = roomTreatments(room);
  const shown = related.slice(0, CARD_TAG_LIMIT);
  const hidden = related.length - shown.length;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-foam shadow-[0_12px_30px_rgba(7,17,31,0.05)] transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-[0_24px_50px_rgba(7,17,31,0.14)]">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${g.open}: ${title}`}
        className="relative block aspect-[4/3] w-full cursor-zoom-in overflow-hidden bg-navy-900 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-gold-400"
      >
        <Image
          src={room.image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <span className="absolute inset-0 bg-linear-to-t from-navy-950/60 via-transparent to-transparent transition-opacity duration-500 group-hover:from-navy-950/75" />
        <span className="absolute top-4 left-4 rounded-full bg-foam/90 px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-navy-950 uppercase backdrop-blur">
          {tx(room.area, locale)}
        </span>
        <span className="absolute top-3 right-3 grid h-10 w-10 place-items-center rounded-full border border-foam/40 bg-navy-950/25 text-foam backdrop-blur-md transition-colors duration-500 group-hover:border-gold-300 group-hover:bg-gold-400 group-hover:text-navy-950">
          <Maximize2 className="h-4 w-4" strokeWidth={1.6} />
        </span>
        <span className="absolute bottom-3 left-5 font-serif text-4xl text-gold-200">{roomNumbers.get(room.id)}</span>
        <span className="absolute right-5 bottom-5 translate-y-2 text-[11px] tracking-[0.2em] text-foam uppercase opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          {g.open}
        </span>
      </button>

      <div className="flex flex-1 flex-col p-6">
        <h2 className="font-serif text-2xl leading-tight text-navy-950">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-muted">{tx(room.body, locale)}</p>

        <div className="mt-auto pt-5">
          <div className="border-t border-line pt-4">
            {related.length > 0 ? (
              <>
                <p className="text-[10px] tracking-[0.24em] text-gold-600 uppercase">{g.related}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {shown.map((treatment) => (
                    <li key={treatment.id}>
                      <Link
                        href={`/tedaviler/${treatment.id}`}
                        className="inline-flex items-center gap-1 rounded-full border border-line bg-paper px-3 py-1.5 text-xs text-navy-950 transition-colors duration-300 hover:border-gold-400 hover:bg-gold-200/50"
                      >
                        {tx(treatment.name, locale)}
                        <ArrowUpRight className="h-3 w-3 text-gold-600" strokeWidth={1.8} />
                      </Link>
                    </li>
                  ))}
                  {hidden > 0 && (
                    <li>
                      <button
                        type="button"
                        onClick={onOpen}
                        className="rounded-full border border-dashed border-gold-400/70 px-3 py-1.5 text-xs text-gold-600 transition-colors duration-300 hover:bg-gold-200/50"
                      >
                        +{hidden}
                      </button>
                    </li>
                  )}
                </ul>
              </>
            ) : (
              <p className="text-[10px] tracking-[0.24em] text-gold-600 uppercase">{g.welcome}</p>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function RoomLightbox({
  room,
  index,
  rooms,
  direction,
  onClose,
  onStep,
  onSelect,
}: {
  room: ClinicRoom;
  index: number;
  rooms: ClinicRoom[];
  direction: number;
  onClose: () => void;
  onStep: (delta: number) => void;
  onSelect: (id: string, delta: number) => void;
}) {
  const { locale, t } = useLocale();
  const g = t.clinic.gallery;
  const reduce = useReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const title = tx(room.title, locale);
  const related = roomTreatments(room);
  const canStep = rooms.length > 1;
  const bookHref = related[0] ? `/appointment?service=${related[0].id}` : "/appointment";

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight" && canStep) onStep(1);
      else if (event.key === "ArrowLeft" && canStep) onStep(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [canStep, onClose, onStep]);

  const slide = reduce ? 0 : 60;

  return (
    <motion.div
      className="fixed inset-0 z-[87] flex items-center justify-center p-3 sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div aria-hidden className="absolute inset-0 bg-navy-950/85 backdrop-blur-md" onClick={onClose} />

      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="room-lightbox-title"
        className="relative flex max-h-[calc(100dvh-1.5rem)] w-full max-w-6xl flex-col overflow-y-auto rounded-3xl bg-foam shadow-[0_40px_120px_rgba(0,0,0,0.45)] lg:grid lg:grid-cols-[1.55fr_1fr] lg:overflow-hidden"
        initial={reduce ? false : { y: 24, scale: 0.98 }}
        animate={{ y: 0, scale: 1 }}
        exit={reduce ? { opacity: 0 } : { y: 16, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label={g.close}
          className="absolute top-4 right-4 z-20 grid h-11 w-11 place-items-center rounded-full border border-line bg-foam/90 text-navy-950 backdrop-blur transition-colors duration-300 hover:border-navy-950 hover:bg-navy-950 hover:text-foam"
        >
          <X className="h-4 w-4" strokeWidth={1.6} />
        </button>

        <div className="relative aspect-[4/3] max-h-[55dvh] w-full shrink-0 overflow-hidden bg-navy-950 lg:aspect-auto lg:h-[min(82dvh,660px)] lg:max-h-none">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={room.id}
              className="absolute inset-0 touch-pan-y"
              custom={direction}
              variants={slideVariants(slide)}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              drag={canStep && !reduce ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.25}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) onStep(1);
                else if (info.offset.x > 70) onStep(-1);
              }}
            >
              <Image
                src={room.image}
                alt={title}
                fill
                draggable={false}
                sizes="(min-width: 1024px) 62vw, 100vw"
                className="pointer-events-none object-cover select-none"
              />
            </motion.div>
          </AnimatePresence>

          <span className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-navy-950/70 to-transparent" />
          <span className="pointer-events-none absolute bottom-5 left-6 font-serif text-foam">
            <span className="text-4xl text-gold-200">{roomNumbers.get(room.id)}</span>
            <span className="ml-2 text-sm text-foam/60">
              {pad(index + 1)} / {pad(rooms.length)}
            </span>
          </span>

          {canStep && (
            <>
              <button
                type="button"
                onClick={() => onStep(-1)}
                aria-label={g.prev}
                className="absolute top-1/2 left-4 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-foam/40 bg-navy-950/30 text-foam backdrop-blur-md transition-colors duration-300 hover:border-gold-300 hover:bg-gold-400 hover:text-navy-950"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={1.6} />
              </button>
              <button
                type="button"
                onClick={() => onStep(1)}
                aria-label={g.next}
                className="absolute top-1/2 right-4 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-foam/40 bg-navy-950/30 text-foam backdrop-blur-md transition-colors duration-300 hover:border-gold-300 hover:bg-gold-400 hover:text-navy-950"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={1.6} />
              </button>
            </>
          )}
        </div>

        <div className="flex flex-col p-7 sm:p-10 lg:overflow-y-auto">
          <span className="self-start rounded-full bg-gold-200/60 px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-navy-950 uppercase">
            {tx(room.area, locale)}
          </span>
          <h2 id="room-lightbox-title" className="mt-5 pr-10 font-serif text-[2.2rem] leading-[1.05] text-navy-950">
            {title}
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-muted">{tx(room.body, locale)}</p>

          {related.length > 0 && (
            <div className="mt-8">
              <p className="text-[10px] tracking-[0.24em] text-gold-600 uppercase">{g.related}</p>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {related.map((treatment) => (
                  <li key={treatment.id}>
                    <Link
                      href={`/tedaviler/${treatment.id}`}
                      className="group/item flex items-center justify-between gap-4 py-3"
                    >
                      <span>
                        <span className="block font-serif text-lg leading-snug text-navy-950 transition-colors duration-300 group-hover/item:text-gold-600">
                          {tx(treatment.name, locale)}
                        </span>
                        <span className="text-xs text-muted">
                          {t.servicesPage.durationLabel} · {tx(treatment.duration, locale)}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0 text-gold-600 transition-transform duration-300 group-hover/item:translate-x-0.5 group-hover/item:-translate-y-0.5"
                        strokeWidth={1.6}
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8">
            <OnlineBookingLink href={bookHref} surface="light">
              {g.book}
            </OnlineBookingLink>
          </div>

          {canStep && (
            <ul className="mt-auto flex gap-2 overflow-x-auto pt-8 pb-1">
              {rooms.map((item, itemIndex) => (
                <li key={item.id} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => onSelect(item.id, Math.sign(itemIndex - index))}
                    aria-label={tx(item.title, locale)}
                    aria-current={item.id === room.id}
                    className={cn(
                      "relative block h-11 w-14 overflow-hidden rounded-lg ring-2 transition-[opacity,box-shadow] duration-300",
                      item.id === room.id ? "ring-gold-500" : "opacity-60 ring-transparent hover:opacity-100",
                    )}
                  >
                    <Image src={item.image} alt="" fill sizes="56px" className="object-cover" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
