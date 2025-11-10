export const metadata = {
  title: "Health & Safety Guidelines · Lil Movements",
  robots: { index: true },
};

export default function HealthGuidelinesPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 text-sm leading-7 text-neutral-800 space-y-6">
      <h1 className="text-base font-semibold mb-4">Health & Safety Guidelines</h1>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Medical Disclaimer</h2>
        <p>
          <strong>Our content and classes are for informational and educational purposes only and are not medical advice.</strong> 
          The information provided is not a substitute for professional medical diagnosis, treatment, or consultation. 
          Lil Movements is not a healthcare provider and is not a HIPAA-covered entity.
        </p>
        <p>
          Always consult with qualified healthcare professionals before beginning any exercise program, especially if you have 
          pre-existing medical conditions, injuries, or health concerns. Do not disregard professional medical advice or 
          delay seeking treatment based on content from our platform.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Assumption of Risk</h2>
        <p>
          <strong>You understand and acknowledge that movement and fitness activities involve inherent risks</strong> including, 
          but not limited to, muscle strains, sprains, fractures, cardiac episodes, and other injuries or medical conditions. 
          By participating in our classes and programs, you voluntarily assume all such risks, whether known or unknown.
        </p>
        <p>
          You acknowledge that your participation is entirely voluntary and that you are physically and mentally capable 
          of participating in the activities. You understand that no exercise program can guarantee specific results 
          or freedom from injury.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Release & Waiver of Liability</h2>
        <p>
          <strong>To the maximum extent permitted by law, you hereby release, waive, and discharge Lil Movements, 
          its instructors, employees, and affiliates from any and all liability for injuries, damages, or losses</strong> 
          arising from your participation in our programs, except where prohibited by applicable law.
        </p>
        <p>
          This release applies to all claims, including those arising from negligence (but not gross negligence or 
          intentional misconduct where prohibited). You agree not to sue and to indemnify us against claims brought 
          by others on your behalf.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Safety Rules & Requirements</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>Medical clearance:</strong> Consult a physician before beginning any exercise program</li>
          <li><strong>Stop immediately</strong> if you experience pain, dizziness, shortness of breath, chest pain, or any discomfort</li>
          <li><strong>Proper environment:</strong> Ensure adequate space, appropriate flooring, and good ventilation</li>
          <li><strong>Equipment safety:</strong> Use proper equipment and inspect it before each use</li>
          <li><strong>No impairment:</strong> Do not participate under the influence of alcohol, drugs, or medications that impair coordination</li>
          <li><strong>Hydration:</strong> Stay properly hydrated before, during, and after exercise</li>
          <li><strong>Listen to your body:</strong> Modify or skip movements that don't feel appropriate for you</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Minors & Parental Consent</h2>
        <p>
          Participants must be at least 13 years old. <strong>Users under 18 must have explicit parent or guardian consent 
          before participating.</strong> Parents/guardians assume all responsibility and liability for minors' participation 
          and must ensure proper supervision and adherence to safety guidelines.
        </p>
        <p>
          Children under 13 are not permitted to use our services in compliance with COPPA regulations.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Medical Emergencies</h2>
        <p>
          <strong>In case of medical emergency, call local emergency services immediately (911 in the US).</strong> 
          Do not rely on our platform for emergency medical assistance. We are not equipped to provide emergency 
          medical services or advice.
        </p>
        <p>
          If you experience persistent pain or injury after participating in our programs, seek appropriate medical 
          attention from qualified healthcare providers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Pregnancy & Special Conditions</h2>
        <p>
          Pregnant individuals and those with chronic medical conditions (heart disease, diabetes, arthritis, etc.) 
          must obtain explicit medical clearance before participation. Modifications may be necessary, and you are 
          responsible for ensuring activities are appropriate for your condition.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Platform Limitations</h2>
        <p>
          Our instructors cannot see you during virtual classes and cannot provide real-time safety corrections 
          or medical assistance. You are solely responsible for your safety, proper form, and recognizing your limits.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Related Policies</h2>
        <p>
          This Health & Safety disclaimer is incorporated into our{" "}
          <a href="/terms" className="underline underline-offset-2">Terms of Service</a> and should be read 
          in conjunction with our <a href="/privacy" className="underline underline-offset-2">Privacy Policy</a>. 
          By using our services, you agree to all applicable terms.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-sm font-semibold">Contact</h2>
        <p>
          Health and safety questions or concerns? Contact{" "}
          <a href="mailto:safety@lilmovements.com" className="underline underline-offset-2">
            safety@lilmovements.com
          </a>
        </p>
      </section>
    </main>
  );
}