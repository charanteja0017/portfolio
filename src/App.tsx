import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Analytics } from "@vercel/analytics/react";
import { useEffect } from "react";
import { initGA, pageView } from "./lib/analytics";
import { GA_TRACKING_ID } from "./lib/constants";

const queryClient = new QueryClient();

// Component to track page views
const PageTracker = () => {
  const location = useLocation();
  
  useEffect(() => {
    pageView(location.pathname + location.search);
  }, [location]);
  
  return null;
};

// Initialize Google Analytics
initGA(GA_TRACKING_ID);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <PageTracker />
        <Routes>
          <Route path="/" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics /> 
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
