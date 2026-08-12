import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { Sparkles, Briefcase, UserRound } from "lucide-react";
import { RippleButton } from "@/components/RippleButton";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in or join — HireHub" },
      {
        name: "description",
        content:
          "Create a HireHub account as a job seeker or employer to save roles, track applications and post openings.",
      },
      { property: "og:title", content: "Sign in or join — HireHub" },
      {
        property: "og:description",
        content: "Join HireHub as a job seeker or employer in under a minute.",
      },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [role, setRole] = useState<"seeker" | "employer">("seeker");
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-6xl px-5 pb-24">
      <div className="glass shadow-soft grid overflow-hidden rounded-3xl lg:grid-cols-2">
        <section
          aria-hidden="true"
          className="bg-brand relative hidden min-h-[32rem] flex-col justify-between p-10 text-primary-foreground lg:flex"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="animate-blob absolute -top-16 -left-10 h-64 w-64 rounded-full bg-white/20 blur-2xl" />
            <div
              className="animate-blob absolute right-0 bottom-0 h-72 w-72 rounded-full bg-amber/40 blur-2xl"
              style={{ animationDelay: "-6s" }}
            />
          </div>
          <p className="relative flex items-center gap-2 text-lg font-extrabold">
            <Sparkles className="h-5 w-5" /> HireHub
          </p>
          <div className="relative">
            <p className="text-4xl leading-tight font-extrabold">
              Two sides.
              <br />
              One great match.
            </p>
            <p className="mt-4 max-w-sm opacity-90">
              5,320 hires made, 860 companies, and a candidate experience people actually
              recommend.
            </p>
          </div>
          <p className="relative text-sm opacity-80">Demo experience — no real accounts created.</p>
        </section>

        <section className="p-8 sm:p-12">
          <div
            role="tablist"
            aria-label="Account type"
            className="grid grid-cols-2 gap-1 rounded-full bg-secondary p-1"
          >
            {(
              [
                { key: "seeker", label: "Job seeker", icon: UserRound },
                { key: "employer", label: "Employer", icon: Briefcase },
              ] as const
            ).map((r) => (
              <button
                key={r.key}
                role="tab"
                type="button"
                aria-selected={role === r.key}
                onClick={() => setRole(r.key)}
                className={`relative flex h-11 items-center justify-center gap-2 rounded-full text-sm font-semibold transition-colors ${
                  role === r.key ? "text-primary-foreground" : "text-muted-foreground"
                }`}
              >
                {role === r.key && (
                  <motion.span
                    layoutId="role-pill"
                    className="bg-brand absolute inset-0 -z-10 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <r.icon className="h-4 w-4" aria-hidden="true" />
                {r.label}
              </button>
            ))}
          </div>

          <h1 className="mt-8 text-3xl font-extrabold">
            {mode === "signin" ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {role === "seeker"
              ? "Save roles, track applications, and get weekly matches."
              : "Post roles, manage applicants, and reach curated talent."}
          </p>

          <AnimatePresence mode="wait">
            <motion.form
              key={mode + role}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-8 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              {mode === "signup" && <AuthField id="au-name" label="Full name" />}
              <AuthField id="au-email" label="Email" type="email" />
              <AuthField id="au-pass" label="Password" type="password" />

              <RippleButton type="submit" size="lg" className="w-full">
                {mode === "signin" ? "Sign in" : "Create account"}
              </RippleButton>

              {sent && (
                <p role="status" className="text-center text-sm font-medium text-teal">
                  Demo only — no account was created.
                </p>
              )}
            </motion.form>
          </AnimatePresence>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {mode === "signin" ? "New to HireHub?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => {
                setMode((m) => (m === "signin" ? "signup" : "signin"));
                setSent(false);
              }}
              className="font-semibold text-primary hover:underline"
            >
              {mode === "signin" ? "Create an account" : "Sign in"}
            </button>
          </p>
        </section>
      </div>
    </div>
  );
}

function AuthField({ id, label, type = "text" }: { id: string; label: string; type?: string }) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        className="mt-2 h-12 w-full rounded-2xl border border-border bg-card/70 px-4 text-sm outline-none transition-colors focus:border-primary"
      />
    </div>
  );
}
