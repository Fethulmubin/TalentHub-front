# TalentHub — Full UI Audit

## Current State
The frontend is functional but visually incomplete. It has a solid foundation (OKLCH dark mode, Tailwind v4, shadcn-inspired tokens) but every page feels like a minimum-viable version — no premium polish, inconsistent hierarchy, and weak information density.

---

## Current Problems

### 1. Typography
- No type scale/rhythm — headings use ad-hoc sizes (text-xl, text-3xl) with no system
- Body text too large/low density (line-height too loose, max-w too narrow)
- No semantic text roles (lead, caption, code, metric, label)
- Font stack is Geist (good) but not leveraging variable weight axis for hierarchy

### 2. Spacing & Layout
- Inconsistent page padding — some pages use `px-4 py-8`, others `px-4 sm:px-6 lg:px-8 py-12`
- No consistent page shell — each page manually handles its own container/max-width
- Admin layout has a sidebar that works but feels basic (no icons for nav labels, no active state highlighting, no nested nav)
- Mobile bottom nav is functional but visually heavy
- No right-context panel for detail views

### 3. Color
- Token system is good but underutilized
- Primary color is nearly black in light mode — feels harsh, no brand personality
- Accent/secondary colors lack usage for data viz/charts
- No gradient usage for premium feel (doesn't need to be heavy, just subtle)

### 4. Components — Specific Issues

**Button**: Solid foundation but `loading` spinner is generic; no icon-only variant with tooltip; no group/segmented button

**Card**: `hover:shadow-md` is too aggressive; no inset variant for dashboard cards; no interactive card pattern

**Input/Textarea/Select**: Functionally good but visually basic — no focus ring animation, no input group pattern, no leading/trailing addon

**DataGrid**: No row hover highlight, no sticky header, no column resize, no pagination controls, no bulk selection

**Badge**: Overused `soft` variant; no colored dot variant; no removable pattern (implemented manually in PostJob)

**Modal/Drawer**: No backdrop blur, no escape-press handling (manual in some places), no size variants

**EmptyState**: No illustration/icon sizing inconsistency (some use 24, some 20)

**Skeleton**: Already has good variants (`SkeletonCard`, `SkeletonTableRow`) but no shimmer on all shapes

**StatCard**: No trend direction visual; no sparkline/chart support

**Timeline**: Solid but no animation on entry

### 5. Page-Specific Issues

**Home (`/`)**:
- Hero section is flat — centered icon + heading + paragraph with no visual weight
- No featured jobs section
- Search/filter feels bolted on, not integrated
- Grid of job cards is the only content
- No stats/trust signals

**Sign In / Sign Up / Verify**:
- Centered card at `max-w-sm` feels cramped on desktop, too narrow
- No brand illustration or visual interest
- No social login buttons visual
- No password strength indicator on signup
- Role selection radio buttons are unstyled native inputs

**Admin Dashboard**:
- `StatCard` values are hardcoded "0" — shows no loading state
- Quick-action cards (Post Job, My Jobs, Find Candidates) are repetitive and visually heavy
- Welcome card has hardcoded placeholder text
- No data visualization (charts)
- No recent activity feed

**Job Detail**:
- Single card with no visual hierarchy between header, skills, description, apply form
- Description is plain text in `whitespace-pre-line` — no rich formatting
- Apply form is inline below the fold

**Candidate Profile**:
- Well-structured AI components but lacks premium polish (cards feel plain, no depth)
- Evidence cards are color-coded but cramped
- No loading shimmer for skill graph bars

**Resume Upload**:
- Drop zone is basic dashed border
- Uploaded state shows a spinner with text — feels incomplete
- "What happens next?" card is good but visually disconnected

**Applications (Applicant)**:
- DataGrid with inline timeline toggle — functional but cramped
- No status visual (colored dot, progress stepper)

**Candidate Search**:
- Search box in a card feels like an afterthought
- Results table is solid but lacks filtering/sorting controls beyond column sort
- No result count summary

**Post Job**:
- Skills input is basic — manual add button, no autocomplete, no popular skills suggestions

### 6. Motion & Interaction
- No page transitions (PageTransition component exists but wraps nothing meaningfully)
- No hover states on cards beyond border color change
- No micro-interactions (button press, checkbox toggle, accordion)
- No skeleton loading on any data fetch (DataGrid has loading but no shimmer)
- No drawer/modal open/close animation refinement

### 7. Responsiveness
- Mobile layout is functional but cramped
- Admin sidebar is hidden on mobile with a toggle that shows an overlay — no bottom nav for admin
- Tables don't horizontally scroll on mobile
- Font sizes don't scale properly on small screens
- Touch targets are sometimes too small (badge remove buttons, icon buttons)

### 8. Accessibility
- No focus-visible ring on interactive elements in some places
- No `aria-label` on icon-only buttons
- No `aria-current` on active nav links
- No keyboard navigation for dropdown menus
- No skip-to-content link

---

## Quick Wins (High Impact, Low Effort)

1. **Typography polish**: Add `tracking-tight` to all headings, tighten line-height, use a type scale
2. **Card refinement**: Change `hover:shadow-md` to `hover:shadow-sm`, add subtle border color change
3. **Button upgrade**: Smoother loading spinner, add `transition-transform active:scale-[0.97]` press effect
4. **Input focus**: Add ring animation transition, slightly larger focus ring offset
5. **Color**: Soften primary in light mode, add accent to interactive states
6. **Empty states**: Use consistent icon size (24px), add subtle background circle
7. **Mobile nav**: Reduce visual weight, use smaller icons, thinner borders
8. **Skeleton shimmer**: Ensure all skeleton variants shimmer
9. **Admin sidebar**: Add active route highlighting, smoother collapse animation
10. **Global**: Add `selection` color, improve `scrollbar-thin`, add `focus-visible` polyfill

---

## Full Redesign Strategy

### Design Principles
1. **Information density** — Compact layouts, more data per view, efficient use of space
2. **Clear hierarchy** — Type scale, spacing scale, color semantics working together
3. **Premium minimalism** — Every element earns its place; no decoration without purpose
4. **AI-first** — Surface insights, predictions, and data visually; make AI feel native
5. **Recruiter efficiency** — Keyboard shortcuts, bulk actions, fast scanning, progressive disclosure

### Visual Direction

**Typography**:
- Headings: Inter (via Geist), 700 weight, `tracking-tight`, size scale (xs/sm/base/lg/xl/2xl/3xl)
- Body: 400 weight, `leading-relaxed` for prose, `leading-snug` for UI labels
- Mono: Geist Mono for code/data/metrics
- Semantic: `.text-lead`, `.text-caption`, `.text-metric`, `.text-label`

**Color**:
- Keep OKLCH dark/light tokens but introduce a more distinctive accent
- Primary: Deep navy → warm indigo for AI SaaS feel
- Accent: Professional teal/blue for interactive states
- Surface: Slightly warmer in light mode, slightly cooler in dark
- Success/Warning/Info/Destructive: More muted, professional palette

**Spacing**:
- Strict 4px/8px scale
- Page containers: consistent `px-6 lg:px-8 xl:px-10` with `max-w-[1600px]`
- Card padding: `p-5` (compact) or `p-6` (standard)
- Section spacing: `space-y-6` between major sections, `space-y-8` between pages

**Radius**:
- Cards: `rounded-xl` (12px) → `rounded-2xl` (16px) for premium feel
- Buttons: `rounded-lg` (8px) → `rounded-xl` (12px) for larger buttons
- Inputs: Keep `rounded-lg` (8px)
- Modals: `rounded-2xl` (16px)

**Shadows**:
- Softer, more realistic shadows using multiple layers
- `shadow-xs`: barely there
- `shadow-sm`: subtle elevation
- `shadow-md`: card hover, dropdown
- `shadow-lg`: modal, drawer
- `shadow-xl`: toast, tooltip

### Layout Architecture

```
Desktop (≥1024px):
┌─────────┬──────────────────────────────────────┬────────────┐
│ Sidebar │         Main Content Area            │ Context    │
│ 240px   │    (DashboardShell)                  │ Panel      │
│         │                                      │ 320px      │
│ Nav     │  ┌─ Top Bar (breadcrumb + actions) ─┐│ (optional) │
│ Items   │  │                                  ││            │
│         │  │  ┌──────────────────────────┐    ││            │
│         │  │  │    Page Content           │    ││            │
│         │  │  │    (scrollable)           │    ││            │
│ Footer  │  │  └──────────────────────────┘    ││            │
└─────────┴──────────────────────────────────────┴────────────┘

Mobile (<1024px):
┌──────────────────────────────────┐
│         Top Bar                  │
├──────────────────────────────────┤
│                                  │
│        Page Content              │
│        (scrollable)              │
│                                  │
├──────────────────────────────────┤
│      Bottom Navigation           │
└──────────────────────────────────┘
```

### Component Architecture

**System Components** (already in `@/components/system/`):
- Refine existing: Button, Card, Input, Textarea, Select, Badge, Avatar, Skeleton, Progress, Tooltip, Dialog, Drawer, Modal, Command, Sidebar, DataGrid, EmptyState, StatCard, Timeline
- New: Tabs, SplitPane (exists), Table (new), Panel (new), Charts (placeholder)

**Shell Components** (new in `@/components/layout/`):
- `DashboardShell` — sidebar + topbar + content + optional context panel
- `AuthShell` — centered card with brand illustration
- `InterviewShell` — split pane with Monaco + chat + timer
- `CandidateShell` — profile view with right insights panel
- `TopBar` — breadcrumb + actions + search
- `ResponsiveLayout` — adaptive container

### Page Priority Order

| Priority | Page | Effort | Impact |
|----------|------|--------|--------|
| P0 | Admin Dashboard | Medium | High (employers are core users) |
| P0 | Job List (Home) | Medium | High (first impression for all) |
| P0 | Sign In / Sign Up | Low | High (auth conversion) |
| P1 | Job Detail + Apply | Medium | High (application flow) |
| P1 | Admin - Job List | Low | Medium |
| P1 | Admin - Post Job | Low | Medium |
| P1 | Admin - Applications | Medium | Medium |
| P1 | Admin - Candidate Search | Medium | Medium |
| P1 | Applicant - My Apps | Medium | Medium |
| P1 | Candidate Profile | Medium | Medium |
| P2 | Resume Upload | Low | Medium |
| P2 | Email Verify | Low | Low |
| P2 | Settings (future) | — | — |

---

## Color Token Refinements

```css
/* Current primary (light): oklch(0.21 0.04 261.692) — nearly black, harsh */
/* New primary (light): oklch(0.25 0.06 260) — deep navy with character */

/* Accent color — introduce for premium feel */
--accent: oklch(0.55 0.15 250); /* professional blue */
```

## Typography Scale

```css
/* Headings */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.8125rem;  /* 13px */
--text-base: 0.875rem; /* 14px */
--text-lg: 1rem;       /* 16px */
--text-xl: 1.125rem;   /* 18px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 2rem;      /* 32px */

/* Body / UI */
--text-body: 0.875rem;    /* 14px — compact body */
--text-ui: 0.8125rem;     /* 13px — UI labels */
--text-caption: 0.75rem;  /* 12px — captions */
--text-metric: 1.25rem;   /* 20px — metrics/numbers */
```

## Radius Refinements

```css
--radius-sm: 6px;    /* inputs, buttons sm */
--radius-md: 8px;    /* buttons default, badges */
--radius-lg: 12px;   /* cards */
--radius-xl: 16px;   /* modals, drawers */
--radius-2xl: 20px;  /* auth cards, profile cards */
```

---

*This audit was generated on 2026-05-24 as part of Phase 1 of the TalentHub UI redesign project.*
