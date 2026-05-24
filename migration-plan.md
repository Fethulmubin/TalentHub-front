# Migration Plan — Frontend

## Phase 1: Design System Upgrade (Current)

| Step | File | Change |
|------|------|--------|
| 1.1 | `src/app/globals.css` | Enhanced typography scale, richer dark mode tokens, motion tokens |
| 1.2 | `src/components/system/button.tsx` | Premium Button with variants, sizes, loading state, icon support |
| 1.3 | `src/components/system/card.tsx` | Card with header, body, footer, hover effects, variants |
| 1.4 | `src/components/system/modal.tsx` | Modal with overlay, ESC close, focus trap, animations |
| 1.5 | `src/components/system/drawer.tsx` | Slide-in drawer, ESC close, backdrop |
| 1.6 | `src/components/system/dialog.tsx` | Alert/confirm dialog with role="alertdialog" |
| 1.7 | `src/components/system/tooltip.tsx` | Tooltip with delay, positioning |
| 1.8 | `src/components/system/progress.tsx` | Progress bar with indeterminate mode |
| 1.9 | `src/components/system/badge.tsx` | Badge with variants, sizes |
| 1.10 | `src/components/system/command.tsx` | Command palette (Cmd+K) with search |
| 1.11 | `src/components/system/sidebar.tsx` | Enhanced sidebar with nav groups, collapsible |
| 1.12 | `src/components/system/split-pane.tsx` | Resizable split pane |
| 1.13 | `src/components/system/timeline.tsx` | Vertical timeline for application status |
| 1.14 | `src/components/system/skeleton.tsx` | Enhanced skeletons with variants |
| 1.15 | `src/components/system/empty-state.tsx` | Empty state with icon, title, description, action |
| 1.16 | `src/components/system/retry-state.tsx` | Error + retry state component |
| 1.17 | `src/components/system/error-boundary.tsx` | React error boundary wrapper |
| 1.18 | `src/components/system/toaster.tsx` | Enhanced global toaster with position control |
| 1.19 | `src/components/system/page-transition.tsx` | Page transition wrapper with fade/slide |
| 1.20 | `src/components/system/index.ts` | Barrel exports |
| 1.21 | `src/hooks/use-keyboard.ts` | Keyboard shortcut hook |
| 1.22 | `src/hooks/use-media-query.ts` | Fixed useMediaQuery (safe for SSR) |

## Phase 2: Component Refactor (Future)

| Step | Change |
|------|--------|
| 2.1 | Consolidate 3x fetch patterns into custom `useFetch` hook |
| 2.2 | Consolidate 3x skill input components into shared `SkillInput` component |
| 2.3 | Add `loading.tsx` to all route segments |
| 2.4 | Add `error.tsx` to all route segments |
| 2.5 | Replace manual loading states with Suspense boundaries |

## Phase 3: Bug Fixes (Future)

| Step | Change |
|------|--------|
| 3.1 | Fix `/jobs/[jobId]` — wrap in client component or move useMediaQuery |
| 3.2 | Fix auth nav links — `/auth/signIn` → `/auth/signup` and vice versa |
| 3.3 | Rename `NEXT_PUBLIC_JWT_SECRET` to `JWT_SECRET` in middleware |
| 3.4 | Fix `getJobs` to return error state instead of throwing |
| 3.5 | Use `AppSchema` in `ApplyForJob` server action |

## Phase 4: SEO & Performance (Future)

| Step | Change |
|------|--------|
| 4.1 | Add `generateMetadata` to all dynamic routes |
| 4.2 | Add `robots.txt` and `sitemap.xml` |
| 4.3 | Add JSON-LD structured data |
| 4.4 | Add ISR/revalidate to server component fetches |

## Phase 5: Testing (Future)

| Step | Change |
|------|--------|
| 5.1 | Set up Vitest + Testing Library |
| 5.2 | Write unit tests for all system components |
| 5.3 | Write integration tests for auth flow |
| 5.4 | E2E tests with Playwright |
