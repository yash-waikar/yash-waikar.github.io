import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { ThemeProvider } from "./components/theme-provider";
import { Navbar } from "./components/navbar";
import { Hero } from "./components/hero";
import { Projects } from "./components/project";
import { Experience } from "./components/experience";
import { Footer } from "./components/footer";
import { LoadingScreen } from "./components/LoadingScreen";
import GradualBlur from "./components/GradualBlur";
import LightRays from "./components/ui/light-rays";
import "./index.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider defaultTheme="dark">
      <LoadingScreen isLoading={isLoading} />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div
          className="fixed inset-0 pointer-events-none"
          style={{ zIndex: 0, background: "#000000" }}
        >
          <LightRays
            raysOrigin="top-center"
            raysColor="#ffffff"
            raysSpeed={0.4}
            lightSpread={3}
            rayLength={4}
            fadeDistance={0.8}
            saturation={0.8}
            followMouse={false}
            mouseInfluence={0}
            noiseAmount={0.4}
            distortion={0}
          />
        </div>

        <GradualBlur
          position="top"
          strength={3}
          height="80px"
          animated="scroll"
          zIndex={50}
          target="page"
        />

        <GradualBlur
          position="bottom"
          strength={3}
          height="80px"
          animated="scroll"
          zIndex={50}
          target="page"
        />

        <Navbar />

        <main
          className="min-h-screen relative"
          style={{ background: "transparent" }}
        >
          <Hero />
          <Projects />
          <Experience />

          <Footer />
        </main>
      </motion.div>
    </ThemeProvider>
  );
}

export default App;
