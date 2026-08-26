import { useEffect, useState } from "react";
import { Menu, X, Github, Linkedin, Search } from "lucide-react";
import { cn } from "../lib/utils";
import { ModeToggle } from "./mode-toggle";
import { CommandMenu } from "./command-menu";

const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
];

interface NavbarProps {
  activeSection?: string;
  onNavClick?: (id: string) => void;
}

export function Navbar({ activeSection = "home", onNavClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) => {
    if (onNavClick) {
      e.preventDefault();
      onNavClick(id);
      setMobileOpen(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <header className="fixed top-4 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 sm:top-6">
      {/* Desktop pill */}
      <div className="glass-panel hidden h-12 rounded-full md:flex">
        <div className="flex w-full items-center justify-between px-3">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 text-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-foreground/10">
              <span className="text-xs font-bold leading-none">YW</span>
            </div>
          </a>

          {/* Nav Links */}
          <nav className="flex items-center gap-0.5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.id)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-sm transition-colors hover:text-foreground",
                  activeSection === link.id
                    ? "text-foreground"
                    : "text-muted-foreground",
                )}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right side: socials + theme toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCommandOpen(true)}
              className="hidden items-center gap-1.5 rounded-full px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:bg-foreground/[0.06] lg:flex"
              aria-label="Open command menu"
            >
              <Search size={13} />
              <kbd className="rounded border border-border/60 bg-muted px-1 font-mono text-[10px]">
                ⌘K
              </kbd>
            </button>
            <a
              href="https://github.com/yash-waikar"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground hover:bg-foreground/[0.06]"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
            <a
              href="https://www.linkedin.com/in/yash-waikar-509866202/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground hover:bg-foreground/[0.06]"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <ModeToggle />
          </div>
        </div>
      </div>

      {/* Mobile pill */}
      <div className="glass-panel flex flex-col overflow-hidden rounded-2xl md:hidden">
        <div className="flex items-center justify-between px-4 py-2">
          <a href="#home" className="flex items-center gap-2 text-foreground">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground/10">
              <span className="text-xs font-bold leading-none">YW</span>
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Yash Waikar
            </span>
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground hover:bg-foreground/[0.06]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div
          className="grid transition-all duration-200 ease-in-out"
          style={{ gridTemplateRows: mobileOpen ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1 border-t border-foreground/10 px-4 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm transition-colors hover:text-foreground hover:bg-foreground/[0.06]",
                    activeSection === link.id
                      ? "text-foreground bg-foreground/[0.06]"
                      : "text-muted-foreground",
                  )}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-1 flex items-center gap-2">
                <a
                  href="https://github.com/yash-waikar"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-foreground/[0.06]"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/yash-waikar-509866202/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-foreground/10 px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground hover:bg-foreground/[0.06]"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>

      <CommandMenu
        isOpen={commandOpen}
        onClose={() => setCommandOpen(false)}
        onNavigate={(id) => onNavClick?.(id)}
      />
    </header>
  );
}
