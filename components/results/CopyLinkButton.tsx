"use client";

import { useState } from "react";
import { Link as LinkIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Props {
  url?: string;
}

export function CopyLinkButton({ url }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      const textToCopy = url || window.location.href;
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button 
      onClick={handleCopy}
      className={cn(
        "flex items-center gap-2 px-4 py-2 bg-background/50 hover:bg-background border rounded-xl text-sm font-medium transition-all",
        copied ? "border-emerald-500/50 text-emerald-500" : "border-border text-foreground"
      )}
    >
      {copied ? (
        <Check className="w-4 h-4" />
      ) : (
        <LinkIcon className="w-4 h-4 text-muted-foreground" />
      )}
      {copied ? "Copied!" : "Copy Report Link"}
    </button>
  );
}
