import { Navbar } from "@/components/shared/Navbar";
import { AuditForm } from "@/components/audit/AuditForm";
import { SectionWrapper } from "@/components/shared/SectionWrapper";

export const metadata = {
  title: "Audit Your AI Stack | StackSpend",
  description: "Identify overspending and optimize your AI subscriptions in seconds.",
};

export default function AuditPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="pt-10 lg:pt-12 pb-20">
        <SectionWrapper>
          <div className="mb-12 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
              Build your <span className="text-gradient">Audit Profile</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Enter your current AI tools, seats, and monthly spend. Our engine will analyze your setup and identify savings opportunities instantly.
            </p>
          </div>

          <AuditForm />
        </SectionWrapper>
      </div>
    </main>
  );
}
