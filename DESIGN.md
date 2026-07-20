---
name: Mimushon
description: A step-by-step disability-percentage calculator that mirrors Israel's official Bituach Leumi method
colors:
  primary: "#4f46e5"
  primary-hover: "#4338ca"
  primary-deep: "#3730a3"
  primary-soft: "#eef2ff"
  primary-border: "#c7d2fe"
  neutral-bg: "#ffffff"
  neutral-surface: "#f9fafb"
  neutral-border: "#e5e7eb"
  neutral-muted: "#6b7280"
  neutral-ink-soft: "#374151"
  neutral-ink: "#111827"
  danger: "#ef4444"
  danger-soft: "#fef2f2"
  warning: "#f59e0b"
  warning-soft: "#fffbeb"
  success: "#15803d"
  success-soft: "#dcfce7"
typography:
  display:
    fontFamily: "Assistant, -apple-system, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.5rem)"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  headline:
    fontFamily: "Assistant, -apple-system, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.3
  title:
    fontFamily: "Assistant, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: "Assistant, -apple-system, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Assistant, -apple-system, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  pill: "9999px"
spacing:
  sm: "12px"
  md: "16px"
  lg: "24px"
  xl: "40px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: "10px 20px"
  card:
    backgroundColor: "{colors.neutral-bg}"
    rounded: "{rounded.lg}"
    padding: "24px"
  step-frame:
    backgroundColor: "{colors.primary-soft}"
    rounded: "{rounded.lg}"
    padding: "24px"
  input:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.lg}"
    padding: "10px 16px"
---

# Design System: Mimushon

## 1. Overview

**Creative North Star: "The Trusted Clerk"**

Mimushon behaves like a good civil servant: efficient, precise, and unglamorous, who tells you exactly what they're doing and why while they do it. Nothing here is trying to sell you software or impress you visually — the entire system exists to make one specific, high-stakes calculation legible to someone who is stressed about their health and their money. Every screen is a worked example: the inputs are visible, the steps are visible, the result is visible, and indigo is the one color allowed to carry any weight, reserved strictly for the actions and states that move a claimant through the process.

This system explicitly rejects the generic SaaS/startup look (gradient heroes, glassmorphic cards, marketing gloss), the cold-government-form look (dense gray blocks, no warmth), and the pushy legal-firm-sales look (aggressive CTAs, stock imagery, urgency tactics). It sits deliberately between those poles: official enough to be trusted, plain enough to never feel like it's selling anything.

**Key Characteristics:**
- One brand color (indigo), used consistently for action and progress, never decoratively
- Status colors (red, amber, green) are strictly functional — they only ever mean error, warning, or success
- Soft, moderate rounding (8–12px) and light shadows — approachable, never severe, never precious
- A single typeface (Assistant) doing all the work, Hebrew and Latin, across eight weights
- Flat by default; elevation is reserved for things that temporarily float above the page

## 2. Colors

A single steady, trustworthy indigo carries every interactive and progress cue in the system; everything else is neutral gray or a semantic status color.

