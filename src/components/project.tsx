"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";
import { HoverBorderGradient } from "./ui/hover-border-gradient";
import Prism from "./Prism";

export function Projects() {
  const projects = [
    {
      title: "Agent Café",
      description:
        "Developed Visualizer (MVP), an AI AG-UI tool using React + D3.js and a lightweight backend to make multi-agent workflows visible. It shows real-time agent interactions as dynamic graphs with logs for easier debugging and oversight.",
      image: "/assets/img/project-img9.png",
      tags: ["React", "D3.js", "TypeScript", "AG-UI"],
    },
    {
      title: "Ticket Toast",
      description:
        "Next.js + TypeScript app using Google Cloud Document AI to OCR parking citations, extract data, and automate form-filling with Playwright; includes error handling, logging, Tailwind UI, and a CI-ready pipeline.",
      image: "/assets/img/project-img7.png",
      tags: [
        "Next.js",
        "JavaScript",
        "TailwindCSS",
        "Gemini AI",
        "Google AI Studio",
        "Vercel",
      ],
    },
    {
      title: "Resume IT",
      description:
        "A web application for creating professional resumes. Uses Gemini AI for generative resume content and ATS (Applicant Tracking System) analysis to optimize resumes. Deployed on Vercel. ",
      image: "/assets/img/resume-it.png",
      tags: [
        "Next.js",
        "JavaScript",
        "TailwindCSS",
        "Gemini AI",
        "Google AI Studio",
        "Vercel",
      ],
      github: "https://github.com/yash-waikar/resume-it",
      demo: "https://resume-it-xi.vercel.app/",
    },

    {
      title: "Wave Tune",
      description:
        "Hand gesture-controlled music player using Python libraries Mediapipe, OpenCV, and Librosa. Real-time control of pitch, volume, and tempo via live video feed overlays.",
      image: "/assets/img/wave-tune.png",
      tags: ["Python", "Mediapipe", "OpenCV", "Librosa", "JavaScript"],
      github: "",
      demo: null,
    },
    {
      title: "Pitch Desk AI",
      description:
        "Analyzes pitch deck presentations using AI and provides summaries and key points. Uses ATS techniques for evaluation. Built with React, Node.js, OpenAI API, and deployed on Vercel.",
      image: "/assets/img/project-img2.png",
      tags: ["OpenAI API", "React", "Node.js", "ATS", "Vercel"],
      github: "https://github.com/yashwaikar/AI-Pitch-Deck-Analyzer",
      demo: null,
    },

    {
      title: "InThrift",
      description:
        "Cross-platform thrift store app for Indian ethnic wear, built with React Native, Expo Router, and Lucide React Native. Features photo uploads, search, filters, user profiles, and a vibrant UI.",
      image: "/assets/img/project-img5.png",
      tags: ["React Native", "Expo", "Expo Router", "UI/UX"],
      demo: null,
    },
  ];

  return (
    <section
      id="projects"
      className="relative py-20 overflow-hidden"
      style={{
        willChange: "transform",
        transform: "translate3d(0, 0, 0)",
        contain: "layout style paint",
        contentVisibility: "auto",
        transformStyle: "preserve-3d",
      }}
    >
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Projects
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground text-center">
            some side quests I have worked on.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="h-full"
              style={{ contain: "layout style paint" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0 }}
                viewport={{ once: true, margin: "100px" }}
              >
                <HoverBorderGradient
                  as="div"
                  containerClassName="rounded-xl p-0.5 w-full max-w-sm mx-auto h-full"
                  className="bg-transparent p-0 w-full h-full"
                >
                  <Card
                    className="flex h-full flex-col overflow-hidden border-0 bg-background transition-colors relative w-full min-h-[500px]"
                    style={{ contain: "layout style paint" }}
                  >
                    <GlowingEffect
                      blur={80}
                      spread={250}
                      glow
                      disabled={false}
                      className="z-0"
                    />
                    <div className="h-40 w-full overflow-hidden bg-muted">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform hover:scale-105 duration-500"
                      />
                    </div>
                    <CardHeader className="text-center">
                      <CardTitle>{project.title}</CardTitle>
                      <div className="flex flex-wrap justify-center gap-2 pt-2">
                        {project.tags.map((tag: string, i: number) => (
                          <Badge key={i} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <CardDescription className="text-sm text-muted-foreground text-center flex-1">
                        {project.description}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="mt-auto flex justify-center gap-4 flex-shrink-0">
                      <Button variant="outline" size="sm" asChild>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Code
                        </a>
                      </Button>
                      {project.demo && (
                        <Button size="sm" asChild>
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                </HoverBorderGradient>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
