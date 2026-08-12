import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Banknote, Clock, Check } from "lucide-react";
import { categories, jobTypes } from "@/data/jobs";
import { RippleButton } from "@/components/RippleButton";

export const Route = createFileRoute("/post-job")({
  head: () => ({
    meta: [
      { title: "Post a job — HireHub" },
      {
        name: "description",
        content:
          "Publish a role on HireHub in minutes. Fill in the details and watch your listing preview update live.",
      },
      { property: "og:title", content: "Post a job — HireHub" },
      {
        property: "og:description",
        content: "Publish a role on HireHub in minutes with a live listing preview.",
      },
    ],
  }),
  component: PostJob,
});

type Form = {
  title: string;
  company: string;
  location: string;
  type: string;
  category: string;
  salaryMin: string;
  salaryMax: string;
  summary: string;
};

const empty: Form = {
  title: "",
  company: "",
  location: "",
  type: "Full-time",
  category: "Engineering",
  salaryMin: "",
  salaryMax: "",
  summary: "",
};

function validate(f: Form) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (f.title.trim().length < 3) e.title = "Title needs at least 3 characters";
  if (f.company.trim() === "") e.company = "Company name is required";
  if (f.location.trim() === "") e.location = "Add a city or 'Remote'";
  if (f.summary.trim().length < 20) e.summary = "Write at least 20 characters";
  const min = Number(f.salaryMin);
  const max = Number(f.salaryMax);
  if (!min) e.salaryMin = "Enter a minimum salary";
  if (!max) e.salaryMax = "Enter a maximum salary";
  else if (min && max < min) e.salaryMax = "Maximum must be above minimum";
  return e;
}

function PostJob() {
  const [form, setForm] = useState<Form>(empty);
  const [touched, setTouched] = useState<Partial<Record<keyof Form, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const errors = validate(form);

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));
  const blur = (k: keyof Form) => setTouched((t) => ({ ...t, [k]: true }));
  const err = (k: keyof Form) => (touched[k] ? errors[k] : undefined);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24">
      <header className="pt-6 pb-10">
        <h1 className="text-4xl font-extrabold sm:text-5xl">
          Post a <span className="text-gradient">job</span>
        </h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Fill in the details and watch your listing come to life on the right.
        </p>
      </header>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form
          className="glass shadow-soft space-y-5 rounded-3xl p-6 sm:p-8"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            setTouched({
              title: true,
              company: true,
              location: true,
              summary: true,
              salaryMin: true,
              salaryMax: true,
            });
            if (Object.keys(errors).length === 0) setSubmitted(true);
          }}
        >
          <Text
            id="title"
            label="Job title"
            value={form.title}
            onChange={(v) => set("title", v)}
            onBlur={() => blur("title")}
            error={err("title")}
          />
          <Text
            id="company"
            label="Company"
            value={form.company}
            onChange={(v) => set("company", v)}
            onBlur={() => blur("company")}
            error={err("company")}
          />
          <Text
            id="location"
            label="Location"
            value={form.location}
            onChange={(v) => set("location", v)}
            onBlur={() => blur("location")}
            error={err("location")}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <Select
              id="category"
              label="Category"
              value={form.category}
              options={[...categories]}
              onChange={(v) => set("category", v)}
            />
            <Select
              id="type"
              label="Job type"
              value={form.type}
              options={[...jobTypes]}
              onChange={(v) => set("type", v)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Text
              id="salaryMin"
              label="Salary min (USD)"
              type="number"
              value={form.salaryMin}
              onChange={(v) => set("salaryMin", v)}
              onBlur={() => blur("salaryMin")}
              error={err("salaryMin")}
            />
            <Text
              id="salaryMax"
              label="Salary max (USD)"
              type="number"
              value={form.salaryMax}
              onChange={(v) => set("salaryMax", v)}
              onBlur={() => blur("salaryMax")}
              error={err("salaryMax")}
            />
          </div>

          <div>
            <label htmlFor="summary" className="text-sm font-semibold">
              Short summary
            </label>
            <textarea
              id="summary"
              rows={4}
              value={form.summary}
              onChange={(e) => set("summary", e.target.value)}
              onBlur={() => blur("summary")}
              aria-invalid={!!err("summary")}
              aria-describedby={err("summary") ? "summary-error" : undefined}
              className={`mt-2 w-full rounded-2xl border bg-card/70 p-4 text-sm outline-none transition-colors focus:border-primary ${
                err("summary") ? "border-destructive" : "border-border"
              }`}
            />
            {err("summary") && (
              <motion.p
                id="summary-error"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-1 text-xs text-destructive"
              >
                {err("summary")}
              </motion.p>
            )}
          </div>

          <RippleButton type="submit" size="lg" className="w-full">
            Publish job
          </RippleButton>

          {submitted && (
            <motion.p
              role="status"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-sm font-semibold text-teal"
            >
              <Check className="h-4 w-4" aria-hidden="true" /> Listing published (demo only)
            </motion.p>
          )}
        </form>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="mb-4 text-sm font-semibold tracking-wide text-muted-foreground uppercase">
            Live preview
          </h2>
          <motion.article layout className="glass shadow-glow rounded-3xl p-6">
            <div className="flex items-start gap-4">
              <span
                aria-hidden="true"
                className="bg-brand grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-sm font-bold text-primary-foreground"
              >
                {(form.company || "HH").slice(0, 2).toUpperCase()}
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold">{form.title || "Your job title"}</h3>
                <p className="truncate text-sm text-muted-foreground">
                  {form.company || "Your company"}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {form.summary || "A short summary of the role will appear here as you type."}
            </p>
            <dl className="mt-5 grid gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-pink" aria-hidden="true" />
                <dt className="sr-only">Location</dt>
                <dd className="truncate">{form.location || "Location"}</dd>
              </div>
              <div className="flex items-center gap-2">
                <Banknote className="h-4 w-4 shrink-0 text-amber" aria-hidden="true" />
                <dt className="sr-only">Salary</dt>
                <dd>
                  {form.salaryMin && form.salaryMax
                    ? `$${Math.round(Number(form.salaryMin) / 1000)}k – $${Math.round(Number(form.salaryMax) / 1000)}k`
                    : "Salary range"}
                </dd>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <dt className="sr-only">Job type</dt>
                <dd>
                  {form.type} · {form.category}
                </dd>
              </div>
            </dl>
          </motion.article>
        </aside>
      </div>
    </div>
  );
}

function Text({
  id,
  label,
  value,
  onChange,
  onBlur,
  error,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
  error?: string | undefined;
  type?: string;
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
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`mt-2 h-12 w-full rounded-2xl border bg-card/70 px-4 text-sm outline-none transition-colors focus:border-primary ${
          error ? "border-destructive" : "border-border"
        }`}
      />
      {error && (
        <motion.p
          id={`${id}-error`}
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1 text-xs text-destructive"
        >
          {error}
        </motion.p>
      )}
    </div>
  );
}

function Select({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 h-12 w-full rounded-2xl border border-border bg-card/70 px-4 text-sm outline-none focus:border-primary"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}
