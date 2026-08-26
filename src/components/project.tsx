"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { ArrowUpRight, ExternalLink, Github, Star } from "lucide-react";
import { cn } from "../lib/utils";

import { EmailForm } from "./ui/email-form";
import { sendEmail, type EmailData } from "../services/emailService";

const STAR_CACHE_PREFIX = "gh-stars:";

function useGithubStars(githubUrl?: string) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (!githubUrl) return;
    const repo = githubUrl.replace("https://github.com/", "").replace(/\/$/, "");
    const cacheKey = `${STAR_CACHE_PREFIX}${repo}`;

    const cached = sessionStorage.getItem(cacheKey);
    if (cached !== null) {
      setStars(Number(cached));
      return;
    }

    let cancelled = false;
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (cancelled || !data) return;
        const count = typeof data.stargazers_count === "number" ? data.stargazers_count : 0;
        setStars(count);
        sessionStorage.setItem(cacheKey, String(count));
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [githubUrl]);

  return stars;
}

function GithubStarBadge({ githubUrl }: { githubUrl?: string }) {
  const stars = useGithubStars(githubUrl);

  if (!stars) return null;

  return (
    <div className="flex shrink-0 items-center gap-1 rounded-full border border-foreground/10 px-2 py-1 text-xs text-muted-foreground">
      <Star className="h-3 w-3 fill-current text-amber-400" />
      {stars}
    </div>
  );
}

type Project = {
  title: string;
  description: string;
  image: string;
  imageType?: "logo" | "screenshot";
  tags: string[];
  status?: "live" | "building" | "discontinued";
  github?: string;
  demo?: string | null;
  /** "R G B" triplet used for the hover border/glow accent. */
  glowRgb?: string;
};

function ProjectCard({
  project,
  onRequestDemo,
}: {
  project: Project;
  onRequestDemo: () => void;
}) {
  const status = project.status ?? "live";
  const primaryHref = project.demo || project.github;
  const primaryLabel = project.demo ? "View live" : "View code";
  const primaryIcon = project.demo ? ExternalLink : Github;
  const PrimaryIcon = primaryIcon;

  return (
    <article
      className="glass-panel project-card-glow group flex h-full flex-col overflow-hidden rounded-xl ring-1 ring-foreground/10 ring-offset-4 ring-offset-background transition-colors duration-300 hover:bg-foreground/[0.08]"
      style={
        project.glowRgb
          ? ({ "--glow-rgb": project.glowRgb } as CSSProperties)
          : undefined
      }
    >
      <div className="relative flex h-44 w-full items-center justify-center overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105",
            project.imageType === "screenshot"
              ? "object-top"
              : "object-center mix-blend-screen",
          )}
          style={{
            maskImage: "linear-gradient(to bottom, black 45%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 45%, transparent 100%)",
          }}
          loading="lazy"
        />
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-mono text-2xl font-bold tracking-tight">
            {project.title}
          </h3>
          <span className="flex shrink-0 items-center gap-1.5 text-xs text-muted-foreground">
            <span
              className={cn(
                "relative flex h-2 w-2",
                status === "live" ? "text-emerald-500" : "text-muted-foreground",
              )}
            >
              {status === "live" && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-current" />
            </span>
            {status}
          </span>
        </div>

        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>

        <div className="flex items-center gap-2">
          {primaryHref ? (
            <a
              href={primaryHref}
              target="_blank"
              rel="noopener noreferrer"
              className="glass relative flex flex-1 items-center justify-between rounded-md px-4 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/10"
            >
              <span>{primaryLabel}</span>
              <PrimaryIcon
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ) : (
            <button
              onClick={onRequestDemo}
              className="glass relative flex flex-1 items-center justify-between rounded-md px-4 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/10"
            >
              <span>Request demo</span>
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          )}
          {project.demo && project.github && (
            <Button variant="outline" size="icon" asChild>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View code on GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          <GithubStarBadge githubUrl={project.github} />
        </div>
      </div>
    </article>
  );
}

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
      title: "BridgeAI",
      description:
        "A shared workspace for client-vendor collaboration, with AI-powered Q&A over your contracts.",
      image: "/assets/img/bridgeai-screenshot.png",
      imageType: "screenshot" as const,
      tags: ["Next.js", "Supabase", "Claude API", "pgvector", "RAG"],
      demo: "https://bridgeai-khaki.vercel.app/",
      glowRgb: "139 92 246",
    },
    {
      title: "Ticket Toast",
      description:
        "OCRs parking citations and auto-fills appeal forms for you.",
      image: "/assets/img/Capture-2026-08-24-213240.png",
      imageType: "screenshot" as const,
      tags: [
        "Next.js",
        "JavaScript",
        "TailwindCSS",
        "Gemini AI",
        "Google AI Studio",
        "Vercel",
      ],
      github: "https://github.com/yash-waikar/tickettoast",
      glowRgb: "245 158 11",
    },
    {
      title: "Resume IT",
      description:
        "Build resumes with AI-generated content and ATS scoring, built in.",
      image: "/assets/img/resume-it-screenshot.png",
      imageType: "screenshot" as const,
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
      glowRgb: "59 130 246",
    },
    {
      title: "Agent Café",
      description:
        "Visualizes multiple AI agents drafting letters in real time, so you can see them think.",
      image: "/assets/img/project-img9.png",
      tags: [
        "Google Document AI",
        "Ollama",
        "React",
        "D3.js",
        "TypeScript",
        "AG-UI",
      ],
      glowRgb: "16 185 129",
    },

    {
      title: "Wave Tune",
      description:
        "Wave your hands to control music — pitch, volume, and tempo, live.",
      image: "/assets/img/wave-tune.png",
      tags: ["Python", "Mediapipe", "OpenCV", "Librosa", "JavaScript"],
      github: "",
      demo: null,
      glowRgb: "236 72 153",
    },
    {
      title: "Pitch Desk AI",
      description:
        "AI that reads your pitch deck and scores it like an investor would.",
      image: "/assets/img/project-img2.png",
      tags: ["OpenAI API", "React", "Node.js", "ATS", "Vercel"],
      github: "https://github.com/yashwaikar/AI-Pitch-Deck-Analyzer",
      demo: null,
      glowRgb: "34 211 238",
    },
  ];

  return (
    <section className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Projects
          </h2>
          <p className="mt-4 text-muted-foreground">
            Some side quests I have worked on.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              viewport={{ once: true, margin: "100px" }}
            >
              <ProjectCard
                project={project}
                onRequestDemo={() =>
                  setEmailForm({ isOpen: true, projectName: project.title })
                }
              />
            </motion.div>
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
