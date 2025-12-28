import { useParams, Link } from "react-router-dom";
import { Header, MobileNav } from "@/components/Navigation";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { EventCard, DeliveryStatus } from "@/components/EventCard";
import { ArrowLeft, Clock, TrendingUp, Calendar } from "lucide-react";

// Mock artist data
const mockArtist = {
  id: "burna",
  name: "Burna Boy",
  averageScore: 58,
  onTimePercentage: 42,
  avgSetDelivered: 67,
  totalEvents: 12,
  recentEvents: [
    {
      id: "1",
      name: "Afrobeats To The World",
      venue: "Eko Convention Centre",
      headliner: "Burna Boy",
      date: "Dec 23, 2024",
      status: "failed" as DeliveryStatus,
      promisedTime: "8:00 PM",
      actualTime: "1:28 AM",
      promisedDuration: 60,
      actualDuration: 19,
    },
    {
      id: "7",
      name: "Burna Live NYC",
      venue: "Madison Square Garden",
      headliner: "Burna Boy",
      date: "Oct 15, 2024",
      status: "late" as DeliveryStatus,
      promisedTime: "8:00 PM",
      actualTime: "9:30 PM",
      promisedDuration: 90,
      actualDuration: 75,
    },
    {
      id: "8",
      name: "African Giant Tour - London",
      venue: "O2 Arena",
      headliner: "Burna Boy",
      date: "Sep 5, 2024",
      status: "ontime" as DeliveryStatus,
      promisedTime: "9:00 PM",
      actualTime: "9:15 PM",
      promisedDuration: 120,
      actualDuration: 118,
    },
  ],
};

const ArtistProfile = () => {
  const { id } = useParams();

  // In real app, fetch based on id
  const artist = mockArtist;

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-6">
        {/* Back button */}
        <Link
          to="/artists"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          All Artists
        </Link>

        {/* Artist Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-mono">
              Artist Profile
            </span>
          </div>
          <h1 className="text-3xl font-semibold text-foreground tracking-tight">
            {artist.name}
          </h1>
        </div>

        {/* Stats Overview */}
        <section className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            The Memory
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-card border border-border p-4 text-center">
              <ScoreDisplay
                value={artist.averageScore}
                label="Avg Delivery"
                size="default"
              />
            </div>
            <div className="bg-card border border-border p-4 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-xl font-mono font-semibold">
                  <TrendingUp className="w-5 h-5 text-muted-foreground" />
                  <span
                    className={
                      artist.onTimePercentage >= 70
                        ? "text-status-success"
                        : artist.onTimePercentage >= 50
                        ? "text-status-warning"
                        : "text-status-failure"
                    }
                  >
                    {artist.onTimePercentage}%
                  </span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  On-Time Rate
                </span>
              </div>
            </div>
            <div className="bg-card border border-border p-4 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-xl font-mono font-semibold">
                  <Clock className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{artist.avgSetDelivered}%</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  Avg Set Delivered
                </span>
              </div>
            </div>
            <div className="bg-card border border-border p-4 text-center">
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 text-xl font-mono font-semibold">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{artist.totalEvents}</span>
                </div>
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground mt-1">
                  Events Tracked
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Events */}
        <section>
          <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Recent Receipts
          </h2>

          <div className="grid gap-4">
            {artist.recentEvents.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  );
};

export default ArtistProfile;
