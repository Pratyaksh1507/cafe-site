export default function AboutLoading() {
  return (
    <div className="pt-16">
      {/* Hero skeleton */}
      <section className="bg-bg-alt border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="h-10 md:h-14 bg-surface-muted rounded-lg max-w-lg animate-pulse mb-4"></div>
            <div className="h-4 bg-surface-muted rounded max-w-xl animate-pulse mb-2"></div>
            <div className="h-4 bg-surface-muted rounded max-w-md animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Story section skeleton */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <div className="h-8 bg-surface-muted rounded-lg max-w-xs animate-pulse mb-6"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-4 bg-surface-muted rounded animate-pulse" style={{ width: `${85 - i * 5}%` }}></div>
                ))}
              </div>
            </div>
            <div className="aspect-square bg-surface-muted rounded-xl animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Team section skeleton */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-surface-muted rounded-lg max-w-sm mx-auto animate-pulse mb-3"></div>
            <div className="h-4 bg-surface-muted rounded max-w-xs mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-surface rounded-xl border border-surface-muted overflow-hidden">
                <div className="aspect-square bg-surface-muted animate-pulse"></div>
                <div className="p-5 space-y-2">
                  <div className="h-5 bg-surface-muted rounded animate-pulse w-3/4"></div>
                  <div className="h-4 bg-surface-muted rounded animate-pulse w-1/2"></div>
                  <div className="h-3 bg-surface-muted rounded animate-pulse w-full mt-3"></div>
                  <div className="h-3 bg-surface-muted rounded animate-pulse w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
