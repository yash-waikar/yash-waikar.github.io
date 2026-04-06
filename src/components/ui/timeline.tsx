"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // For horizontal timeline, we simply arrange items horizontally.
  return (
    <div
      className="w-full font-sans flex items-center h-full relative"
      ref={containerRef}
    >
      <div
        ref={ref}
        className="relative flex items-center w-full min-w-max h-full px-10 gap-24 md:gap-32"
      >
        {/* Background Horizontal Line */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[2px] bg-neutral-200 dark:bg-neutral-800" />

        {data.map((item, index) => {
          const isTop = index % 2 === 0;
          return (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center w-[85vw] sm:w-[500px] md:w-[600px] shrink-0 h-[600px]"
            >
              {/* Vertical Connector Line */}
              <div
                className={`absolute left-1/2 w-[2px] bg-neutral-300 dark:bg-neutral-600 -translate-x-1/2 ${isTop ? "bottom-1/2 h-8" : "top-1/2 h-8"}`}
              />

              {/* Dot on the timeline */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-white dark:bg-black">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
                </div>
              </div>

              {/* Card Container Top or Bottom */}
              <div
                className={`absolute ${isTop ? "bottom-[calc(50%+2rem)]" : "top-[calc(50%+2rem)]"} w-full flex justify-center`}
              >
                <div className="w-full">{item.content}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
