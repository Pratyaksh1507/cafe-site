import Link from 'next/link';
import { ArrowRight, Heart, Users, Globe, Sparkles } from 'lucide-react';
import HoursDisplay from '@/components/HoursDisplay';
import { FadeIn, StaggerContainer } from '@/components/FadeIn';

const values = [
  {
    icon: Heart,
    title: 'Quality First',
    description:
      'We source from farms that pay living wages and process with care. Every cup reflects that standard.',
  },
  {
    icon: Globe,
    title: 'Community Roots',
    description:
      'We sponsor block events, stock the lending library, and keep the WiFi password on the door.',
  },
  {
    icon: Users,
    title: 'People Over Scale',
    description:
      'We stayed one shop by choice. We want to know your name, not just your order number.',
  },
  {
    icon: Sparkles,
    title: 'Continuous Craft',
    description:
      'Our baristas train together, cup new micro-lots weekly, and push each other to be better.',
  },
];

const team = [
  {
    name: 'Elena Vasquez',
    role: 'Founder & Head Roaster',
    bio: 'Former architect turned coffee obsessive. Sources beans from 12 countries and roasts them in a 6-kilo mill just off our bar.',
  },
  {
    name: 'James Okonkwo',
    role: 'Head Barista',
    bio: 'Went from regular to head barista in two years. Known for latte art that people photograph before drinking.',
  },
  {
    name: 'Mei-Lin Chen',
    role: 'Pastry Chef',
    bio: 'Trained at the Culinary Institute, fell in love with sourdough. Every pastry is made from scratch before 6am.',
  },
  {
    name: 'Dev Patel',
    role: 'Operations',
    bio: 'Former project manager who runs the backend — scheduling, inventory, and making sure the espresso machine never goes down.',
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="bg-bg-alt border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <FadeIn>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text">
                Not your average coffee shop.
              </h1>
              <p className="mt-4 text-base text-text-muted max-w-xl leading-relaxed">
                We opened Artisan in 2018 with a simple idea: a cafe that makes you
                pause, not rush. Everything we do still runs on that.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24" aria-label="Our story">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <FadeIn direction="right">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text">
                  The Story
                </h2>
                <div className="mt-6 space-y-4 text-sm text-text-muted leading-relaxed">
                  <p>
                    Artisan started as a cart at the Brooklyn Flea. Elena was roasting beans
                    in a garage and pouring out of a van on weekends. Word spread faster
                    than anyone expected.
                  </p>
                  <p>
                    After six months of lines around the block, we signed a lease on this
                    corner on Willow Street. We rebuilt the interior ourselves — sanded
                    floors, installed the bar, hung the lights.
                  </p>
                  <p>
                    Today, we serve from the same spot with the same team. We roast in
                    small batches, source from the producers we&apos;ve met in person, and
                    close at 6pm most nights because our people deserve evenings off.
                  </p>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <div className="aspect-square bg-gradient-to-br from-surface-muted to-bg rounded-xl flex items-center justify-center">
                <span className="text-text-light text-sm">Brooklyn, 2018</span>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24 bg-bg-alt" aria-label="Our values">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text">
                What We Believe
              </h2>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <FadeIn key={value.title}>
                <div
                  className="bg-surface rounded-xl border border-surface-muted p-6 transition-shadow duration-200 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <value.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-text">{value.title}</h3>
                  <p className="mt-2 text-sm text-text-muted leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24" aria-label="Our team">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text">
                The People Behind the Bar
              </h2>
              <p className="mt-2 text-sm text-text-muted max-w-md mx-auto">
                Four people who care way too much about coffee.
              </p>
            </div>
          </FadeIn>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <FadeIn key={member.name}>
                <div
                  className="bg-surface rounded-xl border border-surface-muted overflow-hidden h-full"
                >
                  <div className="aspect-[3/3] bg-gradient-to-br from-surface-muted to-bg flex items-center justify-center">
                    <span className="text-text-light text-sm">{member.name}</span>
                  </div>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-text">{member.name}</h3>
                    <p className="text-sm text-accent font-medium mt-0.5">{member.role}</p>
                    <p className="mt-3 text-sm text-text-muted leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* CTAS & Hours */}
      <section className="py-16 md:py-24 bg-bg-alt">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <FadeIn direction="right">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text">
                  Come grab a cup.
                </h2>
                <p className="mt-3 text-sm text-text-muted leading-relaxed max-w-md">
                  We&apos;d love to meet you. First-timers always get a free pastry with any
                  drink — just mention you&apos;re new here.
                </p>
                <div className="mt-6 flex gap-4">
                  <Link
                    href="/menu"
                    className="inline-flex items-center gap-2 rounded-lg bg-text px-6 py-3 text-sm font-medium text-white transition-all duration-150 hover:bg-text/90 hover:-translate-y-0.5"
                  >
                    See the Menu
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 rounded-lg border border-surface-muted bg-surface px-6 py-3 text-sm font-medium text-text transition-all duration-150 hover:bg-bg-alt"
                  >
                    Find Us
                  </Link>
                </div>
              </div>
            </FadeIn>
            <FadeIn direction="left">
              <HoursDisplay variant="compact" />
            </FadeIn>
          </div>
        </div>
      </section>
    </div>
  );
}
