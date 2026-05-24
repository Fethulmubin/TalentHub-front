# Component Map — TalentHub

## Layout Tree

```
RootLayout (server)
├── AuthProvider (client)          ← wraps entire app
│   ├── NavBar (client)
│   │   ├── Image (TalentHub Logo)
│   │   ├── Link[] (nav items)
│   │   ├── MobileMenu (conditional)
│   │   │   └── Button[]
│   │   └── UserDropdown (conditional)
│   │       └── LogoutBtn (client)
│   └── children (page content)
│       ├── Sidebar (client)       ← admin/[userId]/layout only
│       └── <Page />
└── Toaster (sonner)
```

## Component Dependency Graph

```
                    ┌─────────────┐
                    │  JobCard     │  (server, uses getJobs)
                    │  Skeleton   │  (server, no deps)
                    └──────┬──────┘
                           │
┌──────────────────────────┼──────────────────────────┐
│                          │                          │
▼                          ▼                          ▼
JobFilterPanel         JobRow (client)          ApplyForm (client)
(client)               ├── useAuth()             ├── useActionState
├── useSearchParams    ├── getAppById            ├── useMediaQuery
├── useState           ├── JobRowSkeleton        ├── useState (skills)
└── useRouter          └── dayjs format          └── sonner toast

         ┌─────────────────────┐
         │   ApplicationTable  │  (client)
         │   ├── getAppByJobId │
         │   ├── changeStatus  │
         │   ├── JobRowSkeleton│
         │   ├── dayjs format  │
         │   └── useMediaQuery │
         └─────────────────────┘

         ┌─────────────────────┐
         │   JobAdminList      │  (client)
         │   ├── getJobByUserId│
         │   ├── JobRowSkeleton│
         │   ├── dayjs format  │
         │   └── useMediaQuery │
         └─────────────────────┘
```

## Route → Component Mapping

| Route | Page Component | Child Components | Server/Client |
|-------|----------------|------------------|---------------|
| `/` | `page.tsx` (async) | `<Suspense>` → `<JobCard>` + `<JobCardSkeleton>`, `<JobFilterPanel>` | Server |
| `/auth/signIn` | `auth/signIn/page.tsx` | form + inputs + `Link` to signup | Client |
| `/auth/signup` | `auth/signup/page.tsx` | form + inputs + role radio + `Link` to signin | Client |
| `/auth/verify` | `auth/verify/page.tsx` | OTP input form | Client |
| `/jobs/[jobId]` | `jobs/[jobId]/page.tsx` | `<ApplyForm>` | **Broken** (server w/ client hook) |
| `/apps/[userId]` | `apps/[userId]/page.tsx` | `<JobRow>` | Server → Client |
| `/admin/[userId]` | `admin/[userId]/page.tsx` | stateless dashboard | Server |
| `/admin/[userId]/jobs` | `admin/[userId]/jobs/page.tsx` | `<JobAdminList>` | Server → Client |
| `/admin/[userId]/jobs/post` | `admin/[userId]/jobs/post/page.tsx` | job form + skill input | Client |
| `/admin/[userId]/apps/[jobId]` | `admin/[userId]/apps/[jobId]/page.tsx` | `<ApplicationTable>` | Server → Client |

## Data Flow

```
Form Submission (useActionState)
  → Server Action (lib/actions/*.ts)
    → fetch() to backend API
      → Response { status, message, errors }
    ← Returns state to form
  → useEffect on [state] shows toast / redirects

Page Load (server component)
  → Server action function called directly
    → fetch() to backend API
  → Renders HTML

Auth State
  AuthProvider (client)
    → fetchUser() on mount
      → GET /api/auth (proxied to backend)
    → user object passed via useAuth() hook
  → Middleware (server) reads cookie for route protection
```

## Loading State Coverage

| Component | Has Loading? | Type | Coverage |
|-----------|-------------|------|----------|
| JobCard | ✅ Yes | Suspense + Skeleton | Initial data fetch |
| JobRow | ✅ Yes | Manual useState | Data fetch |
| JobAdminList | ✅ Yes | Manual useState | Data fetch |
| ApplicationTable | ✅ Yes | Manual useState | Data fetch |
| ApplyForm | ✅ Yes | useActionState isPending | Submission |
| SignIn form | ✅ Yes | useActionState isPending | Submission |
| SignUp form | ✅ Yes | useActionState isPending | Submission |
| Verify form | ✅ Yes | useActionState isPending | Submission |
| PostJob form | ✅ Yes | useActionState isPending | Submission |
| LogoutBtn | ✅ Yes | useState | Logout action |
| NavBar | ✅ Yes | useState | Logout action |
| All other pages | ❌ No | — | — |

## Error State Coverage

| Component | Has Error? | Type | Coverage |
|-----------|-----------|------|----------|
| All forms | ✅ Yes | Inline validation + toast | Zod errors + server errors |
| All fetchers | ✅ Yes | try-catch return | Network errors |
| Route tree | ❌ No error.tsx | — | All routes have zero error boundaries |
| JobCard (home) | ❌ No | — | `getJobs` throws uncaught Error |

## Empty State Coverage

| Component | Has Empty? | Message |
|-----------|-----------|---------|
| Home (`/`) | ❌ No | Shows nothing if no jobs |
| JobRow (my apps) | ✅ Yes | "You haven't applied to any jobs yet." |
| JobAdminList | ✅ Yes | "You haven't posted any jobs yet." |
| ApplicationTable | ✅ Yes | "No applications have been submitted yet." |
| Search results | ❌ No | No empty state for no matches |
