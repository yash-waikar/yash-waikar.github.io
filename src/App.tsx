import { ThemeProvider } from "./components/theme-provider"
import { Navbar } from "./components/navbar"
import { Hero } from "./components/hero"
import { Projects } from "./components/project"
import { Skills } from "./components/skills"
import { Experience } from "./components/experience"
import { Footer } from "./components/footer"
import "./index.css"

function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <main className="min-h-screen bg-background text-foreground">
        <Navbar />
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Footer />
      </main>
    </ThemeProvider>
  )
}

export default App