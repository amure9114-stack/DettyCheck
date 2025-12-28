import { cn } from "@/lib/utils";

interface DataComparisonRowProps {
  label: string;
  promised: string | number;
  actual: string | number;
  unit?: string;
  status?: "success" | "warning" | "failure" | "neutral";
  className?: string;
}

export function DataComparisonRow({
  label,
  promised,
  actual,
  unit = "",
  status = "neutral",
  className,
}: DataComparisonRowProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between py-3 border-b border-border last:border-0",
        className
      )}
    >
      <span className="text-sm text-muted-foreground">{label}</span>
      <div className="flex items-center gap-3 font-mono text-sm">
        <span className="text-muted-foreground">
          {promised}
          {unit}
        </span>
        <span className="text-muted-foreground">→</span>
        <span
          className={cn("font-medium", {
            "text-status-success": status === "success",
            "text-status-warning": status === "warning",
            "text-status-failure": status === "failure",
            "text-foreground": status === "neutral",
          })}
        >
          {actual}
          {unit}
        </span>
      </div>
    </div>
  );
}
