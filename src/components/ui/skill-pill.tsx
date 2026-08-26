"use client";

import { motion } from "motion/react";

type SkillPillProps = {
  skillName: string;
  icon?: React.ReactNode;
};

export function SkillPill({ skillName, icon }: SkillPillProps) {
  return (
    <motion.div
      className="glass flex w-fit cursor-default items-center gap-2 overflow-hidden rounded-lg px-3 py-1.5 text-sm transition-colors hover:bg-foreground/10"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {icon && (
        <div className="relative h-4 w-4 shrink-0 overflow-hidden">
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            variants={{
              rest: { y: 0, opacity: 1 },
              hover: { y: "-100%", opacity: 0 },
            }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {icon}
          </motion.span>
          <motion.span
            className="absolute inset-0 flex items-center justify-center"
            variants={{
              rest: { y: "100%", opacity: 0 },
              hover: { y: 0, opacity: 1 },
            }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {icon}
          </motion.span>
        </div>
      )}
      <span className="font-medium whitespace-nowrap">{skillName}</span>
    </motion.div>
  );
}
