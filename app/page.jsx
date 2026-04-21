import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Coffee, Leaf, Award, MapPin, Star } from 'lucide-react';
import { menuItems, featuredItemIds } from '@/data/menu';
import MenuCard from '@/components/MenuCard';
import HoursDisplay from '@/components/HoursDisplay';
import { FadeIn, StaggerContainer } from '@/components/FadeIn';
import StoreStatusBadge from '@/components/StoreStatusBadge';

export const metadata = {
  title: 'Artisan Cafe | Specialty Coffee in Brooklyn',
  description: 'Neighborhood specialty coffee in Brooklyn. Single origin beans, house-made pastries, and a space that feels like it was built for lingering.',
};

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
    quote: 'The oat latte changed my mornings entirely. Everything here feels intentional — from the pour to the playlist.',
    author: 'Priya M.',
    role: 'Regular since 2019',
    rating: 5,
  },
  {
    quote: 'Best avocado toast in the borough, hands down. And the croissants are unreal.',
    author: 'Marcus T.',
    role: 'Yelp Reviewer',
    rating: 5,
  },
  {
    quote: 'Cozy, clean, and the staff remembers my order. This place is my second office.',
    author: 'Sophia L.',
    role: 'Freelance Designer',
    rating: 5,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">
        {/* Hero background image */}
        <div className="absolute inset-0">
          <Image
            src="/menu-items/3.jpg"
            alt="Artisan coffee being prepared"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          {/* Rich dark overlay so text is always legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a0f08]/85 via-[#1a0f08]/65 to-[#1a0f08]/20" />
          {/* Subtle bottom fade to match page background */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-40">
          <div className="max-w-2xl">
            <FadeIn>
              <div className="mb-6">
                <StoreStatusBadge />
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white leading-[1.05]">
                Coffee crafted<br />
                <span className="text-amber-300">with intention.</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="mt-6 text-lg md:text-xl text-white/80 max-w-lg leading-relaxed">
                Neighborhood specialty coffee in Brooklyn. Single origin beans, house-made
                pastries, and a space that feels like it was built for lingering.
              </p>
            </FadeIn>

            <FadeIn delay={0.45}>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/menu"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-7 py-3.5 text-sm font-semibold text-text shadow-lg transition-all duration-200 hover:bg-amber-50 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                >
                  Order Online
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20"
                >
                  Our Story
                </Link>
              </div>
            </FadeIn>

            {/* Trust indicators */}
            <FadeIn delay={0.6}>
              <div className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3">
                <div className="flex items-center gap-1.5">
                  {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                  <span className="ml-1 text-sm text-white/80">4.9 on Google</span>
                </div>
                <span className="text-white/30 hidden sm:block">|</span>
                <div className="flex items-center gap-2 text-sm text-white/80">
                  <MapPin className="h-4 w-4 text-amber-400" />
                  127 Willow St, Brooklyn
                </div>
                <span className="text-white/30 hidden sm:block">|</span>
                <span className="text-sm text-white/80">Open since 2018</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
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
                <div className="bg-surface rounded-xl border border-surface-muted p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                    <feature.icon className="h-6 w-6 text-accent" />
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

      {/* ── Featured Items ── */}
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

      {/* ── Testimonials ── */}
      <section className="py-16 md:py-24 bg-bg-alt" aria-label="Customer testimonials">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text">
                What People Say
              </h2>
              <div className="mt-3 flex items-center justify-center gap-1.5">
                {[1,2,3,4,5].map(i => <Star key={i} className="h-4 w-4 fill-accent text-accent" />)}
                <span className="ml-1 text-sm text-text-muted">4.9 average across 200+ reviews</span>
              </div>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <FadeIn key={t.author}>
                <blockquote className="bg-surface rounded-xl border border-surface-muted p-6 md:p-8 flex flex-col h-full hover:shadow-md transition-shadow duration-300">
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                    ))}
                  </div>
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

      {/* ── Hours ── */}
      <section className="py-16 md:py-24" aria-label="Opening hours">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-10">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text">
                Drop By
              </h2>
              <p className="mt-2 text-sm text-text-muted">
                We keep hours that match your morning routine.
              </p>
            </div>
          </FadeIn>
          <div className="max-w-lg mx-auto">
            <HoursDisplay variant="full" />
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative py-20 md:py-32 overflow-hidden" aria-label="Call to action">
        <div className="absolute inset-0">
          <Image
            src="/menu-items/5.jpg"
            alt="Coffee being poured"
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#1a0f08]/80" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
              Your next cup is waiting.
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-md mx-auto">
              Walk in, grab a seat, and let us handle the rest.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/menu"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-8 py-4 text-sm font-semibold text-text transition-all duration-200 hover:bg-amber-50 hover:-translate-y-0.5 active:translate-y-0 shadow-lg"
              >
                Order Online
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 backdrop-blur-sm px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-white/20"
              >
                <MapPin className="h-4 w-4" />
                Find Us
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
