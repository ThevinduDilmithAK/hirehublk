import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { jobs, categories, jobTypes } from "@/data/jobs";
import { JobCard, JobCardSkeleton } from "@/components/JobCard";
import { RippleButton } from "@/components/RippleButton";

type JobSearch = { q?: string; location?: string; category?: string };

export const Route = createFileRoute("/jobs/")({
  validateSearch: (search: Record<string, unknown>): JobSearch => ({
    q: typeof search["q"] === "string" ? search["q"] : undefined,
    location: typeof search["location"] === "string" ? search["location"] : undefined,
    category: typeof search["category"] === "string" ? search["category"] : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Browse jobs — HireHub" },
      {
        name: "description",
        content:
          "Filter open roles by category, location, salary range and job type. Fresh listings from engineering, design, data and marketing teams.",
      },
      { property: "og:title", content: "Browse jobs — HireHub" },
      {
        property: "og:description",
        content: "Filter open roles by category, location, salary and job type on HireHub.",
      },
    ],
  }),
  component: JobsPage,
});

const PAGE_SIZE = 6;

function JobsPage() {
  const params = Route.useSearch();
  const [q, setQ] = useState(params.q ?? "");
  const [location, setLocation] = useState(params.location ?? "");
  const [category, setCategory] = useState(params.category ?? "All");
  const [type, setType] = useState("All");
  const [minSalary, setMinSalary] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const loc = location.trim().toLowerCase();
    return jobs.filter((j) => {
      const matchesTerm =
        !term ||
        [j.title, j.company, j.summary, ...j.tags].join(" ").toLowerCase().includes(term);
      const matchesLoc =
        !loc ||
        j.location.toLowerCase().includes(loc) ||
        (j.remote && "remote".includes(loc));
      const matchesCat = category === "All" || j.category === category;
      const matchesType = type === "All" || j.type === type;
      const matchesSalary = j.salaryMax >= minSalary;
      return matchesTerm && matchesLoc && matchesCat && matchesType && matchesSalary;
    });
  }, [q, location, category, type, minSalary]);

  const visible = filtered.slice(0, page * PAGE_SIZE);

  useEffect(() => setPage(1), [q, location, category, type, minSalary]);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24">
      <header className="pt-6 pb-10">
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Open <span className="text-gradient">roles</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? "role" : "roles"} matching your filters.
        </p>
      </header>

      <section aria-label="Filters" className="glass shadow-soft rounded-3xl p-5">
        <div className="grid gap-3 md:grid-cols-2">
          <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-card/70 px-4">
            <Search className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
            <label htmlFor="filter-q" className="sr-only">
              Search jobs
            </label>
            <input
              id="filter-q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search title, company or skill"
              className="h-12 w-full bg-transparent text-sm outline-none"
            />
          </div>
          <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-card/70 px-4">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-pink" aria-hidden="true" />
            <label htmlFor="filter-loc" className="sr-only">
              Location
            </label>
            <input
              id="filter-loc"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="City or remote"
              className="h-12 w-full bg-transparent text-sm outline-none"
            />
          </div>
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_1fr_auto]">
          <fieldset className="min-w-0">
            <legend className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Category
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {["All", ...categories].map((c) => (
                <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
                  {c}
                </FilterChip>
              ))}
            </div>
          </fieldset>

          <fieldset className="min-w-0">
            <legend className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Job type
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {["All", ...jobTypes].map((t) => (
                <FilterChip key={t} active={type === t} onClick={() => setType(t)}>
                  {t}
                </FilterChip>
              ))}
            </div>
          </fieldset>

          <div className="min-w-[14rem]">
            <label
              htmlFor="salary"
              className="text-xs font-semibold tracking-wide text-muted-foreground uppercase"
            >
              Min salary: ${Math.round(minSalary / 1000)}k
            </label>
            <input
              id="salary"
              type="range"
              min={0}
              max={200000}
              step={10000}
              value={minSalary}
              onChange={(e) => setMinSalary(Number(e.target.value))}
              className="mt-4 w-full accent-[oklch(0.58_0.24_300)]"
            />
          </div>
        </div>
      </section>

      {loading ? (
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <JobCardSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <p className="glass mt-8 rounded-3xl p-12 text-center text-muted-foreground">
          No roles match those filters yet. Try widening your search.
        </p>
      ) : (
        <>
          <motion.div layout className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {visible.map((job, i) => (
                <div key={job.id} className="relative">
                  <JobCard job={job} index={i % PAGE_SIZE} />
                </div>
              ))}
            </AnimatePresence>
          </motion.div>

          {visible.length < filtered.length && (
            <div className="mt-10 text-center">
              <RippleButton variant="outline" size="lg" onClick={() => setPage((p) => p + 1)}>
                Load more roles
              </RippleButton>
            </div>
          )}
        </>
      )}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
        active
          ? "bg-brand text-primary-foreground shadow-glow"
          : "border border-border bg-card/60 text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
