"use client";

import { MeshGradient } from "@paper-design/shaders-react";

interface PaperShadersBackgroundProps {
  intensity?: number;
  speed?: number;
  effectType?: "mesh" | "dots" | "combined";
}

export function PaperShadersBackground({
  intensity = 1.5,
  speed = 1.0,
  effectType = "mesh",
}: PaperShadersBackgroundProps) {
  return (
    <div className="w-full h-full absolute inset-0 overflow-hidden">
      {effectType === "mesh" && (
        <MeshGradient
          className="w-full h-full absolute inset-0"
          colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
          speed={speed}
        />
      )}

      {effectType === "dots" && (
        <div className="w-full h-full absolute inset-0 bg-black">
          <MeshGradient
            className="w-full h-full"
            colors={["#1a1a1a", "#333333", "#000000", "#ffffff"]}
            speed={speed}
          />
        </div>
      )}

      {effectType === "combined" && (
        <>
          <MeshGradient
            className="w-full h-full absolute inset-0"
            colors={["#000000", "#1a1a1a", "#333333", "#ffffff"]}
            speed={speed * 0.5}
          />
          <div className="w-full h-full absolute inset-0 opacity-60">
            <MeshGradient
              className="w-full h-full"
              colors={["#1a1a1a", "#333333", "#000000", "#ffffff"]}
              speed={speed * 1.5}
            />
          </div>
        </>
      )}
    </div>
  );
}
