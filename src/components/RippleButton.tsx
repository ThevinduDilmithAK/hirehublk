import { forwardRef, useState, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Variant = "brand" | "ghost" | "outline" | "warm";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  brand: "bg-brand text-primary-foreground shadow-glow hover:brightness-110",
  warm: "bg-warm text-primary-foreground shadow-soft hover:brightness-105",
  outline: "border border-border bg-card/60 text-foreground hover:bg-accent",
  ghost: "text-foreground hover:bg-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

type Ripple = { id: number; x: number; y: number };

export interface RippleButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const RippleButton = forwardRef<HTMLButtonElement, RippleButtonProps>(
  ({ className, variant = "brand", size = "md", onClick, children, ...props }, ref) => {
    const [ripples, setRipples] = useState<Ripple[]>([]);

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((r) => [...r, { id, x: e.clientX - rect.left, y: e.clientY - rect.top }]);
      setTimeout(() => setRipples((r) => r.filter((x) => x.id !== id)), 600);
      onClick?.(e);
    };

    return (
      <button
        ref={ref}
        onClick={handleClick}
        className={cn(
          "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-transform duration-200 active:scale-95 disabled:pointer-events-none disabled:opacity-60",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {ripples.map((r) => (
          <span
            key={r.id}
            aria-hidden="true"
            className="pointer-events-none absolute -z-10 h-40 w-40 animate-[scale-in_0.6s_ease-out] rounded-full bg-current opacity-20"
            style={{ left: r.x - 80, top: r.y - 80 }}
          />
        ))}
        {children}
      </button>
    );
  },
);
RippleButton.displayName = "RippleButton";
