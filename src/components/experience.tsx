"use client";

import { useState } from "react";
import { Timeline } from "./ui/timeline";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { GraduationCap, Briefcase, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";

type ExperienceEntry = {
  date: string;
  icon: "briefcase" | "grad";
  title: string;
  org?: string;
  logo?: string;
  extraLogo?: { src: string; alt: string };
  subtitle?: string;
  description?: string;
  tags?: string[];
};

const entries: ExperienceEntry[] = [
  {
    date: "April 2026",
    icon: "briefcase",
    title: "AI Training & Facilitation Specialist",
    org: "Ampcus Inc.",
    logo: "/assets/img/company1 Logo.jpeg",
    extraLogo: { src: "/assets/img/amazon-logo.svg", alt: "Amazon" },
    description:
      "Selected for an Agentic AI Pilot Program with Amazon and Salesforce, enabling 9+ small business clients through 1‑on‑1 consulting and instructor‑led workshops. Design agent architectures on AWS Bedrock AgentCore and Salesforce Agentforce — including RAG pipelines, action groups, and HITL checkpoints.",
    tags: [
      "AWS Bedrock",
      "AgentCore",
      "Salesforce Agentforce",
      "RAG",
      "Agentic AI",
      "HITL",
      "Responsible AI",
    ],
  },
  {
    date: "January 2025",
    icon: "briefcase",
    title: "Software Engineer",
    org: "Ampcus Inc.",
    logo: "/assets/img/company1 Logo.jpeg",
    description:
      "Driving AI and frontend development for multiple SaaS applications—from a pharmaceutical serialization app to an AI automation platform—delivering client‑facing and human‑in‑the‑loop workflows. Happy to connect over coffee if you'd like to hear more!",
    tags: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Zustand",
      "React Query",
      "Node.js",
      "Salesforce",
    ],
  },
  {
    date: "December 2024",
    icon: "grad",
    title: "B.S in Computer Science",
    subtitle: "George Mason University",
    logo: "/assets/img/George Mason Logo.png",
    description:
      "Relevant Coursework: Algorithms, Operating Systems, Data Structures, Formal Methods, Computer Systems, Database Concepts, Object-Oriented Programming, Web App Development",
  },
  {
    date: "September 2024",
    icon: "briefcase",
    title: "Software Engineer Intern",
    org: "Ampcus Inc.",
    logo: "/assets/img/company1 Logo.jpeg",
    description:
      "Refactored old codebases to use client‑side state management using Zustand, optimizing user state handling and overall application performance. Utilized Git version control and Azure DevOps for branch management, bug tracking, and work item management",
    tags: [
      "Next.js",
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Zustand",
      "React Query",
      "Node.js",
      "Salesforce",
    ],
  },
  {
    date: "May 2022",
    icon: "grad",
    title: "A.S in Computer Science",
    subtitle: "NOVA Community College",
  },
];

function ExperienceCard({ entry }: { entry: ExperienceEntry }) {
  const [open, setOpen] = useState(false);
  const hasDetails = Boolean(entry.description || entry.tags?.length);
  const Icon = entry.icon === "grad" ? GraduationCap : Briefcase;

  return (
    <Card className="w-full p-0">
      <button
        type="button"
        onClick={() => hasDetails && setOpen((prev) => !prev)}
        className={cn(
          "flex w-full items-start justify-between gap-3 p-6 text-left",
          hasDetails && "cursor-pointer",
        )}
        aria-expanded={open}
      >
        <div className="flex items-start gap-3 min-w-0">
          {entry.logo && (
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted">
              <img
                src={entry.logo}
                alt=""
                aria-hidden="true"
                className="h-full w-full object-cover"
              />
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-muted-foreground" />
              <h3 className="text-lg font-semibold truncate">{entry.title}</h3>
            </div>
            <div className="mt-1 flex items-center gap-2">
              {entry.org && <Badge variant="secondary">{entry.org}</Badge>}
              {entry.subtitle && (
                <span className="text-sm font-medium text-muted-foreground">
                  {entry.subtitle}
                </span>
              )}
              {entry.extraLogo && (
                <img
                  src={entry.extraLogo.src}
                  alt={entry.extraLogo.alt}
                  className="h-4 w-auto object-contain opacity-70"
                />
              )}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Badge variant="outline" className="text-xs whitespace-nowrap">
            {entry.date}
          </Badge>
          {hasDetails && (
            <ChevronDown
              className={cn(
                "h-4 w-4 text-muted-foreground transition-transform duration-300",
                open && "rotate-180",
              )}
            />
          )}
        </div>
      </button>

      {hasDetails && (
        <div
          className="grid transition-all duration-300 ease-in-out"
          style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="px-6 pb-6">
              {entry.description && (
                <p className="text-muted-foreground">{entry.description}</p>
              )}
              {entry.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.tags.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

export function Experience() {
  const timelineData = entries.map((entry) => ({
    content: <ExperienceCard key={entry.title} entry={entry} />,
  }));

  return (
    <section className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Experience & Education
          </h2>
          <p className="mt-4 text-muted-foreground">
            2+ years of professional experience in the software industry
          </p>
        </div>

        <div className="mx-auto w-full">
          <Timeline data={timelineData} />
        </div>
      </div>
    </section>
  );
}
