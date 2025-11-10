export const metadata = {
  title: "Cookie Policy · Lil Movements",
  robots: { index: true },
};

export default function CookiePolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-neutral-800 space-y-6">
      <h1 className="text-base font-semibold mb-4">Cookie Policy</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">1. What Are Cookies</h2>
        <p>
          Cookies are small text files stored on your device when you visit our website. They help us remember
          your preferences and provide analytics to improve our services.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">2. Types of Cookies We Use</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Essential cookies:</strong> Required for basic website functionality</li>
          <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
          <li><strong>Marketing cookies:</strong> Used for targeted advertising and retargeting</li>
          <li><strong>Preference cookies:</strong> Remember your settings and choices</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">3. Third-Party Cookies</h2>
        <p>We use cookies from trusted partners including:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Google Analytics for website analytics</li>
          <li>Meta Pixel for Facebook advertising</li>
          <li>TikTok Pixel for TikTok advertising</li>
          <li>Stripe for payment processing</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">4. Managing Cookies</h2>
        <p>
          You can control cookies through our consent banner or your browser settings. Note that disabling
          certain cookies may affect website functionality.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">5. Contact & Updates</h2>
        <p>
          This policy may be updated periodically. For detailed information about data processing,
          see our <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a>.
        </p>
        <p>
          Questions about cookies? Contact{" "}
          <a href="mailto:privacy@lilmovements.com" className="underline underline-offset-2">
            privacy@lilmovements.com
          </a>
        </p>
      </section>
    </main>
  );
}