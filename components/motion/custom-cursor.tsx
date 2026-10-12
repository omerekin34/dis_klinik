"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

type HoverState = "default" | "link" | "text";

export function CustomCursor() {
  const [hover, setHover] = useState<HoverState>("default");
  const [pressed, setPressed] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const dotX = useSpring(x, { stiffness: 700, damping: 42, mass: 0.35 });
  const dotY = useSpring(y, { stiffness: 700, damping: 42, mass: 0.35 });
  const ringX = useSpring(x, { stiffness: 180, damping: 24, mass: 0.55 });
  const ringY = useSpring(y, { stiffness: 180, damping: 24, mass: 0.55 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;

    const root = document.documentElement;
    root.classList.add("has-cursor");

    const move = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    const over = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      if (target.closest("input, textarea, select, [contenteditable='true']")) {
        setHover("text");
      } else if (target.closest("a, button, summary, label, [data-cursor='pointer']")) {
        setHover("link");
      } else {
        setHover("default");
      }
    };

    const down = () => setPressed(true);
    const up = () => setPressed(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);

    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  const link = hover === "link";
  const text = hover === "text";

  return (
    <div className="cursor-root pointer-events-none fixed inset-0 z-[90]" aria-hidden>
      <motion.div className="absolute top-0 left-0" style={{ x: dotX, y: dotY }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-foam shadow-[0_0_0_1px_rgba(7,17,31,0.35)]"
          animate={{
            width: text ? 2 : pressed ? 5 : 6,
            height: text ? 18 : pressed ? 5 : 6,
            opacity: link ? 0 : 1,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 28 }}
        />
      </motion.div>
      <motion.div className="absolute top-0 left-0" style={{ x: ringX, y: ringY }}>
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border"
          animate={{
            width: link ? 68 : text ? 28 : pressed ? 28 : 38,
            height: link ? 68 : text ? 28 : pressed ? 28 : 38,
            borderColor: link ? "rgba(232,213,163,0.95)" : "rgba(196,163,90,0.7)",
            backgroundColor: link ? "rgba(196,163,90,0.18)" : "rgba(196,163,90,0)",
          }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        />
      </motion.div>
    </div>
  );
}
