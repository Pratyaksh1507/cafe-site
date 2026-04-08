import { siteConfig } from '@/site.config';

export default function PrivacyPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <section className="bg-bg-alt border-b border-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-text">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base text-text-muted">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-stone">
          <div className="space-y-8 text-sm text-text-muted leading-relaxed">
            <div>
              <h2 className="text-lg font-semibold text-text mb-3">1. Information We Collect</h2>
              <p>
                When you use {siteConfig.name}&apos;s website or place an order, we may collect:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Name, email address, and phone number when you create an account or place an order</li>
                <li>Payment information processed securely through our third-party payment provider</li>
                <li>Order history and preferences</li>
                <li>Device information and cookies for a better browsing experience</li>
                <li>Messages you send through our contact form</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and updates</li>
                <li>Respond to your questions and requests</li>
                <li>Improve our website and services</li>
                <li>Send promotional emails (only if you opt in via our newsletter)</li>
                <li>Operate our loyalty rewards program</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">3. Information Sharing</h2>
              <p>
                We do not sell your personal information. We share data only with:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Payment processors to complete transactions</li>
                <li>Email services to send order confirmations and newsletters</li>
                <li>Analytics tools to improve site performance</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">4. Cookies</h2>
              <p>
                We use essential cookies to keep you logged in and remember your cart.
                We also use analytics cookies to understand how visitors interact with our site.
                You can disable cookies in your browser settings at any time.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">5. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>Access the personal data we hold about you</li>
                <li>Request correction or deletion of your data</li>
                <li>Opt out of marketing emails at any time</li>
                <li>Request a copy of your data in a portable format</li>
              </ul>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">6. Data Security</h2>
              <p>
                We use industry-standard encryption and security measures to protect your
                information. Payment data is handled entirely by our PCI-compliant payment
                processor and never touches our servers.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-text mb-3">7. Contact Us</h2>
              <p>
                If you have questions about this policy, reach us at{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-accent hover:underline">
                  {siteConfig.email}
                </a>{' '}
                or visit us at {siteConfig.address.full}.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
