import Link from 'next/link'

export default function MembershipCTA() {
  return (
    <section className="py-16">
      <div className="container mx-auto">
        <div 
          className="rounded-2xl p-12 md:p-16 text-center"
          style={{ backgroundColor: 'var(--lmv-muted)' }}
        >
          {/* Headline */}
          <h2 className="text-3xl md:text-4xl font-semibold text-lmv-accent mb-4">
            Ready to start your journey?
          </h2>
          
          {/* Supportive copy */}
          <p className="text-lg text-lmv-base/80 mb-8 max-w-2xl mx-auto">
            Join our community and unlock access to premium classes, personalized guidance, and transformative wellness content.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
            <Link 
              href="/registration"
              className="btn-primary text-lg px-8 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2"
              aria-label="Join our membership program"
            >
              Join Now
            </Link>
            <Link 
              href="/login"
              className="btn-ghost text-lg px-8 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2"
              aria-label="Log in to your existing account"
            >
              Log in
            </Link>
          </div>

          {/* Terms line */}
          <p className="text-sm text-lmv-accentQuiet">
            Cancel anytime. <Link 
              href="/mwh-preview#terms" 
              className="underline hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2 rounded"
              aria-label="Read our terms and conditions"
            >Terms apply</Link>.
          </p>
        </div>
      </div>
    </section>
  )
}