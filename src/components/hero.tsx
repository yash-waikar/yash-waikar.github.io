"use client";

import { TextShimmer } from "./ui/shimmer-text";

export function Hero() {
  return (
    <section className="container relative flex min-h-screen flex-col justify-center px-4 py-24 md:px-6">
      <div className="relative z-10 mx-auto max-w-3xl">
        <h1 className="text-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Yash Waikar.
          <br />
          <span className="flex w-full flex-wrap items-baseline justify-center gap-x-2 sm:flex-nowrap sm:whitespace-nowrap">
            <span className="relative inline-flex">
              <TextShimmer>Software</TextShimmer>
            </span>
            <span>Engineer.</span>
          </span>
        </h1>
      </div>
    </section>
  );
}
