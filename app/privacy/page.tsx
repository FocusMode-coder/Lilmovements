export const metadata = {
  title: "Privacy Policy · Lil Movements",
  robots: { index: true },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-neutral-800 space-y-6">
      <h1 className="text-base font-semibold mb-4">Privacy Policy</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">1. Information We Collect</h2>
        <p>We collect information you provide directly and automatically through your use of our services:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Account information (name, email, password)</li>
          <li>Payment information (processed securely by Stripe)</li>
          <li>Usage data (pages visited, time spent, interactions)</li>
          <li>Device information (browser type, IP address, operating system)</li>
          <li>Cookies and tracking technologies</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">2. How We Use Your Information</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Provide and improve our movement classes and services</li>
          <li>Process payments and manage subscriptions</li>
          <li>Send service updates and marketing communications</li>
          <li>Analyze usage patterns and optimize user experience</li>
          <li>Prevent fraud and ensure platform security</li>
          <li>Comply with legal obligations</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">3. Third-Party Services</h2>
        <p>We use trusted third-party services that may collect and process your data:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li><a href="https://policies.google.com/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Google Analytics</a> - Website analytics and user behavior</li>
          <li><a href="https://www.facebook.com/policy.php" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Meta Pixel</a> - Advertising and retargeting on Facebook/Instagram</li>
          <li><a href="https://www.tiktok.com/legal/page/global-privacy-policy/en" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">TikTok Pixel</a> - Advertising and analytics on TikTok</li>
          <li><a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">Stripe</a> - Payment processing and subscription management</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">4. Cookies & Tracking</h2>
        <p>
          We use cookies and similar technologies for functionality, analytics, and marketing. You can manage
          your preferences through our cookie banner. For details, see our{" "}
          <a href="/cookies" className="underline underline-offset-2">Cookie Policy</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">5. Data Sharing</h2>
        <p>We may share your information with:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Service providers who help operate our platform</li>
          <li>Payment processors for transaction handling</li>
          <li>Analytics and advertising partners (with your consent)</li>
          <li>Legal authorities when required by law</li>
        </ul>
        <p>We do not sell your personal information to third parties.</p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">6. Data Security</h2>
        <p>
          We implement appropriate security measures to protect your information, including encryption,
          secure servers, and regular security audits. However, no method of transmission is 100% secure.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">7. Your Rights</h2>
        <p>Depending on your location, you may have the right to:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Delete your account and data</li>
          <li>Withdraw consent for processing</li>
          <li>Data portability</li>
          <li>Object to certain processing activities</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">8. Data Retention</h2>
        <p>
          We retain your information as long as your account is active or as needed to provide services.
          We may retain certain data for legal compliance, fraud prevention, or legitimate business purposes.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">9. International Transfers</h2>
        <p>
          Your information may be processed in countries other than your residence. We ensure appropriate
          safeguards are in place for international data transfers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">10. Children's Privacy</h2>
        <p>
          Our services are not intended for children under 13. We do not knowingly collect personal
          information from children under 13.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">11. Policy Updates</h2>
        <p>
          We may update this policy periodically. We will notify you of material changes via email
          or prominent notice on our website.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">12. Contact Us</h2>
        <p>
          Questions or legal inquiries? Email us at{" "}
          <a href="mailto:legal@lilmovements.com" className="underline underline-offset-2">
            legal@lilmovements.com
          </a>.
        </p>
      </section>
    </main>
  );
}