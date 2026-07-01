
## AI Workplace Productivity Assistant — Frontend MVP

A responsive SaaS-style dashboard with sidebar navigation and 5 AI tools. All AI responses are mocked (simulated latency + templated output) so nothing needs a backend. Warm minimal aesthetic (cream #fbfaf7 / #efece5, ink #1f2937, amber accent #d97706), Notion-like.

### Design system
- Update `src/styles.css` tokens: warm cream backgrounds, ink foreground, amber primary. Serif display font (Instrument Serif) + clean sans body (Inter) for editorial-yet-professional feel.
- Rounded corners (radius 0.5rem), subtle borders, minimal shadows.
- All colors via semantic tokens — no hardcoded hex in components.

### Routes (TanStack file-based, under `src/routes/`)
- `__root.tsx` — set app title/meta ("AI Workplace Productivity Assistant"), wrap with `SidebarProvider` + `AppSidebar` layout.
- `index.tsx` — Dashboard: greeting, quick-action cards (link to each tool), recent activity list (from localStorage), responsible-AI banner.
- `email.tsx` — Smart Email Generator
- `meetings.tsx` — Meeting Notes Summarizer
- `tasks.tsx` — AI Task Planner
- `research.tsx` — AI Research Assistant
- `chat.tsx` — AI Chatbot Interface

### Shared components (`src/components/`)
- `AppSidebar.tsx` — collapsible sidebar with logo, nav items (Dashboard, Email, Meetings, Tasks, Research, Chat), each with lucide icon. Uses shadcn sidebar primitives.
- `PageHeader.tsx` — title + description + optional action slot.
- `ResponsibleAIDisclaimer.tsx` — dismissible banner shown atop tool pages + persistent footnote below AI outputs: "AI-generated content may be inaccurate. Verify before acting."
- `EditableOutput.tsx` — textarea-based editable output with Copy, Regenerate, Clear buttons. Shows loading skeleton while "generating".
- `PromptForm.tsx` — reusable structured input wrapper.

### Tool pages — shared pattern
Two-column on desktop (input left, output right), stacked on mobile. Each page:
1. Structured form with labeled inputs (selects, textareas).
2. "Generate" button → sets loading → after 800–1500ms delay, renders mock output.
3. Editable output panel with copy/regenerate.
4. Disclaimer footnote.

**Smart Email**: fields — recipient role, tone (formal/friendly/concise), purpose, key points (textarea), CTA. Mock output: subject line + email body + 2 alt openings.

**Meeting Summarizer**: paste transcript. Mock output sections: Summary, Decisions, Action Items (owner + due), Open Questions.

**Task Planner**: project description + timeframe. Mock output: list of task cards with priority badge, estimate, owner placeholder.

**Research Assistant**: query + depth select. Mock output: synthesis paragraph, 3 bullet "sources" (placeholder links), 3 follow-up questions.

**Chatbot**: conversation list (state), input at bottom, persona selector. Mock replies pick from templated responses referencing the user's message. Messages stored in component state (session-only).

### Mock AI helper (`src/lib/mock-ai.ts`)
Single `mockGenerate(kind, input): Promise<string | object>` that awaits a randomized delay and returns a templated response interpolating the user input. Keeps pages simple and swap-in-ready for real AI later.

### Local persistence (light)
Recent activity (last 5 generations across tools) stored in `localStorage` under `awpa:activity`, surfaced on Dashboard.

### Responsive
- Sidebar collapses to icon rail at `md`, becomes offcanvas sheet on mobile with `SidebarTrigger` in header.
- Tool pages: `grid lg:grid-cols-2 gap-6`, stacked below `lg`.

### Out of scope (deferred)
Auth, real AI, database, integrations (Gmail/Calendar/Jira), version history, exports beyond copy-to-clipboard, admin/team features.

### Files to create/modify
- Modify: `src/styles.css`, `src/routes/__root.tsx`, `src/routes/index.tsx`
- Create: `src/routes/{email,meetings,tasks,research,chat}.tsx`
- Create: `src/components/{AppSidebar,PageHeader,ResponsibleAIDisclaimer,EditableOutput}.tsx`
- Create: `src/lib/mock-ai.ts`, `src/lib/activity.ts`
- Add font packages: `@fontsource/instrument-serif`, `@fontsource/inter`
