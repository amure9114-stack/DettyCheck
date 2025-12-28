import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { ChevronRight, TrendingUp, TrendingDown } from "lucide-react";

interface ProfileCardProps {
  id: string;
  name: string;
  type: "artist" | "promoter";
  score: number;
  eventsTracked: number;
  onTimeRate?: number;
  avgDelay?: string;
  status?: "reliable" | "inconsistent" | "avoid";
  className?: string;
}

const statusLabels = {
  reliable: "Reliable",
  inconsistent: "Inconsistent",
  avoid: "Avoid",
};

const statusColors = {
  reliable: "text-status-success bg-status-success-bg",
  inconsistent: "text-status-warning bg-status-warning-bg",
  avoid: "text-status-failure bg-status-failure-bg",
};

export function ProfileCard({
  id,
  name,
  type,
  score,
  eventsTracked,
  onTimeRate,
  avgDelay,
  status,
  className,
}: ProfileCardProps) {
  const linkPath = type === "artist" ? `/artist/${id}` : `/promoter/${id}`;

  return (
    <Link
      to={linkPath}
      className={cn(
        "block bg-card border border-border p-4 transition-all duration-200 hover:shadow-elevated group",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-semibold text-foreground truncate group-hover:underline underline-offset-2">
              {name}
            </h3>
            {status && (
              <span
                className={cn(
                  "px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-sm",
                  statusColors[status]
                )}
              >
                {statusLabels[status]}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="font-mono">{eventsTracked} events tracked</span>
            {onTimeRate !== undefined && (
              <span className="flex items-center gap-1">
                {onTimeRate >= 70 ? (
                  <TrendingUp className="w-3 h-3 text-status-success" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-status-failure" />
                )}
                {onTimeRate}% on-time
              </span>
            )}
            {avgDelay && (
              <span className="font-mono">Avg delay: {avgDelay}</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div
              className={cn("font-mono text-xl font-semibold", {
                "text-status-success": score >= 80,
                "text-status-warning": score >= 50 && score < 80,
                "text-status-failure": score < 50,
              })}
            >
              {score}
              <span className="text-muted-foreground text-xs">%</span>
            </div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Delivery
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    </Link>
  );
}
