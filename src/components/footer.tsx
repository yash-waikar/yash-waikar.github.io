"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, Linkedin, Mail, Check, Copy } from "lucide-react";
import { GitHubContributions } from "./github-contributions";

const EMAIL = "yashpwaikar@gmail.com";
const REPO = "https://github.com/yash-waikar/yash-waikar.github.io";

type FootLink = { text: string; href?: string; copy?: boolean };
type FootColumn = { title: string; links: FootLink[] };

const columns: FootColumn[] = [
  {
    title: "Crafted by",
    links: [
      { text: "Yash Waikar", href: "https://github.com/yash-waikar" },
      { text: EMAIL, href: `mailto:${EMAIL}`, copy: true },
    ],
  },
  {
    title: "Colophon",
    links: [
      { text: "React", href: "https://react.dev" },
      { text: "TypeScript", href: "https://www.typescriptlang.org" },
      { text: "Tailwind CSS", href: "https://tailwindcss.com" },
    ],
  },
  {
    title: "Project",
    links: [{ text: "Source code", href: REPO }],
  },
];

const iconVariants = {
  initial: { y: 8, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -8, opacity: 0 },
};

export function Footer() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <footer id="contact" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="glass-panel mx-auto w-full rounded-2xl p-8 md:p-10">
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs uppercase tracking-widest text-muted-foreground">
                  {col.title}
                </h3>
                <ul className="mt-3 flex flex-col gap-2 text-sm">
                  {col.links.map((item, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="truncate transition-colors hover:text-foreground"
                        >
                          {item.text}
                        </a>
                      ) : (
                        <span>{item.text}</span>
                      )}

                      {item.copy && (
                        <button
                          onClick={handleCopy}
                          aria-label="Copy email"
                          className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center overflow-hidden text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <AnimatePresence mode="wait">
                            {copied ? (
                              <motion.span
                                key="check"
                                variants={iconVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.12 }}
                                className="absolute"
                              >
                                <Check className="h-3.5 w-3.5 text-emerald-500" />
                              </motion.span>
                            ) : (
                              <motion.span
                                key="copy"
                                variants={iconVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                transition={{ duration: 0.18 }}
                                className="absolute"
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </motion.span>
                            )}
                          </AnimatePresence>
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/yash-waikar-509866202/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a
              href="https://github.com/yash-waikar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </div>

          <div className="mt-4 flex justify-center overflow-x-auto">
            <GitHubContributions
              username="yash-waikar"
              githubProfileUrl="https://github.com/yash-waikar"
            />
          </div>

          <div className="mt-6 border-t border-border/60 pt-6 text-center text-xs text-muted-foreground">
            ©Yash Waikar {new Date().getFullYear()}. All Rights Reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
