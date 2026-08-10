"use client";

import React from "react";
import { cn } from "../../lib/utils";

const ACCENTS = [
  "from-violet-500/40 via-fuchsia-400/25 to-transparent",
  "from-sky-400/40 via-cyan-300/25 to-transparent",
  "from-orange-400/40 via-amber-300/25 to-transparent",
  "from-emerald-400/40 via-teal-300/25 to-transparent",
  "from-rose-400/40 via-pink-300/25 to-transparent",
  "from-indigo-400/40 via-blue-300/25 to-transparent",
];

interface GlassProjectCardProps {
  index: number;
  image?: string;
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export function GlassProjectCard({
  index,
  image,
  title,
  className,
  children,
}: GlassProjectCardProps) {
  const accent = ACCENTS[index % ACCENTS.length];

  return (
    <div
      className={cn(
        "group relative h-full w-full rounded-2xl transition-transform duration-500 ease-out hover:-translate-y-1",
        className,
      )}
      style={{ perspective: "1000px" }}
    >
      {/* Outer soft glow that reveals on hover */}
      <div
        className={cn(
          "pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-70",
          accent,
        )}
      />

      {/* Card body — thick glass edge simulated with layered borders + rings */}
      <div
        className={cn(
          "relative flex h-full flex-col overflow-hidden rounded-2xl",
          "border-2 border-white/70 bg-white/60 backdrop-blur-2xl",
          "dark:border-white/20 dark:bg-white/[0.04]",
          // Ring stack: outer thin dark line (glass thickness) + inner bright rim (light catch)
          "ring-1 ring-black/[0.06] ring-offset-2 ring-offset-transparent",
          // Depth shadow + inset edge highlights
          "shadow-[0_0_0_1px_rgba(255,255,255,0.4)_inset,0_2px_0_0_rgba(255,255,255,0.5)_inset,0_-2px_1px_-1px_rgba(0,0,0,0.08)_inset,0_1px_0_0_rgba(255,255,255,0.9)_inset,0_25px_60px_-20px_rgba(0,0,0,0.3),0_10px_25px_-12px_rgba(0,0,0,0.18)]",
          "dark:shadow-[0_0_0_1px_rgba(255,255,255,0.1)_inset,0_2px_0_0_rgba(255,255,255,0.15)_inset,0_-2px_1px_-1px_rgba(0,0,0,0.5)_inset,0_1px_0_0_rgba(255,255,255,0.2)_inset,0_30px_70px_-20px_rgba(0,0,0,0.7),0_12px_28px_-15px_rgba(0,0,0,0.5)]",
        )}
      >
        {/* Top highlight — bright specular line on the glass rim */}
        <div className="pointer-events-none absolute inset-x-2 top-0 h-[2px] rounded-full bg-gradient-to-r from-transparent via-white to-transparent dark:via-white/60" />

        {/* Bottom shadow line — implies thickness under the glass */}
        <div className="pointer-events-none absolute inset-x-4 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-black/20 to-transparent dark:via-black/60" />

        {/* Ambient color wash — top-center soft glow */}
        <div
          className={cn(
            "pointer-events-none absolute -top-32 left-1/2 h-72 w-[160%] -translate-x-1/2 rounded-full bg-gradient-to-b blur-3xl",
            accent,
          )}
        />

        {/* Image / hero region */}
        <div className="relative h-40 w-full shrink-0 overflow-hidden">
          {image ? (
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className={cn("h-full w-full bg-gradient-to-br", accent)} />
          )}
          {/* Soft fade from image into body */}
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white/60 dark:to-black/40" />
        </div>

        {/* Content */}
        <div className="relative flex flex-1 flex-col p-6">{children}</div>
      </div>
    </div>
  );
}
