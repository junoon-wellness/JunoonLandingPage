"use client";

import { FormEvent, useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";

type Status = "idle" | "loading" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  const inputClass =
    "w-full rounded-sm border border-linen bg-warmWhite px-4 py-3 font-sans text-base text-bark placeholder:text-driftwood/70 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/40 disabled:opacity-60";

  if (status === "success") {
    return (
      <div className="rounded-md border border-sage/40 bg-sage/10 px-6 py-5">
        <p className="font-serif text-2xl font-light text-bark">Message sent.</p>
        <p className="mt-2 font-sans text-sm text-soil">
          We&apos;ll get back to you at <span className="font-medium">{email}</span> as soon as possible.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-widest text-driftwood">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            disabled={status === "loading"}
            className={inputClass}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-widest text-driftwood">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={status === "loading"}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-subject" className="font-mono text-xs uppercase tracking-widest text-driftwood">
          Subject <span className="normal-case tracking-normal text-driftwood/60">(optional)</span>
        </label>
        <input
          id="contact-subject"
          type="text"
          autoComplete="off"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="What's this about?"
          disabled={status === "loading"}
          className={inputClass}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-widest text-driftwood">
          Message
        </label>
        <textarea
          id="contact-message"
          required
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          disabled={status === "loading"}
          className={`${inputClass} resize-y`}
        />
      </div>

      <PrimaryButton type="submit" disabled={status === "loading"}>
        {status === "loading" ? (
          <>
            <Spinner />
            <span>Sending…</span>
          </>
        ) : (
          "Send Message"
        )}
      </PrimaryButton>

      {status === "error" && (
        <p role="alert" className="font-sans text-sm text-error">
          {error}
        </p>
      )}
    </form>
  );
}

function Spinner() {
  return (
    <span
      className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-ivory/40 border-t-ivory"
      aria-hidden="true"
    />
  );
}
