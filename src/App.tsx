import { ThemeProvider } from "./components/theme-provider";
import { Hero } from "./components/hero";
import { Projects } from "./components/project";
import { Experience } from "./components/experience";
import { Footer } from "./components/footer";
import { WebGLShader } from "./components/ui/web-gl-shader";
import GradualBlur from "./components/GradualBlur";
import "./index.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <WebGLShader />
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
