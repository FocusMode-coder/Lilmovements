export const metadata = {
  title: "Community Guidelines · Lil Movements",
  robots: { index: true },
};

export default function CommunityGuidelinesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-neutral-800 space-y-6">
      <h1 className="text-base font-semibold mb-4">Community Guidelines</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">1. Respectful Communication</h2>
        <p>
          Treat all community members with respect and kindness. No harassment, discrimination, or hate speech
          based on race, gender, religion, sexual orientation, or any other characteristic.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">2. Body Positivity</h2>
        <p>
          Our community celebrates all bodies and movement abilities. Avoid body shaming, comparison, or
          negative comments about appearance. Focus on encouragement and support.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">3. No Spam or Self-Promotion</h2>
        <p>
          Keep discussions relevant to movement and wellness. No unsolicited advertising, affiliate links,
          or promotion of competing services without prior approval.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">4. Privacy & Safety</h2>
        <p>
          Protect your own and others' privacy. Don't share personal information like addresses or phone numbers.
          Report any concerning behavior to our moderation team.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">5. Medical Advice</h2>
        <p>
          Community members should not provide medical advice. Always consult healthcare professionals for
          medical concerns or injuries related to movement practice.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">6. Intellectual Property</h2>
        <p>
          Respect copyrights and trademarks. Don't share or distribute Lil Movements content outside the platform.
          Credit original creators when sharing external content.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">7. Violations & Enforcement</h2>
        <p>
          Violations may result in warnings, temporary suspension, or permanent ban from community features.
          Decisions are made at our discretion to maintain a positive environment.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Contact</h2>
        <p>
          Report issues or questions about community guidelines to{" "}
          <a href="mailto:community@lilmovements.com" className="underline underline-offset-2">
            community@lilmovements.com
          </a>
        </p>
      </section>
    </main>
  );
}