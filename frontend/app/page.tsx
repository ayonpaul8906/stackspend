import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/landing/Hero";
import { TrustedTools } from "@/components/landing/TrustedTools";
import { TheProblem } from "@/components/landing/TheProblem";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { OptimizationExamples } from "@/components/landing/OptimizationExamples";
import { DeterministicLogic } from "@/components/landing/DeterministicLogic";
import { FinalCTA } from "@/components/landing/FinalCTA";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      <Hero />
      <TheProblem />
      <HowItWorks />
      <OptimizationExamples />
      <DeterministicLogic />
      <FinalCTA />
    </main>
  );
}
