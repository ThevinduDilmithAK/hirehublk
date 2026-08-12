import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-display text-lg font-extrabold">
            <span
              aria-hidden="true"
              className="bg-brand grid h-8 w-8 place-items-center rounded-xl text-primary-foreground"
            >
              <Sparkles className="h-4 w-4" />
            </span>
            <span className="text-gradient">HireHub</span>
          </p>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The colorful job board for teams who care about craft.
          </p>
        </div>
        <nav aria-label="Candidates">
          <h2 className="text-sm font-bold">Candidates</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/jobs" className="hover:text-foreground">
                Browse jobs
              </Link>
            </li>
            <li>
              <Link to="/companies" className="hover:text-foreground">
                Companies
              </Link>
            </li>
            <li>
              <Link to="/auth" className="hover:text-foreground">
                Create profile
              </Link>
            </li>
          </ul>
        </nav>
        <nav aria-label="Employers">
          <h2 className="text-sm font-bold">Employers</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/post-job" className="hover:text-foreground">
                Post a job
              </Link>
            </li>
            <li>
              <Link to="/auth" className="hover:text-foreground">
                Employer sign up
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <h2 className="text-sm font-bold">Stay in the loop</h2>
          <p className="mt-3 text-sm text-muted-foreground">
            New roles every Monday. No spam, ever.
          </p>
        </div>
      </div>
      <p className="mt-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} HireHub. Demo data for illustration only.
      </p>
    </footer>
  );
}
