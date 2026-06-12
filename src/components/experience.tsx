"use client";

import { motion } from "framer-motion";
import { Timeline } from "./ui/timeline";
import { Badge } from "./ui/badge";
import { GraduationCap, Briefcase } from "lucide-react";
import BorderGlow from "./BorderGlow";

export function Experience() {
  const timelineData = [
    {
      title: "April 2026",
      content: (
        <div className="space-y-4">
          <BorderGlow
            className="w-full rounded-lg"
            backgroundColor="#000000"
            glowColor="280 80 80"
          >
            <div className="relative p-6 overflow-hidden">
              <img
                src="/assets/img/company1 Logo.jpeg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -bottom-4 h-36 w-36 object-contain opacity-[0.07] select-none"
              />
              <Badge
                variant="outline"
                className="absolute top-4 right-4 text-xs whitespace-nowrap"
              >
                April 2026
              </Badge>

              <div className="mb-3 pr-24 sm:pr-0">
                <div className="flex items-center mb-2">
                  <Briefcase className="mr-2 h-5 w-5 text-white-600" />
                  <h3 className="text-xl font-bold">
                    AI Training & Facilitation Specialist
                  </h3>
                </div>
                <Badge variant="secondary" className="ml-7">
                  Ampcus Inc.
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Selected for an Agentic AI Pilot Program with Amazon and
                Salesforce, enabling 9+ small business clients through 1‑on‑1
                consulting and instructor‑led workshops. Design agent
                architectures on AWS Bedrock AgentCore and Salesforce
                Agentforce — including RAG pipelines, action groups, and HITL
                checkpoints.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "AWS Bedrock",
                  "AgentCore",
                  "Salesforce Agentforce",
                  "RAG",
                  "Agentic AI",
                  "HITL",
                  "Responsible AI",
                ].map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </BorderGlow>
        </div>
      ),
    },
    {
      title: "January 2025",
      content: (
        <div className="space-y-4">
          <BorderGlow
            className="w-full rounded-lg"
            backgroundColor="#000000"
            glowColor="280 80 80"
          >
            <div className="relative p-6 overflow-hidden">
              {/* Ampcus logo subtle background */}
              <img
                src="/assets/img/company1 Logo.jpeg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -bottom-4 h-36 w-36 object-contain opacity-[0.07] select-none"
              />
              <Badge
                variant="outline"
                className="absolute top-4 right-4 text-xs whitespace-nowrap"
              >
                January 2025
              </Badge>

              <div className="mb-3 pr-24 sm:pr-0">
                <div className="flex items-center mb-2">
                  <Briefcase className="mr-2 h-5 w-5 text-white-600" />
                  <h3 className="text-xl font-bold">Software Engineer</h3>
                </div>
                <Badge variant="secondary" className="ml-7">
                  Ampcus Inc.
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">
                Driving AI and frontend development for multiple SaaS
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
          </BorderGlow>
        </div>
      ),
    },
    {
      title: "December 2024",
      content: (
        <div className="space-y-4">
          <BorderGlow
            className="w-full rounded-lg"
            backgroundColor="#000000"
            glowColor="138 60 38"
          >
            <div className="relative p-6 overflow-hidden">
              <img
                src="/assets/img/George Mason Logo.png"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-6 -bottom-4 h-40 w-40 object-contain opacity-[0.06] select-none"
              />
              <Badge
                variant="outline"
                className="absolute top-4 right-4 text-xs whitespace-nowrap"
              >
                December 2024
              </Badge>

              <div className="flex items-center mb-3 pr-24 sm:pr-0">
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
          </BorderGlow>
        </div>
      ),
    },
    {
      title: "September 2024",
      content: (
        <div className="space-y-4">
          <BorderGlow
            className="w-full rounded-lg"
            backgroundColor="#000000"
            glowColor="280 80 80"
          >
            <div className="relative p-6 overflow-hidden">
              {/* Ampcus logo subtle background */}
              <img
                src="/assets/img/company1 Logo.jpeg"
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute -right-4 -bottom-4 h-36 w-36 object-contain opacity-[0.07] select-none"
              />
              <Badge
                variant="outline"
                className="absolute top-4 right-4 text-xs whitespace-nowrap"
              >
                September 2024
              </Badge>

              <div className="mb-3 pr-24 sm:pr-0">
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
          </BorderGlow>
        </div>
      ),
    },

    {
      title: "May 2022",
      content: (
        <div className="space-y-4">
          <BorderGlow
            className="w-full rounded-lg"
            backgroundColor="#000000"
            glowColor="211 85 48"
          >
            <div className="relative p-6">
              <Badge
                variant="outline"
                className="absolute top-4 right-4 text-xs whitespace-nowrap"
              >
                May 2022
              </Badge>

              <div className="flex items-center mb-3 pr-24 sm:pr-0">
                <GraduationCap className="mr-2 h-5 w-5 text-white-200" />
                <h3 className="text-xl font-bold">A.S in Computer Science</h3>
              </div>
              <p className="text-lg font-semibold text-muted-foreground">
                NOVA Community College
              </p>
            </div>
          </BorderGlow>
        </div>
      ),
    },
  ];

  return (
    <section className="relative h-auto md:h-screen w-full flex flex-col justify-start md:justify-center pt-8 pb-16 md:py-0 px-4 md:pr-32 md:pl-[25vw] md:items-center overflow-hidden">
      <div className="px-4 md:px-6 relative z-10 w-full md:w-max flex flex-col md:flex-row md:gap-24 lg:gap-32 md:h-screen md:items-center">
        <div className="flex flex-col items-start space-y-4 mb-8 md:mb-0 shrink-0 md:w-[400px] md:sticky md:left-24 md:z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-4xl">
              Experience & Education
            </h2>
            <p className="mt-4 max-w-[700px] text-muted-foreground">
              2+ years of professional experience in the software industry
            </p>
          </motion.div>
        </div>

        {/* Timeline Container */}
        <div className="flex w-full md:w-max pb-4 md:pb-0 md:h-[650px] items-start md:items-center relative">
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
}
