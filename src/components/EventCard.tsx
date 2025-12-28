import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { DeliveryBadge } from "./DeliveryBadge";
import { MapPin, Clock, User } from "lucide-react";

export type DeliveryStatus = "ontime" | "late" | "failed" | "pending" | "live";

interface EventCardProps {
  id: string;
  name: string;
  venue: string;
  headliner: string;
  date: string;
  status: DeliveryStatus;
  promisedTime?: string;
  actualTime?: string;
  promisedDuration?: number;
  actualDuration?: number;
  className?: string;
}

export function EventCard({
  id,
  name,
  venue,
  headliner,
  date,
  status,
  promisedTime,
  actualTime,
  promisedDuration,
  actualDuration,
  className,
}: EventCardProps) {
  const hasTimeData = promisedTime && actualTime;
  const hasDurationData = promisedDuration !== undefined && actualDuration !== undefined;

  return (
    <Link
      to={`/event/${id}`}
      className={cn(
        "block bg-card border border-border p-4 transition-all duration-200 hover:shadow-elevated group",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground truncate group-hover:underline underline-offset-2">
            {name}
          </h3>
          <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">
            {date}
          </p>
        </div>
        <DeliveryBadge status={status} />
      </div>

      {/* Meta info */}
      <div className="flex flex-col gap-1.5 mb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{venue}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <User className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="truncate">{headliner}</span>
        </div>
      </div>

      {/* Delivery comparison */}
      {(hasTimeData || hasDurationData) && (
        <div className="pt-3 border-t border-border space-y-2">
          {hasTimeData && (
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
              <span className="font-mono text-xs">
                <span className="text-muted-foreground">Promised</span>{" "}
                <span className="text-foreground">{promisedTime}</span>
                <span className="text-muted-foreground mx-1">→</span>
                <span className="text-muted-foreground">Started</span>{" "}
                <span
                  className={cn("font-medium", {
                    "text-status-success": status === "ontime",
                    "text-status-warning": status === "late",
                    "text-status-failure": status === "failed",
                  })}
                >
                  {actualTime}
                </span>
              </span>
            </div>
          )}
          {hasDurationData && (
            <div className="text-xs font-mono text-muted-foreground">
              Delivered{" "}
              <span
                className={cn("font-medium", {
                  "text-status-success": actualDuration! >= promisedDuration! * 0.9,
                  "text-status-warning":
                    actualDuration! >= promisedDuration! * 0.5 &&
                    actualDuration! < promisedDuration! * 0.9,
                  "text-status-failure": actualDuration! < promisedDuration! * 0.5,
                })}
              >
                {actualDuration}
              </span>{" "}
              of {promisedDuration} mins
            </div>
          )}
        </div>
      )}
    </Link>
  );
}
