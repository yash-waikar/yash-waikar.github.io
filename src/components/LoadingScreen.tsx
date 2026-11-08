"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { SIGNATURE_GLYPHS, SIGNATURE_VIEWBOX } from "./signature-paths";

interface LoadingScreenProps {
  onReveal: () => void;
}

const START_DELAY = 0.15;
const WORD_GAP_AFTER = 3; // glyph index of the "h" in "Yash"
const FLOURISH_PATH = "M 95 168 C 190 152, 320 146, 452 128";
const FLOURISH_DURATION = 0.3;
const HOLD_AFTER = 0.1;
const EXIT_DURATION = 0.8;
const EASE_GLIDE = [0.65, 0, 0.35, 1] as const;

// Pen time scales with each glyph's outline length so long letters take longer.
const GLYPH_TIMINGS = (() => {
  let t = START_DELAY;
  return SIGNATURE_GLYPHS.map((glyph, i) => {
    const duration = 0.08 + (glyph.length / 1120) * 0.26;
    const delay = t;
    t += duration * 0.72 + (i === WORD_GAP_AFTER ? 0.06 : 0);
    return { delay, duration };
  });
})();

const last = GLYPH_TIMINGS[GLYPH_TIMINGS.length - 1];
const FLOURISH_DELAY = last.delay + last.duration * 0.6;
const AUTO_DISMISS_MS = Math.round(
  (FLOURISH_DELAY + FLOURISH_DURATION + HOLD_AFTER) * 1000,
);

type ExitTarget = { x: number; y: number; scale: number };

export function LoadingScreen({ onReveal }: LoadingScreenProps) {
  const reduceMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const exitingRef = useRef(false);
  const onRevealRef = useRef(onReveal);
  onRevealRef.current = onReveal;

  const [exit, setExit] = useState<ExitTarget | null>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    // Glide the signature onto the hero heading while the site fades in
    // underneath, so the handoff has no empty frame.
    const startExit = () => {
      if (exitingRef.current) return;
      exitingRef.current = true;

      let target: ExitTarget = { x: 0, y: 0, scale: 1 };
      const svg = svgRef.current;
      const name = document.getElementById("hero-name");
      if (svg && name && !reduceMotion) {
        const from = svg.getBoundingClientRect();
        const to = name.getBoundingClientRect();
        const onScreen = to.bottom > 0 && to.top < window.innerHeight;
        if (onScreen && from.width > 0) {
          target = {
            x: to.left + to.width / 2 - (from.left + from.width / 2),
            y: to.top + to.height / 2 - (from.top + from.height / 2),
            scale: to.width / from.width,
          };
        }
      }

      setExit(target);
      onRevealRef.current();
    };

    const timer = setTimeout(startExit, reduceMotion ? 600 : AUTO_DISMISS_MS);

    window.addEventListener("click", startExit);
    window.addEventListener("keydown", startExit);
    window.addEventListener("wheel", startExit, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", startExit);
      window.removeEventListener("keydown", startExit);
      window.removeEventListener("wheel", startExit);
    };
  }, [reduceMotion]);

  if (gone) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-6"
      style={{ pointerEvents: exit ? "none" : "auto" }}
    >
      <motion.div
        className="absolute inset-0 bg-background/30"
        initial={{ opacity: 1 }}
        animate={{ opacity: exit ? 0 : 1 }}
        transition={{ duration: EXIT_DURATION, ease: "easeInOut" }}
      />

      <motion.div
        className="relative"
        initial={{ opacity: 1 }}
        animate={
          exit
            ? {
                x: exit.x,
                y: exit.y,
                scale: exit.scale,
                opacity: 0,
                filter: "blur(5px)",
                transition: {
                  duration: EXIT_DURATION,
                  ease: EASE_GLIDE,
                  opacity: { duration: 0.55, delay: 0.25, ease: "easeIn" },
                },
              }
            : { opacity: 1 }
        }
        onAnimationComplete={() => {
          if (exit) setGone(true);
        }}
      >
        <svg
          ref={svgRef}
          viewBox={SIGNATURE_VIEWBOX}
          role="img"
          aria-label="Yash Waikar"
          className="w-[min(82vw,520px)] overflow-visible text-foreground"
        >
          {SIGNATURE_GLYPHS.map((glyph, i) => {
            const { delay, duration } = GLYPH_TIMINGS[i];
            return (
              <motion.path
                key={i}
                d={glyph.d}
                fill="currentColor"
                stroke="currentColor"
                strokeWidth={1.1}
                strokeLinecap="butt"
                strokeLinejoin="round"
                initial={
                  reduceMotion
                    ? false
                    : { pathLength: 0, fillOpacity: 0, strokeOpacity: 1 }
                }
                animate={{ pathLength: 1, fillOpacity: 1, strokeOpacity: 0 }}
                transition={{
                  pathLength: { delay, duration, ease: "easeInOut" },
                  fillOpacity: {
                    delay: delay + duration * 0.55,
                    duration: duration * 0.9,
                    ease: "easeOut",
                  },
                  strokeOpacity: { delay: delay + duration, duration: 0.2 },
                }}
              />
            );
          })}
          <motion.path
            d={FLOURISH_PATH}
            fill="none"
            stroke="rgb(204 85 0)"
            strokeWidth={2.4}
            strokeLinecap="round"
            initial={reduceMotion ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{
              pathLength: {
                delay: FLOURISH_DELAY,
                duration: FLOURISH_DURATION,
                ease: EASE_GLIDE,
              },
              opacity: { delay: FLOURISH_DELAY, duration: 0.01 },
            }}
          />
        </svg>
      </motion.div>
    </div>
  );
}
