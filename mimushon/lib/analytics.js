// Fire an analytics event so it reaches BOTH:
//   1. GTM's dataLayer  — for any tags you configure in the GTM UI, and
//   2. GA4 directly via gtag('event', ...) — which is what makes custom events
//      actually show up in GA4 *without* needing GTM tags.
//
// Why both: we verified that dataLayer-only pushes ({ event: 'x' }) never reached
// GA4 (only the automatic page_view/scroll did), because GTM had no forwarding
// tags. The gtag() path guarantees delivery. Note: if you later add GTM event
// tags for these same events, drop one path to avoid double-counting.
export function track(name, params = {}) {
  if (typeof window === "undefined") return;
  try { window.dataLayer?.push({ event: name, ...params }); } catch {}
  try { window.gtag?.("event", name, params); } catch {}
}
