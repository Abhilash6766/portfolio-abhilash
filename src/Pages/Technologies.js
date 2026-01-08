import React from "react";

const SKILL_GROUPS = [
  {
    title: "Programming Languages",
    items: ["Python", "Java", "JavaScript", "SQL"],
  },
  {
    title: "Frontend",
    items: ["React.js", "Redux", "Next.js", "DOM Manipulation"],
  },
  {
    title: "Backend",
    items: ["Node.js", "Express.js", "REST APIs", "Spring Boot", "Spring Security"],
  },
  {
    title: "Cloud & DevOps",
    items: ["AWS (EC2, S3, Lambda, ECS)", "Docker", "Terraform"],
  },
  {
    title: "AI / ML",
    items: ["Applied ML", "Generative AI (RAG, synthetic data)", "Agentic systems"],
  },
  {
    title: "Development Skills",
    items: ["Microservices", "Data Structures"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB", "DynamoDB", "Hibernate"],
  },
  {
    title: "Messaging & Caching",
    items: ["Kafka", "Redis"],
  },
  {
    title: "Tools & Practices",
    items: ["Git", "Agile / Scrum", "Unit Testing", "Code Reviews", "MS Office"],
  },
];

function Chip({ text }) {
  return (
    <span className="whitespace-nowrap px-4 py-2 rounded-full border text-sm text-dark-heading dark:text-light-heading bg-white dark:bg-dark-card">
      {text}
    </span>
  );
}

export default function Technologies() {
  return (
    <main className="container mx-auto max-width pt-10 pb-20">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-2xl md:text-4xl xl:text-5xl font-bold text-dark-heading dark:text-light-heading">
          Skills
        </h1>
        <p className="text-content mt-3 lg:max-w-3xl">
          Technologies and tools I use to build secure, scalable, and production-ready systems.
        </p>
      </div>

      {/* Skill rows */}
      <div className="space-y-8">
        {SKILL_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="mb-3 text-lg font-semibold text-dark-heading dark:text-light-heading">
              {group.title}
            </h2>

            <div className="flex flex-wrap md:flex-nowrap gap-3 md:overflow-x-auto pb-2 md:scrollbar-hide">
              {group.items.map((item) => (
                <Chip key={item} text={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
