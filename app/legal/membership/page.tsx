export const metadata = {
  title: "Membership Terms · Lil Movements",
  robots: { index: true },
};

export default function MembershipTermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-neutral-800 space-y-6">
      <h1 className="text-base font-semibold mb-4">Membership Terms</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Plans & Auto-Renewal</h2>
        <p>
          <strong>All membership subscriptions automatically renew each billing cycle until cancelled.</strong> Monthly 
          memberships renew every 30 days, and annual memberships renew every 365 days from your initial subscription date. 
          You authorize us to charge your payment method for recurring fees until you cancel.
        </p>
        <p>
          Subscription fees are charged in advance of each billing period. You will receive email confirmation of successful 
          charges and renewal dates.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Free Trials</h2>
        <p>
          New users may be eligible for a free trial period as specified during registration (typically 7-14 days). 
          <strong>Free trials automatically convert to paid subscriptions unless cancelled before the trial end date.</strong> 
          You must provide valid payment information to start a trial.
        </p>
        <p>
          To cancel during your free trial, access your account settings or contact{" "}
          <a href="mailto:membership@lilmovements.com" className="underline underline-offset-2">
            membership@lilmovements.com
          </a>{" "}
          before your trial expires. Free trials are limited to one per user and household.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Billing & Payment Processing</h2>
        <p>
          All payments are processed securely through Stripe. We accept major credit cards and other payment methods 
          supported by Stripe. <strong>You are responsible for all applicable taxes, fees, and currency conversion charges</strong> 
          that may apply to your subscription.
        </p>
        <p>
          <strong>Failed Payments:</strong> If your payment fails, we will attempt to charge your payment method several 
          times over the following days. Continued payment failures may result in subscription suspension or cancellation. 
          You remain responsible for any unpaid amounts.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Cancellations</h2>
        <p>
          <strong>You may cancel your subscription at any time through your account settings or by contacting us.</strong> 
          Cancellations take effect at the end of your current billing period - you will retain access until that date. 
          We do not provide partial refunds for unused portions of your subscription period unless required by law.
        </p>
        <p>
          After cancellation, you will lose access to premium content and features but may retain access to any free 
          content we offer. Your account data will be retained according to our{" "}
          <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a>.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Refund Policy</h2>
        <p>
          <strong>Refunds are provided only where required by applicable law or at our sole discretion.</strong> As our 
          digital services are delivered continuously and accessed on-demand, subscription fees are generally 
          non-refundable once charged.
        </p>
        <p>
          We may consider refund requests in exceptional circumstances such as technical issues preventing service access, 
          billing errors, or other circumstances at our discretion. All refund requests must be submitted within 30 days 
          of the charge.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Price Changes</h2>
        <p>
          <strong>We reserve the right to modify subscription prices with advance notice.</strong> Current subscribers 
          will be notified at least 30 days before any price increases take effect. Continued use of the service after 
          price changes constitutes acceptance of the new pricing.
        </p>
        <p>
          You may cancel your subscription before price changes take effect if you do not agree to the new pricing. 
          Annual subscribers are generally protected from price increases until their next renewal date.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Promotions & Coupons</h2>
        <p>
          Promotional offers, discounts, and coupon codes are non-transferable, cannot be combined with other offers, 
          and may be discontinued at any time without notice. Promotional pricing may revert to standard rates after 
          the promotional period ends.
        </p>
        <p>
          We reserve the right to limit, modify, or terminate promotional offers and to verify eligibility requirements. 
          Misuse of promotional codes may result in account suspension.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Account Sharing Prohibition</h2>
        <p>
          <strong>Sharing account credentials or simultaneous access from multiple households is strictly prohibited.</strong> 
          Your membership is for personal use only and may not be shared with family members, friends, or others outside 
          your household.
        </p>
        <p>
          We monitor account usage patterns and may suspend or terminate accounts that violate sharing restrictions. 
          Suspected account sharing may result in immediate service suspension without refund.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Chargebacks & Payment Abuse</h2>
        <p>
          <strong>Initiating chargebacks or payment disputes for valid charges may result in immediate account suspension.</strong> 
          We reserve the right to pursue collection of disputed amounts and may terminate services for payment abuse, 
          suspected fraud, or misuse of payment systems.
        </p>
        <p>
          Contact us directly to resolve billing disputes before initiating chargebacks with your payment provider. 
          Accounts terminated for payment abuse may be permanently banned from creating new subscriptions.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Account Termination by Us</h2>
        <p>
          We may suspend or terminate your membership immediately for violations of our{" "}
          <a href="/terms" className="underline underline-offset-2">Terms of Service</a>, payment issues, or other 
          circumstances at our discretion. Terminated accounts are not eligible for refunds except where required by law.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Data & Content Access</h2>
        <p>
          Upon subscription termination, you will lose access to premium content, downloads, and member-only features. 
          We do not guarantee availability of content for download or offline access after termination.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Related Policies</h2>
        <p>
          These membership terms are incorporated into our{" "}
          <a href="/terms" className="underline underline-offset-2">Terms of Service</a> and should be read 
          alongside our <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a>. 
          By subscribing, you agree to all applicable terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Contact</h2>
        <p>
          Membership, billing, or cancellation questions? Contact{" "}
          <a href="mailto:membership@lilmovements.com" className="underline underline-offset-2">
            membership@lilmovements.com
          </a>
        </p>
      </section>
    </main>
  );
}