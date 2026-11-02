"use client";

import { motion, useScroll, useTransform } from "motion/react";

export function GrainyGradientBackground() {
  const { scrollYProgress } = useScroll();
  // The light gradient is two viewports tall and drifts up as you scroll, so
  // the red recedes off the top and the page settles into periwinkle -> snow.
  const lightY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#FAFBFD] dark:bg-[#0a0f1f]">
      {/* Light: Inferno (#AA0003) -> Periwinkle (#BFB4DC) -> Bright Snow (#FAFBFD) */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[200%] dark:hidden"
        style={{
          y: lightY,
          background: `
            radial-gradient(75% 26% at 80% 0%, rgba(170,0,3,1) 0%, rgba(170,0,3,0.7) 45%, rgba(170,0,3,0) 100%),
            radial-gradient(90% 20% at 38% 30%, rgba(191,180,220,0.95) 0%, rgba(191,180,220,0) 100%),
            linear-gradient(180deg, #AA0003 0%, #BFB4DC 38%, #FAFBFD 80%, #FAFBFD 100%)
          `,
        }}
      />

      {/* Dark: color blobs — navy, orange, and mauve, matching a grainy mesh-gradient look */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          background: `
            radial-gradient(55% 45% at 12% 15%, rgba(30,44,74,0.95) 0%, rgba(30,44,74,0.5) 45%, transparent 75%),
            radial-gradient(60% 55% at 68% 50%, rgba(199,104,31,0.9) 0%, rgba(199,104,31,0.45) 40%, transparent 72%),
            radial-gradient(55% 55% at 88% 88%, rgba(168,140,140,0.75) 0%, rgba(168,140,140,0.3) 45%, transparent 75%),
            linear-gradient(155deg, #0a0f1f 0%, #131c33 30%, #2c1c12 65%, #0a0f1f 100%)
          `,
        }}
      />

      {/* Film-grain overlay */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.3] mix-blend-overlay dark:opacity-[0.45]"
        aria-hidden="true"
      >
        <filter id="grain-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            stitchTiles="stitch"
            result="noise"
          />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="linear" slope="2.2" intercept="-0.6" />
            <feFuncG type="linear" slope="2.2" intercept="-0.6" />
            <feFuncB type="linear" slope="2.2" intercept="-0.6" />
          </feComponentTransfer>
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-noise)" />
      </svg>
    </div>
  );
}
