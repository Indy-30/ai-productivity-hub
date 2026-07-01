const KEY = "awpa:activity";

export type Activity = {
  id: string;
  tool: string;
  title: string;
  at: number;
};

export function loadActivity(): Activity[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function logActivity(tool: string, title: string) {
  if (typeof window === "undefined") return;
  const list = loadActivity();
  const next: Activity[] = [
    { id: crypto.randomUUID(), tool, title, at: Date.now() },
    ...list,
  ].slice(0, 5);
  window.localStorage.setItem(KEY, JSON.stringify(next));
}
