"use client";

export function GrainyGradientBackground() {
  return (
    <div className="relative h-full w-full overflow-hidden bg-[#0a0f1f]">
      {/* Color blobs — navy, orange, and mauve, matching a grainy mesh-gradient look */}
      <div
        className="absolute inset-0"
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
        className="absolute inset-0 h-full w-full opacity-[0.45] mix-blend-overlay"
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
