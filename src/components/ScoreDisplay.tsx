import { cn } from "@/lib/utils";

interface ScoreDisplayProps {
  value: number;
  label: string;
  suffix?: string;
  size?: "sm" | "default" | "lg";
  className?: string;
}

export function ScoreDisplay({
  value,
  label,
  suffix = "%",
  size = "default",
  className,
}: ScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-status-success";
    if (score >= 50) return "text-status-warning";
    return "text-status-failure";
  };

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <span
        className={cn(
          "font-mono font-semibold tracking-tight",
          getScoreColor(value),
          {
            "text-lg": size === "sm",
            "text-2xl": size === "default",
            "text-4xl": size === "lg",
          }
        )}
      >
        {value}
        <span className="text-muted-foreground text-[0.6em]">{suffix}</span>
      </span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
        {label}
      </span>
    </div>
  );
}
