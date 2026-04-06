import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Projects } from "./components/project";
import { Experience } from "./components/experience";
import { Footer } from "./components/footer";
import { LoadingScreen } from "./components/LoadingScreen";
import GradualBlur from "./components/GradualBlur";
import SoftAurora from "./components/SoftAurora";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Momentum-based horizontal scroll — wheel velocity decays naturally each frame
  useEffect(() => {
    let velocity = 0;
    let rafId: number | null = null;
    const FRICTION = 0.88;      // velocity multiplied each frame (lower = stops faster)
    const MIN_VELOCITY = 0.5;  // below this we stop the loop

    function animate() {
      if (!mainRef.current) return;
      if (Math.abs(velocity) < MIN_VELOCITY) {
        velocity = 0;
        rafId = null;
        return;
      }
      mainRef.current.scrollLeft += velocity;
      velocity *= FRICTION;
      rafId = requestAnimationFrame(animate);
    }

    const handleWheel = (e: WheelEvent) => {
      if (window.innerWidth < 768 || !mainRef.current) return;
      if (e.shiftKey) return;
      e.preventDefault();

      // Add wheel delta to velocity (handles both trackpads and mouse wheels)
      velocity += e.deltaY * 0.6;

      // Kick off animation loop if not already running
      if (rafId === null) {
        rafId = requestAnimationFrame(animate);
      }
    };

    const mainElement = mainRef.current;
    if (mainElement) {
      mainElement.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (mainElement) mainElement.removeEventListener("wheel", handleWheel);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
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
        threshold: 0.5, // Section is considered active when 50% in view
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

    // For desktop (horizontal scroll)
    if (window.innerWidth >= 768) {
      mainRef.current.scrollTo({
        left: element.offsetLeft - mainRef.current.offsetLeft,
        behavior: "smooth",
      });
    } else {
      // For mobile (vertical scroll)
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <LoadingScreen isLoading={isLoading} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div
          className="fixed inset-0"
          style={{ zIndex: -1, background: "#000000" }}
        >
          <SoftAurora
            speed={0.6}
            scale={1.5}
            brightness={0.8}
            color1="#f7f7f7"
            color2="#e100ff"
            noiseFrequency={2.5}
            noiseAmplitude={1}
            bandHeight={0.5}
            bandSpread={1}
            octaveDecay={0.1}
            layerOffset={0}
            colorSpeed={1}
            enableMouseInteraction
            mouseInfluence={0}
          />
        </div>
        <GradualBlur
          position="left"
          strength={3}
          height="80px"
          animated="scroll"
          zIndex={50}
          target="page"
        />
        <GradualBlur
          position="right"
          strength={3}
          height="80px"
          animated="scroll"
          zIndex={50}
          target="page"
        />

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
