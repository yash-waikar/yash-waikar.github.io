"use client";

import { motion } from "motion/react";
import { TextShimmer } from "./ui/shimmer-text";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function Hero({ revealed }: { revealed: boolean }) {
  return (
    <section className="container relative flex min-h-screen flex-col justify-center px-4 py-24 md:px-6">
      <div className="relative z-10 mx-auto max-w-3xl">
        <h1 className="text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          <motion.span
            id="hero-name"
            className="inline-block"
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={
              revealed
                ? { opacity: 1, filter: "blur(0px)" }
                : { opacity: 0, filter: "blur(8px)" }
            }
            transition={{ delay: 0.35, duration: 0.6, ease: EASE_OUT }}
          >
            Yash Waikar.
          </motion.span>
          <br />
          <motion.span
            className="flex w-full flex-wrap items-baseline justify-center gap-x-2 sm:flex-nowrap sm:whitespace-nowrap"
            initial={{ opacity: 0, y: 10 }}
            animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ delay: 0.55, duration: 0.6, ease: EASE_OUT }}
          >
            <span className="relative inline-flex">
              <TextShimmer>Software</TextShimmer>
            </span>
            <span>Engineer.</span>
          </motion.span>
        </h1>
      </div>
    </section>
  );
}
