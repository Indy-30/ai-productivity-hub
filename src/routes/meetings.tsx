import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Sparkles } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAIDisclaimer } from "@/components/ResponsibleAIDisclaimer";
import { EditableOutput } from "@/components/EditableOutput";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { summarizeMeeting } from "@/lib/mock-ai";
import { logActivity } from "@/lib/activity";

export const Route = createFileRoute("/meetings")({
  component: MeetingsPage,
});

function MeetingsPage() {
  const [transcript, setTranscript] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    if (!transcript.trim()) return;
    setLoading(true);
    const text = await summarizeMeeting(transcript);
    setOutput(text);
    setLoading(false);
    logActivity("Meeting", transcript.slice(0, 60));
  };

  return (
    <>
      <PageHeader
        title="Meeting Notes Summarizer"
        description="Paste a transcript or notes — get summary, decisions, and action items."
      />
      <ResponsibleAIDisclaimer />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-4 font-serif text-lg">Transcript</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="transcript">Paste meeting notes or transcript</Label>
              <Textarea
                id="transcript"
                value={transcript}
                onChange={(e) => setTranscript(e.target.value)}
                placeholder="Paste your meeting transcript here…"
                rows={16}
              />
            </div>
            <Button
              onClick={run}
              disabled={loading || !transcript.trim()}
              className="w-full"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Summarizing…" : "Summarize meeting"}
            </Button>
          </div>
        </div>

        <EditableOutput
          value={output}
          onChange={setOutput}
          loading={loading}
          onRegenerate={run}
          onClear={() => setOutput("")}
          placeholder="Summary, decisions, and action items will appear here."
        />
      </div>
    </>
  );
}
