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

export function Projects() {
  const projects = [
    {
      title: "Resume IT",
      description:
        "A web application for creating professional resumes. Uses Gemini AI for generative resume content and ATS (Applicant Tracking System) analysis to optimize resumes. Deployed on Vercel. ",
      image: "/assets/img/resume-it.png",
      tags: ["Next.js", "JavaScript", "TailwindCSS", "Gemini AI", "Google AI Studio", "Vercel"],
      github: "https://github.com/yash-waikar/resume-it",
      demo: "https://resume-it-xi.vercel.app/",
    },
    {
      title: "Wave Tune",
      description:
        "Hand gesture-controlled music player using Python libraries Mediapipe, OpenCV, and Librosa. Real-time control of pitch, volume, and tempo via live video feed overlays.",
      image: "/assets/img/wave-tune.png",
      tags: ["Python", "Mediapipe", "OpenCV", "Librosa"],
      github: "", 
      demo: null,
    },
    {
      title: "Patriot Pop",
      description:
        "Web-based radio management system with role-specific functionalities, effective data management, and real-time synchronization. Deployed on Vercel.",
      image: "/assets/img/project-img1.png",
      tags: ["Javascript", "EJS", "Express", "MongoDB", "Vercel"],
      github: "https://github.com/yash-waikar/patriot-pop",
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
      title: "Cloud Mart",
      description:
        "Inventory Management Android App using Java, with Firebase Cloud Authentication for secure access. Real-time inventory updates and offline data sync via Firestore.",
      image: "/assets/img/project-img4.png",
      tags: ["Java", "Firebase", "Android"],
      github: "https://github.com/yash-waikar/Cloud-Mart",
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
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter mb-8 text-center">
          Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="max-w-sm mx-auto flex h-full flex-col overflow-hidden border border-muted bg-background hover:border-primary/20 transition-colors relative">
                <GlowingEffect blur={160} spread={500} glow disabled={false} className="z-0" />
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
                <CardContent className="flex-1">
                  <CardDescription className="text-sm text-muted-foreground text-center">
                    {project.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="mt-auto flex justify-center gap-4">
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
