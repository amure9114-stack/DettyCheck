import { Header, MobileNav } from "@/components/Navigation";
import { ProfileCard } from "@/components/ProfileCard";

// Mock promoter data
const mockPromoters = [
  {
    id: "live-nation-ng",
    name: "Live Nation Nigeria",
    type: "promoter" as const,
    score: 88,
    eventsTracked: 12,
    avgDelay: "18min",
    status: "reliable" as const,
  },
  {
    id: "flytime",
    name: "Flytime Promotions",
    type: "promoter" as const,
    score: 82,
    eventsTracked: 28,
    avgDelay: "35min",
    status: "reliable" as const,
  },
  {
    id: "smade",
    name: "SMADE Entertainment",
    type: "promoter" as const,
    score: 75,
    eventsTracked: 15,
    avgDelay: "52min",
    status: "inconsistent" as const,
  },
  {
    id: "spaceship",
    name: "Spaceship Entertainment",
    type: "promoter" as const,
    score: 54,
    eventsTracked: 8,
    avgDelay: "2h 15m",
    status: "inconsistent" as const,
  },
  {
    id: "vibes-live",
    name: "Vibes Live",
    type: "promoter" as const,
    score: 41,
    eventsTracked: 6,
    avgDelay: "3h 20m",
    status: "avoid" as const,
  },
];

const PromotersPage = () => {
  // Sort promoters by score descending
  const sortedPromoters = [...mockPromoters].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Promoter Profiles
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Track records for event promoters and organizers
          </p>
        </div>

        {/* Stats Summary */}
        <div className="bg-muted/50 border border-border p-4 mb-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="font-mono">
              <span className="text-muted-foreground">Promoters Tracked:</span>{" "}
              <span className="font-semibold">{mockPromoters.length}</span>
            </span>
            <span className="font-mono">
              <span className="text-muted-foreground">Reliable:</span>{" "}
              <span className="font-semibold text-status-success">
                {mockPromoters.filter((p) => p.status === "reliable").length}
              </span>
            </span>
            <span className="font-mono">
              <span className="text-muted-foreground">Avoid:</span>{" "}
              <span className="font-semibold text-status-failure">
                {mockPromoters.filter((p) => p.status === "avoid").length}
              </span>
            </span>
          </div>
        </div>

        {/* Promoter List */}
        <div className="grid gap-3">
          {sortedPromoters.map((promoter, index) => (
            <div
              key={promoter.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <ProfileCard {...promoter} />
            </div>
          ))}
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default PromotersPage;
