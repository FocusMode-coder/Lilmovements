'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import { VideoModal } from './VideoModal';
import Link from 'next/link';

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  // Standardized fade-in animation - consistent with other components
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  // Staggered children for sequential reveals
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const staggerItem = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section className="relative py-20 lg:py-32 min-h-screen flex items-center justify-center bg-white overflow-hidden">
      {/* Main Content Container */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto"
        >
          
          {/* Logo */}
          <motion.div 
            variants={staggerItem}
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
          
          {/* Title */}
          <motion.div 
            variants={staggerItem}
            className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm px-10 py-8"
          >
            <div className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-neutral-900 max-w-4xl leading-tight">
              <div>Move with intention.</div>
              <div>Build mindful strength.</div>
            </div>
          </motion.div>
          
          {/* Subtitle */}
          <motion.div
            variants={staggerItem}
            className="rounded-3xl bg-white/60 backdrop-blur-md border border-white/70 shadow-sm p-8 max-w-2xl"
          >
            <p className="text-lg md:text-xl text-neutral-700 leading-relaxed font-medium">
              Join Lillian Hahn Shining for transformative movement practices that blend mindfulness, 
              strength, and community in every session.
            </p>
          </motion.div>

          {/* CTA Button - Standardized styling */}
          <motion.div variants={staggerItem}>
            <Link
              href="/join"
              className="bg-white text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Become a member
            </Link>
          </motion.div>

        </motion.div>
      </div>
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoSrc="/assets/Lilinteview.mp4"
      />
    </section>
  );
}