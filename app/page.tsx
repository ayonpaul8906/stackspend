import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/landing/Hero";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
    </main>
  );
}
