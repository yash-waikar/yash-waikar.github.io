"use client";
import React, { useState, useEffect, useRef } from "react";

import { motion } from "motion/react";
import { cn } from "../../lib/utils";

type Direction = "TOP" | "LEFT" | "BOTTOM" | "RIGHT";

export function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  bluePurple = false,
  disableAnimation = false,
  accentColor,
  ...props
}: React.PropsWithChildren<
  {
    as?: React.ElementType;
    containerClassName?: string;
    className?: string;
    duration?: number;
    clockwise?: boolean;
    bluePurple?: boolean;
    disableAnimation?: boolean;
    accentColor?: string;
  } & React.HTMLAttributes<HTMLElement>
>) {
  const [hovered, setHovered] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>("TOP");

  const Component = Tag as any;

  const rotateDirection = (currentDirection: Direction): Direction => {
    const directions: Direction[] = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap: Record<Direction, string> = accentColor
    ? {
        TOP: `radial-gradient(20.7% 50% at 50% 0%, ${accentColor} 0%, transparent 100%)`,
        LEFT: `radial-gradient(16.6% 43.1% at 0% 50%, ${accentColor} 0%, transparent 100%)`,
        BOTTOM: `radial-gradient(20.7% 50% at 50% 100%, ${accentColor} 0%, transparent 100%)`,
        RIGHT: `radial-gradient(16.2% 41.2% at 100% 50%, ${accentColor} 0%, transparent 100%)`,
      }
    : bluePurple
      ? {
          TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(249, 79.10%, 53.10%) 0%, rgba(139, 92, 246, 0) 100%)",
          LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(211, 97.00%, 38.60%) 0%, rgba(139, 92, 246, 0) 100%)",
          BOTTOM:
            "radial-gradient(20.7% 50% at 50% 100%, hsl(19, 77.00%, 44.30%) 0%, rgba(139, 92, 246, 0) 100%)",
          RIGHT:
            "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(134, 82.30%, 39.80%) 0%, rgba(139, 92, 246, 0) 100%)",
        }
      : {
          TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
          LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
          BOTTOM:
            "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
          RIGHT:
            "radial-gradient(16.2% 41.199999999999996% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
        };

  const highlight = accentColor
    ? `radial-gradient(75% 181.15942028985506% at 50% 50%, ${accentColor} 0%, transparent 100%)`
    : bluePurple
      ? "radial-gradient(75% 181.15942028985506% at 50% 50%, #8B5CF6 0%, rgba(139, 92, 246, 0) 100%)"
      : "radial-gradient(75% 181.15942028985506% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    if (!hovered && !disableAnimation) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, disableAnimation]);
  return (
    <Component
      onMouseEnter={(event: React.MouseEvent<HTMLDivElement>) => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "relative flex rounded-full border content-center bg-black/20 hover:bg-black/10 transition duration-500 dark:bg-white/20 items-center flex-col flex-nowrap h-min justify-center overflow-visible p-px decoration-clone",
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          "w-full text-white z-10 bg-background rounded-[inherit] overflow-visible",
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "flex-none inset-0 overflow-hidden absolute z-0 rounded-[inherit]",
        )}
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="bg-background absolute z-1 flex-none inset-[2px] rounded-[100px]" />
    </Component>
  );
}
