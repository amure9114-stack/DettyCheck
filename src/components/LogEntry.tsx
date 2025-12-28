import { cn } from "@/lib/utils";
import { TrustBadge } from "./TrustBadge";

export type LogEntryType = "success" | "warning" | "failure" | "neutral";
export type TrustLevel = "mod" | "verified" | "crowd" | "disputed";

interface LogEntryProps {
  timestamp: string;
  title: string;
  description?: string;
  type?: LogEntryType;
  source?: TrustLevel;
  isLast?: boolean;
  className?: string;
}

export function LogEntry({
  timestamp,
  title,
  description,
  type = "neutral",
  source,
  isLast = false,
  className,
}: LogEntryProps) {
  return (
    <div
      className={cn(
        "relative pl-6 pb-4 ml-2",
        !isLast && "border-l-2 border-border",
        className
      )}
    >
      {/* Timeline dot */}
      <span
        className={cn(
          "absolute left-0 top-0.5 w-3 h-3 rounded-full -translate-x-1/2 border-2 border-background",
          {
            "bg-status-success": type === "success",
            "bg-status-warning": type === "warning",
            "bg-status-failure": type === "failure",
            "bg-muted-foreground": type === "neutral",
          }
        )}
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
            {timestamp}
          </span>
          {source && <TrustBadge level={source} />}
        </div>
        <p className="text-sm font-medium text-foreground">{title}</p>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  );
}
