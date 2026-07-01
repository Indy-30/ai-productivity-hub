import { useEffect, useState } from "react";
import { Copy, RotateCw, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { DisclaimerFootnote } from "./ResponsibleAIDisclaimer";

export function EditableOutput({
  value,
  onChange,
  loading,
  onRegenerate,
  onClear,
  placeholder = "AI output will appear here…",
  minHeight = 380,
}: {
  value: string;
  onChange: (v: string) => void;
  loading?: boolean;
  onRegenerate?: () => void;
  onClear?: () => void;
  placeholder?: string;
  minHeight?: number;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setCopied(true);
  };

  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-serif text-lg">Output</h3>
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={copy}
            disabled={!value || loading}
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="ml-1.5 hidden sm:inline">
              {copied ? "Copied" : "Copy"}
            </span>
          </Button>
          {onRegenerate && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onRegenerate}
              disabled={loading}
            >
              <RotateCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              <span className="ml-1.5 hidden sm:inline">Regenerate</span>
            </Button>
          )}
          {onClear && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClear}
              disabled={!value || loading}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {loading ? (
        <div className="space-y-2" style={{ minHeight }}>
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        </div>
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="resize-none font-mono text-sm leading-relaxed"
          style={{ minHeight }}
        />
      )}
      <DisclaimerFootnote />
    </div>
  );
}
