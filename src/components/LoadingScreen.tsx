"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SIGNATURE_GLYPHS, SIGNATURE_VIEWBOX } from "./signature-paths";

interface LoadingScreenProps {
  isLoading: boolean;
  onFinish: () => void;
}

const START_DELAY = 0.25;
const WORD_GAP_AFTER = 3; // glyph index of the "h" in "Yash"
const FLOURISH_PATH = "M 95 168 C 190 152, 320 146, 452 128";
const FLOURISH_DURATION = 0.5;
const HOLD_AFTER = 0.6;

// Pen time scales with each glyph's outline length so long letters take longer.
const GLYPH_TIMINGS = (() => {
  let t = START_DELAY;
  return SIGNATURE_GLYPHS.map((glyph, i) => {
    const duration = 0.1 + (glyph.length / 1120) * 0.45;
    const delay = t;
    t += duration * 0.8 + (i === WORD_GAP_AFTER ? 0.15 : 0);
    return { delay, duration };
  });
})();

const last = GLYPH_TIMINGS[GLYPH_TIMINGS.length - 1];
const FLOURISH_DELAY = last.delay + last.duration;
const AUTO_DISMISS_MS = Math.round(
  (FLOURISH_DELAY + FLOURISH_DURATION + HOLD_AFTER) * 1000,
);

export function LoadingScreen({ isLoading, onFinish }: LoadingScreenProps) {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(onFinish, reduceMotion ? 1200 : AUTO_DISMISS_MS);

    const skip = () => onFinish();
    window.addEventListener("click", skip);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, [isLoading, onFinish, reduceMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/30 px-6"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: "easeInOut" },
          }}
        >
          <motion.svg
            viewBox={SIGNATURE_VIEWBOX}
            role="img"
            aria-label="Yash Waikar"
            className="w-[min(82vw,520px)] overflow-visible text-foreground"
            exit={{
              opacity: 0,
              y: -12,
              transition: { duration: 0.4, ease: "easeIn" },
            }}
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
                    strokeOpacity: { delay: delay + duration, duration: 0.3 },
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
                  ease: [0.65, 0, 0.35, 1],
                },
                opacity: { delay: FLOURISH_DELAY, duration: 0.01 },
              }}
            />
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
