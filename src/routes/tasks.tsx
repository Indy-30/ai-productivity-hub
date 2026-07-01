import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAIDisclaimer } from "@/components/ResponsibleAIDisclaimer";
import { EditableOutput } from "@/components/EditableOutput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { planTasks } from "@/lib/mock-ai";
import { logActivity } from "@/lib/activity";

export const Route = createFileRoute("/tasks")({
  component: TasksPage,
});

function TasksPage() {
  const [project, setProject] = useState("");
  const [timeframe, setTimeframe] = useState("2 weeks");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!project.trim()) return;
    setLoading(true);
    const text = await planTasks(project, timeframe);
    setOutput(text);
    setLoading(false);
    logActivity("Tasks", project.slice(0, 60));
  };

  return (
    <>
      <PageHeader
        title="AI Task Planner"
        description="Describe a project — get a structured task breakdown with estimates."
      />
      <ResponsibleAIDisclaimer />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-4 font-serif text-lg">Project</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="project">Project description</Label>
              <Textarea
                id="project"
                value={project}
                onChange={(e) => setProject(e.target.value)}
                placeholder="Describe the project, goals, and constraints…"
                rows={10}
              />
            </div>
            <div>
              <Label htmlFor="timeframe">Timeframe</Label>
              <Input
                id="timeframe"
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                placeholder="e.g. 2 weeks"
              />
            </div>
            <Button
              onClick={run}
              disabled={loading || !project.trim()}
              className="w-full"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Planning…" : "Generate plan"}
            </Button>
          </div>
        </div>

        <EditableOutput
          value={output}
          onChange={setOutput}
          loading={loading}
          onRegenerate={run}
          onClear={() => setOutput("")}
          placeholder="Structured task plan will appear here."
        />
      </div>
    </>
  );
}
