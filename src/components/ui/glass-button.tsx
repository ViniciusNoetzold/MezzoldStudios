import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Link from "next/link";

function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

const glassButtonVariants = cva(
  "relative isolate all-unset cursor-pointer rounded-full transition-all",
  {
    variants: {
      size: {
        default: "text-base font-bold",
        sm: "text-sm font-bold",
        lg: "text-lg font-bold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

const glassButtonTextVariants = cva(
  "glass-button-text relative block select-none tracking-widest uppercase text-white font-sans",
  {
    variants: {
      size: {
        default: "px-6 py-3.5",
        sm: "px-6 py-2.5",
        lg: "px-8 py-4",
        icon: "flex h-10 w-10 items-center justify-center",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export interface GlassButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof glassButtonVariants> {
  contentClassName?: string;
  href?: string;
}

const GlassButton = React.forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ className, children, size, contentClassName, href, ...props }, ref) => {
    return (
      <div
        className={cn(
          "glass-button-wrap cursor-pointer rounded-full inline-block",
          className
        )}
      >
        {href ? (
          <Link
            href={href}
            className={cn("glass-button h-full w-full block text-center", glassButtonVariants({ size }))}
            // eslint-disable-next-line
            {...(props as any)}
          >
            <span
              className={cn(
                glassButtonTextVariants({ size }),
                contentClassName
              )}
            >
              {children}
            </span>
          </Link>
        ) : (
          <button
            className={cn("glass-button h-full w-full text-center", glassButtonVariants({ size }))}
            ref={ref}
            {...props}
          >
            <span
              className={cn(
                glassButtonTextVariants({ size }),
                contentClassName
              )}
            >
              {children}
            </span>
          </button>
        )}
        <div className="glass-button-shadow rounded-full"></div>
      </div>
    );
  }
);
GlassButton.displayName = "GlassButton";

export { GlassButton, glassButtonVariants };
