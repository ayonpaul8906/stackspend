import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StackSpend | AI Tool Cost Audit & Optimization",
  description: "Audit your ChatGPT, Claude, Cursor, and API spend in under 60 seconds. Identify duplicate subscriptions, unused seats, and optimize your team's AI stack.",
  keywords: ["AI tools", "cost audit", "ChatGPT", "Claude", "subscription management", "cost optimization"],
  openGraph: {
    title: "StackSpend | Stop Overspending on AI Tools",
    description: "Audit your AI stack and identify savings in minutes",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StackSpend | AI Tool Cost Audit",
    description: "Identify overspending on AI subscriptions",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect to external services */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS prefetch for Firebase */}
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased relative overflow-x-hidden selection:bg-primary/30 selection:text-primary-foreground">
        {/* Subtle Background Glow Elements - optimized for performance */}
        <div className="fixed inset-0 z-[-1] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background will-change-auto" />
        <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px] pointer-events-none will-change-auto" />
        <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/5 blur-[120px] pointer-events-none will-change-auto" />
        
        {/* Main Content */}
        <div className="relative flex min-h-screen flex-col">
          {children}
        </div>
        
        {/* Toast notifications */}
        <Toaster 
          theme="dark" 
          position="bottom-right"
          richColors
          closeButton
        />
      </body>
    </html>
  );
}
