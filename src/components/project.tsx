"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
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
import { AnimatedButton } from "./ui/animated-button";
import { ExternalLink } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

import { EmailForm } from "./ui/email-form";
import { sendEmail, type EmailData } from "../services/emailService";

export function Projects() {
  const [emailForm, setEmailForm] = useState<{
    isOpen: boolean;
    projectName: string;
  }>({
    isOpen: false,
    projectName: "",
  });
  const [isEmailLoading, setIsEmailLoading] = useState(false);

  const handleEmailSubmit = async (data: {
    name: string;
    email: string;
    message?: string;
  }) => {
    setIsEmailLoading(true);

    try {
      const emailData: EmailData = {
        name: data.name,
        email: data.email,
        message: `Project Inquiry: ${emailForm.projectName}\n\n${
          data.message || ""
        }`,
        requestType: "contact",
      };

      const result = await sendEmail(emailData);

      if (result.success) {
        setEmailForm({ isOpen: false, projectName: "" });
        toast.success("Message sent successfully! I'll get back to you soon.");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Email sending failed:", error);
      toast.error(
        "Sorry, couldn't send the message. Please email me directly at yashpwaikar@gmail.com",
      );
    } finally {
      setIsEmailLoading(false);
    }
  };

  const projects = [
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
      github: "https://github.com/yash-waikar/tickettoast",
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
      title: "Agent Café",
      description:
        "Built a personal MVP of an AI agent audit platform using React, D3.js, Node.js, and Prisma. It centralizes multiple agents (powered by Ollama) that draft appeal letters, visualizes real-time workflows, and logs activity to demonstrate practical solutions to debugging challenges in multi-agent systems.",
      image: "/assets/img/project-img9.png",
      tags: [
        "Google Document AI",
        "Ollama",
        "React",
        "D3.js",
        "TypeScript",
        "AG-UI",
      ],
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
      className="relative h-auto md:h-screen w-full md:w-max flex flex-col justify-start md:justify-center py-20 md:py-0 pr-4 md:pr-12"
    >
      <div className="px-4 md:px-6 relative z-10 w-full md:w-max flex flex-col md:flex-row md:h-screen md:items-center">
        <div className="flex flex-col items-start space-y-4 mb-12 shrink-0 md:mb-0 md:mr-12 md:w-[350px]">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Projects
          </h2>
          <p className="max-w-[700px] text-muted-foreground">
            some side quests I have worked on.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-24 pb-12 md:pb-0 md:h-[550px] items-stretch">
          {projects.map((project, index) => (
            <div
              key={index}
              className="w-[85vw] sm:w-[420px] md:w-[450px] shrink-0 h-full"
            >
              <motion.div
                style={{ height: "100%" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0 }}
                viewport={{ once: true, margin: "100px" }}
              >
                <HoverBorderGradient
                  as="div"
                  containerClassName="rounded-xl p-0.5 w-full max-w-none h-full bg-transparent"
                  className="p-0 w-full h-full"
                >
                  <Card className="flex h-full flex-col overflow-hidden border-0 bg-transparent transition-colors relative w-full">
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
                      {project.github ? (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Code
                          </a>
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            setEmailForm({
                              isOpen: true,
                              projectName: project.title,
                            })
                          }
                        >
                          Request Demo
                        </Button>
                      )}
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

      {typeof document !== "undefined" &&
        createPortal(
          <EmailForm
            isOpen={emailForm.isOpen}
            onClose={() => setEmailForm({ isOpen: false, projectName: "" })}
            requestType="contact"
            onSubmit={handleEmailSubmit}
            isLoading={isEmailLoading}
          />,
          document.body,
        )}
    </section>
  );
}
