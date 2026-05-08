"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function EmailCapture() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setMessage("You're on the list. First newsletter coming Sunday.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Try again?");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Try again?");
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <label htmlFor="email" className="sr-only">
          Email address
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading"}
          aria-describedby="email-status"
          className="flex-1 px-4 py-3 bg-white/5 border border-white/15 rounded-md text-foreground placeholder-muted-dim focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold transition-colors disabled:opacity-60"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-3 bg-gold text-background hover:bg-gold-dim disabled:opacity-60 rounded-md font-medium transition-colors whitespace-nowrap"
        >
          {status === "loading" ? "Joining…" : "Get the newsletter"}
        </button>
      </form>
      {message && (
        <p
          id="email-status"
          role={status === "error" ? "alert" : "status"}
          className={`mt-3 text-sm ${
            status === "success" ? "text-gold" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
