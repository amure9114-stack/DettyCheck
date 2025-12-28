import { useParams, Link } from "react-router-dom";
import { Header, MobileNav } from "@/components/Navigation";
import { ScoreDisplay } from "@/components/ScoreDisplay";
import { DataComparisonRow } from "@/components/DataComparisonRow";
import { ArrowLeft, Share2, Download, Lock } from "lucide-react";
import { toast } from "sonner";

const PerformanceReceipt = () => {
  const { id } = useParams();

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Detty Receipt: Afrobeats To The World",
        text: "Burna Boy: Promised 60 mins → Delivered 19 mins. Time Accuracy: 27%. See the full receipt.",
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    }
  };

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

        {/* Receipt Card */}
        <div className="bg-card border-2 border-foreground">
          {/* Receipt Header */}
          <div className="border-b-2 border-foreground p-6 text-center">
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
              Performance Receipt
            </div>
            <h1 className="text-xl font-semibold text-foreground tracking-tight mb-1">
              Afrobeats To The World
            </h1>
            <p className="font-mono text-sm text-muted-foreground">
              December 23, 2024 • Eko Convention Centre
            </p>
          </div>

          {/* Headliner Section */}
          <div className="border-b-2 border-foreground p-6">
            <div className="text-center mb-4">
              <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
                Headliner
              </span>
              <h2 className="text-lg font-semibold">Burna Boy</h2>
            </div>

            {/* Comparison Data */}
            <div className="border border-border">
              <DataComparisonRow
                label="Start Time"
                promised="8:00 PM"
                actual="1:28 AM"
                status="failure"
              />
              <DataComparisonRow
                label="Set Duration"
                promised="60"
                actual="19"
                unit=" mins"
                status="failure"
              />
              <DataComparisonRow
                label="Delay"
                promised="0"
                actual="5h 28m"
                status="failure"
              />
            </div>
          </div>

          {/* Scores */}
          <div className="border-b-2 border-foreground p-6">
            <div className="grid grid-cols-3 gap-4">
              <ScoreDisplay value={27} label="Time Accuracy" />
              <ScoreDisplay value={32} label="Set Delivery" />
              <ScoreDisplay value={29} label="Overall" size="lg" />
            </div>
          </div>

          {/* Verdict */}
          <div className="p-6 bg-status-failure-bg">
            <div className="text-center">
              <span className="text-[10px] uppercase tracking-widest text-status-failure-foreground">
                Verdict
              </span>
              <p className="font-mono text-sm text-foreground mt-2">
                Headliner arrived 5+ hours late and delivered less than a third
                of the promised set time.
              </p>
            </div>
          </div>

          {/* Receipt Footer */}
          <div className="p-4 bg-muted/30 border-t border-border">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground font-mono uppercase tracking-wider">
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Receipt Locked</span>
              </div>
              <span>ID: DTY-2024-{id?.padStart(4, "0")}</span>
            </div>
          </div>
        </div>

        {/* Share Section */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground mb-3">
            Designed for screenshots. Share the truth.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-sm font-medium uppercase tracking-wider hover:bg-foreground/90 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Share Receipt
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-foreground text-foreground text-sm font-medium uppercase tracking-wider hover:bg-muted transition-colors">
              <Download className="w-4 h-4" />
              Save Image
            </button>
          </div>
        </div>

        {/* Other Performances */}
        <section className="mt-10">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
            Other Performers
          </h3>
          <div className="space-y-3">
            {[
              { name: "Rema", timeScore: 85, setScore: 92, overall: 88 },
              { name: "Ayra Starr", timeScore: 78, setScore: 95, overall: 86 },
              { name: "BNXN", timeScore: 91, setScore: 88, overall: 89 },
            ].map((performer) => (
              <div
                key={performer.name}
                className="flex items-center justify-between p-4 bg-card border border-border"
              >
                <span className="font-medium">{performer.name}</span>
                <div className="flex items-center gap-4 font-mono text-sm">
                  <span className="text-muted-foreground">
                    {performer.timeScore}%
                  </span>
                  <span className="text-muted-foreground">
                    {performer.setScore}%
                  </span>
                  <span
                    className={`font-semibold ${
                      performer.overall >= 80
                        ? "text-status-success"
                        : "text-status-warning"
                    }`}
                  >
                    {performer.overall}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  );
};

export default PerformanceReceipt;
