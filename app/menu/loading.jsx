export default function MenuLoading() {
  return (
    <div className="pt-16">
      {/* Header skeleton — matches the real page header */}
      <section className="bg-bg-alt border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="h-10 md:h-14 bg-surface-muted rounded-lg max-w-xs animate-pulse mb-4"></div>
          <div className="h-4 bg-surface-muted rounded max-w-md animate-pulse"></div>
        </div>
      </section>

      {/* Filter bar skeleton */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-3 mb-8 overflow-hidden">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="h-9 w-20 sm:w-24 bg-surface-muted rounded-full animate-pulse shrink-0"
              ></div>
            ))}
          </div>

          {/* Menu card grid skeleton */}
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-surface rounded-xl border border-surface-muted overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-surface-muted animate-pulse"></div>
                <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2 sm:gap-3">
                  <div className="flex justify-between gap-2">
                    <div className="h-4 sm:h-5 bg-surface-muted rounded animate-pulse w-3/4"></div>
                    <div className="h-4 sm:h-5 bg-surface-muted rounded animate-pulse w-12 shrink-0"></div>
                  </div>
                  <div className="h-3 sm:h-4 bg-surface-muted rounded animate-pulse w-full"></div>
                  <div className="h-3 sm:h-4 bg-surface-muted rounded animate-pulse w-2/3 hidden sm:block"></div>
                  <div className="flex gap-1.5 mt-1">
                    <div className="h-5 w-12 bg-surface-muted rounded-full animate-pulse"></div>
                    <div className="h-5 w-10 bg-surface-muted rounded-full animate-pulse"></div>
                  </div>
                  <div className="mt-auto pt-3 sm:pt-4">
                    <div className="h-9 sm:h-10 bg-surface-muted rounded-lg animate-pulse w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
