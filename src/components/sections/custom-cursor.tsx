"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type CursorState = "default" | "button" | "link" | "project" | "social";

const stateConfig: Record<
  CursorState,
  { ringScale: number; ringOpacity: number; dotScale: number }
> = {
  default: { ringScale: 1, ringOpacity: 0.5, dotScale: 1 },
  button: { ringScale: 1.8, ringOpacity: 0.15, dotScale: 0 },
  link: { ringScale: 1.4, ringOpacity: 0.25, dotScale: 0.6 },
  project: { ringScale: 2.6, ringOpacity: 0.1, dotScale: 0 },
  social: { ringScale: 1.3, ringOpacity: 0.18, dotScale: 0.4 },
};

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(false);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState<CursorState>("default");
  const [label, setLabel] = useState<string | null>(null);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const ringX = useSpring(mouseX, { stiffness: 350, damping: 30, mass: 0.6 });
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 30, mass: 0.6 });
  const dotX = useSpring(mouseX, { stiffness: 800, damping: 40, mass: 0.3 });
  const dotY = useSpring(mouseY, { stiffness: 800, damping: 40, mass: 0.3 });

  const magneticTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hasTouch = window.matchMedia("(pointer: coarse)").matches;
    setIsTouch(hasTouch);
    if (hasTouch) return;

    function onMove(e: MouseEvent) {
      setVisible(true);

      if (magneticTarget.current) {
        const rect = magneticTarget.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const pull = 0.35;
        mouseX.set(cx + dx * pull);
        mouseY.set(cy + dy * pull);
        return;
      }

      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    }

    function onOver(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest("[data-cursor]") as HTMLElement | null;

      const magnetic = (e.target as HTMLElement)?.closest("[data-magnetic]") as HTMLElement | null;
      magneticTarget.current = magnetic;

      if (target) {
        const cursorType = target.getAttribute("data-cursor") as CursorState;
        setState(cursorType in stateConfig ? cursorType : "default");
        setLabel(target.getAttribute("data-cursor-label"));
      } else {
        setState("default");
        setLabel(null);
      }
    }

    function onLeaveWindow() {
      setVisible(false);
      magneticTarget.current = null;
    }

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    window.addEventListener("mouseleave", onLeaveWindow);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mouseleave", onLeaveWindow);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  const config = stateConfig[state];

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[90] hidden md:block"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.3s ease" }}
      aria-hidden="true"
    >
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-primary/60"
        style={{
          left: ringX,
          top: ringY,
          width: 36,
          height: 36,
          x: "-50%",
          y: "-50%",
          background: `rgba(59,130,246,${config.ringOpacity})`,
          boxShadow: "0 0 20px 2px rgba(59,130,246,0.25)",
        }}
        animate={{ scale: config.ringScale }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        {label && (
          <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-wide text-white">
            {label}
          </span>
        )}
      </motion.div>

      <motion.div
        className="absolute rounded-full bg-primary"
        style={{
          left: dotX,
          top: dotY,
          width: 7,
          height: 7,
          x: "-50%",
          y: "-50%",
        }}
        animate={{ scale: config.dotScale }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
    </div>
  );
}
