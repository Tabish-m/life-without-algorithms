import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./components/Layout";
import DecisionSection from "./pages/sections/DecisionSection";
import HeroSection from "./pages/sections/HeroSection";
import InsightSection from "./pages/sections/InsightSection";
import MusicSection from "./pages/sections/MusicSection";
import RandomFeedSection from "./pages/sections/RandomFeedSection";
import ShoppingSection from "./pages/sections/ShoppingSection";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="dark">
        <Layout>
          <HeroSection />
          <RandomFeedSection />
          <ShoppingSection />
          <MusicSection />
          <DecisionSection />
          <InsightSection />
        </Layout>
      </div>
    </QueryClientProvider>
  );
}
