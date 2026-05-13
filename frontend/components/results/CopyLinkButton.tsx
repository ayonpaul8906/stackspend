"use client";

import { useState } from "react";
import { Link as LinkIcon, Copy, Check } from "lucide-react";

interface Props {
  reportId: string;
}

export function CopyLinkButton({ reportId }: Props) {
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleCopyLink = async () => {
    try {
      const url = typeof window !== "undefined" ? window.location.href : "";
      await navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(reportId);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {/* Copy Report Code */}
      <button
        onClick={handleCopyCode}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-mono font-medium transition-all duration-200 ${
          copiedCode
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
            : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200"
        }`}
        title="Copy report code"
      >
        {copiedCode ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copiedCode ? "Copied!" : `Copy Code: ${reportId.slice(0, 8)}…`}
      </button>

      {/* Copy Full Link */}
      <button
        onClick={handleCopyLink}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
          copiedLink
            ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
            : "border-white/[0.08] bg-white/[0.02] text-zinc-400 hover:border-white/[0.16] hover:text-zinc-200"
        }`}
        title="Copy full report link"
      >
        {copiedLink ? <Check className="w-3.5 h-3.5" /> : <LinkIcon className="w-3.5 h-3.5" />}
        {copiedLink ? "Copied!" : "Copy Link"}
      </button>
    </div>
  );
}
