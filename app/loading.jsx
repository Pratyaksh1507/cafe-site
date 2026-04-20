export default function Loading() {
  return (
    <div className="pt-16 min-h-screen">
      {/* Hero skeleton */}
      <section className="relative min-h-[70vh] bg-bg-alt flex items-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full py-24">
          <div className="max-w-2xl">
            <div className="h-12 md:h-16 bg-surface-muted rounded-lg max-w-lg animate-pulse mb-4"></div>
            <div className="h-12 md:h-16 bg-surface-muted rounded-lg max-w-md animate-pulse mb-6"></div>
            <div className="h-5 bg-surface-muted rounded max-w-xl animate-pulse mb-2"></div>
            <div className="h-5 bg-surface-muted rounded max-w-md animate-pulse mb-8"></div>
            <div className="flex gap-4">
              <div className="h-12 w-36 bg-surface-muted rounded-lg animate-pulse"></div>
              <div className="h-12 w-28 bg-surface-muted rounded-lg animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured items skeleton */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 bg-surface-muted rounded-lg max-w-xs mx-auto animate-pulse mb-3"></div>
            <div className="h-4 bg-surface-muted rounded max-w-md mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-surface rounded-xl border border-surface-muted overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] bg-surface-muted animate-pulse"></div>
                <div className="p-3 sm:p-4 flex flex-col flex-1 gap-2 sm:gap-3">
                  <div className="h-4 sm:h-5 bg-surface-muted rounded animate-pulse w-3/4"></div>
                  <div className="h-3 sm:h-4 bg-surface-muted rounded animate-pulse w-full"></div>
                  <div className="mt-auto pt-3">
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
