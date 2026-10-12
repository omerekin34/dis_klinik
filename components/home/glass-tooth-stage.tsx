"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import { Mark } from "@/components/brand/mark";
import { GlassToothCanvas, type ToothMode } from "@/components/home/glass-tooth-canvas";
import { useLocale } from "@/components/providers/locale-provider";
import { cn } from "@/lib/cn";

type StageProps = {
  mode: ToothMode;
  onReady?: () => void;
};

export function GlassToothStage({ mode, onReady }: StageProps) {
  const [webgl] = useState(canUseWebGL);

  useEffect(() => {
    if (!webgl) onReady?.();
  }, [onReady, webgl]);

  if (!webgl) {
    return (
      <div className="grid h-full w-full place-items-center">
        <Mark className="h-[42%] w-[42%]" />
      </div>
    );
  }

  return (
    <ToothBoundary onReady={onReady}>
      <ToothScene mode={mode} onReady={onReady} />
    </ToothBoundary>
  );
}

function ToothScene({ mode, onReady }: StageProps) {
  const { t } = useLocale();
  const speedRef = useRef(1);
  const activeRef = useRef<number | null>(null);
  const labelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive] = useState<number | null>(null);
  const items = t.orbit.items;

  const focus = (index: number | null) => {
    activeRef.current = index;
    speedRef.current = index === null ? 1 : 0.06;
    setActive(index);
  };

  return (
    <div className="relative h-full w-full" aria-hidden={mode === "showcase"}>
      <GlassToothCanvas
        mode={mode}
        onReady={onReady}
        speedRef={speedRef}
        activeRef={activeRef}
        labelRefs={labelRefs}
      />
      {mode === "orbit" && (
        <div className="pointer-events-none absolute inset-0">
          {items.map((item, index) => (
            <button
              key={item.label}
              type="button"
              ref={(node) => {
                labelRefs.current[index] = node;
                if (node && node.dataset.ready !== "1") {
                  node.style.opacity = "0";
                  node.dataset.ready = "1";
                }
              }}
              className="group absolute top-0 left-0 text-left outline-none"
              aria-expanded={active === index}
              onPointerEnter={(event) => {
                if (event.pointerType === "touch") return;
                focus(index);
              }}
              onPointerLeave={(event) => {
                if (event.pointerType === "touch") return;
                focus(null);
              }}
              onFocus={() => focus(index)}
              onBlur={() => focus(null)}
              onClick={() => {
                if (!window.matchMedia("(pointer: coarse)").matches) return;
                focus(active === index ? null : index);
              }}
            >
              <span className="flex items-center gap-2">
                <span
                  className={cn(
                    "relative h-2 w-2 rounded-full bg-gold-300 shadow-[0_0_12px_rgba(232,213,163,0.85)] transition-transform duration-300",
                    active === index && "scale-125 bg-gold-200 shadow-[0_0_18px_4px_rgba(232,213,163,0.95)]",
                  )}
                />
                <span
                  className={cn(
                    "font-serif text-[13px] leading-none whitespace-nowrap text-gold-200/90 transition-colors duration-300",
                    active === index && "text-gold-200 drop-shadow-[0_0_12px_rgba(232,213,163,0.85)]",
                  )}
                >
                  {item.label}
                </span>
              </span>
              <AnimatePresence>
                {active === index && (
                  <motion.span
                    key="tip"
                    role="tooltip"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.22 }}
                    className={cn(
                      "absolute z-10 w-56 rounded-2xl border border-gold-300/25 bg-navy-950/55 px-4 py-3 text-left shadow-[0_18px_50px_rgba(7,17,31,0.4)] backdrop-blur-xl",
                      "group-data-[side=left]:right-[calc(100%+0.7rem)] group-data-[side=right]:left-[calc(100%+0.7rem)]",
                      "group-data-[v=mid]:top-1/2 group-data-[v=mid]:-translate-y-1/2",
                      "group-data-[v=below]:top-full group-data-[v=below]:mt-3",
                      "group-data-[v=above]:bottom-full group-data-[v=above]:mb-3",
                    )}
                  >
                    <span className="block text-[10px] tracking-[0.22em] text-gold-300 uppercase">{item.label}</span>
                    <span className="mt-1.5 block text-[13px] leading-5 text-white/80">{item.detail}</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function canUseWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

class ToothBoundary extends Component<{ children: ReactNode; onReady?: () => void }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onReady?.();
  }

  render() {
    if (this.state.failed) {
      return (
        <div className="grid h-full w-full place-items-center">
          <Mark className="h-[42%] w-[42%]" />
        </div>
      );
    }
    return this.props.children;
  }
}
