'use client';

import { useState } from 'react';
import Hero from "@/components/Hero";
import GlassButton from "@/components/GlassButton";
import ContactForm from "@/components/ContactForm";
import VideoModal from "@/components/VideoModal";
import Reveal from "@/components/Reveal";

export default function Page() {
  const [isLilyVideoOpen, setIsLilyVideoOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Featured Elements Section */}
        <section id="features" className="py-16 lg:py-24">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-6">
                Core Elements
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Discover the transformative elements that make our movement practice unique
              </p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Movement</h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Intentional movement patterns that build strength while honoring your body's natural wisdom.
                </p>
                <GlassButton 
                  label="Watch Lily's Background Video" 
                  onClick={() => setIsLilyVideoOpen(true)}
                  variant="secondary" 
                />
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Breath</h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Conscious breathing techniques that anchor you in the present moment and fuel your practice.
                </p>
                <GlassButton label="Explore" variant="secondary" />
              </div>
            </Reveal>
            
            <Reveal delay={0.3}>
              <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-8 text-center">
                <h3 className="text-2xl font-semibold mb-4 text-neutral-900">Music</h3>
                <p className="text-neutral-600 leading-relaxed mb-6">
                  Carefully curated soundscapes that enhance your movement journey and deepen connection.
                </p>
                <GlassButton label="Explore" variant="secondary" />
              </div>
            </Reveal>
          </div>
        </section>

        {/* Daily Toolbox Section */}
        <section className="py-16 lg:py-24">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-6">
                Daily Toolbox
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Practical tools and practices designed to integrate seamlessly into your daily life
              </p>
            </div>
          </Reveal>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Reveal delay={0.1}>
              <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Morning Activations</h3>
                <p className="text-neutral-600 leading-relaxed">
                  5-15 minute sequences to awaken your body and set positive intentions for the day.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.2}>
              <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Midday Resets</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Quick movement breaks to release tension and restore energy during busy days.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.3}>
              <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Evening Unwind</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Gentle practices to help you transition from day to night with ease and grace.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.4}>
              <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Strength Building</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Progressive movement sequences that build functional strength mindfully.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.5}>
              <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Flexibility Flow</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Dynamic and static stretching routines to maintain mobility and ease.
                </p>
              </div>
            </Reveal>
            
            <Reveal delay={0.6}>
              <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">
                <h3 className="text-xl font-semibold mb-4 text-neutral-900">Mindful Moments</h3>
                <p className="text-neutral-600 leading-relaxed">
                  Breathing exercises and meditation practices for mental clarity and calm.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-16 lg:py-24 text-center">
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-6">
                Ready to Begin?
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 mb-12 leading-relaxed">
                Join our community and start your journey with mindful movement practices 
                designed to strengthen your body and nourish your spirit.
              </p>
              <GlassButton 
                label="Become a Member" 
                href="/join" 
                variant="primary"
                className="text-lg px-10 py-5"
              />
            </div>
          </Reveal>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 mb-6">
                Stay connected.
              </h2>
              <p className="text-lg md:text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                Have questions about membership, classes, or need support? We're here to help you on your movement journey.
              </p>
            </div>
          </Reveal>
          
          <Reveal delay={0.2}>
            <ContactForm />
          </Reveal>
        </section>

      </main>

      {/* Video Modal */}
      <VideoModal
        isOpen={isLilyVideoOpen}
        onClose={() => setIsLilyVideoOpen(false)}
        src="/assets/lilys-backgroundweb.mp4"
        title="Lily's Background"
      />
    </div>
  );
}