import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeFeed from "./pages/HomeFeed";
import EventPage from "./pages/EventPage";
import LiveLog from "./pages/LiveLog";
import PerformanceReceipt from "./pages/PerformanceReceipt";
import ArtistProfile from "./pages/ArtistProfile";
import PromoterProfile from "./pages/PromoterProfile";
import ArtistsPage from "./pages/ArtistsPage";
import PromotersPage from "./pages/PromotersPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Main Feed */}
          <Route path="/" element={<HomeFeed />} />
          
          {/* Event Routes */}
          <Route path="/event/:id" element={<EventPage />} />
          <Route path="/event/:id/log" element={<LiveLog />} />
          <Route path="/event/:id/receipt" element={<PerformanceReceipt />} />
          
          {/* Profile Routes */}
          <Route path="/artists" element={<ArtistsPage />} />
          <Route path="/artist/:id" element={<ArtistProfile />} />
          <Route path="/promoters" element={<PromotersPage />} />
          <Route path="/promoter/:id" element={<PromoterProfile />} />
          
          {/* Catch-all */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
