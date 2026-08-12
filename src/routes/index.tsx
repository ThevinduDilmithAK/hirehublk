import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState } from "react";
import {
  Search,
  MapPin,
  Code2,
  Palette,
  Megaphone,
  BarChart3,
  Boxes,
  LifeBuoy,
  ArrowRight,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Counter } from "@/components/Counter";
import { RippleButton } from "@/components/RippleButton";
import { JobCard } from "@/components/JobCard";
import { jobs, testimonials } from "@/data/jobs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HireHub — Colorful job board for modern teams" },
      {
        name: "description",
        content:
          "Search 1,200+ open roles in engineering, design, data and marketing. Filter by salary, location and job type, then apply in minutes.",
      },
      { property: "og:title", content: "HireHub — Colorful job board for modern teams" },
      {
        property: "og:description",
        content: "Search curated roles from standout companies and apply in minutes.",
      },
    ],
  }),
  component: Home,
});

const categoryCards = [
  { name: "Engineering", icon: Code2, tint: "from-primary to-violet" },
  { name: "Design", icon: Palette, tint: "from-pink to-coral" },
  { name: "Marketing", icon: Megaphone, tint: "from-coral to-amber" },
  { name: "Data", icon: BarChart3, tint: "from-teal to-primary" },
  { name: "Product", icon: Boxes, tint: "from-violet to-pink" },
  { name: "Support", icon: LifeBuoy, tint: "from-amber to-teal" },
];

function Home() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [slide, setSlide] = useState(0);
  const featured = jobs.slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5">
      <section className="pt-10 pb-20 text-center sm:pt-16">
        <Reveal>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-teal" aria-hidden="true" />
            1,248 roles live this week
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl leading-[1.05] font-extrabold sm:text-6xl lg:text-7xl">
            Find work that <span className="text-gradient">actually fits</span> you
          </h1>
        </Reveal>

        <Reveal delay={0.12}>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            HireHub connects designers, engineers, and operators with teams who care about craft —
            no endless listings, no ghost jobs.
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <form
            role="search"
            aria-label="Job search"
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/jobs", search: { q, location: loc } });
            }}
            className="glass shadow-soft mx-auto mt-9 grid max-w-3xl gap-3 rounded-3xl p-3 sm:grid-cols-[1fr_1fr_auto]"
          >
            <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-card/70 px-4">
              <Search className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
              <label htmlFor="hero-q" className="sr-only">
                Job title or keyword
              </label>
              <input
                id="hero-q"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Job title or keyword"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <div className="flex min-w-0 items-center gap-2 rounded-2xl bg-card/70 px-4">
              <MapPin className="h-4 w-4 shrink-0 text-pink" aria-hidden="true" />
              <label htmlFor="hero-loc" className="sr-only">
                Location
              </label>
              <input
                id="hero-loc"
                value={loc}
                onChange={(e) => setLoc(e.target.value)}
                placeholder="City or remote"
                className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <RippleButton type="submit" size="lg" className="sm:w-auto">
              Search
            </RippleButton>
          </form>
        </Reveal>
      </section>

      <section aria-label="Platform statistics" className="pb-20">
        <div className="glass shadow-soft grid gap-6 rounded-3xl p-8 sm:grid-cols-3">
          {[
            { label: "Jobs posted", value: 12480, suffix: "+" },
            { label: "Hiring companies", value: 860, suffix: "" },
            { label: "Successful hires", value: 5320, suffix: "+" },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="text-center">
              <p className="text-gradient text-4xl font-extrabold sm:text-5xl">
                <Counter to={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="categories-heading" className="pb-20">
        <Reveal>
          <h2 id="categories-heading" className="text-3xl font-extrabold sm:text-4xl">
            Browse by category
          </h2>
          <p className="mt-2 text-muted-foreground">Six fields, hundreds of open roles.</p>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categoryCards.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <Link
                to="/jobs"
                search={{ category: c.name }}
                className="lift glass block rounded-3xl p-6"
              >
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${c.tint} text-primary-foreground`}
                  aria-hidden="true"
                >
                  <c.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{c.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {jobs.filter((j) => j.category === c.name).length} open roles
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Explore <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section aria-labelledby="featured-heading" className="pb-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Reveal>
            <h2 id="featured-heading" className="text-3xl font-extrabold sm:text-4xl">
              Featured roles
            </h2>
          </Reveal>
          <Link to="/jobs" className="text-sm font-semibold text-primary hover:underline">
            View all jobs
          </Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((job, i) => (
            <div key={job.id} className="relative">
              <JobCard job={job} index={i} />
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="testimonials-heading" className="pb-24">
        <Reveal>
          <h2 id="testimonials-heading" className="text-3xl font-extrabold sm:text-4xl">
            Loved by both sides of the table
          </h2>
        </Reveal>
        <div className="glass shadow-soft mt-8 overflow-hidden rounded-3xl p-8 sm:p-12">
          <motion.blockquote
            key={slide}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Quote className="h-8 w-8 text-pink" aria-hidden="true" />
            <p className="mt-4 text-lg leading-relaxed font-medium sm:text-2xl">
              {testimonials[slide]!.quote}
            </p>
            <footer className="mt-6 flex items-center gap-3">
              <span
                aria-hidden="true"
                className="bg-brand grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-primary-foreground"
              >
                {testimonials[slide]!.initials}
              </span>
              <div>
                <p className="font-semibold">{testimonials[slide]!.name}</p>
                <p className="text-sm text-muted-foreground">{testimonials[slide]!.role}</p>
              </div>
            </footer>
          </motion.blockquote>

          <div className="mt-8 flex items-center gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={() => setSlide((s) => (s - 1 + testimonials.length) % testimonials.length)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-accent"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={() => setSlide((s) => (s + 1) % testimonials.length)}
              className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-accent"
            >
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </button>
            <span className="ml-2 text-sm text-muted-foreground">
              {slide + 1} / {testimonials.length}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
