import { getAuditFromFirestore } from "@/lib/firebase/firestore";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { RecommendationCard } from "@/components/results/RecommendationCard";
import { MetricCard } from "@/components/shared/MetricCard";
import { LeadCapture } from "@/components/results/LeadCapture";
import { CopyLinkButton } from "@/components/results/CopyLinkButton";
import { ShieldCheck, Wallet, Activity } from "lucide-react";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const { id } = await params;
  const result = await getAuditFromFirestore(id);
  
  if (!result) return { title: "Audit Not Found | StackSpend" };
  
  const formattedSavings = `$${result.totalAnnualSavings.toLocaleString()}`;
  
  return {
    title: `StackSpend Audit — Save ${formattedSavings}/year on AI tools`,
    description: result.aiSummary || `We identified ${formattedSavings} in annual savings across your AI stack.`,
    openGraph: {
      title: `StackSpend Audit — Save ${formattedSavings}/year`,
      description: result.aiSummary || `We identified ${formattedSavings} in annual savings.`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `StackSpend Audit — Save ${formattedSavings}/year`,
      description: result.aiSummary,
    }
  };
}

export default async function SharedResultPage({ params }: Props) {
  const { id } = await params;
  const result = await getAuditFromFirestore(id);

  if (!result) {
    return notFound();
  }

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar />
      
      <div className="pt-24 lg:pt-32 pb-20">
        <SectionWrapper>
          
          {/* Public Sharing Header */}
          <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4 bg-card/40 backdrop-blur-md border border-white/5 p-4 rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground font-medium">Public Audit Report</p>
                <p className="text-xs text-muted-foreground/70">ID: {id}</p>
              </div>
            </div>
            <CopyLinkButton reportId={id} />
          </div>

          {/* HERO SECTION */}
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
              Your Stack <span className="text-gradient">Audit</span>
            </h1>
            
            {/* AI Summary */}
            <div className="relative p-6 rounded-2xl bg-secondary/5 border border-secondary/20 mb-8">
              <div className="absolute -top-3 -left-3">
                <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center backdrop-blur-md border border-secondary/30">
                  <span className="text-secondary text-xs font-bold">AI</span>
                </div>
              </div>
              <p className="text-lg text-foreground/90 leading-relaxed italic">
                &quot;{result.aiSummary}&quot;
              </p>
            </div>
          </div>

          {/* METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <MetricCard
              title="Total Monthly Savings"
              value={`$${result.totalMonthlySavings.toLocaleString()}`}
              trendUp={true}
              trend="Immediate impact"
              icon={<Wallet />}
              delay={0.1}
            />
            <MetricCard
              title="Total Annual Savings"
              value={`$${result.totalAnnualSavings.toLocaleString()}`}
              trendUp={true}
              trend="Yearly cashflow"
              icon={<Wallet />}
              delay={0.2}
            />
            <MetricCard
              title="Optimization Score"
              value={`${result.optimizationScore}/100`}
              trendUp={result.optimizationScore > 80}
              trend={result.optimizationScore > 80 ? "Excellent" : "Needs Work"}
              icon={<ShieldCheck />}
              delay={0.3}
            />
          </div>

          {/* TOOL BREAKDOWN SECTION */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-foreground mb-6">Tool Breakdown & Recommendations</h2>
            
            <div className="space-y-6">
              {result.recommendations.map((rec, index) => (
                <RecommendationCard 
                  key={`${rec.tool}-${index}`} 
                  recommendation={rec} 
                  index={index} 
                />
              ))}
            </div>
          </div>

          {/* LEAD CAPTURE CTA */}
          <div className="mt-20">
            <LeadCapture auditId={id} totalSavings={result.totalAnnualSavings} />
          </div>

        </SectionWrapper>
      </div>
    </main>
  );
}
