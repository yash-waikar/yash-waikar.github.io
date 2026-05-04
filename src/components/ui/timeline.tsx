"use client";
import React, { useRef } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mobile: vertical list. md+: horizontal alternating timeline.
  return (
    <div
      className="w-full font-sans h-full relative"
      ref={containerRef}
    >
      {/* ── MOBILE vertical layout ── */}
      <div className="flex md:hidden flex-col relative pl-8">
        {/* Vertical line */}
        <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-neutral-200 dark:bg-neutral-800" />

        {data.map((item, index) => (
          <div key={index} className="relative mb-8 last:mb-0">
            {/* Dot */}
            <div className="absolute -left-[1.4rem] top-4 z-10">
              <div className="h-5 w-5 rounded-full flex items-center justify-center bg-white dark:bg-black">
                <div className="h-3 w-3 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
              </div>
            </div>

            {/* Date label */}
            <p className="text-xs text-muted-foreground mb-2 font-medium">{item.title}</p>

            {/* Card */}
            <div className="w-full">{item.content}</div>
          </div>
        ))}
      </div>

      {/* ── DESKTOP horizontal layout ── */}
      <div
        ref={ref}
        className="hidden md:flex items-center w-full min-w-max h-full px-10 gap-24 md:gap-32 relative"
      >
        {/* Background Horizontal Line */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full h-[2px] bg-neutral-200 dark:bg-neutral-800" />

        {data.map((item, index) => {
          const isTop = index % 2 === 0;
          return (
            <div
              key={index}
              className="relative flex flex-col items-center justify-center w-[500px] md:w-[600px] shrink-0 h-[600px]"
            >
              {/* Vertical Connector Line */}
              <div
                className={`absolute left-1/2 w-[2px] bg-neutral-300 dark:bg-neutral-600 -translate-x-1/2 ${
                  isTop ? "bottom-1/2 h-8" : "top-1/2 h-8"
                }`}
              />

              {/* Dot on the timeline */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                <div className="h-6 w-6 rounded-full flex items-center justify-center bg-white dark:bg-black">
                  <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
                </div>
              </div>

              {/* Card Container Top or Bottom */}
              <div
                className={`absolute ${
                  isTop ? "bottom-[calc(50%+2rem)]" : "top-[calc(50%+2rem)]"
                } w-full flex justify-center`}
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
