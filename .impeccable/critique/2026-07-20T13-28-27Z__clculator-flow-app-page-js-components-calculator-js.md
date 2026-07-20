---
target: mimushon calculator flow (app/page.js + components/Calculator.js)
total_score: 30
p0_count: 0
p1_count: 2
timestamp: 2026-07-20T13-28-27Z
slug: clculator-flow-app-page-js-components-calculator-js
---
Method: dual-agent (A: general-purpose design review · B: general-purpose detector + browser evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Live 4-step `ProgressBar`, live disease summary, and a real progress bar on the calculating screen all work well — but the running percentage estimate only surfaces on the mobile FAB, not on desktop. |
| 2 | Match System / Real World | 4/4 | Genuinely mirrors the real NII formula and thresholds (40%/60% general, 20%/9% work-accident tiers, real ILS benefit figures) — the product's strongest dimension. |
| 3 | User Control and Freedom | 3/4 | Back arrows, remove-disease, and reset all exist; but a submitted severity questionnaire can't be edited without redoing the whole disease. |
| 4 | Consistency and Standards | 2/4 | Two lead-capture forms with different validation language (Hebrew vs. English), and — confirmed by the detector and verified in `app/global.css:14` — the site's declared brand typeface (Assistant) is silently overridden by a leftover boilerplate `font-family` stack, so nearly all body text actually renders in the browser's fallback sans, not Assistant. |
| 5 | Error Prevention | 3/4 | TOS-checkbox gate with shake animation, disabled-state buttons; but phone validation (`/^\d{9,10}$/`) will reject valid Israeli numbers typed with dashes/spaces. |
| 6 | Recognition Rather Than Recall | 3/4 | Persistent disease/severity summary and a symptom-based `CategoryGuide` help a lot; docked for a flat 12-item orthopedics subcategory list that relies on scanning instead of grouping. |
| 7 | Flexibility and Efficiency | 3/4 | Search + one-click common-condition shortcuts serve power users; multi-modal `Tooltip` (hover/keyboard/touch) is genuinely accessibility-aware. No cross-device save, only `sessionStorage`. |
| 8 | Aesthetic and Minimalist Design | 2/4 | The calculator shell itself is restrained, but the results screen quantifiably breaks this: the detector counted 44 anti-pattern flags on that single screen alone, including 7 separate nested-card instances, 11px body text, gray-on-tint text, and prose running up to ~144 characters per line. |
| 9 | Error Recovery | 3/4 | Clear Hebrew retry copy on calculation failure; docked for literal `**markdown**` asterisks rendering as visible text in production copy on 3 pages, and English-only errors in a dead-but-reachable form component. |
| 10 | Help and Documentation | 4/4 | Per-disease guides, required-document checklists, an interactive severity wizard, a symptom-based category guide, and a full articles section — unusually thorough for this category. |
| **Total** | | **30/40** | **Good** — strong core mechanic, deductions cluster around consistency/polish and the results screen, not the calculator itself. |

## Anti-Patterns Verdict

**LLM assessment**: The calculator flow itself avoids the SaaS-template look DESIGN.md explicitly rejects — no glassmorphism, no gradient text, no tracked-uppercase eyebrows. The marketing shell around it is less disciplined: `ProcessSection.jsx` uses a four-circle-numbered-badges-with-dotted-connector layout (the "01/02/03" pattern one tier removed), and `HowWeHelpSection.jsx` is an identical 3-card icon/title/paragraph grid — both textbook templates the project's own anti-references reject. `app/page.js:31` also wraps the page in `bg-gradient-to-br from-indigo-50 to-indigo-50`, a gradient utility whose two stops are identical — the anti-pattern was reached for even though it doesn't visually read as one.

**Deterministic scan**: 64 findings across `mimushon/app` and `mimushon/components` (27 advisory, 37 warning): 25× `ai-color-palette`, 17× `design-system-font-size`, 9× `design-system-color`, 5× `gray-on-color`, 3× `design-system-font`, 2× `side-tab`, 1× `layout-transition`, 1× `overused-font`, 1× `design-system-radius`.

**Reconciling detector vs. intent — false positives**:
- The 25 `ai-color-palette` hits are almost entirely indigo/purple usage — but DESIGN.md explicitly defines indigo as the system's *only* saturated brand color (the "Single Accent Rule"). This is a deliberate, documented brand decision the generic detector can't distinguish from an unintentional AI palette tell. Not a real issue.
- The 2 `side-tab` hits are `border-l-8`/`border-r-8` in `Tooltip.jsx:83-84` — verified this is a CSS-triangle tooltip-arrow construction (zero-size box, transparent top/bottom border, one colored side border), not a decorative side-stripe accent. False positive; the detector pattern-matched the utility class without recognizing the triangle technique.
- Low-contrast flags on disabled buttons (~2.5:1) are a technical non-issue: WCAG 1.4.3 exempts inactive UI components from the 4.5:1 requirement, and the disabled state is already distinguished by `bg-gray-400` + `cursor-not-allowed` per DESIGN.md's own spec.

**Unresolved — needs a manual look**: Both independent assessments (LLM review reading source, and the browser-evidence pass reading rendered DOM) separately reported the homepage hero image failing to render, showing a flat light background instead of the photo, with a resulting severe contrast failure on the hero headline (~1.1:1, need 3:1). I independently checked this against the filesystem and network: `public/images/hero-photo.webp` exists (142KB, real image bytes), the `HeroSection.jsx` `<Image>` component is correctly configured (width/height/priority all set), and both the raw asset path and the Next.js image-optimizer endpoint return HTTP 200 with real content via `curl`. That contradicts a "missing file" diagnosis. Given two independent live-browser sessions both still observed a broken-looking hero, this may be a real intermittent client-side rendering issue (not a missing asset) — worth one manual check in an actual browser (not just curl) before ruling it in or out. If it reproduces, it's a P0: it would fail the very first screen a claimant sees.

**Visual overlays**: Screenshots were captured at 5 checkpoints (homepage, disease selection, severity selection, results, `/about-us`) with detector overlays confirming stepper/nested-card/long-line locations visually, consistent with both the CLI scan and the LLM review's results-screen findings.

## Overall Impression

The calculator itself is the strongest part of the product and is a genuine, disciplined execution of "The Trusted Clerk" — flat cards, one accent color, real threshold-aware explanatory copy, and an interactive body map that actually helps a non-medical user self-identify their condition. The weak points cluster in exactly two places: the marketing shell wrapped around the tool (which slips into templated patterns the project's own docs reject), and the results screen (which, at the exact moment a stressed user is processing a life-affecting number, unloads a lawyer lead-gen pitch, a 5-step timeline, a documents checklist, and 3 article links all at once, expanded, with no progressive disclosure). The single biggest opportunity is treating the results screen with the same restraint the calculator steps already have.

## What's Working

1. **The interactive body map + hover-linked subcategory list** (`BodyMapOrtho.jsx` + `DiseaseSelectionScreen.jsx`) — hovering a subcategory highlights the matching region on a silhouette figure in real time. A genuinely functional use of interactivity in service of the product's core "show the work" promise, not decoration.
2. **The multi-modal `Tooltip` component** (`components/content/Tooltip.jsx`) — hover, keyboard focus, and touch-tap-with-auto-dismiss all work, plus a self-correcting position flip near viewport edges. Executes PRODUCT.md's "minimal reliance on hover" requirement correctly, which most tooltip implementations get wrong.
3. **Threshold-aware results copy** (`TotalPercentageDisplay.jsx`'s `getExplanation()`) — every percentage tier gets a specific explanation tied to the real NII thresholds, and the incapacity questionnaire is correctly framed as a separate determination from the medical percentage. This is the product's core trust mechanism actually working.

## Priority Issues

- **[P1] Results screen overwhelms the moment it should be clarifying.**
  **Why it matters**: `TotalPercentageDisplay.jsx` stacks mode cards, an embedded incapacity questionnaire, a work-accident block, a disclaimer, 4 action buttons, a documents checklist, a full lead-gen form, a 5-step timeline, and 3 article links — all expanded simultaneously. The detector independently counted 44 anti-pattern flags on this one screen (vs. 25-26 on other steps), including 7 separate nested-card instances and lines running up to ~144 characters. For an audience PRODUCT.md describes as older, stressed, and anxious about money/diagnosis, this is the highest-stakes moment in the product and currently the most cognitively demanding one.
  **Fix**: Collapse the timeline, "what now" links, and documents checklist behind one progressive-disclosure section below the fold. Keep only the mode card, disclaimer, and primary actions above the fold.
  **Suggested command**: `/impeccable distill` (results screen), then `/impeccable layout`.

- **[P1] Lead-gen CTA immediately follows a discouraging result, with sales-page framing.**
  **Why it matters**: In the tested flow (a mild condition scoring 0% across all modes), the very next thing shown is "רוצה לדעת אם מגיע לך יותר?" with trust badges ("ייעוץ חינמי", "ללא התחייבות", "מומחים בליווי") and a 4-field form. DESIGN.md's anti-references explicitly reject "pushy legal-firm sales" energy, and PRODUCT.md states "never let the sell overpower the tool" — this is the one place in the product closest to crossing that line, precisely because it's timed to the user's lowest emotional resilience.
  **Fix**: Soften the framing specifically at low/0% results — swap the "you might deserve more" pitch for a lower-key "have questions about this result?" framing, or de-emphasize/delay the form for those cases.
  **Suggested command**: `/impeccable clarify` (results-screen CTA copy).

- **[P2] The declared brand typeface never actually reaches most body text.**
  **Why it matters**: `app/layout.js` correctly loads Assistant via `next/font/google` and applies it to `<html>`. But `app/global.css:14` still carries an unedited boilerplate `body { font-family: -apple-system, ..., 'Roboto', ... }` rule, which — because it's an explicit declaration on `body`, not an inherited one — silently wins over the `<html>`-level Assistant class for everything inside it. The detector measured Roboto at 77-100% of rendered text across every checkpoint. This directly contradicts DESIGN.md's "One Family Rule," and neither the source-level design review nor a casual glance would catch it, since Roboto and Assistant look similar at a glance — this is a case the deterministic scan caught that the design review missed entirely.
  **Fix**: Delete or scope down the `body` font-family override in `global.css:14` so the `next/font`-applied Assistant class actually takes effect site-wide.
  **Suggested command**: `/impeccable audit` (typography), then a direct fix — this one's a one-line CSS change, not a design pass.

- **[P2] Literal markdown syntax renders as visible text in production copy.**
  **Why it matters**: `**bolded text**` appears with literal double-asterisks (confirmed via grep) on `app/about-us/page.js`, `app/articles/what-is-the-calculator/page.js`, and `app/articles/how-the-calculation-works/page.js`. For a brand built entirely on precision and trust, a visible rendering artifact in the copy is exactly the kind of small detail that erodes confidence for an already-anxious user wondering "did they get the calculation right either?"
  **Fix**: Convert to `<strong>` JSX or run through a markdown renderer — a small, mechanical fix across 3 files.
  **Suggested command**: `/impeccable harden` (content correctness pass).

- **[P2] Flat, ungrouped 12-item subcategory list in the orthopedics body-map view.**
  **Why it matters**: `DiseaseSelectionScreen.jsx`'s orthopedics branch lists all subcategories (skull, spine, chest, arm/hand, shoulders, elbow, shoulder-muscle-injuries, elbow-muscle-injuries, finger-injuries, pelvis, knee, foot/ankle...) as one flat list — 3x over the ≤4-item chunking guideline, and the single densest decision point in the whole flow for a first-time user.
  **Fix**: Group by limb/region (Head & Spine / Upper Limb / Lower Limb / Torso) using the body map's own regions as collapsible group headers.
  **Suggested command**: `/impeccable layout` (disease-selection screen).

- **[P3] Dead lead-capture code path with English-only errors.**
  **Why it matters**: `UserInfoForm.jsx` is fully built but never imported anywhere in the app (confirmed) — `Calculator.js`'s render switch has no `"userInfo"` case reaching it. It also throws untranslated English validation errors ("Name is required") in an otherwise 100%-Hebrew app, which would confuse a Hebrew-only user if the path were ever reconnected. Low risk today, but it's an abandoned duplicate of the Hebrew `ContactForm.jsx` actually in use on the results screen.
  **Fix**: Delete it, or finish wiring and translate it — don't leave a broken/unreachable screen state sitting in the codebase.
  **Suggested command**: none needed — direct cleanup.

## Persona Red Flags

**Jordan (confused first-timer)**
- The 12-item flat orthopedics subcategory list is the hardest single decision point Jordan will face in the entire flow.
- The severity radio list (`SeveritySelection.jsx`, up to 8 medical-register options like "לאחר שבר בצלעות שהתרפא") assumes self-diagnosis fluency; the rescue path ("התחל מדריך אינטראקטיבי לקביעת חומרה") is a single text button competing visually with 8 radio options directly below it — easy to miss.
- Positive: `CategoryGuide.jsx`'s symptom-based modal ("איזה חלק בגוף מפריע לך?") is built specifically for Jordan and works — plain-language symptom groups instead of medical category names.

**Sam (accessibility-dependent)**
- `Tooltip.jsx`'s keyboard-focus + touch support is a genuine win over hover-only patterns.
- The mobile FAB button (`Calculator.js` ~538-573) carries `aria-label="View Summary"` but its visible running-total text ("X מחלות נבחרו" / "~Y%") is separate decorative content — a screen-reader user gets only the generic label, losing the live estimate sighted mobile users see.
- The literal `**asterisks**` on the About page would be read aloud character-by-character ("asterisk asterisk..."), directly degrading this persona's experience specifically.

**Project-specific persona — "Rina," 61, first-time NII claimant with a degenerative spine condition**
- Moderate tech comfort, fluent Hebrew but not bureaucratic/medical jargon, physically uncomfortable in long sitting sessions.
- The 12-item ungrouped orthopedics list is exactly the kind of undifferentiated list that would make her second-guess whether she's in the right place at all.
- A 0%/low result immediately followed by the lawyer lead-gen pitch reads to her as being sold to at the exact moment she's most vulnerable — she is the user PRODUCT.md's "respect the moment" principle is written for, and this is the closest the product comes to violating it.
- The visible `**asterisks**` on the About page — likely the first page she reads, before trusting the tool with her medical details — is a small but real credibility ding at first contact.

## Minor Observations

- `ChosenDiseasesSummary.jsx`'s "יש לבחור דרגת חומרה" warning uses a thin `border border-red-500` around normal text rather than DESIGN.md's stated danger-soft background treatment (`#fef2f2`) — an inconsistent, half-finished error style.
- `layout.js`'s image preload hint points at `/images/hero-photo.jpg`, but the actual component loads `/images/hero-photo.webp` — the preload is silently ineffective (wrong extension), though harmless.
- `ProgressBar.jsx` correctly reads right-to-left (step 1 rightmost) — good RTL discipline, no flipped-icon issues found.
- `WorkAccidentScreen.jsx` and `IncapacityQuestionnaire.jsx` contain the identical 9-question set duplicated verbatim rather than shared as one module — a maintenance risk, not a user-facing issue.
- The disabled "חשב אחוזי נכות" button styling (`bg-gray-400`, `cursor-not-allowed`) matches DESIGN.md's disabled-button spec exactly.

## Questions to Consider

- What if the results screen led with one calm headline number and one "what this means" sentence, with everything else behind a single "פרטים נוספים" expand — so the peak-end moment is the number and its meaning, not a wall of content?
- What if the lawyer lead-gen CTA adapted its tone to the result itself — encouraging above the qualifying threshold, genuinely low-key below it — so "never let the sell overpower the tool" holds even in the worst-case result?
- What if the orthopedics body-map regions doubled as the subcategory list's own group headers, so the map and the text list share one hierarchy instead of the map being a hover-aid bolted onto a flat list?
