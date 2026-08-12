import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { MapPin, Clock, Banknote } from "lucide-react";
import { formatSalary, type Job } from "@/data/jobs";

export function JobCard({ job, index = 0 }: { job: Job; index?: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.3) }}
      className="lift glass group rounded-3xl p-6"
    >
      <div className="flex items-start gap-4">
        <span
          aria-hidden="true"
          className="bg-brand grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sm font-bold text-primary-foreground"
        >
          {job.logo}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-bold">
            <Link
              to="/jobs/$jobId"
              params={{ jobId: job.id }}
              className="outline-none after:absolute after:inset-0 after:content-['']"
            >
              {job.title}
            </Link>
          </h3>
          <p className="truncate text-sm text-muted-foreground">{job.company}</p>
        </div>
        {job.remote && (
          <span className="shrink-0 rounded-full bg-teal/15 px-3 py-1 text-xs font-semibold text-teal">
            Remote
          </span>
        )}
      </div>

      <p className="mt-4 line-clamp-2 text-sm text-muted-foreground">{job.summary}</p>

      <dl className="mt-5 grid gap-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="h-4 w-4 shrink-0 text-pink" aria-hidden="true" />
          <dt className="sr-only">Location</dt>
          <dd className="truncate">{job.location}</dd>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Banknote className="h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
          <dt className="sr-only">Salary</dt>
          <dd>{formatSalary(job.salaryMin, job.salaryMax)}</dd>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          <dt className="sr-only">Job type</dt>
          <dd>
            {job.type} · {job.posted}
          </dd>
        </div>
      </dl>

      <ul className="mt-5 flex flex-wrap gap-2">
        {job.tags.map((t) => (
          <li
            key={t}
            className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
          >
            {t}
          </li>
        ))}
      </ul>
    </motion.article>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="glass rounded-3xl p-6" aria-hidden="true">
      <div className="flex items-center gap-4">
        <div className="h-12 w-12 animate-pulse rounded-2xl bg-muted" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-muted" />
          <div className="h-3 w-1/3 animate-pulse rounded-full bg-muted" />
        </div>
      </div>
      <div className="mt-6 space-y-3">
        <div className="h-3 w-full animate-pulse rounded-full bg-muted" />
        <div className="h-3 w-5/6 animate-pulse rounded-full bg-muted" />
        <div className="h-3 w-1/2 animate-pulse rounded-full bg-muted" />
      </div>
    </div>
  );
}
