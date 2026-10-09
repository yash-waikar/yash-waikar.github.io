"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, FileText } from "lucide-react";

type Publication = {
  title: string;
  authors: string[];
  venue: string;
  status: string;
  date?: string;
  summary?: string;
  keywords?: string[];
  url: string;
};

const SELF = "Yash Waikar";

const publications: Publication[] = [
  {
    title:
      "Governing the Handoff: Responsibility Attribution in Enterprise Multi-Agent AI Systems",
    authors: ["Yash Waikar"],
    venue: "SSRN",
    status: "Preprint",
    url: "https://ssrn.com/abstract=7579040",
  },
];

function PublicationCard({ publication }: { publication: Publication }) {
  return (
    <article className="glass-panel project-card-glow group flex flex-col gap-4 rounded-xl p-6 ring-1 ring-foreground/10 ring-offset-4 ring-offset-background transition-colors duration-300 hover:bg-foreground/[0.08] md:p-8">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 rounded-full border border-foreground/10 px-2.5 py-1 font-medium text-foreground/80">
          <FileText aria-hidden="true" className="h-3.5 w-3.5" />
          {publication.status}
        </span>
        <span>{publication.venue}</span>
        {publication.date && (
          <>
            <span aria-hidden="true">·</span>
            <span>{publication.date}</span>
          </>
        )}
      </div>

      <h3 className="max-w-3xl font-mono text-xl font-bold leading-snug tracking-tight md:text-2xl">
        {publication.title}
      </h3>

      <p className="text-sm text-muted-foreground">
        {publication.authors.map((author, i) => (
          <span key={author}>
            {i > 0 && ", "}
            <span className={author === SELF ? "font-medium text-foreground" : undefined}>
              {author}
            </span>
          </span>
        ))}
      </p>

      {publication.summary && (
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {publication.summary}
        </p>
      )}

      {publication.keywords && publication.keywords.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {publication.keywords.map((keyword) => (
            <span
              key={keyword}
              className="rounded-full border border-foreground/10 px-2.5 py-1 text-xs text-muted-foreground"
            >
              {keyword}
            </span>
          ))}
        </div>
      )}

      <a
        href={publication.url}
        target="_blank"
        rel="noopener noreferrer"
        className="glass mt-2 flex w-full items-center justify-between rounded-md px-4 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/10 sm:w-64"
      >
        <span>Read on {publication.venue}</span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </a>
    </article>
  );
}

export function Publications() {
  return (
    <section className="py-24 md:py-32">
      <div className="container px-4 md:px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Publications
          </h2>
          <p className="mt-4 text-muted-foreground">
            Research I've written up.
          </p>
        </div>

        <div className="grid gap-8">
          {publications.map((publication, index) => (
            <motion.div
              key={publication.url}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.06 }}
              viewport={{ once: true, margin: "100px" }}
            >
              <PublicationCard publication={publication} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
