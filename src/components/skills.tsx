"use client";

import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiPostgresql,
  SiReactquery,
  SiGit,
  SiDocker,
  SiFigma,
} from "react-icons/si";
import { Box, Webhook, Workflow, Bot } from "lucide-react";
import { SkillPill } from "./ui/skill-pill";

const skillGroups = [
  {
    title: "Languages & Frameworks",
    skills: [
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "JavaScript", icon: <SiJavascript /> },
      { name: "Python", icon: <SiPython /> },
      { name: "React.js", icon: <SiReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Node.js", icon: <SiNodedotjs /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss /> },
      { name: "SQL", icon: <SiPostgresql /> },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Zustand", icon: <Box className="h-4 w-4" /> },
      { name: "React Query", icon: <SiReactquery /> },
      { name: "Git", icon: <SiGit /> },
      { name: "Docker", icon: <SiDocker /> },
      { name: "CI/CD", icon: <Workflow className="h-4 w-4" /> },
      { name: "RESTful APIs", icon: <Webhook className="h-4 w-4" /> },
      { name: "Figma", icon: <SiFigma /> },
      { name: "AI Automation", icon: <Bot className="h-4 w-4" /> },
    ],
  },
];

export function Skills() {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Skills
          </h2>
          <p className="mt-4 text-muted-foreground">
            I know some things, always learning more.
          </p>
        </div>

        <div className="mx-auto w-full space-y-8">
          {skillGroups.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-sm font-medium text-muted-foreground">
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <SkillPill
                    key={skill.name}
                    skillName={skill.name}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
