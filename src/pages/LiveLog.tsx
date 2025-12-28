import { useParams, Link } from "react-router-dom";
import { Header, MobileNav } from "@/components/Navigation";
import { LogEntry, LogEntryType, TrustLevel } from "@/components/LogEntry";
import { ArrowLeft, RefreshCw } from "lucide-react";

// Mock log data
const mockLogs = [
  {
    timestamp: "1:47 AM",
    title: "Set ended",
    description: "Burna Boy left stage after 19 minutes",
    type: "failure" as LogEntryType,
    source: "mod" as TrustLevel,
  },
  {
    timestamp: "1:28 AM",
    title: "Set started",
    description: "Burna Boy began performance",
    type: "warning" as LogEntryType,
    source: "verified" as TrustLevel,
  },
  {
    timestamp: "12:45 AM",
    title: "Artist arrived",
    description: "Burna Boy spotted backstage",
    type: "neutral" as LogEntryType,
    source: "crowd" as TrustLevel,
  },
  {
    timestamp: "11:30 PM",
    title: "Disputed entry",
    description: "Conflicting reports on main stage activities",
    type: "failure" as LogEntryType,
    source: "disputed" as TrustLevel,
  },
  {
    timestamp: "9:41 PM",
    title: "Event started",
    description: "Opening act began - 1hr 41min late",
    type: "warning" as LogEntryType,
    source: "mod" as TrustLevel,
  },
  {
    timestamp: "8:15 PM",
    title: "Gates opened",
    description: "General admission entry began",
    type: "neutral" as LogEntryType,
    source: "verified" as TrustLevel,
  },
  {
    timestamp: "6:30 PM",
    title: "VIP entry opened",
    description: "Early access for VIP ticket holders",
    type: "success" as LogEntryType,
    source: "verified" as TrustLevel,
  },
];

const LiveLog = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-6">
        {/* Back button */}
        <Link
          to={`/event/${id}`}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Event
        </Link>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-foreground tracking-tight mb-1">
                The Truth
              </h1>
              <p className="text-sm text-muted-foreground">
                Live chronological timeline of what happened
              </p>
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border hover:border-foreground">
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </button>
          </div>
        </div>

        {/* Event context */}
        <div className="bg-muted/50 border border-border p-4 mb-6">
          <p className="font-mono text-sm">
            <span className="text-muted-foreground">Event:</span>{" "}
            <span className="font-medium">Afrobeats To The World</span>
          </p>
          <p className="font-mono text-sm mt-1">
            <span className="text-muted-foreground">Date:</span>{" "}
            <span>December 23, 2024</span>
          </p>
        </div>

        {/* Source Legend */}
        <div className="flex flex-wrap gap-4 mb-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-trust-mod" />
            <span>MOD = Platform Moderator</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-trust-verified" />
            <span>VERIFIED = Event Staff</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-trust-crowd" />
            <span>CROWD = 3+ Confirmations</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-trust-disputed" />
            <span>DISPUTED = Under Review</span>
          </div>
        </div>

        {/* Timeline */}
        <section className="mt-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-6">
            Event Timeline
          </h2>

          <div className="relative">
            {mockLogs.map((log, index) => (
              <LogEntry
                key={index}
                {...log}
                isLast={index === mockLogs.length - 1}
              />
            ))}
          </div>
        </section>

        {/* Action Button */}
        <div className="mt-8">
          <Link
            to={`/event/${id}/receipt`}
            className="block bg-foreground text-background py-3 px-4 text-center text-sm font-medium uppercase tracking-wider transition-colors hover:bg-foreground/90"
          >
            View Final Receipt
          </Link>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default LiveLog;
