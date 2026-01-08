import React from "react";

export default function Resume() {
  return (
    <main className="container mx-auto max-width pt-10 pb-20">
      {/* Section Header */}
      <section className="mb-8">
        <h1 className="text-2xl text-dark-heading dark:text-light-heading md:text-4xl xl:text-5xl font-bold">
          Resume
        </h1>
        <p className="text-content mt-3 lg:max-w-3xl">
          A snapshot of my education, experience, and technical background.
          This resume will be updated regularly as I grow.
        </p>
      </section>

      {/* Resume Card */}
      <section className="rounded-2xl border bg-white dark:bg-dark-card shadow-sm">
        {/* Toolbar */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="text-sm text-content">
            Abhilash Reddy Pothireddy — Resume
          </span>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium underline"
          >
            Open in new tab
          </a>
        </div>

        {/* Embedded PDF */}
        <div className="w-full">
          <iframe
            title="Resume PDF"
            src="/resume.pdf"
            className="w-full"
            style={{ height: "900px", border: "none" }}
          />
        </div>
      </section>
    </main>
  );
}
