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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { generateEmail } from "@/lib/mock-ai";
import { logActivity } from "@/lib/activity";

export const Route = createFileRoute("/email")({
  component: EmailPage,
});

function EmailPage() {
  const [recipient, setRecipient] = useState("");
  const [tone, setTone] = useState("formal");
  const [purpose, setPurpose] = useState("");
  const [points, setPoints] = useState("");
  const [cta, setCta] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const run = async () => {
    setLoading(true);
    const text = await generateEmail({ recipient, tone, purpose, points, cta });
    setOutput(text);
    setLoading(false);
    logActivity("Email", purpose || "Draft email");
  };

  return (
    <>
      <PageHeader
        title="Smart Email Generator"
        description="Describe what you need — get a polished draft you can edit and send."
      />
      <ResponsibleAIDisclaimer />

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="mb-4 font-serif text-lg">Details</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="recipient">Recipient</Label>
              <Input
                id="recipient"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                placeholder="e.g. Sarah, hiring manager"
              />
            </div>
            <div>
              <Label>Tone</Label>
              <Select value={tone} onValueChange={setTone}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="friendly">Friendly</SelectItem>
                  <SelectItem value="concise">Concise</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="purpose">Purpose</Label>
              <Input
                id="purpose"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="e.g. Following up on Q3 roadmap"
              />
            </div>
            <div>
              <Label htmlFor="points">Key points (one per line)</Label>
              <Textarea
                id="points"
                value={points}
                onChange={(e) => setPoints(e.target.value)}
                placeholder={"Timeline update\nBudget approval\nNext review"}
                rows={5}
              />
            </div>
            <div>
              <Label htmlFor="cta">Call to action</Label>
              <Input
                id="cta"
                value={cta}
                onChange={(e) => setCta(e.target.value)}
                placeholder="e.g. Confirm attendance by Thursday"
              />
            </div>
            <Button onClick={run} disabled={loading} className="w-full">
              <Sparkles className="mr-2 h-4 w-4" />
              {loading ? "Generating…" : "Generate draft"}
            </Button>
          </div>
        </div>

        <EditableOutput
          value={output}
          onChange={setOutput}
          loading={loading}
          onRegenerate={run}
          onClear={() => setOutput("")}
          placeholder="Your email draft will appear here."
        />
      </div>
    </>
  );
}
