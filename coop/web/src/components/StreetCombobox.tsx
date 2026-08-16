"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { searchStreets, type StreetSuggestion } from "@/lib/api";
import { cn } from "@/lib/utils";

type Props = {
  postalCode: string;
  value: string;
  onChange: (street: string) => void;
  name?: string;
  required?: boolean;
  id?: string;
};

export function StreetCombobox({
  postalCode,
  value,
  onChange,
  name = "streetName",
  required,
  id,
}: Props) {
  const [items, setItems] = useState<StreetSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [highlight, setHighlight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const listId = useId();
  const enabled = /^\d{4}$/.test(postalCode);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  useEffect(() => {
    if (!enabled || value.trim().length < 2) {
      setItems([]);
      return;
    }

    const handle = window.setTimeout(async () => {
      setLoading(true);
      try {
        const res = await searchStreets(value.trim(), postalCode);
        setItems(res.items);
        setOpen(true);
        setHighlight(0);
      } catch {
        setItems([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => window.clearTimeout(handle);
  }, [value, postalCode, enabled]);

  function pick(street: string) {
    onChange(street);
    setOpen(false);
  }

  return (
    <div className="relative space-y-2" ref={wrapRef}>
      <div className="relative">
        <Input
          id={id}
          name={name}
          required={required}
          disabled={!enabled}
          value={value}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={open}
          placeholder={
            enabled
              ? "Tapez le début de la rue…"
              : "Entrez d’abord le code postal"
          }
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => {
            if (items.length) setOpen(true);
          }}
          onKeyDown={(e) => {
            if (!open || items.length === 0) return;
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setHighlight((h) => (h + 1) % items.length);
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setHighlight((h) => (h - 1 + items.length) % items.length);
            } else if (e.key === "Enter" && items[highlight]) {
              e.preventDefault();
              pick(items[highlight].street);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
        />
        {loading ? (
          <Loader2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        ) : null}
      </div>

      {open && enabled && value.trim().length >= 2 ? (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-xl border bg-white p-1 shadow-lg"
        >
          {items.length === 0 && !loading ? (
            <li className="px-3 py-2 text-sm text-muted-foreground">
              Aucune rue trouvée
            </li>
          ) : (
            items.map((item, i) => (
              <li key={item.id} role="option" aria-selected={i === highlight}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full flex-col rounded-lg px-3 py-2 text-left text-sm hover:bg-accent",
                    i === highlight && "bg-accent",
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => pick(item.street)}
                >
                  <span className="font-medium">{item.street}</span>
                  {item.city ? (
                    <span className="text-xs text-muted-foreground">
                      {item.city}
                      {item.postalCode ? ` · ${item.postalCode}` : ""}
                    </span>
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
      ) : null}
    </div>
  );
}
