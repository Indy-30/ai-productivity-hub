import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAIDisclaimer } from "@/components/ResponsibleAIDisclaimer";
import { EditableOutput } from "@/components/EditableOutput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { research } from "@/lib/mock-ai";
import { logActivity } from "@/lib/activity";

export const Route = createFileRoute("/research")({
  component: ResearchPage,
});

function ResearchPage() {
  const [query, setQuery] = useState("");
  const [depth, setDepth] = useState("exploratory");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const text = await research(query, depth);
    setOutput(text);
    setLoading(false);
    logActivity("Research", query.slice(0, 60));
  };

  return (
    <>
      <PageHeader
        title="AI Research Assistant"
        description="Ask a research question — get a synthesis with sources and follow-ups."
      />
      <ResponsibleAIDisclaimer />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-4 font-serif text-lg">Research query</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="query">Question</Label>
              <Textarea
                id="query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g. How are AI coding assistants changing developer productivity?"
                rows={8}
              />
            </div>
            <div>
              <Label>Depth</Label>
              <Select value={depth} onValueChange={setDepth}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="exploratory">Exploratory</SelectItem>
                  <SelectItem value="comparative">Comparative</SelectItem>
                  <SelectItem value="evidence-based">Evidence-based</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={run}
              disabled={loading || !query.trim()}
              className="w-full"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Researching…" : "Run research"}
            </Button>
          </div>
        </div>

        <EditableOutput
          value={output}
          onChange={setOutput}
          loading={loading}
          onRegenerate={run}
          onClear={() => setOutput("")}
          placeholder="Synthesis, sources, and follow-up questions will appear here."
        />
      </div>
    </>
  );
}
