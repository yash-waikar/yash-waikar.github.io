"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { motion, MotionProps, AnimatePresence } from "framer-motion";
import React from "react";

const MotionDiv = motion.div as React.ComponentType<
  React.HTMLAttributes<HTMLDivElement> & MotionProps
>;
const MotionSpan = motion.span as React.ComponentType<
  React.HTMLAttributes<HTMLSpanElement> & MotionProps
>;

export function Hero() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Software", "Junior", "Product"];
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

  return (
    <section
      id="home"
      className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden dot-pattern animated-gradient"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-3xl"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <MotionDiv
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center"
        >
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-primary/10 blur-xl rounded-full transform scale-150"></div>
          </div>

          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl max-w-3xl">
            I am Yash Waikar.
            <br />
            <div className="flex justify-center items-baseline">
              <span className="mr-2">A</span>
              <span className="relative inline-flex w-48 justify-center">
                <AnimatePresence mode="wait">
                  <MotionSpan
                    key={currentWord}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {words[currentWord]}
                  </MotionSpan>
                </AnimatePresence>
              </span>
              <span className="ml-2">Engineer.</span>
            </div>
          </h1>
          <p className="mt-4 text-muted-foreground max-w-[600px] text-center backdrop-blur-sm">
            Recent Computer Science graduate from George Mason University with a
            passion for building scalable, user-focused applications. I enjoy
            turning innovation into scalable product integrations while
            continuously learning  new frameworks and technologies. Currently
            exploring AI automation workflows and building solutions
            in that space.
          </p>
          <p className="mt-2 text-muted-foreground text-center backdrop-blur-sm">
            In my free time, you can find me singing and composing music.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button asChild className="animate-float">
              <a href="mailto:yashpwaikar@gmail.com">
                Contact Me <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </MotionDiv>
      </div>
    </section>
  );
}