### Primary
- **Steady Indigo** (#4f46e5): the only saturated brand color. Used for primary buttons, active/selected states, links, progress fills, and focus borders.
- **Steady Indigo, Hover** (#4338ca): hover/active state for primary indigo elements.
- **Steady Indigo, Deep** (#3730a3): reserved for small, high-contrast text-on-tint moments (badges, emphasis on light indigo backgrounds).
- **Indigo Wash** (#eef2ff): the tint used to frame an active step or section — see the Step Frame signature component.
- **Indigo Line** (#c7d2fe): the standard border color for anything sitting on the Indigo Wash, and for calm, non-urgent dividers.

### Neutral
- **Paper White** (#ffffff): the base surface for cards, panels, inputs, and the page itself.
- **Quiet Surface** (#f9fafb): secondary surface for nested or de-emphasized panels.
- **Hairline** (#e5e7eb): default border/divider color on neutral surfaces.
- **Muted Ink** (#6b7280): placeholder text, secondary labels, timestamps.
- **Working Ink** (#374151): default body text color.
- **Full Ink** (#111827): headings and highest-emphasis text.

### Status
- **Alert Red** (#ef4444) / soft (#fef2f2): errors, destructive actions (cancel, remove, delete). Never used decoratively.
- **Caution Amber** (#f59e0b) / soft (#fffbeb): warnings, non-blocking notices, "read this before continuing" callouts.
- **Confirm Green** (#15803d) / soft (#dcfce7): success states, completed steps, positive confirmations.

### Named Rules
**The Single Accent Rule.** Indigo is the only saturated brand color on any screen. Every other color is either a neutral or a semantic status color tied to a specific system state — never decorative, never "for variety."

## 3. Typography

**Display Font:** Assistant (Google Font, Hebrew + Latin subsets, weights 200–800)
**Body Font:** Assistant (same family)

**Character:** One typeface doing every job, from a 700-weight hero headline down to a 500-weight helper label. Plain and legible over stylized — the personality comes from restraint, not from typographic flourish.

### Hierarchy
- **Display** (700, clamp(1.875rem, 4vw, 2.5rem), 1.2 line-height): the homepage hero headline only.
- **Headline** (600, 1.5rem, 1.3 line-height): section titles ("How We Help," "How the Calculation Works").
- **Title** (600, 1.125rem, 1.4 line-height): card and step titles, question prompts.
- **Body** (400, 0.875rem, 1.6 line-height): the default text size across the questionnaire and content sections. Capped to a readable measure in prose blocks.
- **Label** (500, 0.75rem, 1.4 line-height): form labels, helper text, badges, meta text.

### Named Rules
**The One Family Rule.** Every weight from 200–800 comes from Assistant. Hierarchy is built with size and weight, never a second typeface.

## 4. Elevation

Mostly flat. Shadow is used sparingly and its weight signals whether something is docked in the page or floating above it — cards and panels in the normal flow stay light (shadow-sm/md); only modals and overlays escalate to a heavy shadow.

### Shadow Vocabulary
- **Resting** (`box-shadow: 0 1px 2px rgba(0,0,0,0.05)`): default card and list-item elevation.
- **Raised** (`box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`): the main calculator panel and the sticky floating action bar.
- **Overlay** (`box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25)`): modals and dialogs (category guide, disease detail overlays) that render above the page.

### Named Rules
**The Overlay-Only Rule.** Heavy shadow (2xl) appears only on elements that float above the page. Everything docked in the normal flow stays at resting or raised.

## 5. Components

### Buttons
- **Shape:** rounded-lg (8px) by default; rounded-full reserved for compact floating actions (the sticky bottom "continue" bar).
- **Primary:** Steady Indigo background (#4f46e5), white text, semibold, 10px/20px padding; hover to #4338ca.
- **Secondary / Outline:** white background, indigo text, 2px indigo border (#a5b4fc–#818cf8 range); hover fills to Indigo Wash (#eef2ff).
- **Destructive:** Alert Red background (#ef4444), white text — reserved for cancel/remove actions inside the questionnaire flow, never for a primary CTA.
- **Disabled:** gray-400 background, not-allowed cursor, no hover state.

### Chips / Tags
- **Style:** rounded-full, 2px indigo border, white background, indigo text; hover fills to Indigo Wash.
- **State:** compact status badges (e.g. body-region tags) use a filled Indigo Wash background with deep-indigo text instead of an outline.

### Cards / Containers
- **Corner Style:** rounded-xl (12px) for primary containers — the calculator shell, modals, selection panels; rounded-lg (8px) for nested list items inside them.
- **Background:** Paper White for the primary panel; Indigo Wash for a tinted container (see Step Frame below).
- **Shadow Strategy:** Resting by default, Raised for the main calculator shell, Overlay for anything modal — see Elevation.
- **Border:** 1px Indigo Line as the calm default; 2px indigo (300/400) when the card itself is interactive or selectable.
- **Internal Padding:** 16–24px on mobile, up to 40px on the primary calculator shell at desktop widths.

### Inputs / Fields
- **Style:** Paper White background, 2px Indigo Line-family border, rounded-xl (12px), gray-400 placeholder text.
- **Focus:** border shifts to Steady Indigo (#6366f1–#4f46e5 range) with no outline ring — a clean border-only focus. Checkboxes are the one exception, using a visible focus ring.
- **Error / Disabled:** not heavily used yet; when needed, follow the Status palette (Alert Red border/text for error, gray-400 for disabled) rather than inventing a new treatment.

### Navigation
Header sits on Paper White with a Hairline bottom border; active links and the primary logo mark use Steady Indigo, inactive links use Working Ink. No hover-only reveal patterns — every nav target is visible by default, consistent with keeping the flow legible for less tech-savvy users.

### Step Frame (signature component)
The calculator's core interaction pattern: whichever step a claimant is currently on is wrapped in an Indigo Wash panel (#eef2ff background, #c7d2fe border, rounded-xl). It's the one deliberately atmospheric device in an otherwise plain system — a quiet visual cue that says "you are inside a step of the process right now," reinforcing the show-the-work principle from PRODUCT.md.

## 6. Do's and Don'ts

### Do:
- **Do** keep Steady Indigo (#4f46e5) as the only saturated brand color; every other hue is a semantic status color tied to a real system state.
- **Do** build hierarchy with Assistant's weight range (200–800) and size — never introduce a second typeface.
- **Do** use rounded-lg (8px) as the default for buttons, inputs, and nested items, rounded-xl (12px) for primary containers and modals, and rounded-full only for pills and compact floating actions.
- **Do** keep shadow at resting/raised for anything docked in the page flow; reserve the heavy overlay shadow for modals.
- **Do** use the Indigo Wash step-frame pattern to mark "you are inside a step" in the questionnaire flow.

### Don't:
- **Don't** introduce a generic SaaS/startup look — no gradient hero backgrounds, no glassmorphism, no marketing gloss.
- **Don't** let any screen read as a cold government form — dense gray blocks with no warmth or breathing room.
- **Don't** add pushy legal-firm-sales elements — aggressive CTAs, stock photos of gavels or handshakes, personal-injury-ad energy.
- **Don't** add a second saturated accent color competing with indigo for attention; status colors are reserved strictly for their semantic state.
- **Don't** use a heavy (overlay) shadow on anything that isn't a temporary modal or dialog.
