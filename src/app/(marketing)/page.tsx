import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BusinessDashboard } from "@/components/dashboard/business-dashboard";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 max-w-7xl">
        <BusinessDashboard />
      </main>
      <Footer />
    </div>
  );
}
