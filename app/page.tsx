import Link from 'next/link';
import { ArrowRight, Coffee, Leaf, Award, MapPin } from 'lucide-react';
import { menuItems, featuredItemIds } from '@/data/menu';
import { getStoreStatus } from '@/data/hours';
import MenuCard from '@/components/MenuCard';
import HoursDisplay from '@/components/HoursDisplay';
import { FadeIn, StaggerContainer } from '@/components/FadeIn';

const featuredItems = menuItems.filter((item) => featuredItemIds.includes(item.id));

const features = [
  {
    icon: Leaf,
    title: 'Ethically Sourced',
    description: 'Direct trade beans from small farms in Colombia, Ethiopia, and Guatemala.',
  },
  {
    icon: Coffee,
    title: 'Roasted In-House',
    description: 'Small-batch roasting every week for peak freshness and flavor.',
  },
  {
    icon: Award,
    title: 'Award Winning',
    description: 'Recognized by Brooklyn Eats as the best neighborhood cafe two years running.',
  },
];

const testimonials = [
  {
    quote:
      'The oat latte changed my mornings entirely. Everything here feels intentional — from the pour to the playlist.',
    author: 'Priya M.',
    role: 'Regular since 2019',
  },
  {
    quote:
      'Best avocado toast in the borough, hands down. And the croissants are unreal.',
    author: 'Marcus T.',
    role: 'Yelp Reviewer',
  },
  {
    quote:
      'Cozy, clean, and the staff remembers my order. This place is my second office.',
    author: 'Sophia L.',
    role: 'Freelance Designer',
  },
];

// Category-based icon map for visual menu cards
const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'coffee':
      return Coffee;
    case 'drinks':
      return Leaf;
    case 'food':
      return Award;
    case 'seasonal':
      return Leaf;
    default:
      return Coffee;
  }
};

const getCategoryColors = (category: string) => {
  switch (category) {
    case 'coffee':
      return 'from-amber-700 to-amber-900';
    case 'drinks':
      return 'from-emerald-700 to-emerald-900';
    case 'food':
      return 'from-orange-600 to-orange-800';
    case 'seasonal':
      return 'from-rose-600 to-rose-800';
    default:
      return 'from-stone-600 to-stone-800';
  }
};

export default function HomePage() {
  const status = getStoreStatus();

  return (
    <div className="min-h-dvh">
      {/* Hero */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center">
        {/* Light warm background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-bg to-stone-100" />
        <div className="absolute inset-0 opacity-[0.03]" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}} />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="mb-6">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium ${
                    status.isOpen
                      ? 'bg-emerald-500/15 text-emerald-700'
                      : 'bg-red-500/15 text-red-700'
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      status.isOpen ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  {status.text}
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-text leading-[1.1]">
                Coffee crafted
                <br />
                <span className="text-accent">with intention.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-6 text-lg md:text-xl text-text-muted max-w-xl leading-relaxed">
                Neighborhood specialty coffee in Brooklyn. Single origin beans, house-made
                pastries, and a space that feels like it was built for lingering.
              </p>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-text px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-text/10 transition-all duration-150 hover:bg-text/90 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  Explore the Menu
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-surface-muted bg-surface px-7 py-3.5 text-sm font-medium text-text transition-all duration-150 hover:bg-bg-alt hover:border-text/20"
                >
                  <MapPin className="h-4 w-4" />
                  Visit Us
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 md:py-24 bg-bg-alt" aria-label="Why we stand out">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text">
                Why People Stay
              </h2>
              <p className="mt-3 text-base text-text-muted max-w-lg mx-auto">
                More than a cup. Every detail is considered.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {features.map((feature) => (
              <FadeIn key={feature.title}>
                <div
                  className="bg-surface rounded-xl border border-surface-muted p-6 md:p-8 transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <feature.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text">{feature.title}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-16 md:py-24" aria-label="Featured menu items">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text">
                  Crowd Favorites
                </h2>
                <p className="mt-2 text-sm text-text-muted">What keeps people coming back.</p>
              </div>
              <Link
                href="/menu"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
              >
                View full menu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <FadeIn key={item.id}>
                <MenuCard item={item} priority={true} />
              </FadeIn>
            ))}
          </StaggerContainer>

          <div className="mt-8 text-center md:hidden">
            <Link
              href="/menu"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-light transition-colors"
            >
              View full menu
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-bg-alt" aria-label="Testimonials">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text">
                What People Say
              </h2>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <FadeIn key={t.author}>
                <blockquote
                  className="bg-surface rounded-xl border border-surface-muted p-6 md:p-8 flex flex-col h-full"
                >
                  <p className="text-sm text-text-muted leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 pt-4 border-t border-surface-muted">
                    <p className="text-sm font-semibold text-text">{t.author}</p>
                    <p className="text-xs text-text-light">{t.role}</p>
                  </footer>
                </blockquote>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Hours CTA */}
      <section className="py-16 md:py-24" aria-label="Opening hours">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text">
              Drop By
            </h2>
            <p className="mt-2 text-sm text-text-muted">
              We keep hours that match your morning routine.
            </p>
          </div>
          <div className="max-w-lg mx-auto">
            <HoursDisplay variant="full" />
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-text text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
              Your next cup is waiting.
            </h2>
            <p className="mt-4 text-base text-white/70 max-w-md mx-auto">
              Walk in, grab a seat, and let us handle the rest.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-medium text-text transition-all duration-150 hover:bg-white/90 hover:-translate-y-0.5 active:translate-y-0"
              >
                See What&apos;s Brewing
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-transparent px-7 py-3.5 text-sm font-medium text-white transition-all duration-150 hover:bg-white/10"
              >
                Get in Touch
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
