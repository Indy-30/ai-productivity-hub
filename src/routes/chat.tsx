import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Send, Sparkles, User } from "lucide-react";
import { PageHeader } from "@/components/PageHeader";
import { ResponsibleAIDisclaimer } from "@/components/ResponsibleAIDisclaimer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { chatReply } from "@/lib/mock-ai";
import { logActivity } from "@/lib/activity";

export const Route = createFileRoute("/chat")({
  component: ChatPage,
});

type Msg = { role: "user" | "assistant"; content: string; id: string };

function ChatPage() {
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi! I'm your workplace assistant. Ask me about drafting messages, planning work, or thinking through a decision.",
    },
  ]);
  const [input, setInput] = useState("");
  const [persona, setPersona] = useState("assistant");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg: Msg = { id: crypto.randomUUID(), role: "user", content: text };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);
    const reply = await chatReply(text);
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "assistant", content: reply },
    ]);
    setLoading(false);
    logActivity("Chat", text.slice(0, 60));
  };

  return (
    <>
      <PageHeader
        title="AI Chatbot"
        description="Session-based chat for workflow help."
        action={
          <Select value={persona} onValueChange={setPersona}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="assistant">General Assistant</SelectItem>
              <SelectItem value="coach">Productivity Coach</SelectItem>
              <SelectItem value="editor">Writing Editor</SelectItem>
              <SelectItem value="analyst">Business Analyst</SelectItem>
            </SelectContent>
          </Select>
        }
      />
      <ResponsibleAIDisclaimer />

      <div className="flex h-[calc(100vh-16rem)] min-h-[500px] flex-col overflow-hidden rounded-lg border border-border bg-card">
        <div ref={scrollRef} className="flex-1 space-y-5 overflow-y-auto p-4 sm:p-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : ""}`}
            >
              {m.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
              )}
              <div
                className={`max-w-[80%] whitespace-pre-wrap rounded-lg px-4 py-2.5 text-sm leading-relaxed ${
                  m.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground"
                }`}
              >
                {m.content}
              </div>
              {m.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent text-foreground">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}
          {loading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-muted px-4 py-3">
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50 [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground/50" />
              </div>
            </div>
          )}
        </div>
        <div className="border-t border-border p-3 sm:p-4">
          <div className="flex gap-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Message the assistant…"
              rows={2}
              className="resize-none"
            />
            <Button onClick={send} disabled={loading || !input.trim()} size="lg">
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            Persona: {persona} · Session-only — messages are not saved.
          </p>
        </div>
      </div>
    </>
  );
}
