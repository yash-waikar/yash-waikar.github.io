import { useState } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";
import { cn } from "../lib/utils";

const navLinks = [
  { label: "Home", href: "#home", id: "home" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
];

interface NavbarProps {
  activeSection?: string;
  onNavClick?: (id: string) => void;
}

export function Navbar({ activeSection = "home", onNavClick }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <nav className="fixed top-6 left-1/2 z-50 w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2">
      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center justify-between rounded-full border border-white/[0.08] bg-neutral-950/70 px-4 py-2 shadow-lg backdrop-blur-xl">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 text-white">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 transition-colors hover:bg-white/20">
            <span className="text-xs font-bold text-white leading-none">
              YW
            </span>
          </div>
        </a>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.id)}
              className={cn(
                "relative rounded-full px-4 py-1.5 text-sm transition-colors hover:text-white hover:bg-white/[0.06]",
                activeSection === link.id
                  ? "text-white bg-white/[0.08]"
                  : "text-neutral-400",
              )}
            >
              {link.label}
              {/* Active dot indicator */}
              <span
                className={cn(
                  "absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-[3px] w-[3px] rounded-full bg-violet-400 transition-all duration-300",
                  activeSection === link.id ? "opacity-100 scale-100" : "opacity-0 scale-0",
                )}
              />
            </a>
          ))}
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-1">
          <a
            href="https://github.com/yash-waikar"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:text-white hover:bg-white/[0.06]"
            aria-label="GitHub"
          >
            <Github size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/yash-waikar-509866202/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:text-white hover:bg-white/[0.06]"
            aria-label="LinkedIn"
          >
            <Linkedin size={16} />
          </a>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden flex-col rounded-2xl border border-white/[0.08] bg-neutral-950/70 shadow-lg backdrop-blur-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2 text-white">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/10">
              <span className="text-xs font-bold text-white leading-none">
                YW
              </span>
            </div>
            <span className="text-sm font-semibold tracking-tight">
              Yash Waikar
            </span>
          </a>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-neutral-400 transition-colors hover:text-white hover:bg-white/[0.06]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <span
              className="transition-transform duration-200"
              style={{ transform: mobileOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </span>
          </button>
        </div>

        {/* Mobile Menu — CSS grid-rows transition for smooth open/close */}
        <div
          className="grid transition-all duration-200 ease-in-out"
          style={{ gridTemplateRows: mobileOpen ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <div className="flex flex-col gap-1 border-t border-white/[0.06] px-4 py-3">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm transition-colors hover:text-white hover:bg-white/[0.06]",
                    activeSection === link.id
                      ? "text-white bg-white/[0.08]"
                      : "text-neutral-400",
                  )}
                >
                  {link.label}
                </a>
              ))}
              <div className="mt-1 flex gap-2">
                <a
                  href="https://github.com/yash-waikar"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 text-sm text-neutral-400 transition-colors hover:text-white hover:bg-white/[0.06]"
                >
                  <Github size={15} /> GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/yash-waikar-509866202/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border border-white/[0.08] px-4 py-2 text-sm text-neutral-400 transition-colors hover:text-white hover:bg-white/[0.06]"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
