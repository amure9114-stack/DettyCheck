import { Header, MobileNav } from "@/components/Navigation";
import { ProfileCard } from "@/components/ProfileCard";

// Mock artist data
const mockArtists = [
  {
    id: "rema",
    name: "Rema",
    type: "artist" as const,
    score: 91,
    eventsTracked: 15,
    onTimeRate: 87,
  },
  {
    id: "bnxn",
    name: "BNXN",
    type: "artist" as const,
    score: 89,
    eventsTracked: 8,
    onTimeRate: 82,
  },
  {
    id: "ayra",
    name: "Ayra Starr",
    type: "artist" as const,
    score: 86,
    eventsTracked: 11,
    onTimeRate: 78,
  },
  {
    id: "asake",
    name: "Asake",
    type: "artist" as const,
    score: 72,
    eventsTracked: 14,
    onTimeRate: 65,
  },
  {
    id: "burna",
    name: "Burna Boy",
    type: "artist" as const,
    score: 58,
    eventsTracked: 12,
    onTimeRate: 42,
  },
  {
    id: "wizkid",
    name: "Wizkid",
    type: "artist" as const,
    score: 45,
    eventsTracked: 18,
    onTimeRate: 28,
  },
  {
    id: "davido",
    name: "Davido",
    type: "artist" as const,
    score: 76,
    eventsTracked: 22,
    onTimeRate: 71,
  },
];

const ArtistsPage = () => {
  // Sort artists by score descending
  const sortedArtists = [...mockArtists].sort((a, b) => b.score - a.score);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Header />

      <main className="container py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-foreground tracking-tight">
            Artist Profiles
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Delivery scores and accountability records for tracked artists
          </p>
        </div>

        {/* Stats Summary */}
        <div className="bg-muted/50 border border-border p-4 mb-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <span className="font-mono">
              <span className="text-muted-foreground">Artists Tracked:</span>{" "}
              <span className="font-semibold">{mockArtists.length}</span>
            </span>
            <span className="font-mono">
              <span className="text-muted-foreground">Avg Score:</span>{" "}
              <span className="font-semibold">
                {Math.round(
                  mockArtists.reduce((sum, a) => sum + a.score, 0) /
                    mockArtists.length
                )}
                %
              </span>
            </span>
          </div>
        </div>

        {/* Artist List */}
        <div className="grid gap-3">
          {sortedArtists.map((artist, index) => (
            <div
              key={artist.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <ProfileCard {...artist} />
            </div>
          ))}
        </div>
      </main>

      <MobileNav />
    </div>
  );
};

export default ArtistsPage;
