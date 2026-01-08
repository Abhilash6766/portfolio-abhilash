import React, { useMemo, useState } from "react";

const PROJECTS = [
  {
    title: "PayVault – Secure Digital Wallet Platform",
    stack: ["Java", "Spring Boot", "Spring Security", "JWT", "MySQL", "Redis", "Kafka"],
    short:
      "Secure wallet platform with double-entry ledger accounting, strong auth, idempotent transfers, and audit-ready workflows.",
    details: [
      "Implemented double-entry ledger accounting to ensure financially correct money movement with zero balance drift.",
      "Hardened authentication with JWT, refresh token rotation, RBAC, device sessions, and brute-force protection.",
      "Guaranteed idempotent money transfers under retries/failures using DB constraints and transactional design.",
      "Decoupled risk checks and notifications using event-driven architecture and outbox-style patterns.",
    ],
  },
  {
    title: "SecureShop – Security-Driven E-Commerce Platform",
    stack: ["Java", "Spring Boot", "Spring Security", "JWT", "MySQL"],
    short:
      "Security-first e-commerce system with RBAC, ownership checks, reliable checkout flows, and immutable audit trails.",
    details: [
      "Built JWT auth with refresh token rotation, device-bound sessions, and permission-level RBAC enforcement.",
      "Prevented horizontal privilege escalation using ownership checks + method-level authorization (@PreAuthorize).",
      "Improved checkout reliability using idempotency keys, locking strategies, and atomic order state transitions.",
      "Captured immutable audit trails for refunds/admin/auth events using AOP and schema-managed migrations.",
    ],
  },
  {
    title: "Online Voting System",
    stack: ["Java", "Spring Boot", "React", "MongoDB"],
    short:
      "Secure online voting platform with authentication, RBAC, audit logging, scalable APIs, and real-time results.",
    details: [
      "Implemented user authentication, role-based access control, and audit logging to prevent fraud.",
      "Designed scalable Spring Boot APIs and optimized MongoDB queries for high traffic.",
      "Built a responsive React UI for casting votes and viewing real-time tallying and results visualization.",
    ],
  },
  {
    title: "College Bus Tracking Application",
    stack: ["Java", "MongoDB", "Firebase", "Google Maps API"],
    short:
      "Real-time bus tracking with GPS updates, driver–student chat, and push notifications for delays and changes.",
    details: [
      "Enabled live GPS tracking for buses using Maps APIs and realtime updates.",
      "Added driver–student chat to improve communication and safety.",
      "Integrated push notifications for delays and location updates.",
      "Designed mobile-friendly interfaces for students, drivers, and admins.",
    ],
  },
  {
    title: "Task Management Application (TodoList)",
    stack: ["React", "Node.js", "Express", "Socket.io"],
    short:
      "Collaborative task manager with CRUD workflows, secure auth, and real-time multi-user sync via WebSockets.",
    details: [
      "Built task CRUD workflows with clean UI components and RESTful API design.",
      "Added real-time collaboration with Socket.io for multi-user task updates.",
      "Implemented secure authentication for protecting user data.",
    ],
  },
];

function Pill({ text }) {
  return (
    <span className="px-3 py-1 rounded-full border text-xs md:text-sm text-dark-heading dark:text-light-heading">
      {text}
    </span>
  );
}

function ProjectCard({ project }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border bg-white dark:bg-dark-card p-5 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-lg md:text-xl font-bold text-dark-heading dark:text-light-heading">
            {project.title}
          </h3>

          <button
            onClick={() => setOpen((v) => !v)}
            className="text-sm font-medium underline text-dark-heading dark:text-light-heading"
            type="button"
          >
            {open ? "Hide details" : "View details"}
          </button>
        </div>

        <p className="text-content">{project.short}</p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.stack.map((s) => (
            <Pill key={s} text={s} />
          ))}
        </div>

        {open && (
          <ul className="mt-4 list-disc pl-5 text-content space-y-2">
            {project.details.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState("All");

  const allTags = useMemo(() => {
    const tags = new Set();
    PROJECTS.forEach((p) => p.stack.forEach((t) => tags.add(t)));
    return ["All", ...Array.from(tags).sort((a, b) => a.localeCompare(b))];
  }, []);

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesQuery =
        query.trim() === "" ||
        (p.title + " " + p.short + " " + p.stack.join(" "))
          .toLowerCase()
          .includes(query.toLowerCase());

      const matchesTag = activeTag === "All" || p.stack.includes(activeTag);

      return matchesQuery && matchesTag;
    });
  }, [query, activeTag]);

  return (
    <main className="container mx-auto max-width pt-10 pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold text-dark-heading dark:text-light-heading">
          Projects
        </h1>
        <p className="text-content mt-3 lg:max-w-3xl">
          A curated set of projects focused on security, scalability, and production-ready engineering.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-6">
        <input
          className="w-full md:w-[380px] rounded-xl border bg-white dark:bg-dark-card px-4 py-2 text-dark-heading dark:text-light-heading outline-none"
          placeholder="Search projects (e.g., Spring Security, React, MongoDB)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex gap-2 overflow-x-auto pb-1">
          {allTags.slice(0, 10).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setActiveTag(t)}
              className={`px-3 py-2 rounded-full border text-sm whitespace-nowrap ${
                activeTag === t
                  ? "bg-black text-white"
                  : "bg-white dark:bg-dark-card text-dark-heading dark:text-light-heading"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="grid gap-5">
        {filtered.map((p) => (
          <ProjectCard key={p.title} project={p} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-content mt-6">No projects match your filters.</p>
      )}
    </main>
  );
}
