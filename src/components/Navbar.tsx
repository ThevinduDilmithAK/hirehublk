import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Moon, Sun, Sparkles } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { RippleButton } from "./RippleButton";
import { cn } from "@/lib/utils";

const links = [
  { to: "/", label: "Home" },
  { to: "/jobs", label: "Jobs" },
  { to: "/companies", label: "Companies" },
  { to: "/post-job", label: "Post a Job" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "py-2" : "py-4",
      )}
    >
      <nav
        aria-label="Main"
        className={cn(
          "mx-auto flex max-w-6xl items-center gap-4 rounded-full px-4 transition-all duration-300 sm:px-6",
          scrolled ? "glass shadow-soft h-14 w-[94%]" : "h-16 w-[96%] bg-transparent",
        )}
      >
        <Link to="/" className="flex min-w-0 items-center gap-2 font-display text-lg font-extrabold">
          <span
            aria-hidden="true"
            className="bg-brand grid h-9 w-9 shrink-0 place-items-center rounded-xl text-primary-foreground"
          >
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="text-gradient">HireHub</span>
        </Link>

        <ul className="ml-auto hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                activeProps={{ className: "text-foreground bg-accent" }}
                activeOptions={{ exact: l.to === "/" }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <button
            type="button"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-colors hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <Link to="/auth" className="hidden md:block">
            <RippleButton size="sm">Sign in</RippleButton>
          </Link>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-4 w-5" aria-hidden="true">
              <motion.span
                className="absolute left-0 block h-0.5 w-5 rounded bg-foreground"
                animate={open ? { top: 7, rotate: 45 } : { top: 1, rotate: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="absolute top-[7px] left-0 block h-0.5 w-5 rounded bg-foreground"
                animate={{ opacity: open ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="absolute left-0 block h-0.5 w-5 rounded bg-foreground"
                animate={open ? { top: 7, rotate: -45 } : { top: 13, rotate: 0 }}
                transition={{ duration: 0.25 }}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="glass shadow-soft mx-auto mt-2 w-[94%] max-w-6xl rounded-3xl p-4 md:hidden"
          >
            <ul className="grid gap-1">
              {links.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block rounded-2xl px-4 py-3 text-sm font-medium hover:bg-accent"
                    activeProps={{ className: "bg-accent" }}
                    activeOptions={{ exact: l.to === "/" }}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/auth" className="block px-1 pt-2">
                  <RippleButton className="w-full">Sign in</RippleButton>
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
