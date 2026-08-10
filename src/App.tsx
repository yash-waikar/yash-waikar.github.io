import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue } from "motion/react";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Projects } from "./components/project";
import { Experience } from "./components/experience";
import { Footer } from "./components/footer";
import { LoadingScreen } from "./components/LoadingScreen";
import GradualBlur from "./components/GradualBlur";
import Strands from "./components/Strands";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const activeSectionRef = useRef("home");
  activeSectionRef.current = activeSection;
  const scrollProgress = useMotionValue(0);
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Momentum-based horizontal scroll — wheel velocity decays naturally each frame
  useEffect(() => {
    let velocity = 0;
    let rafId: number | null = null;
    const FRICTION = 0.9;
    const MIN_VELOCITY = 0.2;
    const WHEEL_MULT = 0.55;

    function updateProgress() {
      if (!mainRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = mainRef.current;
      const max = scrollWidth - clientWidth;
      scrollProgress.set(max > 0 ? scrollLeft / max : 0);
    }

    function animate() {
      if (!mainRef.current) return;
      if (Math.abs(velocity) < MIN_VELOCITY) {
        velocity = 0;
        rafId = null;
        return;
      }
      mainRef.current.scrollLeft += velocity;
      velocity *= FRICTION;
      updateProgress();
      rafId = requestAnimationFrame(animate);
    }

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768 || !mainRef.current) return;
      if (e.shiftKey) return;
      e.preventDefault();

      velocity += e.deltaY * WHEEL_MULT;

      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const handleScroll = () => updateProgress();

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("wheel", handleWheel, { passive: false });
      mainElement.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      if (mainElement) {
        mainElement.removeEventListener("wheel", handleWheel);
        mainElement.removeEventListener("scroll", handleScroll);
      }
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Use Intersection Observer to track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: mainRef.current,
        threshold: 0.5,
      },
    );

    const sections = ["home", "projects", "experience"];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Handle clicking navigation links
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element || !mainRef.current) return;

    if (window.innerWidth >= 768) {
      mainRef.current.scrollTo({
        left: element.offsetLeft - mainRef.current.offsetLeft,
        behavior: "smooth",
      });
    } else {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Arrow-key navigation between sections — desktop only
  useEffect(() => {
    const sections = ["home", "projects", "experience"];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (window.innerWidth < 768) return;
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      // Don't hijack arrows while typing in inputs
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const current = sections.indexOf(activeSectionRef.current);
      const next =
        e.key === "ArrowRight"
          ? Math.min(current + 1, sections.length - 1)
          : Math.max(current - 1, 0);
      if (next !== current) {
        e.preventDefault();
        scrollToSection(sections[next]);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider defaultTheme="light">
      <LoadingScreen isLoading={isLoading} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Horizontal scroll progress bar — desktop only */}
        <div className="hidden md:block fixed top-0 left-0 right-0 z-[100] h-[2px] bg-foreground/[0.06]">
          <motion.div
            className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-400 to-violet-500"
            style={{ scaleX: scrollProgress, transformOrigin: "left" }}
          />
        </div>

        <div
          className="fixed inset-0"
          style={{ zIndex: -1, background: "#ffffff" }}
        >
          <div
            className="absolute inset-0"
            style={{
              transform: "translateX(15%)",
              filter: "blur(4px)",
              WebkitFilter: "blur(4px)",
              willChange: "transform",
            }}
          >
            <Strands
              colors={["#F97316", "#7C3AED", "#06B6D4"]}
              count={3}
              speed={0.2}
              amplitude={1}
              waviness={1}
              thickness={0.7}
              glow={2.6}
              taper={3}
              spread={1}
              intensity={0.6}
              saturation={2}
              opacity={1}
              scale={1.5}
              glass={false}
              refraction={1}
              dispersion={1}
              glassSize={1}
              hueShift={0}
            />
          </div>
        </div>
        <div className="hidden md:block">
          <GradualBlur
            position="left"
            strength={2}
            height="80px"
            divCount={3}
            animated="scroll"
            zIndex={50}
            target="page"
          />
        </div>
        <div className="hidden md:block">
          <GradualBlur
            position="right"
            strength={2}
            height="80px"
            divCount={3}
            animated="scroll"
            zIndex={50}
            target="page"
          />
        </div>

        <Navbar activeSection={activeSection} onNavClick={scrollToSection} />

        <main
          ref={mainRef}
          className="flex flex-col md:flex-row w-full h-auto md:h-screen md:overflow-x-auto md:overflow-y-hidden relative"
          style={{ background: "transparent" }}
        >
          <div
            id="home"
            className="w-full md:w-screen md:h-screen shrink-0 md:overflow-y-auto relative scrollbar-none"
          >
            <Hero />
          </div>

          <div
            id="projects"
            className="w-full md:w-auto md:h-screen shrink-0 md:overflow-y-auto relative scrollbar-none"
          >
            <Projects />
          </div>

          <div
            id="experience"
            className="w-full md:w-auto md:h-screen shrink-0 md:overflow-y-auto relative flex flex-col justify-between scrollbar-none"
          >
            <div className="flex-grow">
              <Experience />
            </div>
            <Footer />
          </div>
        </main>
      </motion.div>
    </ThemeProvider>
  );
}

export default App;
