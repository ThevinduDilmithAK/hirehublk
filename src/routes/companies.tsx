import { createFileRoute, Link } from "@tanstack/react-router";
import { companies, jobs } from "@/data/jobs";
import { Reveal } from "@/components/Reveal";
import { MapPin, Users } from "lucide-react";

export const Route = createFileRoute("/companies")({
  head: () => ({
    meta: [
      { title: "Hiring companies — HireHub" },
      {
        name: "description",
        content:
          "Meet the teams hiring on HireHub: AI infrastructure, fintech, health tech, gaming, logistics and design studios.",
      },
      { property: "og:title", content: "Hiring companies — HireHub" },
      {
        property: "og:description",
        content: "Browse company profiles and their open roles on HireHub.",
      },
    ],
  }),
  component: CompaniesPage,
});

function CompaniesPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 pb-24">
      <header className="pt-6 pb-10">
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Companies <span className="text-gradient">hiring now</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {companies.length} teams with open roles across six categories.
        </p>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {companies.map((c, i) => {
          const count = jobs.filter((j) => j.companyId === c.id).length;
          return (
            <Reveal key={c.id} delay={i * 0.05}>
              <article className="lift glass flex h-full flex-col rounded-3xl p-6">
                <span
                  aria-hidden="true"
                  className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${c.accent} text-lg font-bold text-primary-foreground`}
                >
                  {c.logo}
                </span>
                <h2 className="mt-4 text-lg font-bold">{c.name}</h2>
                <p className="text-sm text-primary">{c.industry}</p>
                <p className="mt-3 flex-1 text-sm text-muted-foreground">{c.about}</p>
                <dl className="mt-5 grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-pink" aria-hidden="true" />
                    <dt className="sr-only">Location</dt>
                    <dd className="truncate">{c.location}</dd>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                    <dt className="sr-only">Team size</dt>
                    <dd>{c.size} employees</dd>
                  </div>
                </dl>
                <Link
                  to="/jobs"
                  search={{ q: c.name }}
                  className="bg-brand mt-6 inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-semibold text-primary-foreground"
                >
                  {count} open {count === 1 ? "role" : "roles"}
                </Link>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
