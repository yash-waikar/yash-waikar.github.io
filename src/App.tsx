import { ThemeProvider } from "./components/theme-provider";
import { Hero } from "./components/hero";
import { Projects } from "./components/project";
import { Experience } from "./components/experience";
import { Footer } from "./components/footer";
import GradualBlur from "./components/GradualBlur";
import LightRays from "./components/ui/light-rays";
import "./index.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
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

      <main
        className="min-h-screen relative"
        style={{ background: "transparent" }}
      >
        <Hero />
        <Projects />
        <Experience />

        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
