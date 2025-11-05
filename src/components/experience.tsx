"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Timeline } from "./ui/timeline";
import { Badge } from "./ui/badge";
import { GraduationCap, Briefcase } from "lucide-react";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

export function Experience() {
  const timelineData = [
    {
      title: "January 2025",
      content: (
        <div className="space-y-4">
          <HoverBorderGradient
            containerClassName="rounded-lg w-full"
            className="w-full"
            as="div"
            bluePurple={true}
            disableAnimation={true}
          >
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg relative">
              <Badge
                variant="outline"
                className="absolute top-4 right-4 text-xs"
              >
                January 2025
              </Badge>

              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <Briefcase className="mr-2 h-5 w-5 text-white-600" />
                  <h3 className="text-xl font-bold">
                    Junior Software Engineer
                  </h3>
                </div>
                <Badge variant="secondary" className="ml-7">
                  Ampcus Inc.
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Led frontend and product development for multiple SaaS
                applications—from a pharmaceutical serialization app to an AI
                automation platform—delivering client‑facing and
                human‑in‑the‑loop workflows. Happy to connect over coffee if
                you’d like to hear more!
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "TypeScript",
                  "React",
                  "Tailwind CSS",
                  "Zustand",
                  "React Query",
                  "Node.js",
                  "Salesforce",
                ].map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </HoverBorderGradient>
        </div>
      ),
    },
    {
      title: "December 2024",
      content: (
        <div className="space-y-4">
          <HoverBorderGradient
            containerClassName="rounded-lg w-full"
            className="w-full"
            as="div"
            bluePurple={true}
            disableAnimation={true}
          >
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg relative">
              <Badge
                variant="outline"
                className="absolute top-4 right-4 text-xs"
              >
                December 2024
              </Badge>

              <div className="flex items-center mb-3">
                <GraduationCap className="mr-2 h-5 w-5 text-white-200" />
                <h3 className="text-xl font-bold">B.S in Computer Science</h3>
              </div>
              <p className="text-lg font-semibold text-muted-foreground mb-2">
                George Mason University
              </p>
              <p className="text-muted-foreground">
                Relevant Coursework: Algorithms, Operating Systems, Data
                Structures, Formal Methods, Computer Systems, Database Concepts,
                Object-Oriented Programming, Web App Development
              </p>
            </div>
          </HoverBorderGradient>
        </div>
      ),
    },
    {
      title: "September 2024",
      content: (
        <div className="space-y-4">
          <HoverBorderGradient
            containerClassName="rounded-lg w-full"
            className="w-full"
            as="div"
            bluePurple={true}
            disableAnimation={true}
          >
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg relative">
              <Badge
                variant="outline"
                className="absolute top-4 right-4 text-xs"
              >
                September 2024
              </Badge>

              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <Briefcase className="mr-2 h-5 w-5 text-white-600" />
                  <h3 className="text-xl font-bold">
                    Software Engineer Intern
                  </h3>
                </div>
                <Badge variant="secondary" className="ml-7">
                  Ampcus Inc.
                </Badge>
              </div>

              <p className="text-muted-foreground mb-4">
                Refactored old codebases to use client‑side state management
                using Zustand, optimizing user state handling and overall
                application performance. Utilized Git version control and Azure
                DevOps for branch management, bug tracking, and work item
                management
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "Next.js",
                  "TypeScript",
                  "React",
                  "Tailwind CSS",
                  "Zustand",
                  "React Query",
                  "Node.js",
                  "Salesforce",
                ].map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </HoverBorderGradient>
        </div>
      ),
    },

    {
      title: "May 2022",
      content: (
        <div className="space-y-4">
          <HoverBorderGradient
            containerClassName="rounded-lg w-full"
            className="w-full"
            as="div"
            bluePurple={true}
            disableAnimation={true}
          >
            <div className="bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 p-6 rounded-lg relative">
              <Badge
                variant="outline"
                className="absolute top-4 right-4 text-xs"
              >
                May 2022
              </Badge>

              <div className="flex items-center mb-3">
                <GraduationCap className="mr-2 h-5 w-5 text-white-200" />
                <h3 className="text-xl font-bold">A.S in Computer Science</h3>
              </div>
              <p className="text-lg font-semibold text-muted-foreground">
                NOVA Community College
              </p>
            </div>
          </HoverBorderGradient>
        </div>
      ),
    },
  ];

  return (
    <section id="experience" className="relative py-20 overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-3xl">
              Experience & Education
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground text-center">
              1+ year of professional experience in the software industry
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="max-w-7xl mx-auto px-4">
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
}
