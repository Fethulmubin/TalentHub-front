import { Suspense } from "react";
import JobCard from "./components/jobs/JobCard";
import JobCardSkeleton from "./components/ui/JobCardSkeleton";
import JobFilterPanel from "./components/jobs/JobFilterPanel";
import HeroActions from "./components/home/HeroActions";
import { Sparkles, Briefcase, Zap, Shield } from "lucide-react";

interface HomeProps {
  searchParams: Promise<{ search?: string; skill?: string }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const { search, skill } = await searchParams;
  return (
    <div className="min-h-screen bg-surface">
      <section className="border-b border-border bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-24 text-center">
          <div className="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent ring-1 ring-accent/20">
            <Sparkles size={22} />
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-balance leading-[1.05] text-foreground">
            Find your next opportunity
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Discover roles from top companies, apply with your AI-analyzed resume, and track every application.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {[
              { icon: Briefcase, label: "500+ companies hiring" },
              { icon: Zap, label: "AI-matched roles" },
              { icon: Shield, label: "Free to apply" },
            ].map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5 rounded-full bg-gray-50 border border-gray-200 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
                <item.icon size={12} className="text-accent" />
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={null}>
        <HeroActions />
      </Suspense>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 lg:py-10">
        <JobFilterPanel />
        <Suspense fallback={
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, idx) => (<JobCardSkeleton key={idx} />))}
          </div>
        }>
          <JobCard search={search} skill={skill} />
        </Suspense>
      </section>
    </div>
  );
}
