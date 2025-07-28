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
      title: "Wave Tune",
      description:
        "Built a hand gesture-controlled music player using Python libraries Mediapipe, OpenCV, and Librosa. Developed live video feed overlays enabling real-time control of pitch, volume, and tempo.",
      image: "/assets/img/wave-tune.png",
      tags: ["Python", "Mediapipe", "OpenCV", "Librosa"],
      github: "", 
      demo: null,
    },
    {
      title: "Patriot Pop",
      description:
        "Collaboratively designed a web-based radio management system facilitating role-specific functionalities. Implemented effective data management and real-time synchronization across profiles/roles.",
      image: "/assets/img/project-img1.png",
      tags: ["Javascript", "EJS", "Express", "MongoDB"],
      github: "https://github.com/yash-waikar/patriot-pop",
      demo: null,
    },
    {
      title: "Pitch Desk AI",
      description:
        "Analyzes your pitch desk presentation and gives you a summary and key points. Built with React, Node.js, and OpenAI API.",
      image: "/assets/img/project-img2.png",
      tags: ["OpenAI API", "React", "Node.js"],
      github: "https://github.com/yashwaikar/AI-Pitch-Deck-Analyzer",
      demo: null,
    },
    {
      title: "Cloud Mart",
      description:
        "Developed an Inventory Management Android App using Java, integrating Firebase Cloud Authentication for secure access. Implemented Firestore for real-time inventory updates and offline data synchronization.",
      image: "/assets/img/project-img4.png",
      tags: ["Java", "Firebase", "Android"],
      github: "https://github.com/yash-waikar/Cloud-Mart",
      demo: null,
    },
    {
      title: "InThrift",
      description:
        "InThrift is an in-progress cross-platform thrift store app for Indian ethnic wear, built with React Native, Expo Router, and Lucide React Native, featuring photo uploads, search and filters, user profiles, and a vibrant pink-accented UI.",
      image: "/assets/img/project-img5.png",
      tags: ["React Native", "Expo", "Expo Router", "UI/UX"],
      demo: null,
    },
    {
      title: "Chore Mate",
      description:
        "A very simple Android app built in Java using Android Studio to help organize and track daily chore tasks. Just needed something me to track my daily tasks",
      image: "/assets/img/choremate.png",
      tags: ["Java", "Android Studio", "Task Management", "Android"],
      github: "https://github.com/yash-waikar/Chore-Task-App", 
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
