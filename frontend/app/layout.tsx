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
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
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
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* DNS prefetch for Firebase */}
        <link rel="dns-prefetch" href="https://firestore.googleapis.com" />
      </head>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased overflow-x-hidden">
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
