"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Timeline } from "./ui/timeline";
import { Badge } from "./ui/badge";
import { GraduationCap, Briefcase } from "lucide-react";
import { LinkPreview } from "./ui/link-preview";
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
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg">
              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <Briefcase className="mr-2 h-5 w-5 text-gray-600" />
                  <h3 className="text-xl font-bold">
                    Junior Software Engineer
                  </h3>
                </div>
                <Badge variant="secondary" className="ml-7">
                  Ampcus Inc.
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Architected and led the frontend for a pharma serialization web
                app, managing a team of three and ensuring DSCSA-standard
                scalability.
                <p>
                  Shipped key AI and location based features for{" "}
                  <LinkPreview
                    url="https://ampcuscomplyx.com"
                    className="font-bold"
                  >
                    ComplyX
                  </LinkPreview>{" "}
                  a TPRM/PCI-DSS compliance SaaS platform using Next.js,
                  TypeScript, React, and Tailwind CSS.
                </p>
              </p>
              <p className="text-muted-foreground mb-4">
                Developed an AI chatbot with LLM orchestration using the Model
                Context Protocol (MCP), integrated with Salesforce to automate
                case generation from supplier queries, reducing manual workload
                by 30% for enterprise clients including Amazon.
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
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg">
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
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg">
              <div className="mb-3">
                <div className="flex items-center mb-2">
                  <Briefcase className="mr-2 h-5 w-5 text-gray-600" />
                  <h3 className="text-xl font-bold">
                    Software Engineer Intern
                  </h3>
                </div>
                <Badge variant="secondary" className="ml-7">
                  Ampcus Inc.
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Refactored old codebases to use client‑side state management using Zustand, optimizing user state handling and overall application performance.
                Utilized Git version control and Azure DevOps for branch management, bug tracking, and work item management
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
    // Education

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
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg">
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
    <section id="experience" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Experience & Education
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground text-center">
              13 months of professional experience in the software industry
            </p>
          </motion.div>
        </div>

        <Timeline data={timelineData} />
      </div>
    </section>
  );
}
