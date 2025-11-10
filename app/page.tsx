import Hero from "@/components/Hero";
import FloatingImage from "@/components/FloatingImage";
import GlowCard from "@/components/GlowCard";
import Reveal from "@/components/Reveal";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Additional Content Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-6">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Why Choose Lil Movements?</h2>
              <p className="text-neutral-600 max-w-2xl mx-auto">
                Experience movement that goes beyond the physical – discover practices that nurture 
                your entire being through mindful, intentional movement.
              </p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <Reveal delay={0.2}>
              <FloatingImage 
                src="/assets/Lily_BIO_picture.png"
                alt="Lily demonstrating movement"
                width={500}
                height={400}
                float={8}
                speed={0.15}
              />
            </Reveal>
            
            <Reveal delay={0.4}>
              <div className="space-y-6">
                <GlowCard className="transform hover:scale-105">
                  <h3 className="font-semibold text-lg mb-2">🧘‍♀️ Mindful Practice</h3>
                  <p className="text-neutral-600">
                    Every movement is an opportunity to connect with your breath and inner awareness.
                  </p>
                </GlowCard>
                
                <GlowCard className="transform hover:scale-105">
                  <h3 className="font-semibold text-lg mb-2">💪 Functional Strength</h3>
                  <p className="text-neutral-600">
                    Build strength that serves you in daily life through intelligent movement patterns.
                  </p>
                </GlowCard>
                
                <GlowCard className="transform hover:scale-105">
                  <h3 className="font-semibold text-lg mb-2">🤝 Supportive Community</h3>
                  <p className="text-neutral-600">
                    Join a welcoming community committed to growth, wellness, and mutual support.
                  </p>
                </GlowCard>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}