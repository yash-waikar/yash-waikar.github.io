"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { GrainyGradientBackground } from "./grainy-gradient-background";

export function ScrollZoomBackground() {
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  return (
    <motion.div style={{ scale }} className="h-full w-full">
      <GrainyGradientBackground />
    </motion.div>
  );
}
