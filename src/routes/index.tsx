import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Mail,
  FileText,
  ListChecks,
  Search,
  MessageSquare,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAIDisclaimer } from "@/components/ResponsibleAIDisclaimer";
import { loadActivity, type Activity } from "@/lib/activity";

export const Route = createFileRoute("/")({
  component: Dashboard,
});

const tools = [
  {
    to: "/email",
    icon: Mail,
    title: "Smart Email Generator",
    desc: "Draft professional emails in seconds.",
  },
  {
    to: "/meetings",
    icon: FileText,
    title: "Meeting Notes Summarizer",
    desc: "Turn transcripts into decisions & actions.",
  },
  {
    to: "/tasks",
    icon: ListChecks,
    title: "AI Task Planner",
    desc: "Break projects into structured tasks.",
  },
  {
    to: "/research",
    icon: Search,
    title: "Research Assistant",
    desc: "Synthesize answers with sources.",
  },
  {
    to: "/chat",
    icon: MessageSquare,
    title: "AI Chatbot",
    desc: "Ask anything, get workflow help.",
  },
] as const;

function timeAgo(ts: number) {
  const s = Math.round((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.round(s / 60)}m ago`;
  if (s < 86400) return `${Math.round(s / 3600)}h ago`;
  return `${Math.round(s / 86400)}d ago`;
}

function Dashboard() {
  const [activity, setActivity] = useState<Activity[]>([]);
  useEffect(() => setActivity(loadActivity()), []);

  return (
    <>
      <PageHeader
        title="Good to see you"
        description="Pick a tool to get started, or pick up where you left off."
      />
      <ResponsibleAIDisclaimer />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link
            key={t.to}
            to={t.to}
            className="group flex flex-col justify-between rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/40 hover:bg-accent/30"
          >
            <div>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary">
                <t.icon className="h-5 w-5" />
              </div>
              <h3 className="font-serif text-xl">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.desc}</p>
            </div>
            <div className="mt-4 flex items-center text-sm text-primary">
              Open
              <ArrowUpRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="mb-4 font-serif text-2xl">Recent activity</h2>
        {activity.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
            No activity yet. Generate something to see it here.
          </div>
        ) : (
          <ul className="divide-y divide-border rounded-lg border border-border bg-card">
            {activity.map((a) => (
              <li key={a.id} className="flex items-center gap-3 px-4 py-3 text-sm">
                <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                <span className="w-28 shrink-0 text-xs uppercase tracking-wide text-muted-foreground">
                  {a.tool}
                </span>
                <span className="min-w-0 flex-1 truncate">{a.title}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {timeAgo(a.at)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
