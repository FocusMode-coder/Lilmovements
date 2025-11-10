import ParallaxSection from "@/components/ParallaxSection";
import FloatingImage from "@/components/FloatingImage";
import GlowCard from "@/components/GlowCard";
import Scene3D from "@/components/Scene3D";
import Reveal from "@/components/Reveal";
import Image from "next/image";

export default function Hero() {
  return (
    <ParallaxSection>
      <div className="relative flex flex-col items-center gap-10 py-24">
        {/* Main Logo - Using Next/Image with correct brand path */}
        <Reveal>
          <Image 
            src="/brand/lilmovements-logo.png" 
            alt="Lil Movements logo" 
            width={560} 
            height={560} 
            priority
            className="w-auto h-auto max-w-md"
          />
        </Reveal>
        
        <Reveal delay={0.3}>
          <h1 className="text-4xl md:text-6xl font-bold text-center max-w-4xl">
            Move with intention. <br />
            <span className="text-neutral-600">Build mindful strength.</span>
          </h1>
        </Reveal>
        
        <Reveal delay={0.5}>
          <p className="text-lg text-neutral-600 text-center max-w-2xl">
            Join Lillian Hahn Shining for transformative movement practices that blend mindfulness, 
            strength, and community in every session.
          </p>
        </Reveal>

        <Reveal delay={0.7}>
          <a href="/join" className="btn-primary">
            Become a Member
          </a>
        </Reveal>

        {/* Feature Cards with Glow Effect */}
        <Reveal delay={0.9}>
          <div className="grid md:grid-cols-3 gap-6 mt-8 w-full max-w-5xl">
            <GlowCard>
              <h3 className="font-semibold mb-2 text-lg">Daily Toolbox</h3>
              <p className="text-sm text-neutral-600">
                Short, focused practices designed to fit seamlessly into your day.
              </p>
            </GlowCard>
            <GlowCard>
              <h3 className="font-semibold mb-2 text-lg">Mindful Strength</h3>
              <p className="text-neutral-600">
                Build physical strength while cultivating mental clarity and balance.
              </p>
            </GlowCard>
            <GlowCard>
              <h3 className="font-semibold mb-2 text-lg">Community</h3>
              <p className="text-neutral-600">
                Move together with Lillian and a supportive community of practitioners.
              </p>
            </GlowCard>
          </div>
        </Reveal>

        {/* 3D Interactive Section */}
        <Reveal delay={1.1}>
          <div className="mt-16 w-full max-w-5xl">
            <h2 className="text-2xl font-semibold text-center mb-8">
              Immersive Movement Experience
            </h2>
            <Scene3D />
          </div>
        </Reveal>
      </div>
    </ParallaxSection>
  );
}