import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const trustBadgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider rounded-sm font-mono",
  {
    variants: {
      level: {
        mod: "bg-trust-mod/10 text-trust-mod border border-trust-mod/20",
        verified: "bg-trust-verified/10 text-trust-verified border border-trust-verified/20",
        crowd: "bg-trust-crowd/10 text-trust-crowd border border-trust-crowd/20",
        disputed: "bg-trust-disputed/10 text-trust-disputed border border-trust-disputed/20",
      },
    },
    defaultVariants: {
      level: "crowd",
    },
  }
);

export interface TrustBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof trustBadgeVariants> {}

const trustLabels: Record<string, string> = {
  mod: "MOD",
  verified: "VERIFIED",
  crowd: "CROWD",
  disputed: "DISPUTED",
};

const trustDescriptions: Record<string, string> = {
  mod: "Platform Moderator",
  verified: "Event Staff",
  crowd: "3+ Confirmations",
  disputed: "Under Review",
};

export function TrustBadge({
  className,
  level,
  ...props
}: TrustBadgeProps) {
  return (
    <span
      className={cn(trustBadgeVariants({ level, className }))}
      title={trustDescriptions[level || "crowd"]}
      {...props}
    >
      {trustLabels[level || "crowd"]}
    </span>
  );
}
