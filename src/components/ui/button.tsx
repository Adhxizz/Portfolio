"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:bg-primary/90 shadow-[0_0_0_0_rgba(59,130,246,0.5)] hover:shadow-[0_0_30px_4px_rgba(59,130,246,0.35)]",
        outline:
          "border border-border bg-transparent text-foreground hover:border-primary/60 hover:bg-primary/5",
        ghost: "bg-transparent text-foreground hover:bg-surface-2",
      },
      size: {
        default: "h-11 px-6",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  magnetic?: boolean;
}

type Ripple = { id: number; x: number; y: number; size: number };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = true, onClick, children, ...props }, ref) => {
    const [ripples, setRipples] = React.useState<Ripple[]>([]);
    const idRef = React.useRef(0);

    function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
      const rect = e.currentTarget.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      const id = idRef.current++;
      setRipples((r) => [...r, { id, x, y, size }]);
      setTimeout(() => {
        setRipples((r) => r.filter((rip) => rip.id !== id));
      }, 650);
      onClick?.(e);
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onClick={handleClick}
        data-cursor="button"
        data-magnetic={magnetic ? "" : undefined}
        {...props}
      >
        {children}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="pointer-events-none absolute rounded-full bg-white/30"
            style={{
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
              animation: "ripple-expand 0.65s ease-out forwards",
            }}
          />
        ))}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
