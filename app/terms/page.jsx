import { siteConfig } from '@/site.config';

export default function TermsPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-bg-alt border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text">
            Terms of Service
          </h1>
          <p className="mt-4 text-base text-text-muted">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 text-sm text-text-muted leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-text mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the {siteConfig.name} website and services, you agree to
                be bound by these Terms of Service. If you do not agree with any part of these
                terms, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">2. Orders &amp; Payments</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>All prices are listed in {siteConfig.currency.code} and include applicable taxes.</li>
                <li>Payment is required at the time of ordering.</li>
                <li>We reserve the right to refuse or cancel any order at our discretion.</li>
                <li>Menu items and pricing are subject to change without notice.</li>
                <li>Seasonal items are available for a limited time and subject to availability.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">3. Pickup Orders</h2>
              <p>
                Orders placed online are for in-store pickup only. Please arrive within the
                selected pickup window. Orders not picked up within 30 minutes of the scheduled
                time may be discarded, and no refund will be issued.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">4. Loyalty Program</h2>
              <p>
                Our loyalty rewards program is offered at our discretion. Points have no cash
                value and cannot be transferred. We reserve the right to modify or discontinue
                the program at any time.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">5. Intellectual Property</h2>
              <p>
                All content on this website — including text, images, logos, and design — is
                the property of {siteConfig.name} and is protected by copyright laws. You may
                not reproduce, distribute, or create derivative works without written permission.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">6. Limitation of Liability</h2>
              <p>
                {siteConfig.name} is not liable for any indirect, incidental, or consequential
                damages arising from the use of our website or services. Our total liability
                is limited to the amount you paid for your most recent order.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">7. Allergens &amp; Dietary</h2>
              <p>
                While we make every effort to accommodate dietary restrictions, our kitchen
                handles common allergens including nuts, dairy, wheat, and soy. We cannot
                guarantee any item is free from allergens. Please inform staff of any allergies
                when ordering.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">8. Changes to Terms</h2>
              <p>
                We may update these terms from time to time. Continued use of our services after
                changes constitutes acceptance of the new terms.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">9. Contact</h2>
              <p>
                Questions about these terms? Email us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
                  {siteConfig.email}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
