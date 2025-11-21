'use client';

import Image from "next/image";
import GlassButton from "@/components/GlassButton";
import Reveal from "@/components/Reveal";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { VideoModal } from './VideoModal';
import Link from 'next/link';

export default function Hero() {
  const { scrollYProgress } = useScroll();
  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, margin: "-50px" });
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Simple parallax effect for logo card
  const logoY = useTransform(scrollYProgress, [0, 1], [0, -30]);

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      y: 25
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.4,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1]
      }
    })
  };

  return (
    <section className="relative py-20 lg:py-32 min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Main Content Container */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          
          {/* Logo with simple parallax */}
          <Reveal>
            <motion.div 
              style={{ y: logoY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm p-8">
                <Image 
                  src="/brand/lilmovements-logo.png" 
                  alt="Lil Movements logo" 
                  width={400} 
                  height={400} 
                  priority
                  sizes="(max-width: 768px) 280px, 380px"
                  className="relative w-auto h-auto max-w-[280px] md:max-w-[380px]"
                />
              </div>
            </motion.div>
          </Reveal>
          
          {/* Title Reveal */}
          <div ref={titleRef} className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm px-10 py-8">
            <div className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 max-w-4xl leading-tight">
              <motion.div
                custom={0}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={titleVariants}
              >
                Move with intention.
              </motion.div>
              <motion.div
                custom={1}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={titleVariants}
              >
                Build mindful strength.
              </motion.div>
            </div>
          </div>
          
          {/* Subtitle */}
          <Reveal delay={0.4}>
            <div className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm p-8 max-w-2xl">
              <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-medium">
                Join Lillian Hahn Shining for transformative movement practices that blend mindfulness, 
                strength, and community in every session.
              </p>
            </div>
          </Reveal>

          {/* CTA Button - Standard styling like other buttons */}
          <Reveal delay={0.6}>
            <Link
              href="/join"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Become a member
            </Link>
          </Reveal>

        </div>
      </div>
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/assets/Lilinteview.mp4"
      />
    </section>
  );
}