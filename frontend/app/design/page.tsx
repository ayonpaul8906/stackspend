import React from "react";
import { GlowButton } from "@/components/shared/GlowButton";
import { GlassCard } from "@/components/shared/GlassCard";
import { GradientBadge } from "@/components/shared/GradientBadge";
import { MetricCard } from "@/components/shared/MetricCard";
import { SectionWrapper } from "@/components/shared/SectionWrapper";
import { Sparkles, TrendingUp, Users } from "lucide-react";

export default function DesignShowcase() {
  return (
    <div className="min-h-screen pb-24">
      <SectionWrapper>
        <div className="mb-16">
          <GradientBadge className="mb-4">Internal Tool</GradientBadge>
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
            StackSpend <span className="text-gradient">Design System</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            A showcase of the reusable components and design tokens used to build StackSpend.
          </p>
        </div>

        {/* Typography Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 border-b border-border pb-2">Typography</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Headline 1 / 5xl-7xl</p>
              <h1 className="text-5xl font-bold tracking-tight">Stop Overspending on AI</h1>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Headline 2 / 3xl</p>
              <h2 className="text-3xl font-bold tracking-tight">Audit your subscriptions</h2>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Headline 3 / 2xl</p>
              <h3 className="text-2xl font-semibold tracking-tight">Identify duplicate seats</h3>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Body Large / xl</p>
              <p className="text-xl text-muted-foreground">Identify duplicate subscriptions, unused seats, and optimize your team&apos;s usage.</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Body / base</p>
              <p className="text-base text-foreground">The quick brown fox jumps over the lazy dog. 1234567890</p>
            </div>
          </div>
        </section>

        {/* Colors Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 border-b border-border pb-2">Theme Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-background border border-border flex items-end p-3">
                <span className="text-xs font-mono">--background</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-card border border-border flex items-end p-3">
                <span className="text-xs font-mono">--card</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-primary flex items-end p-3">
                <span className="text-xs font-mono text-primary-foreground">--primary</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-secondary flex items-end p-3">
                <span className="text-xs font-mono text-secondary-foreground">--secondary</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-24 rounded-xl bg-muted flex items-end p-3">
                <span className="text-xs font-mono text-muted-foreground">--muted</span>
              </div>
            </div>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 border-b border-border pb-2">Buttons & Badges</h2>
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap items-center gap-4">
              <GlowButton variant="primary">Primary Glow</GlowButton>
              <GlowButton variant="secondary">Secondary Glow</GlowButton>
              <GlowButton variant="outline">Outline Button</GlowButton>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <GlowButton variant="primary" size="sm">Small</GlowButton>
              <GlowButton variant="primary" size="md">Medium</GlowButton>
              <GlowButton variant="primary" size="lg">Large Button</GlowButton>
            </div>
            <div>
              <GradientBadge>
                <Sparkles className="w-4 h-4 mr-2" />
                Gradient Badge
              </GradientBadge>
            </div>
          </div>
        </section>

        {/* Cards Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold mb-6 border-b border-border pb-2">Cards & Panels</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <GlassCard className="p-8">
              <h3 className="text-xl font-semibold mb-2">GlassCard Component</h3>
              <p className="text-muted-foreground mb-4">
                Used for main content panels, forms, and features. Features a subtle inner border, dark background, and hover lift effect.
              </p>
              <GlowButton variant="outline" size="sm">Action</GlowButton>
            </GlassCard>
            
            <div className="space-y-4">
              <MetricCard 
                title="Total AI Spend" 
                value="$12,450" 
                trend="12% from last month"
                trendUp={false}
                icon={<TrendingUp className="w-4 h-4" />}
              />
              <MetricCard 
                title="Active Users" 
                value="42" 
                trend="3 new this week"
                trendUp={true}
                icon={<Users className="w-4 h-4" />}
              />
            </div>
          </div>
        </section>
      </SectionWrapper>
    </div>
  );
}
