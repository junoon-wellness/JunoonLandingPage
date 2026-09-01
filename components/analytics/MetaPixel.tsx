import Script from "next/script";

/**
 * Meta (Facebook) Pixel — needed so the Meta Ads campaign can attribute
 * signups, retarget visitors who did not convert, and optimise delivery
 * toward people who actually sign up rather than people who merely click.
 *
 * 🔴 SHIPS INERT. With no NEXT_PUBLIC_META_PIXEL_ID set, this renders
 * nothing at all: no script, no cookie, no request to Meta. That is
 * deliberate — the plumbing could go live before the id existed, and before
 * the privacy policy was updated, without either being a problem.
 *
 * ⚠️ BEFORE SETTING THE ENV VAR, UPDATE /privacy. The policy currently says
 * nothing about cookies, analytics or third-party tracking (checked
 * 2026-09-01), and this pixel sets cookies and sends visit data to Meta.
 * Turning it on without that disclosure is the compliance problem, not the
 * code.
 *
 * The var must be NEXT_PUBLIC_ to reach the browser, and must be read at
 * module scope so Next can inline it at build time. A pixel id is not a
 * secret — it is visible in the page source of every site that uses one.
 */
const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export default function MetaPixel() {
  if (!PIXEL_ID) return null;

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', ${JSON.stringify(PIXEL_ID)});
fbq('track', 'PageView');
        `}
      </Script>
      {/*
        The <noscript> beacon is what Meta's own install snippet ships. It is
        the only way a visitor with JavaScript disabled registers as a visit.
        next/image is deliberately NOT used — this is a 1x1 tracking beacon on
        Meta's domain, not an image to optimise.
      */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          alt=""
          src={`https://www.facebook.com/tr?id=${encodeURIComponent(PIXEL_ID)}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  );
}
