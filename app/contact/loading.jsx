export default function ContactLoading() {
  return (
    <div className="pt-16">
      {/* Header skeleton */}
      <section className="bg-bg-alt border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="h-10 md:h-14 bg-surface-muted rounded-lg max-w-xs animate-pulse mb-4"></div>
          <div className="h-4 bg-surface-muted rounded max-w-md animate-pulse"></div>
        </div>
      </section>

      {/* Content skeleton */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left column — Hours + Details + Map */}
            <div className="lg:col-span-2 space-y-6">
              {/* Hours card */}
              <div className="bg-surface rounded-xl border border-surface-muted p-5">
                <div className="h-5 bg-surface-muted rounded animate-pulse w-32 mb-4"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                    <div key={i} className="flex justify-between">
                      <div className="h-4 bg-surface-muted rounded animate-pulse w-20"></div>
                      <div className="h-4 bg-surface-muted rounded animate-pulse w-32"></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details card */}
              <div className="bg-surface rounded-xl border border-surface-muted p-5 space-y-4">
                <div className="h-5 bg-surface-muted rounded animate-pulse w-20 mb-2"></div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-5 w-5 bg-surface-muted rounded animate-pulse shrink-0"></div>
                    <div className="h-4 bg-surface-muted rounded animate-pulse w-40"></div>
                  </div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="bg-surface-muted rounded-xl animate-pulse h-56 md:h-64"></div>
            </div>

            {/* Right column — Form */}
            <div className="lg:col-span-3">
              <div className="bg-surface rounded-xl border border-surface-muted p-6 md:p-8">
                <div className="h-6 bg-surface-muted rounded animate-pulse w-48 mb-6"></div>
                <div className="space-y-5">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <div className="h-4 bg-surface-muted rounded animate-pulse w-16 mb-1.5"></div>
                      <div className="h-11 bg-surface-muted rounded-lg animate-pulse w-full"></div>
                    </div>
                  ))}
                  <div>
                    <div className="h-4 bg-surface-muted rounded animate-pulse w-20 mb-1.5"></div>
                    <div className="h-32 bg-surface-muted rounded-lg animate-pulse w-full"></div>
                  </div>
                  <div className="h-12 bg-surface-muted rounded-lg animate-pulse w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
