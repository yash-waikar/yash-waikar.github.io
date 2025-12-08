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
import Prism from "../components/Prism";

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const [emailFormOpen, setEmailFormOpen] = useState(false);
  const [isEmailLoading, setIsEmailLoading] = useState(false);
  const words = ["Frontend", "Software", "Product"];
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
        "Sorry, couldn't send the message. Please email me directly at yashpwaikar@gmail.com"
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
          "noopener"
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
      <div className="fixed left-0 top-1/2 z-50 -translate-y-1/2 hidden lg:block">
        <LimelightNavVertical items={navItems} />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <CometCard className="bg-background/80 backdrop-blur-sm rounded-2xl shadow-2xl">
            <div className="p-8">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full transform scale-150" />
              </div>

              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl max-w-3xl">
                Hi! I am Yash Waikar.
                <br />
                <div className="flex justify-center items-baseline flex-wrap gap-x-2">
                  <span>A</span>
                  <span className="relative inline-flex min-w-[120px] sm:min-w-[150px] md:min-w-[180px] justify-center">
                    <TextShimmer>{words[currentWord]}</TextShimmer>
                  </span>
                  <span>Engineer.</span>
                </div>
              </h1>
              <p className="mt-4 text-muted-foreground max-w-[600px] text-center">
                I design and build scalable, user-focused applications.
                Currently exploring AI automation workflows and building
                solutions in that space.
              </p>
              <p className="mt-2 text-muted-foreground text-center">
                In my free time, you can find me singing and composing music.
              </p>
            </div>
          </CometCard>
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
          document.body
        )}
    </section>
  );
}
