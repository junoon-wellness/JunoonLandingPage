"use client";

import { FormEvent, useState } from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { ctaPanel } from "@/content";

type Status = "idle" | "loading" | "success" | "error";

const copy = ctaPanel.waitlist;

export default function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setError("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        throw new Error(data.error || "Something went wrong. Please try again.");
      }
      setAlreadySubscribed(Boolean(data.alreadySubscribed));
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="w-full">
      {status === "success" ? (
        <div className="rounded-md border border-sage/40 bg-sage/10 px-5 py-4">
          <p className="font-serif text-xl text-ivory">
            {alreadySubscribed ? copy.already : copy.success}
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-3" noValidate>
            <label htmlFor="waitlist-email" className="sr-only">
              Email address
            </label>
            <input
              id="waitlist-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={copy.placeholder}
              disabled={status === "loading"}
              className="w-full rounded-sm border border-linen bg-warmWhite px-4 py-3.5 font-sans text-base text-bark placeholder:text-driftwood/70 focus:border-clay focus:outline-none focus:ring-2 focus:ring-clay/40 disabled:opacity-60"
            />

            <PrimaryButton type="submit" fullWidth disabled={status === "loading"}>
              {status === "loading" ? (
                <>
                  <Spinner />
                  <span>Joining...</span>
                </>
              ) : (
                copy.button
              )}
            </PrimaryButton>

            {status === "error" && (
              <p role="alert" className="font-sans text-sm text-error">
                {error}
              </p>
            )}

            <p className="font-sans text-xs text-driftwood">{copy.disclaimer}</p>
        </form>
      )}
    </div>
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
