import { useParams, Link } from "react-router-dom";
import { Header, MobileNav } from "@/components/Navigation";
import { DeliveryBadge } from "@/components/DeliveryBadge";
import { DeliveryStatus } from "@/components/EventCard";
import { PromiseTable } from "@/components/PromiseTable";
import { ArrowLeft, MapPin, Calendar, Building2, AlertCircle } from "lucide-react";

// Mock event data
const mockEventDetails = {
  id: "1",
  name: "Afrobeats To The World",
  venue: "Eko Convention Centre, Victoria Island",
  date: "December 23, 2024",
  promoter: "Spaceship Entertainment",
  promoterId: "spaceship",
  status: "late" as DeliveryStatus,
  trackingStatus: "Receipt Published",
  promises: [
    { artist: "Burna Boy", promisedStart: "8:00 PM", promisedDuration: 60 },
    { artist: "Rema", promisedStart: "6:00 PM", promisedDuration: 45 },
    { artist: "Ayra Starr", promisedStart: "4:30 PM", promisedDuration: 30 },
    { artist: "BNXN", promisedStart: "3:00 PM", promisedDuration: 30 },
  ],
};

const EventPage = () => {
  const { id } = useParams();

  // In a real app, fetch event data based on id
  const event = mockEventDetails;

  const trackingStatusColors = {
    "Not Started": "bg-status-neutral-bg text-status-neutral-foreground",
    "Live Tracking": "bg-status-failure-bg text-status-failure-foreground animate-pulse-subtle",
    "Receipt Published": "bg-foreground text-background",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-6">
        {/* Back button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Feed
        </Link>

        {/* Event Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="text-2xl font-semibold text-foreground tracking-tight">
              {event.name}
            </h1>
            <DeliveryBadge status={event.status} size="lg" />
          </div>

          {/* Meta info */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span className="font-mono">{event.date}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{event.venue}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Building2 className="w-4 h-4 flex-shrink-0" />
              <Link
                to={`/promoter/${event.promoterId}`}
                className="hover:text-foreground hover:underline underline-offset-2 transition-colors"
              >
                {event.promoter}
              </Link>
            </div>
          </div>
        </div>

        {/* Tracking Status */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm text-muted-foreground uppercase tracking-wider">
            Status:
          </span>
          <span
            className={`px-3 py-1.5 text-xs uppercase tracking-wider font-medium rounded-sm ${
              trackingStatusColors[event.trackingStatus as keyof typeof trackingStatusColors]
            }`}
          >
            {event.trackingStatus}
          </span>
        </div>

        {/* Section: The Promise */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <span className="w-6 h-px bg-foreground" />
            The Promise
          </h2>

          <PromiseTable promises={event.promises} />
        </section>

        {/* Disclaimer */}
        <div className="bg-muted/50 border border-border p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Disclaimer:</span>{" "}
              Only listed promises are tracked. Additional performances or schedule changes 
              announced after event start are not included in delivery calculations.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            to={`/event/${id}/log`}
            className="flex-1 bg-foreground text-background py-3 px-4 text-center text-sm font-medium uppercase tracking-wider transition-colors hover:bg-foreground/90"
          >
            View Live Log
          </Link>
          <Link
            to={`/event/${id}/receipt`}
            className="flex-1 border border-foreground text-foreground py-3 px-4 text-center text-sm font-medium uppercase tracking-wider transition-colors hover:bg-muted"
          >
            View Receipt
          </Link>
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default EventPage;
