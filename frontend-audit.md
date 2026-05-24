# Frontend Audit — TalentHub

**Generated:** Phase 0  
**Scope:** All 38 source files, 2,300+ lines

---

## Critical Bugs

| # | Issue | File | Severity |
|---|-------|------|----------|
| C1 | `useMediaQuery` in Server Component — will crash at runtime | `src/app/jobs/[jobId]/page.tsx:11` | 🔴 CRITICAL |
| C2 | Broken nav links — `/auth/signIn` links to `/signup` (should be `/auth/signup`) and vice versa | `signIn/page.tsx`, `signup/page.tsx` | 🔴 CRITICAL |
| C3 | `NEXT_PUBLIC_JWT_SECRET` exposes secret to client bundle | `middleware.ts`, `.env.local` | 🔴 CRITICAL |
| C4 | Zero `error.tsx` files — `getJobs()` throws raw Error, will crash homepage | all routes | 🔴 CRITICAL |

## Medium Issues

| # | Issue | File |
|---|-------|------|
| M1 | No `loading.tsx` in any route — all loading ad-hoc in client components | all routes |
| M2 | `getJobs` throws Error instead of returning error state — inconsistent | `lib/actions/Job.ts:20` |
| M3 | `AppSchema` defined in `validators/app.ts` but **never used** | `lib/actions/App.ts` |
| M4 | 3x duplicated fetch pattern (useState → useEffect → API) | JobRow, JobAdminList, ApplicationTable |
| M5 | `new Date().toLocaleDateString()` in Server Component — hydration risk | `components/jobs/JobCard.tsx:53` |
| M6 | Dark mode CSS vars defined but no toggle mechanism | `globals.css` |
| M7 | Several `@ts-ignore` and `any` bypass TypeScript safety | 7 locations |
| M8 | `JobRowSkeleton` is unnecessarily Client component | `components/ui/JobRowSkeleton.tsx` |

## Accessibility (WCAG 2.1 AA)

| Requirement | Status | Evidence |
|-------------|--------|----------|
| Semantic HTML | ✅ Good | `<nav>`, `<main>`, `<form>`, `<label>`, `<table>`, `<h1-h3>` all present |
| Lang attribute | ✅ Present | `<html lang="en">` |
| Alt text on images | ✅ Present | Logo has `alt="TalentHub Logo"` |
| Skip-to-content link | ❌ Missing | — |
| Aria attributes | ❌ Missing | Zero `aria-label`, `aria-describedby`, `aria-invalid`, `aria-live` across entire codebase |
| Keyboard navigation | ❌ Partial | No Escape key for modals, no `aria-expanded` on menus |
| Focus management | ❌ Missing | No focus trapping in mobile menu or sidebar |
| Color-only indicators | ❌ Present | Status badges use color alone (green/blue/red) — no icon or text differentiation |
| Form error associations | ❌ Missing | Error `<p>` not linked to inputs via `aria-describedby` |
| Label associations | ❌ Partial | Some `<label>` elements missing `htmlFor` / `id` pairing |

## Responsiveness

| Capability | Status |
|------------|--------|
| Tailwind responsive classes | ✅ Used pervasively (`sm:`, `md:`, `lg:`, `xl:`) |
| `useMediaQuery` for layout switching | ✅ Present (4 files) |
| Mobile-first markup | ✅ Yes |
| Desktop-specific layouts | ✅ Tables on desktop, cards on mobile |
| Loading state responsive | ❌ Some skeleton layouts don't adapt to mobile |

## Server/Client Boundaries

| Category | Files | Notes |
|----------|-------|-------|
| Server components | 7 | Root layout, home, job detail (broken), admin pages |
| Client components | 15 | All with `"use client"` |
| Mixed (BUG) | 1 | `jobs/[jobId]/page.tsx` uses `useMediaQuery` without `"use client"` |

## Hydration Risks

| Risk | File |
|------|------|
| `useMediaQuery` in Server Component | `jobs/[jobId]/page.tsx:11` |
| `new Date().toLocaleDateString()` in Server Component | `JobCard.tsx:53` |

## SEO

| Feature | Status |
|---------|--------|
| Root metadata | ✅ Complete (title, description, OG, Twitter) |
| Per-page metadata | ❌ Missing on all dynamic routes |
| `generateMetadata` | ❌ Not used anywhere |
| Structured data (JSON-LD) | ❌ Missing |
| `robots.txt` / `sitemap.xml` | ❌ Missing |
| Canonical URLs | ❌ Missing |

## Data Fetching

| Pattern | Count | Issues |
|---------|-------|--------|
| Server actions (`useActionState`) | 5 | ✅ Clean form pattern |
| Direct fetch in useEffect | 4 | ❌ No caching, no deduplication |
| AuthContext fetch on mount | 1 | ❌ Runs on every navigation |
| Server component fetch | 1 | ✅ JobCard (async, direct Prisma) |

## Duplicated Logic Inventory

| Pattern | Occurrences | Location |
|---------|------------|----------|
| Skill input (add/remove/hidden) | 3x | PostJob page, ApplyForm |
| Fetch → setState → loading | 3x | JobRow, JobAdminList, ApplicationTable |
| Action toast effect | 5x | SignIn, SignUp, Verify, PostJob, ApplyForm |
| Redirect after auth | 3x | SignIn, Verify, NavBar |
| `useMediaQuery({maxWidth:640})` | 4x | JobDetail(server!), ApplyForm, JobAdminList, ApplicationTable |

## Unused Dependencies

| Package | Reason |
|---------|--------|
| `react-hook-form` | Never imported |
| `@hookform/resolvers` | Never imported |
| `sooner` | Typo of `sonner`, never imported |
| `zod` (v4) | Installed but `AppSchema` never used |

## Security

| Issue | Severity |
|-------|----------|
| `NEXT_PUBLIC_JWT_SECRET` exposed to client | 🔴 |
| `.env.local` committed to repo | 🔴 |
| No CSRF protection visible | 🟡 |
| `console.log(res)` left in production code (`Auth.ts:39`) | 🟡 |

## File Count Summary

| Category | Count |
|----------|-------|
| Pages | 11 |
| API routes | 1 |
| Components | 15 (3 server, 12 client) |
| Context providers | 1 |
| Server actions | 7 |
| Validators | 3 |
| Config files | 8 |
| **Total** | **38 files** |
