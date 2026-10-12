"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";

const DRAG_THRESHOLD = 6;

export function useDragScroller() {
  const scroller = useRef<HTMLDivElement>(null);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const settleCleanup = useRef<(() => void) | null>(null);
  const pointerCleanup = useRef<(() => void) | null>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const syncEdges = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(max <= 4 || el.scrollLeft >= max - 4);
  }, []);

  useEffect(() => {
    syncEdges();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", syncEdges, { passive: true });
    window.addEventListener("resize", syncEdges);
    return () => {
      el.removeEventListener("scroll", syncEdges);
      window.removeEventListener("resize", syncEdges);
      settleCleanup.current?.();
      settleCleanup.current = null;
      pointerCleanup.current?.();
      pointerCleanup.current = null;
    };
  }, [syncEdges]);

  function cardStep(el: HTMLElement) {
    const card = el.querySelector<HTMLElement>("[data-card]");
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 16;
    return (card?.offsetWidth ?? 280) + gap;
  }

  function scrollByCard(direction: -1 | 1) {
    const el = scroller.current;
    if (!el) return;
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    const next = Math.min(max, Math.max(0, el.scrollLeft + direction * cardStep(el)));
    el.scrollTo({ left: next, behavior: "auto" });
  }

  function cancelSettle() {
    settleCleanup.current?.();
    settleCleanup.current = null;
  }

  function applyDrag(clientX: number) {
    if (!drag.current.active) return;
    const el = scroller.current;
    if (!el) return;
    const delta = clientX - drag.current.startX;
    if (!drag.current.moved && Math.abs(delta) <= DRAG_THRESHOLD) return;
    if (!drag.current.moved) {
      el.dataset.dragging = "true";
      void el.offsetWidth;
    }
    drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - delta;
  }

  function onMouseDown(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.button !== 0) return;
    const el = scroller.current;
    if (!el) return;
    const left = el.scrollLeft;
    cancelSettle();
    el.scrollLeft = left;
    drag.current = {
      active: true,
      startX: event.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    pointerCleanup.current?.();
    const move = (native: MouseEvent) => {
      applyDrag(native.clientX);
      if (drag.current.moved) native.preventDefault();
    };
    const up = () => endDrag();
    pointerCleanup.current = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
      pointerCleanup.current = null;
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }

  function onMouseMove(event: ReactMouseEvent<HTMLDivElement>) {
    if (!drag.current.active) return;
    event.preventDefault();
    applyDrag(event.clientX);
  }

  function onMouseLeave(event: ReactMouseEvent<HTMLDivElement>) {
    if (event.buttons !== 0) return;
    endDrag();
  }

  function endDrag() {
    pointerCleanup.current?.();
    const el = scroller.current;
    if (!drag.current.active) return;
    const moved = drag.current.moved;
    drag.current.active = false;
    if (!el || !moved) {
      if (el) delete el.dataset.dragging;
      return;
    }

    const step = cardStep(el);
    const max = Math.max(0, el.scrollWidth - el.clientWidth);
    let target = Math.round(el.scrollLeft / step) * step;
    if (max - el.scrollLeft < step / 2) target = max;
    target = Math.min(max, Math.max(0, target));

    const start = el.scrollLeft;
    const delta = target - start;
    const clear = () => {
      el.scrollLeft = target;
      delete el.dataset.dragging;
      settleCleanup.current = null;
    };
    if (Math.abs(delta) < 1 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      clear();
      return;
    }

    const duration = 280;
    const started = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      if (settleCleanup.current == null) return;
      const t = Math.min(1, (now - started) / duration);
      const eased = 1 - (1 - t) ** 3;
      el.scrollLeft = start + delta * eased;
      if (t < 1) frame = requestAnimationFrame(tick);
      else clear();
    };
    settleCleanup.current = () => {
      cancelAnimationFrame(frame);
      settleCleanup.current = null;
    };
    frame = requestAnimationFrame(tick);
  }

  function onClickCapture(event: ReactMouseEvent<HTMLDivElement>) {
    if (!drag.current.moved) return;
    event.preventDefault();
    event.stopPropagation();
    drag.current.moved = false;
  }

  return {
    atStart,
    atEnd,
    scrollByCard,
    scrollerProps: {
      ref: scroller,
      onMouseDown,
      onMouseLeave,
      onMouseUp: endDrag,
      onMouseMove,
      onClickCapture,
      onDragStart: (event: ReactMouseEvent<HTMLDivElement>) => event.preventDefault(),
    },
  };
}

export const dragScrollerClassName =
  "flex cursor-grab snap-x snap-mandatory overflow-x-auto select-none [scrollbar-width:none] [-webkit-user-drag:none] [&::-webkit-scrollbar]:hidden data-[dragging=true]:cursor-grabbing data-[dragging=true]:snap-none data-[dragging=true]:[&_*]:pointer-events-none data-[dragging=true]:[&_*]:select-none";
