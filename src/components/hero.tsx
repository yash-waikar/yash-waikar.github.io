"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import {
  Home,
  Folder,
  Code,
  Briefcase,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { StarsBackground } from "./ui/stars";
import { ShootingStars } from "./ui/shooting-stars";
import { LimelightNavVertical } from "./ui/limelite-dock";
import { TextShimmer } from "./ui/shimmer-text";
import { CometCard } from "./ui/comet-card";
import { Chatbot } from "./chatbot";
import { EmailForm } from "./ui/email-form";
import { sendEmail, type EmailData } from "../services/emailService";
import { toast } from "sonner";

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const [emailFormOpen, setEmailFormOpen] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const words = ["Software"];
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 4000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [words.length]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

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
        message: data.message || "",
        requestType: "contact",
      };

      const result = await sendEmail(emailData);

      if (result.success) {
        setEmailFormOpen(false);
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

  const navItems = [
    {
      id: "home",
      icon: <Home className="w-6 h-6" />,
      label: "Home",
      onClick: () => (window.location.hash = "#home"),
    },
    {
      id: "projects",
      icon: <Folder className="w-6 h-6" />,
      label: "Projects",
      onClick: () => (window.location.hash = "#projects"),
    },

    {
      id: "experience",
      icon: <Briefcase className="w-6 h-6" />,
      label: "Experience",
      onClick: () => (window.location.hash = "#experience"),
    },
    {
      id: "email",
      icon: <Mail className="w-6 h-6" />,
      label: "Contact",
      onClick: () => setEmailFormOpen(true),
    },
    {
      id: "github",
      icon: <Github className="w-6 h-6" />,
      label: "GitHub",
      onClick: () =>
        window.open("https://github.com/yash-waikar", "_blank", "noopener"),
    },
    {
      id: "linkedin",
      icon: <Linkedin className="w-6 h-6" />,
      label: "LinkedIn",
      onClick: () =>
        window.open(
          "https://www.linkedin.com/in/yash-waikar-509866202/",
          "_blank",
          "noopener",
        ),
    },
  ];

  return (
    <section
      id="home"
      className="relative mt-16 min-h-[calc(100vh-4rem)] flex items-center overflow-hidden"
      style={{
        willChange: "contents",
        contain: "layout style paint",
      }}
    >
      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-start">
          <div className="max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Yash Waikar.
              <br />
              <div className="flex items-baseline flex-wrap gap-x-2">
                <span className="relative inline-flex">
                  <TextShimmer>Software</TextShimmer>
                </span>
                <span>Engineer.</span>
              </div>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-[600px]">
              I design and build scalable, user-focused applications. Currently
              exploring AI automation workflows and building solutions in that
              space.
            </p>
            <p className="mt-3 text-lg text-muted-foreground max-w-[600px]">
              In my free time, you can find me singing and composing music.
            </p>
          </div>
          <Chatbot />
        </div>
      </div>

      {typeof document !== "undefined" &&
        createPortal(
          <EmailForm
            isOpen={emailFormOpen}
            onClose={() => setEmailFormOpen(false)}
            requestType="contact"
            onSubmit={handleEmailSubmit}
            isLoading={isEmailLoading}
          />,
          document.body,
        )}
    </section>
  );
}
