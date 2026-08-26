import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ThemeProvider } from "./components/theme-provider";
import { TooltipProvider } from "./components/ui/tooltip";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { About } from "./components/about";
import { Projects } from "./components/project";
import { Experience } from "./components/experience";
import { Footer } from "./components/footer";
import { LoadingScreen } from "./components/LoadingScreen";
import { ScrollZoomBackground } from "./components/scroll-zoom-background";
import { BottomScrollBlur } from "./components/bottom-scroll-blur";
import "./index.css";

const SECTIONS = ["home", "about", "projects", "experience"];

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.4 },
    );

    SECTIONS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        {/* Persistent background — visible from first paint, continues
            unbroken from the loading intro into the revealed site. */}
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <ScrollZoomBackground />
        </div>
        <div className="fixed inset-0 -z-10 bg-background/55 pointer-events-none" />
        <BottomScrollBlur />

        <LoadingScreen
          isLoading={isLoading}
          onFinish={() => setIsLoading(false)}
        />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Navbar activeSection={activeSection} onNavClick={scrollToSection} />

          <main className="w-full pt-24">
            <div id="home">
              <Hero />
            </div>

            <div id="projects">
              <Projects />
            </div>
            <div id="experience">
              <Experience />
            </div>

            <div id="about">
              <About />
            </div>
            <Footer />
          </main>
        </motion.div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default App;
