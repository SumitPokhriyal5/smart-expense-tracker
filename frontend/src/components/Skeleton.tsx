export function SkeletonCard({ height = "h-28" }: { height?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-800 ${height}`}
    >
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 dark:via-white/5 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div className="grid gap-4 sm:grid-cols-4">
        <SkeletonCard height="h-24" />
        <SkeletonCard height="h-24" />
        <SkeletonCard height="h-24" />
        <SkeletonCard height="h-24" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SkeletonCard height="h-80" />
        <SkeletonCard height="h-80" />
      </div>
    </div>
  );
}
