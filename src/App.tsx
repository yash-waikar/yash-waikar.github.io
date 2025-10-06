import { ThemeProvider } from "./components/theme-provider";
import { Hero } from "./components/hero";
import { Projects } from "./components/project";
import { Skills } from "./components/skills";
import { Experience } from "./components/experience";
import { Footer } from "./components/footer";
import Prism from "./components/Prism";
import "./index.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <Prism
          height={3.5}
          baseWidth={5.5}
          animationType="rotate"
          glow={1.2}
          scale={4.0}
          hueShift={0.05}
          colorFrequency={1.2}
          bloom={1.2}
          timeScale={0.35}
          transparent={true}
          suspendWhenOffscreen={false}
          maxFPS={45}
          adaptiveQuality={true}
        />
      </div>
      
      <main className="min-h-screen relative" style={{ background: 'transparent' }}>
        <Hero />
        <Experience />
        <Projects />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
