export const metadata = {
  title: "DMCA Takedown Policy · Lil Movements",
  robots: { index: true },
};

export default function DMCAPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-neutral-800 space-y-6">
      <h1 className="text-base font-semibold mb-4">DMCA Takedown Policy</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">1. Copyright Respect</h2>
        <p>
          <strong>Lil Movements</strong> respects intellectual property rights and complies with the Digital
          Millennium Copyright Act (DMCA). We will respond promptly to valid takedown notices.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">2. Filing a DMCA Notice</h2>
        <p>If you believe your copyrighted work has been infringed, provide the following information:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Your contact information (name, address, phone, email)</li>
          <li>Description of the copyrighted work being infringed</li>
          <li>Location of the infringing material on our platform</li>
          <li>Statement of good faith belief that use is unauthorized</li>
          <li>Statement that the information is accurate under penalty of perjury</li>
          <li>Physical or electronic signature of the copyright owner or authorized agent</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">3. Designated Agent</h2>
        <p>
          Send DMCA notices to our designated agent:{" "}
          <a href="mailto:dmca@lilmovements.com" className="underline underline-offset-2">
            dmca@lilmovements.com
          </a>
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">4. Counter-Notification</h2>
        <p>
          If you believe content was removed in error, you may file a counter-notification including your
          contact information, identification of removed content, and a statement under penalty of perjury
          that removal was a mistake.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">5. Repeat Infringers</h2>
        <p>
          We will terminate accounts of users who are repeat copyright infringers in accordance with our
          <a href="/terms" className="underline underline-offset-2">Terms of Service</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">6. False Claims</h2>
        <p>
          Submitting false DMCA notices may result in liability for damages, attorney fees, and other costs.
          Only submit notices if you have a good faith belief that content infringes your rights.
        </p>
      </section>
    </main>
  );
}