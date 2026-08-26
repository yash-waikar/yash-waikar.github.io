"use client";

// Two overlapping layers, each a single continuous linear-gradient mask (no
// banding/seams possible), so blur eases in gradually and strengthens only
// in the last stretch right at the bottom edge.
export function BottomScrollBlur() {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-20 md:h-28">
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          maskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 55%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 55%, black 100%)",
        }}
      />
    </div>
  );
}
