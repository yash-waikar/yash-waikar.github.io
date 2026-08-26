"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

interface LoadingScreenProps {
  isLoading: boolean;
  onFinish: () => void;
}

const AUTO_DISMISS_MS = 2200;

export function LoadingScreen({ isLoading, onFinish }: LoadingScreenProps) {
  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(onFinish, AUTO_DISMISS_MS);

    const skip = () => onFinish();
    window.addEventListener("click", skip);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", skip);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
    };
  }, [isLoading, onFinish]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-background/30"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: "easeInOut" },
          }}
        >
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
            <div className="glass-panel flex h-16 w-16 items-center justify-center rounded-2xl">
              <span className="text-2xl font-bold tracking-tight">YW</span>
            </div>

            <div className="h-[2px] w-12 overflow-hidden rounded-full bg-foreground/10">
              <motion.div
                className="h-full rounded-full bg-violet-500/70"
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
