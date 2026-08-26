"use client";

import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/use-t";

export function ModelDifferentiator({
  size = "default",
  className,
}: {
  size?: "default" | "large";
  className?: string;
}) {
  const { messages } = useI18n();
  const text = messages.how.flows.subtitle;

  return (
    <blockquote
      className={cn(
        "border-l-4 border-emerald-800 bg-emerald-50/60 py-5 pl-5 pr-4 sm:pl-6",
        className,
      )}
    >
      <p
        className={cn(
          "text-emerald-950",
          size === "large"
            ? "font-display text-[1.35rem] font-semibold leading-snug sm:text-2xl lg:text-[1.65rem] lg:leading-tight"
            : "text-base font-medium leading-relaxed sm:text-lg",
        )}
      >
        {text}
      </p>
    </blockquote>
  );
}
