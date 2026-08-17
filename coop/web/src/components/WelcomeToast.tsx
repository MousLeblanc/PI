"use client";

import { useEffect } from "react";

type Props = {
  open: boolean;
  title: string;
  body: string;
  onClose: () => void;
};

export function WelcomeToast({ open, title, body, onClose }: Props) {
  useEffect(() => {
    if (!open) return;
    const id = window.setTimeout(onClose, 8000);
    return () => window.clearTimeout(id);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[60] w-[min(92vw,26rem)] -translate-x-1/2 animate-fade-up rounded-2xl border border-emerald-200 bg-white p-4 shadow-xl shadow-emerald-950/10"
    >
      <div className="flex items-start gap-3">
        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-800 font-display text-lg text-white">
          π
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-display text-base font-semibold text-emerald-950">
            {title}
          </p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {body}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md px-2 py-1 text-xs text-muted-foreground hover:bg-slate-100"
          aria-label="Fermer"
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
