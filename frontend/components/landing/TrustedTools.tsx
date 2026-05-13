"use client";

import React from "react";
import { motion } from "framer-motion";

const OpenAIIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 41 41" fill="currentColor" className={className}>
    <path d="M37.532 16.87a9.963 9.963 0 0 0-.856-8.184 10.078 10.078 0 0 0-10.855-4.835 9.964 9.964 0 0 0-6.215-2.972 10.079 10.079 0 0 0-10.855 4.835 9.965 9.965 0 0 0-6.464 4.877 10.079 10.079 0 0 0 1.24 11.817 9.965 9.965 0 0 0 .856 8.185 10.079 10.079 0 0 0 10.855 4.835 9.965 9.965 0 0 0 6.215 2.972 10.078 10.078 0 0 0 10.855-4.835 9.965 9.965 0 0 0 6.464-4.877 10.079 10.079 0 0 0-1.24-11.818zM22.498 37.886a7.474 7.474 0 0 1-4.799-1.735c.061-.033.168-.091.237-.134l7.964-4.6a1.294 1.294 0 0 0 .655-1.134V19.054l3.366 1.944a.12.12 0 0 1 .066.092v9.299a7.505 7.505 0 0 1-7.49 7.496zM6.392 31.006a7.471 7.471 0 0 1-.894-5.023c.06.036.162.099.237.141l7.964 4.6a1.297 1.297 0 0 0 1.308 0l9.724-5.614v3.888a.12.12 0 0 1-.048.103l-8.051 4.649a7.504 7.504 0 0 1-10.24-2.744zM4.297 13.62A7.469 7.469 0 0 1 8.2 10.333c0 .068-.004.19-.004.274v9.201a1.294 1.294 0 0 0 .654 1.132l9.723 5.614-3.366 1.944a.12.12 0 0 1-.114.012L7.044 23.86a7.504 7.504 0 0 1-2.747-10.24zm27.658 6.437l-9.724-5.615 3.367-1.943a.121.121 0 0 1 .114-.012l8.048 4.648a7.498 7.498 0 0 1-1.158 13.528v-9.476a1.293 1.293 0 0 0-.647-1.13zm3.35-5.043c-.059-.037-.162-.099-.236-.141l-7.965-4.6a1.298 1.298 0 0 0-1.308 0l-9.723 5.614v-3.888a.12.12 0 0 1 .048-.103l8.05-4.645a7.497 7.497 0 0 1 11.135 7.763zm-21.063 6.929l-3.367-1.944a.12.12 0 0 1-.065-.092v-9.299a7.497 7.497 0 0 1 12.293-5.756 6.94 6.94 0 0 0-.236.134l-7.965 4.6a1.294 1.294 0 0 0-.654 1.132l-.006 11.225zm1.829-3.943l4.33-2.501 4.332 2.5v4.999l-4.331 2.5-4.331-2.5V18z" />
  </svg>
);

const ClaudeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 100 100" className={className} fill="currentColor">
    <path d="M62.7 20.5c-7.3-7.3-19.1-7.3-26.4 0L20.5 36.3c-7.3 7.3-7.3 19.1 0 26.4l15.8 15.8c7.3 7.3 19.1 7.3 26.4 0l15.8-15.8c7.3-7.3 7.3-19.1 0-26.4L62.7 20.5zm-6.4 42.8L50 68.6l-6.3-5.3-8.8-7.5L30 50l4.9-5.8 8.8-7.5 6.3-5.3 6.3 5.3 8.8 7.5 4.9 5.8-4.9 5.8-8.8 7.5z" />
  </svg>
);

const CursorIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M4 0h16a4 4 0 0 1 4 4v16a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4zm8 5L6 12l6 7 6-7-6-7z" />
  </svg>
);

const GeminiIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className}>
    <defs>
      <linearGradient id="gem-grad" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4285f4" />
        <stop offset="50%" stopColor="#9b72cb" />
        <stop offset="100%" stopColor="#d96570" />
      </linearGradient>
    </defs>
    <path fill="url(#gem-grad)" d="M12 24A12 12 0 0 1 12 0a5.4 5.4 0 0 0 0 10.8A5.4 5.4 0 0 0 12 24z" />
    <path fill="#4285f4" d="M12 0a12 12 0 0 1 0 24 5.4 5.4 0 0 0 0-10.8A5.4 5.4 0 0 0 12 0z" />
  </svg>
);

const CopilotIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 4.99 3.04 9.27 7.4 11.11-.1-.87-.19-2.2.04-3.15.21-.85 1.4-5.94 1.4-5.94s-.36-.72-.36-1.78c0-1.67.97-2.91 2.17-2.91 1.02 0 1.52.77 1.52 1.69 0 1.03-.66 2.57-1 3.99-.28 1.19.59 2.16 1.76 2.16 2.11 0 3.73-2.22 3.73-5.44 0-2.84-2.04-4.83-4.96-4.83-3.38 0-5.36 2.53-5.36 5.16 0 1.02.39 2.11.88 2.71a.35.35 0 0 1 .08.34c-.09.37-.29 1.19-.33 1.35-.05.22-.17.27-.39.16-1.48-.69-2.4-2.86-2.4-4.6 0-3.74 2.72-7.18 7.84-7.18 4.12 0 7.32 2.93 7.32 6.85 0 4.08-2.57 7.37-6.14 7.37-1.2 0-2.33-.62-2.72-1.36l-.74 2.76c-.27 1.03-1 2.33-1.48 3.12.37.11.76.17 1.17.17 6.63 0 12-5.37 12-12S18.63 0 12 0z" />
  </svg>
);

const GitHubCopilotIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.55 0-.27-.01-1.17-.01-2.14-2.99.62-3.75-.72-3.99-1.39-.13-.34-.72-1.39-1.23-1.67-.42-.22-1.02-.77-.01-.78.94-.01 1.61.87 1.84 1.23 1.08 1.81 2.81 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.54-1.52.12-3.18 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 3-.41c1.02.01 2.04.14 3 .41 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.9 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .3.21.66.8.55C20.71 21.39 24 17.08 24 12 24 5.73 18.27.5 12 .5z" />
  </svg>
);

const tools = [
  { name: "ChatGPT", Icon: OpenAIIcon, color: "text-zinc-300" },
  { name: "Claude", Icon: ClaudeIcon, color: "text-amber-400" },
  { name: "Cursor", Icon: CursorIcon, color: "text-blue-400" },
  { name: "Gemini", Icon: GeminiIcon, color: "text-zinc-300" },
  { name: "GitHub Copilot", Icon: GitHubCopilotIcon, color: "text-zinc-300" },
  { name: "OpenAI API", Icon: CopilotIcon, color: "text-emerald-400" },
];

export function TrustedTools() {
  return (
    <section className="w-full border-t border-white/[0.06] py-14 relative">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-xs font-medium tracking-[0.2em] uppercase text-zinc-500 mb-10"
        >
          Audits spend across your entire AI stack
        </motion.p>

        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {tools.map((tool, i) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-white/[0.07] bg-white/[0.02] hover:border-white/[0.14] hover:bg-white/[0.04] transition-all duration-200 group"
            >
              <tool.Icon className={`w-5 h-5 ${tool.color} group-hover:opacity-100 opacity-80 transition-opacity flex-shrink-0`} />
              <span className="text-sm font-medium text-zinc-500 group-hover:text-zinc-300 transition-colors whitespace-nowrap">
                {tool.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
