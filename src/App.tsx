import { ThemeProvider } from "./components/theme-provider";
import { Hero } from "./components/hero";
import { Projects } from "./components/project";
import { Skills } from "./components/skills";
import { Experience } from "./components/experience";
import { Footer } from "./components/footer";
import { WebGLShader } from "./components/ui/web-gl-shader";
import { useScrollBlur } from "./hooks/useScrollBlur";
import "./index.css";

function App() {
  const isScrolled = useScrollBlur(50); // Trigger after 50px scroll

  return (
    <ThemeProvider defaultTheme="dark">
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <WebGLShader />
      </div>
      <div className={`scroll-blur-line ${isScrolled ? "active" : ""}`} />

      <main
        className="min-h-screen relative"
        style={{ background: "transparent" }}
      >
        <Hero />
        <Experience />
        <Projects />
        <Footer />
      </main>
    </ThemeProvider>
  );
}

export default App;
