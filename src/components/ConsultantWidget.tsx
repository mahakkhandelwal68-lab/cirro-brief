"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "model";
  text: string;
}

const GREETING: Message = {
  role: "model",
  text: "Hi! I'm the Cirro Brief consultant. Ask me about plans, pricing, or how the process works — I can help you figure out what fits, or point you to purchase or book a call.",
};

export function ConsultantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    setError(null);
    const next = [...messages, { role: "user" as const, text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/consultant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }
      setMessages((m) => [...m, { role: "model", text: data.reply }]);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn-pop"
        aria-label={open ? "Close consultant chat" : "Open consultant chat"}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 50,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--btn)",
          color: "var(--btn-text)",
          border: "none",
          boxShadow: "var(--shadow)",
          fontSize: 22,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {open ? "✕" : "💬"}
      </button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 92,
            right: 24,
            zIndex: 50,
            width: 360,
            maxWidth: "calc(100vw - 48px)",
            height: 480,
            maxHeight: "calc(100vh - 140px)",
            display: "flex",
            flexDirection: "column",
            background: "var(--card)",
            border: "1px solid var(--border)",
            borderRadius: 18,
            boxShadow: "var(--shadow)",
            overflow: "hidden",
          }}
        >
          <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--border2)", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent2)" }} />
            <span style={{ fontFamily: "var(--font-heading)", fontWeight: 700, fontSize: 15 }}>Cirro Brief Consultant</span>
          </div>

          <div ref={listRef} style={{ flex: 1, overflowY: "auto", padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  background: m.role === "user" ? "var(--btn)" : "var(--tint)",
                  color: m.role === "user" ? "var(--btn-text)" : "var(--text)",
                  borderRadius: 14,
                  padding: "10px 13px",
                  fontSize: 14,
                  lineHeight: 1.5,
                  whiteSpace: "pre-wrap",
                }}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div style={{ alignSelf: "flex-start", color: "var(--text3)", fontSize: 13 }}>Thinking...</div>
            )}
            {error && <div style={{ color: "#c0392b", fontSize: 13 }}>{error}</div>}
          </div>

          <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border2)", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send();
                }
              }}
              placeholder="Ask about plans, pricing, or how it works..."
              style={{ flex: 1, border: "1px solid var(--border)", borderRadius: 10, padding: "9px 12px", fontSize: 14, background: "var(--bg)", color: "var(--text)" }}
            />
            <button
              onClick={send}
              disabled={loading || !input.trim()}
              className="btn-pop"
              style={{ background: "var(--btn)", color: "var(--btn-text)", border: "none", borderRadius: 10, padding: "9px 14px", fontSize: 14, cursor: "pointer" }}
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
