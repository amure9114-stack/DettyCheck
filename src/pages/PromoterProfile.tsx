import { useParams, Link } from "react-router-dom";
import { Header, MobileNav } from "@/components/Navigation";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { EventCard, DeliveryStatus } from "@/components/EventCard";
import { ArrowLeft, Clock, Calendar, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock promoter data
const mockPromoter = {
  id: "spaceship",
  name: "Spaceship Entertainment",
  eventsTracked: 8,
  avgDelay: "2h 15m",
  avgDeliveryScore: 54,
  status: "inconsistent" as "reliable" | "inconsistent" | "avoid",
  recentEvents: [
    {
      id: "1",
      name: "Afrobeats To The World",
      venue: "Eko Convention Centre",
      headliner: "Burna Boy",
      date: "Dec 23, 2024",
      status: "failed" as DeliveryStatus,
      promisedTime: "8:00 PM",
      actualTime: "9:41 PM",
      promisedDuration: 60,
      actualDuration: 19,
    },
    {
      id: "9",
      name: "Spaceship Summer Jam",
      venue: "Livespot 360",
      headliner: "Various Artists",
      date: "Aug 12, 2024",
      status: "late" as DeliveryStatus,
      promisedTime: "6:00 PM",
      actualTime: "8:45 PM",
      promisedDuration: 180,
      actualDuration: 140,
    },
    {
      id: "10",
      name: "New Year Countdown 2024",
      venue: "Eko Atlantic",
      headliner: "Davido",
      date: "Dec 31, 2023",
      status: "ontime" as DeliveryStatus,
      promisedTime: "10:00 PM",
      actualTime: "10:20 PM",
      promisedDuration: 120,
      actualDuration: 115,
    },
  ],
};

const statusConfig = {
  reliable: {
    label: "Reliable",
    icon: CheckCircle,
    bgColor: "bg-status-success-bg",
    textColor: "text-status-success-foreground",
    description: "Consistently delivers on promises",
  },
  inconsistent: {
    label: "Inconsistent",
    icon: AlertTriangle,
    bgColor: "bg-status-warning-bg",
    textColor: "text-status-warning-foreground",
    description: "Mixed track record on delivery",
  },
  avoid: {
    label: "Avoid",
    icon: XCircle,
    bgColor: "bg-status-failure-bg",
    textColor: "text-status-failure-foreground",
    description: "Frequent delivery failures",
  },
};

const PromoterProfile = () => {
  const { id } = useParams();

  // In real app, fetch based on id
  const promoter = mockPromoter;
  const statusInfo = statusConfig[promoter.status];
  const StatusIcon = statusInfo.icon;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-6">
        {/* Back button */}
        <Link
          to="/promoters"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All Promoters
        </Link>

        {/* Promoter Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              Promoter Profile
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl font-semibold text-foreground tracking-tight">
              {promoter.name}
            </h1>
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-sm",
                statusInfo.bgColor
              )}
            >
              <StatusIcon className={cn("w-4 h-4", statusInfo.textColor)} />
              <span
                className={cn(
                  "text-xs uppercase tracking-wider font-medium",
                  statusInfo.textColor
                )}
              >
                {statusInfo.label}
              </span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {statusInfo.description}
          </p>
        </div>

        {/* Stats Overview */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            The Track Record
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card border border-border p-4 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-xl font-mono font-semibold">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{promoter.eventsTracked}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  Events Tracked
                </span>
              </div>
            </div>
            <div className="bg-card border border-border p-4 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-xl font-mono font-semibold">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-status-warning">{promoter.avgDelay}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  Avg Delay
                </span>
              </div>
            </div>
            <div className="bg-card border border-border p-4 text-center">
              <ScoreDisplay
                value={promoter.avgDeliveryScore}
                label="Avg Delivery"
                size="default"
              />
            </div>
          </div>
        </section>

        {/* Recent Events */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Event History
          </h2>

          <div className="grid gap-4">
            {promoter.recentEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  );
};

export default PromoterProfile;
