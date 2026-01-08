import React from "react";

export default function Resume() {
  const resumeUrl = `${process.env.PUBLIC_URL}/resume.pdf`;

  return (
    <main className="container mx-auto max-width pt-10 pb-20">
      <div className="mb-6">
        <h1 className="text-4xl font-bold">Resume</h1>
        <p className="mt-2 text-gray-600">
          A snapshot of my education, experience, and technical background. This resume will be updated regularly as I grow.
        </p>
      </div>

      <div className="rounded-2xl border overflow-hidden bg-white">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <span className="text-sm text-gray-600">Abhilash Reddy Pothireddy — Resume</span>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium underline"
          >
            Open in new tab
          </a>
        </div>

        <iframe
          title="Resume PDF"
          src={resumeUrl}
          className="w-full"
          style={{ height: "80vh" }}
        />
      </div>
    </main>
  );
}

