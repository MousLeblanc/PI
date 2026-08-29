"use client";

import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/use-t";

export function JoinCall() {
  const { messages } = useI18n();
  const j = messages.join;
  const mailto = `mailto:${j.helpEmail}?subject=${encodeURIComponent(j.ctaHelpSubject)}`;

  return (
    <div className="max-w-prose space-y-8 text-left">
      <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
        {j.title}
      </h2>

      <div className="space-y-3">
        <h3 className="text-base font-semibold text-emerald-950">
          {j.whereHeading}
        </h3>
        {j.whereParagraphs.map((p) => (
          <p
            key={p}
            className="text-sm leading-relaxed text-muted-foreground sm:text-base sm:leading-7"
          >
            {p}
          </p>
        ))}
      </div>

      <div className="space-y-4">
        <h3 className="text-base font-semibold text-emerald-950">
          {j.howHeading}
        </h3>
        {j.paths.map((path) => (
          <div key={path.title} className="space-y-1.5">
            <p className="text-sm font-semibold text-foreground">
              {path.title}
            </p>
            {path.lines.map((line) => (
              <p
                key={line}
                className="text-sm leading-relaxed text-muted-foreground sm:leading-7"
              >
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      <div className="space-y-2 border-l-2 border-emerald-200 pl-3">
        <p className="text-sm font-semibold text-emerald-950">
          {j.statusHeading}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground sm:leading-7">
          {j.status}
        </p>
      </div>

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap">
        <Button
          asChild
          size="xl"
          className="shadow-lg shadow-emerald-900/15 sm:min-w-[14rem]"
        >
          <a href="#formulaire">{j.ctaRegister}</a>
        </Button>
        <Button asChild variant="outline" size="lg">
          <a href={mailto}>{j.ctaHelp}</a>
        </Button>
      </div>
    </div>
  );
}
