// Mock AI generator — simulates latency and returns templated responses.
// Swap this out for a real AI call later without touching the pages.

const delay = (min = 800, max = 1500) =>
  new Promise((r) => setTimeout(r, min + Math.random() * (max - min)));

export type EmailInput = {
  recipient: string;
  tone: string;
  purpose: string;
  points: string;
  cta: string;
};

export async function generateEmail(input: EmailInput): Promise<string> {
  await delay();
  const opener =
    input.tone === "friendly"
      ? "Hope you're doing well!"
      : input.tone === "concise"
        ? "Quick note —"
        : "I hope this message finds you well.";
  const bullets = input.points
    .split("\n")
    .filter(Boolean)
    .map((p) => `  • ${p.trim()}`)
    .join("\n");

  return `Subject: ${input.purpose || "Following up"}

Hi ${input.recipient || "there"},

${opener} I wanted to reach out regarding ${input.purpose || "our recent discussion"}.

${bullets || "  • (add your key points on the left)"}

${input.cta ? `Could you ${input.cta.toLowerCase()} at your earliest convenience?` : "Let me know your thoughts when you have a moment."}

Best regards,
[Your Name]

—
Alternate opening 1: "Thanks for your time earlier this week — a quick follow-up below."
Alternate opening 2: "Circling back on ${input.purpose || "our thread"} with a short update."`;
}

export async function summarizeMeeting(transcript: string): Promise<string> {
  await delay();
  const words = transcript.trim().split(/\s+/).length;
  return `SUMMARY
The team discussed key priorities and aligned on next steps across the workstream. (${words} words of transcript analyzed.)

DECISIONS
  • Approved the proposed timeline for phase one
  • Assigned ownership for the upcoming deliverables
  • Agreed to reconvene next week for a status check

ACTION ITEMS
  • [Owner: TBD] Draft the initial proposal — due Friday
  • [Owner: TBD] Schedule stakeholder review — due next Tuesday
  • [Owner: TBD] Circulate updated project brief — due end of week

OPEN QUESTIONS
  • Budget confirmation still pending
  • Final scope requires legal sign-off`;
}

export async function planTasks(project: string, timeframe: string): Promise<string> {
  await delay();
  return `PROJECT: ${project || "Untitled project"}
TIMEFRAME: ${timeframe || "2 weeks"}

TASK 1 — Discovery & requirements  [High · 6h]
  ↳ Interview stakeholders
  ↳ Document success criteria

TASK 2 — Design draft  [High · 10h · depends on Task 1]
  ↳ Low-fidelity wireframes
  ↳ Review with team

TASK 3 — Implementation slice  [Medium · 16h · depends on Task 2]
  ↳ Core happy-path build
  ↳ Basic tests

TASK 4 — Review & iterate  [Medium · 6h]
  ↳ Stakeholder walkthrough
  ↳ Incorporate feedback

TASK 5 — Launch prep  [Low · 4h]
  ↳ Documentation
  ↳ Rollout plan`;
}

export async function research(query: string, depth: string): Promise<string> {
  await delay(1000, 2000);
  return `SYNTHESIS (${depth})
Based on available sources, ${query || "your topic"} is a rapidly evolving area with several converging perspectives. The dominant view emphasizes practical adoption, while dissenting analyses caution about long-term implications. Consensus is strongest around foundational concepts and weakest on projected impact.

SOURCES
  1. Industry Report (2024) — https://example.com/report-1
  2. Peer-reviewed analysis — https://example.com/paper-2
  3. Expert commentary — https://example.com/article-3

FOLLOW-UP QUESTIONS
  • What are the leading counter-arguments to the consensus view?
  • Which case studies best illustrate real-world outcomes?
  • What metrics are used to evaluate success in this domain?

Confidence: Medium`;
}

export async function chatReply(message: string): Promise<string> {
  await delay(500, 1200);
  const replies = [
    `Great question about "${message.slice(0, 60)}". Here's how I'd think about it: start by clarifying the goal, then break it into 2–3 concrete steps you can act on today.`,
    `Regarding "${message.slice(0, 60)}" — one approach is to gather the relevant context first, draft a quick outline, then iterate. Want me to sketch a starting point?`,
    `Thanks for sharing. Based on "${message.slice(0, 60)}", I'd suggest focusing on the highest-leverage action first. Would a checklist or a longer explanation be more useful?`,
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}
