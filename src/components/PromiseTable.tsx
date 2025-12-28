import { cn } from "@/lib/utils";

interface PromiseTableProps {
  promises: Array<{
    artist: string;
    promisedStart: string;
    promisedDuration: number;
  }>;
  className?: string;
}

export function PromiseTable({ promises, className }: PromiseTableProps) {
  return (
    <div className={cn("border border-border overflow-hidden", className)}>
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-muted/50">
            <th className="text-left px-4 py-3 font-medium text-muted-foreground uppercase text-[11px] tracking-wider">
              Artist
            </th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground uppercase text-[11px] tracking-wider">
              Promised Start
            </th>
            <th className="text-left px-4 py-3 font-medium text-muted-foreground uppercase text-[11px] tracking-wider">
              Duration
            </th>
          </tr>
        </thead>
        <tbody>
          {promises.map((promise, index) => (
            <tr
              key={index}
              className="border-t border-border hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-3 font-medium">{promise.artist}</td>
              <td className="px-4 py-3 font-mono text-muted-foreground">
                {promise.promisedStart}
              </td>
              <td className="px-4 py-3 font-mono text-muted-foreground">
                {promise.promisedDuration} mins
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
