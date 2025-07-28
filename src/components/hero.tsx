"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ArrowRight, Home, Folder, Code, Briefcase, Github, Linkedin } from "lucide-react";
import { StarsBackground } from "./ui/stars";
import { ShootingStars } from "./ui/shooting-stars";
import { LimelightNav } from "./ui/limelite-dock";
import { TextShimmer } from "./ui/shimmer-text"; 

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Software", "Frontend", "Product"];
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
  }, []);

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
      id: "skills",
      icon: <Code className="w-6 h-6" />,
      label: "Skills",
      onClick: () => (window.location.hash = "#skills"),
    },
    {
      id: "experience",
      icon: <Briefcase className="w-6 h-6" />,
      label: "Experience",
      onClick: () => (window.location.hash = "#experience"),
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
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden dot-pattern animated-gradient"
    >
      <StarsBackground
        starDensity={0.00003}
        className="absolute inset-0 pointer-events-none z-0"
      />
      <ShootingStars className="absolute inset-0 pointer-events-none z-0" />

      <div className="fixed left-1/2 top-2 z-50 -translate-x-1/2">
        <LimelightNav items={navItems} />
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full transform scale-150" />
          </div>

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl max-w-3xl">
            I am Yash Waikar.
            <br />
            <div className="flex justify-center items-baseline">
              <span className="mr-2">A</span>
              <span className="relative inline-flex w-48 justify-center">
                <TextShimmer>{words[currentWord]}</TextShimmer>
              </span>
              <span className="ml-2">Engineer.</span>
            </div>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-[600px] text-center backdrop-blur-sm">
            Recent Computer Science graduate from George Mason University with a
            passion for building scalable, user-focused applications. Currently
            exploring AI automation workflows and building solutions in that
            space.
          </p>
          <p className="mt-2 text-muted-foreground text-center backdrop-blur-sm">
            In my free time, you can find me singing and composing music.
          </p>

          <Button variant={"outline"} className="mt-6">
            <a href="mailto:yashpwaikar@gmail.com">Contact Me</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
