"use client";

export function About() {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="glass-panel mx-auto w-full rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            About
          </h2>

          <div className="mt-8 space-y-6 text-lg leading-relaxed text-foreground/80">
            <p>
              I’m a software engineer from Northern Virginia, currently building
              production AI systems with human-in-the-loop workflows. I
              specialize in finding ways to bridge the gap between humans and AI
              agents, ensuring we maintain control over the systems we build and
              that they adhere to governance requirements and responsible AI
              principles. I thoroughly believe in the importance of human
              oversight and accountability in AI systems, and I strive to design
              systems that are transparent, explainable, and auditable.
            </p>
            <p>
              Right now, I am working on a project with two Fortune 50 companies
              to assist small businesses in the country to safely adopt agentic
              AI systems.
            </p>
            <p>Outside of work, I enjoy composing music!</p>
          </div>
        </div>
      </div>
    </section>
  );
}
