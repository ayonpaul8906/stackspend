import React from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  containerClass?: string;
}

export function SectionWrapper({
  children,
  className,
  containerClass,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      className={cn("w-full py-24 lg:py-32 relative", className)}
      {...props}
    >
      <div className={cn("container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl relative z-10", containerClass)}>
        {children}
      </div>
    </section>
  );
}
