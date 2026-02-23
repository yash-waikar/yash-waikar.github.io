"use client";

import { motion, AnimatePresence } from "motion/react";
import GradientBlinds from "./ui/gradient-blinds";

interface LoadingScreenProps {
  isLoading: boolean;
}

export function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: "easeInOut" },
          }}
        >
          {/* GradientBlinds full-screen background */}
          <div className="absolute inset-0">
            <GradientBlinds
              gradientColors={[
                "#0a0a0a",
                "#1a1a2e",
                "#16213e",
                "#0f3460",
                "#1a1a2e",
                "#0a0a0a",
              ]}
              angle={35}
              noise={0.18}
              blindCount={20}
              blindMinWidth={40}
              mouseDampening={0.2}
              spotlightRadius={0.6}
              spotlightSoftness={1.2}
              spotlightOpacity={0.8}
              mirrorGradient={true}
              mixBlendMode="normal"
            />
          </div>

          {/* Centered YW logo */}
          <motion.div
            className="relative flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            exit={{
              opacity: 0,
              y: -12,
              transition: { duration: 0.4, ease: "easeIn" },
            }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 120,
                height: 120,
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
              }}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
            />

            {/* YW tile */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-lg shadow-black/40">
              <span className="text-2xl font-bold text-white tracking-tight">
                YW
              </span>
            </div>

            {/* Loading bar */}
            <div className="w-12 h-[2px] rounded-full bg-white/10 overflow-hidden">
              <motion.div
                className="h-full bg-white/50 rounded-full"
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 0.9,
                  ease: "easeInOut",
                  delay: 0.4,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
