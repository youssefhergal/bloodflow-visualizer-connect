
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Index from "./pages/Index";
import Home from "./pages/Home";
import About from "./pages/About";
import WhyDonate from "./pages/WhyDonate";
import DonationTracker from "./pages/DonationTracker";
import Benefits from "./pages/Benefits";
import DonationCenters from "./pages/DonationCenters";
import Activities from "./pages/Activities";
import BloodVisualizer from "./pages/BloodVisualizer";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="why-donate" element={<WhyDonate />} />
            <Route path="donation-tracker" element={<DonationTracker />} />
            <Route path="benefits" element={<Benefits />} />
            <Route path="donation-centers" element={<DonationCenters />} />
            <Route path="activities" element={<Activities />} />
            <Route path="blood-visualizer" element={<BloodVisualizer />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
