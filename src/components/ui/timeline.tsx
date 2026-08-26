"use client";
import React from "react";

interface TimelineEntry {
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  return (
    <div className="relative w-full pl-8">
      {/* Vertical line */}
      <div className="absolute left-3 top-0 bottom-0 w-[2px] bg-border" />

      {data.map((item, index) => (
        <div key={index} className="relative mb-6 last:mb-0">
          {/* Dot */}
          <div className="absolute -left-[1.4rem] top-6 z-10">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-background">
              <div className="h-3 w-3 rounded-full border border-border bg-muted" />
            </div>
          </div>

          {/* Card */}
          <div className="w-full">{item.content}</div>
        </div>
      ))}
    </div>
  );
};
