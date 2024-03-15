import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        minor:
          "flex justify-center items-center px-0 py-0 aspect-square border-transparent bg-red-200 text-primary-foreground hover:bg-red-200/80",
        moderate:
          "flex justify-center items-center px-0 py-0 aspect-square border-transparent bg-red-400 text-primary-foreground hover:bg-red-400/80",
        serious:
          "flex justify-center items-center px-0 py-0 aspect-square border-transparent bg-red-600 text-foreground hover:bg-red-600/80",
        critical:
          "flex justify-center items-center px-0 py-0 aspect-square border-transparent bg-red-800 text-foreground hover:bg-red-800/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
