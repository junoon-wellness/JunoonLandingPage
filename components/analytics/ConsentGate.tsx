"use client";

import Script from "next/script";
import { useCallback, useEffect, useState } from "react";

/**
 * The consent gate in front of the Meta Pixel.
 *
 * 🔒 KUSH RULED, 2026-09-10: a small unobtrusive card, dismissable, shown to
 * EU/UK visitors only. His question was whether it could be small with an X
 * to ignore. It can — but the X had to be given ONE meaning, and this is it:
 *
 * 🔴 DISMISSING IS DECLINING. The X, the Escape key and "No thanks" all do
 * exactly the same thing. That is not a UX preference, it is the whole point:
 * a banner you can dismiss while the cookie loads anyway is a NOTICE, not
 * consent, and buys nothing legally — the violation is setting the cookie
 * before permission, and closing a notice does not change that. So the pixel
 * never loads until someone actively says yes.
 *
 * WHAT A VISITOR OUTSIDE THE EEA/UK SEES: nothing. No card, no delay beyond
 * one small request, and the pixel behaves as it did before this existed.
 *
 * NOT A DARK PATTERN, DELIBERATELY: accepting and refusing are the same size,
 * side by side, both one click. Refusing is never the harder path.
 */

type Decision =
  /** Still working out whether this visitor has to be asked. Renders nothing. */
  | "checking"
  /** Must be asked, and has not answered yet. The card is showing. */
  | "asking"
  /** Pixel may load — either they said yes, or they were never owed a prompt. */
  | "allowed"
  /** They said no. The pixel never loads for them. */
  | "refused";

const STORAGE_KEY = "jn-meta-consent";

/**
 * Three stored values rather than two, so the record stays honest: someone
 * outside the EEA/UK was never ASKED, and writing "granted" for them would
 * misrepresent a consent that was never given. All three skip the region
 * check on the next visit.
 */
type Stored = "granted" | "denied" | "not-required";

/**
 * Storage access throws outright in some contexts — a browser set to block
 * site data, a hardened private window — so every read and write is wrapped.
 * The cost of failure is only that the answer is not remembered and an EEA/UK
 * visitor is asked again next time. Nothing breaks and nobody is tracked
 * without consent.
 */
function readStored(): Stored | null {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw === "granted" || raw === "denied" || raw === "not-required") {
      return raw;
    }
    return null;
  } catch {
    return null;
  }
}

function writeStored(value: Stored): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // Not remembering the answer is an acceptable outcome. Tracking someone
    // who refused is not — and that path does not depend on storage.
  }
}

export default function ConsentGate({ pixelId }: { pixelId: string }) {
  // Starts at "checking", which renders nothing. The server renders nothing
  // too, so there is no hydration mismatch and no flash of a card for the
  // majority of visitors who will never see one.
  const [decision, setDecision] = useState<Decision>("checking");

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    /**
     * Works out the decision and returns it, rather than setting state along
     * the way. Both the remembered-answer path and the ask-the-edge path end
     * here, so there is exactly ONE place state changes and exactly one
     * render — which is also what `react-hooks/set-state-in-effect` is for.
     */
    async function resolve(): Promise<Decision> {
      const stored = readStored();
      if (stored === "granted" || stored === "not-required") return "allowed";
      if (stored === "denied") return "refused";

      try {
        const response = await fetch("/api/consent-region", {
          signal: controller.signal,
          cache: "no-store",
        });
        if (!response.ok) throw new Error(`status ${response.status}`);
        const data: unknown = await response.json();
        const required =
          typeof data === "object" &&
          data !== null &&
          (data as { consentRequired?: unknown }).consentRequired === true;

        if (required) return "asking";
        writeStored("not-required");
        return "allowed";
      } catch {
        // 🔴 ON FAILURE WE ASK. Same reasoning as the server module's
        // unknown-country case: if we cannot establish where someone is, the
        // safe answer is a question. Failing the other way would set
        // advertising cookies on EEA visitors silently, and silently is the
        // problem — a banner appearing where it should not is noticed the
        // same day.
        return "asking";
      }
    }

    void resolve().then((next) => {
      if (!cancelled) setDecision(next);
    });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const allow = useCallback(() => {
    writeStored("granted");
    setDecision("allowed");
  }, []);

  const refuse = useCallback(() => {
    writeStored("denied");
    setDecision("refused");
  }, []);

  // Escape closes the card, and closing means declining — the same as the X.
  useEffect(() => {
    if (decision !== "asking") return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") refuse();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [decision, refuse]);

  if (decision === "allowed") {
    return (
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(pixelId)});
fbq('track', 'PageView');
        `}
      </Script>
    );
  }

  if (decision !== "asking") return null;

  return (
    // Not `aria-modal` and no focus trap, on purpose: this is meant to be
    // ignorable. A card that captures the keyboard is not unobtrusive, and
    // trapping focus to ask about an advertising cookie is exactly the
    // behaviour the "small and out of the way" brief was avoiding.
    <div
      className="jn-consent"
      role="dialog"
      aria-labelledby="jn-consent-title"
      aria-describedby="jn-consent-body"
    >
      <button
        type="button"
        className="jn-consent-x"
        onClick={refuse}
        aria-label="Close without allowing cookies"
      >
        <svg width="11" height="11" viewBox="0 0 11 11" aria-hidden="true" focusable="false">
          <path
            d="M1 1l9 9M10 1l-9 9"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>

      <p className="jn-consent-eyebrow" id="jn-consent-title">
        Cookies
      </p>
      <p className="jn-consent-body" id="jn-consent-body">
        We&rsquo;d like to set one cookie from Meta so we can tell whether our ads are working. It
        never carries your email address or any health information.{" "}
        <a className="jn-consent-link" href="/privacy">
          Privacy Policy
        </a>
      </p>
      <div className="jn-consent-actions">
        <button type="button" className="v2-btn v2-btn--sm" onClick={allow}>
          Allow
        </button>
        <button type="button" className="jn-consent-decline" onClick={refuse}>
          No thanks
        </button>
      </div>
    </div>
  );
}
