import { useState } from "react";
import { EventCard, DeliveryStatus } from "@/components/EventCard";
import { Header, MobileNav } from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { Filter, TrendingUp, TrendingDown } from "lucide-react";

// Mock data for events
const mockEvents = [
  {
    id: "1",
    name: "Afrobeats To The World",
    venue: "Eko Convention Centre",
    headliner: "Burna Boy",
    date: "Dec 23, 2024",
    status: "late" as DeliveryStatus,
    promisedTime: "8:00 PM",
    actualTime: "9:41 PM",
    promisedDuration: 60,
    actualDuration: 19,
  },
  {
    id: "2",
    name: "Detty Rave",
    venue: "Landmark Beach",
    headliner: "Rema",
    date: "Dec 24, 2024",
    status: "ontime" as DeliveryStatus,
    promisedTime: "10:00 PM",
    actualTime: "10:12 PM",
    promisedDuration: 75,
    actualDuration: 72,
  },
  {
    id: "3",
    name: "The Homecoming",
    venue: "Federal Palace",
    headliner: "Wizkid",
    date: "Dec 26, 2024",
    status: "failed" as DeliveryStatus,
    promisedTime: "9:00 PM",
    actualTime: "1:15 AM",
    promisedDuration: 90,
    actualDuration: 22,
  },
  {
    id: "4",
    name: "Lagos City Fest",
    venue: "Tafawa Balewa Square",
    headliner: "Davido",
    date: "Dec 27, 2024",
    status: "live" as DeliveryStatus,
    promisedTime: "7:00 PM",
    actualTime: undefined,
    promisedDuration: 60,
    actualDuration: undefined,
  },
  {
    id: "5",
    name: "Sallah Fest",
    venue: "Livespot 360",
    headliner: "Asake",
    date: "Dec 28, 2024",
    status: "pending" as DeliveryStatus,
    promisedTime: "8:30 PM",
    actualTime: undefined,
    promisedDuration: 45,
    actualDuration: undefined,
  },
  {
    id: "6",
    name: "December In GRA",
    venue: "GRA Ikeja",
    headliner: "Odumodublvck",
    date: "Dec 29, 2024",
    status: "late" as DeliveryStatus,
    promisedTime: "9:00 PM",
    actualTime: "10:45 PM",
    promisedDuration: 45,
    actualDuration: 38,
  },
];

type TimeFilter = "today" | "week" | "december";
type SortFilter = "best" | "worst";

const HomeFeed = () => {
  const [timeFilter, setTimeFilter] = useState<TimeFilter>("december");
  const [sortFilter, setSortFilter] = useState<SortFilter>("worst");

  // Filter and sort events
  const filteredEvents = [...mockEvents].sort((a, b) => {
    if (sortFilter === "worst") {
      // Failed first, then late, then on-time
      const statusOrder = { failed: 0, late: 1, live: 2, pending: 3, ontime: 4 };
      return statusOrder[a.status] - statusOrder[b.status];
    } else {
      // On-time first
      const statusOrder = { ontime: 0, pending: 1, live: 2, late: 3, failed: 4 };
      return statusOrder[a.status] - statusOrder[b.status];
    }
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            What Actually Happened
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Real-time accountability for Detty December events
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-4 mb-6">
          {/* Time filters */}
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <div className="flex gap-1">
              {(["today", "week", "december"] as TimeFilter[]).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={cn(
                    "px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors rounded-sm",
                    timeFilter === filter
                      ? "bg-foreground text-background"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {filter === "week" ? "This Week" : filter}
                </button>
              ))}
            </div>
          </div>

          {/* Sort toggle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Sort by:
            </span>
            <div className="flex gap-1">
              <button
                onClick={() => setSortFilter("worst")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors rounded-sm",
                  sortFilter === "worst"
                    ? "bg-status-failure-bg text-status-failure-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <TrendingDown className="w-3 h-3" />
                Worst
              </button>
              <button
                onClick={() => setSortFilter("best")}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-wider font-medium transition-colors rounded-sm",
                  sortFilter === "best"
                    ? "bg-status-success-bg text-status-success-foreground"
                    : "bg-muted text-muted-foreground hover:text-foreground"
                )}
              >
                <TrendingUp className="w-3 h-3" />
                Best
              </button>
            </div>
          </div>
        </div>

        {/* Event Feed */}
        <div className="grid gap-4">
          {filteredEvents.map((event, index) => (
            <div
              key={event.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <EventCard {...event} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No events found for this filter.</p>
          </div>
        )}
      </main>

      <MobileNav />
    </div>
  );
};

export default HomeFeed;
