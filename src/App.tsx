import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";

const queryClient = new QueryClient();

const App = () => {
  // Use requestIdleCallback for non-critical initialization
  React.useEffect(() => {
    const idleCallbackId = requestIdleCallback(() => {
      // This runs when browser has idle time
      console.log('Non-critical initialization completed');
    }, { timeout: 2000 });
    
    return () => cancelIdleCallback(idleCallbackId);
  }, []);
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* Skip link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only">
          Zum Hauptinhalt springen
        </a>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/impressum" element={<Impressum />} />
            <Route path="/datenschutz" element={<Datenschutz />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
