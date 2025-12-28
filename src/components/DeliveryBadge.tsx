import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const deliveryBadgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium uppercase tracking-wider rounded-sm transition-colors",
  {
    variants: {
      status: {
        ontime: "bg-status-success-bg text-status-success-foreground",
        late: "bg-status-warning-bg text-status-warning-foreground",
        failed: "bg-status-failure-bg text-status-failure-foreground",
        pending: "bg-status-neutral-bg text-status-neutral-foreground",
        live: "bg-status-failure-bg text-status-failure-foreground animate-pulse-subtle",
      },
      size: {
        sm: "text-[10px] px-2 py-0.5",
        default: "text-xs px-2.5 py-1",
        lg: "text-sm px-3 py-1.5",
      },
    },
    defaultVariants: {
      status: "pending",
      size: "default",
    },
  }
);

export interface DeliveryBadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof deliveryBadgeVariants> {
  showDot?: boolean;
}

const statusLabels: Record<string, string> = {
  ontime: "On Time",
  late: "Late",
  failed: "Failed Delivery",
  pending: "Pending",
  live: "Live Now",
};

export function DeliveryBadge({
  className,
  status,
  size,
  showDot = true,
  ...props
}: DeliveryBadgeProps) {
  return (
    <span
      className={cn(deliveryBadgeVariants({ status, size, className }))}
      {...props}
    >
      {showDot && (
        <span
          className={cn("w-1.5 h-1.5 rounded-full", {
            "bg-status-success": status === "ontime",
            "bg-status-warning": status === "late",
            "bg-status-failure": status === "failed" || status === "live",
            "bg-status-neutral": status === "pending",
          })}
        />
      )}
      {statusLabels[status || "pending"]}
    </span>
  );
}
