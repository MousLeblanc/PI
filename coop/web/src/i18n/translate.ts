import type { Messages } from "./messages";

export type TranslateFn = (
  key: string,
  vars?: Record<string, string | number>,
) => string;

export function translate(
  messages: Messages,
  key: string,
  vars?: Record<string, string | number>,
): string {
  const raw = getPath(messages, key);
  if (!vars) return raw;
  return raw.replace(/\{(\w+)\}/g, (_, name: string) =>
    Object.prototype.hasOwnProperty.call(vars, name)
      ? String(vars[name])
      : `{${name}}`,
  );
}

function getPath(obj: unknown, path: string): string {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const part of parts) {
    if (cur && typeof cur === "object" && part in cur) {
      cur = (cur as Record<string, unknown>)[part];
    } else {
      return path;
    }
  }
  return typeof cur === "string" ? cur : path;
}
