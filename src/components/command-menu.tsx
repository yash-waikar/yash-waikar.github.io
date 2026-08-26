"use client";

import { useEffect, useRef, useState } from "react";
import { Search, Home, User, Folder, Briefcase, Sparkles, Mail, X } from "lucide-react";
import { cn } from "../lib/utils";

interface CommandSection {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const SECTIONS: CommandSection[] = [
  { id: "home", title: "Home", description: "Back to the top", icon: Home },
  { id: "about", title: "About", description: "A bit about me", icon: User },
  { id: "projects", title: "Projects", description: "Things I've built", icon: Folder },
  { id: "experience", title: "Experience", description: "Where I've worked", icon: Briefcase },
  { id: "skills", title: "Skills", description: "What I work with", icon: Sparkles },
  { id: "contact", title: "Contact", description: "Get in touch", icon: Mail },
];

interface CommandMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (id: string) => void;
}

export function CommandMenu({ isOpen, onClose, onNavigate }: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = SECTIONS.filter(
    (section) =>
      section.title.toLowerCase().includes(query.toLowerCase()) ||
      section.description.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      inputRef.current?.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
          break;
        case "Enter":
          e.preventDefault();
          if (filtered[selectedIndex]) {
            onNavigate(filtered[selectedIndex].id);
            onClose();
          }
          break;
        case "Escape":
          e.preventDefault();
          onClose();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filtered, selectedIndex, onNavigate, onClose]);

  useEffect(() => {
    const el = listRef.current?.children[selectedIndex] as HTMLElement | undefined;
    el?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-[60] bg-background/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="fixed inset-x-0 top-0 z-[60] flex justify-center pt-[12vh]">
        <div className="glass-panel mx-4 w-full max-w-xl overflow-hidden rounded-xl shadow-2xl">
          <div className="flex items-center gap-3 border-b border-border p-4">
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Jump to a section..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-foreground/[0.06] hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div ref={listRef} className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground">
                No results found
              </div>
            ) : (
              filtered.map((section, index) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      onNavigate(section.id);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-lg p-3 text-left transition-colors",
                      index === selectedIndex
                        ? "bg-foreground/[0.06] text-foreground"
                        : "text-muted-foreground hover:bg-foreground/[0.04]",
                    )}
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-foreground/[0.06]">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium text-foreground">
                        {section.title}
                      </div>
                      <div className="truncate text-xs text-muted-foreground">
                        {section.description}
                      </div>
                    </div>
                  </button>
                );
              })
            )}
          </div>

          <div className="flex items-center gap-4 border-t border-border px-4 py-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↑</kbd>
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↓</kbd>
              navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">↵</kbd>
              select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="rounded border border-border bg-muted px-1.5 py-0.5 font-mono">esc</kbd>
              close
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
