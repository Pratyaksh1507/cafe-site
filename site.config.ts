/**
 * Global site configuration — the single source of truth for all branding.
 * To white-label this for a new client, edit this file + swap the logo.
 */
export const siteConfig = {
  // Brand
  name: 'Artisan',
  tagline: 'Coffee crafted with intention.',
  description:
    'Neighborhood specialty coffee in Brooklyn. Single origin beans, house-made pastries, and a space that feels like it was built for lingering.',

  // Contact
  address: {
    street: '127 Willow Street',
    city: 'Brooklyn',
    state: 'NY',
    zip: '11201',
    country: 'US',
    full: '127 Willow Street, Brooklyn, NY 11201',
    mapsUrl: 'https://maps.google.com/?q=127+Willow+Street+Brooklyn+NY',
  },
  phone: {
    display: '(646) 555-1234',
    href: 'tel:+16465551234',
  },
  email: 'hello@artisancafe.com',

  // Social
  socials: {
    instagram: '@artisan.cafe',
    instagramUrl: 'https://instagram.com',
  },

  // URLs
  url: 'https://artisancafe.com',

  // Feature Flags — toggle features on/off per client
  features: {
    onlineOrdering: true,
    reservations: false,
    loyaltyPoints: false,
    newsletter: true,
    cookieBanner: true,
  },

  // Currency
  currency: {
    symbol: '$',
    code: 'USD',
  },
} as const;

export type SiteConfig = typeof siteConfig;
