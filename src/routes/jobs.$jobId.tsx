import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { ArrowLeft, Building2, MapPin, Banknote, Clock, Check, X } from "lucide-react";
import { getJob, formatSalary, jobs, companies } from "@/data/jobs";
import { RippleButton } from "@/components/RippleButton";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/jobs/$jobId")({
  loader: ({ params }) => {
    const job = getJob(params.jobId);
    if (!job) throw notFound();
    return { job };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Role unavailable — HireHub" }, { name: "robots", content: "noindex" }],
      };
    }
    const { job } = loaderData;
    const title = `${job.title} at ${job.company} — HireHub`;
    return {
      meta: [
        { title },
        { name: "description", content: job.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: job.summary },
      ],
    };
  },
  component: JobDetail,
});

function JobDetail() {
  const { job } = Route.useLoaderData();
  const company = companies.find((c) => c.id === job.companyId);
  const related = jobs.filter((j) => j.category === job.category && j.id !== job.id).slice(0, 2);
  const [open, setOpen] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24">
      <Link
        to="/jobs"
        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to jobs
      </Link>

      <article className="glass shadow-soft mt-6 rounded-3xl p-6 sm:p-10">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4 sm:flex sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <span
              aria-hidden="true"
              className="bg-brand grid h-14 w-14 shrink-0 place-items-center rounded-2xl text-lg font-bold text-primary-foreground"
            >
              {job.logo}
            </span>
            <div className="min-w-0">
              <h1 className="text-2xl font-extrabold sm:text-4xl">{job.title}</h1>
              <p className="mt-1 truncate text-muted-foreground">
                {job.company} · {job.type}
              </p>
            </div>
          </div>
          <RippleButton size="lg" className="shrink-0" onClick={() => setOpen(true)}>
            Apply now
          </RippleButton>
        </header>

        <dl className="mt-8 grid gap-4 sm:grid-cols-3">
          <Fact icon={MapPin} label="Location" value={job.remote ? `${job.location} · Remote` : job.location} />
          <Fact icon={Banknote} label="Salary" value={formatSalary(job.salaryMin, job.salaryMax)} />
          <Fact icon={Clock} label="Posted" value={job.posted} />
        </dl>

        <section className="mt-10">
          <h2 className="text-xl font-bold">About the role</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{job.description}</p>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold">What we're looking for</h2>
          <ul className="mt-3 space-y-2">
            {job.requirements.map((r: string) => (
              <li key={r} className="flex gap-3 text-muted-foreground">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-teal" aria-hidden="true" />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-xl font-bold">Perks</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {job.perks.map((p: string) => (
              <li
                key={p}
                className="rounded-full bg-secondary px-4 py-1.5 text-sm font-medium text-secondary-foreground"
              >
                {p}
              </li>
            ))}
          </ul>
        </section>

        {company && (
          <section className="mt-10 rounded-3xl bg-card/60 p-6">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <Building2 className="h-5 w-5 text-primary" aria-hidden="true" /> About {company.name}
            </h2>
            <p className="mt-2 text-muted-foreground">{company.about}</p>
            <p className="mt-3 text-sm text-muted-foreground">
              {company.industry} · {company.size} employees · {company.location}
            </p>
            <Link
              to="/companies"
              className="mt-4 inline-block text-sm font-semibold text-primary hover:underline"
            >
              See all companies
            </Link>
          </section>
        )}
      </article>

      {related.length > 0 && (
        <section className="mt-14">
          <h2 className="text-2xl font-extrabold">Similar roles</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {related.map((r, i) => (
              <Reveal key={r.id} delay={i * 0.06}>
                <Link
                  to="/jobs/$jobId"
                  params={{ jobId: r.id }}
                  className="lift glass block rounded-3xl p-6"
                >
                  <h3 className="font-bold">{r.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {r.company} · {formatSalary(r.salaryMin, r.salaryMax)}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      <AnimatePresence>{open && <ApplyModal onClose={() => setOpen(false)} title={job.title} />}</AnimatePresence>
    </div>
  );
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-card/60 p-4">
      <dt className="flex items-center gap-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        <Icon className="h-4 w-4 text-pink" aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-1 font-semibold">{value}</dd>
    </div>
  );
}

const steps = ["Your details", "Experience", "Review"];

function ApplyModal({ onClose, title }: { onClose: () => void; title: string }) {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", years: "", link: "", note: "" });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const canNext =
    step === 0 ? form.name.trim() !== "" && /\S+@\S+\.\S+/.test(form.email) : step === 1 ? form.years !== "" : true;

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center bg-black/50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="apply-title"
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
        className="glass shadow-glow w-full max-w-lg rounded-3xl bg-card p-6 sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 id="apply-title" className="text-xl font-extrabold">
            {done ? "Application sent" : `Apply · ${title}`}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close application form"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border hover:bg-accent"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {done ? (
          <div className="py-8 text-center">
            <span className="bg-brand mx-auto grid h-16 w-16 place-items-center rounded-full text-primary-foreground">
              <Check className="h-7 w-7" aria-hidden="true" />
            </span>
            <p className="mt-5 text-muted-foreground">
              Thanks {form.name.split(" ")[0]} — the team will be in touch within a few days.
            </p>
            <RippleButton className="mt-6" onClick={onClose}>
              Done
            </RippleButton>
          </div>
        ) : (
          <>
            <ol className="mt-6 flex gap-2" aria-label="Application progress">
              {steps.map((s, i) => (
                <li key={s} className="flex-1">
                  <div
                    className={`h-1.5 rounded-full transition-colors duration-300 ${i <= step ? "bg-brand" : "bg-muted"}`}
                  />
                  <span
                    className={`mt-2 block text-xs ${i === step ? "font-semibold text-foreground" : "text-muted-foreground"}`}
                  >
                    {s}
                  </span>
                </li>
              ))}
            </ol>

            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (step < steps.length - 1) setStep((s) => s + 1);
                else setDone(true);
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-4"
                >
                  {step === 0 && (
                    <>
                      <Field id="ap-name" label="Full name" value={form.name} onChange={set("name")} />
                      <Field
                        id="ap-email"
                        label="Email"
                        type="email"
                        value={form.email}
                        onChange={set("email")}
                        error={
                          form.email !== "" && !/\S+@\S+\.\S+/.test(form.email)
                            ? "Enter a valid email address"
                            : undefined
                        }
                      />
                    </>
                  )}
                  {step === 1 && (
                    <>
                      <Field
                        id="ap-years"
                        label="Years of experience"
                        type="number"
                        value={form.years}
                        onChange={set("years")}
                      />
                      <Field
                        id="ap-link"
                        label="Portfolio or LinkedIn"
                        value={form.link}
                        onChange={set("link")}
                      />
                    </>
                  )}
                  {step === 2 && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="ap-note" className="text-sm font-semibold">
                          Anything else?
                        </label>
                        <textarea
                          id="ap-note"
                          rows={4}
                          value={form.note}
                          onChange={set("note")}
                          className="mt-2 w-full rounded-2xl border border-border bg-card/70 p-4 text-sm outline-none focus:border-primary"
                        />
                      </div>
                      <dl className="rounded-2xl bg-card/60 p-4 text-sm">
                        <div className="flex justify-between gap-4">
                          <dt className="text-muted-foreground">Name</dt>
                          <dd className="truncate font-medium">{form.name}</dd>
                        </div>
                        <div className="mt-2 flex justify-between gap-4">
                          <dt className="text-muted-foreground">Email</dt>
                          <dd className="truncate font-medium">{form.email}</dd>
                        </div>
                        <div className="mt-2 flex justify-between gap-4">
                          <dt className="text-muted-foreground">Experience</dt>
                          <dd className="font-medium">{form.years} years</dd>
                        </div>
                      </dl>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              <div className="flex justify-between gap-3 pt-2">
                <RippleButton
                  type="button"
                  variant="outline"
                  onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
                >
                  {step === 0 ? "Cancel" : "Back"}
                </RippleButton>
                <RippleButton type="submit" disabled={!canNext}>
                  {step === steps.length - 1 ? "Submit application" : "Continue"}
                </RippleButton>
              </div>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  error,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  error?: string | undefined;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 h-12 w-full rounded-2xl border bg-card/70 px-4 text-sm outline-none transition-colors focus:border-primary ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
