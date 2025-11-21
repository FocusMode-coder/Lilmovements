'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollTexture() {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to opacity and position values
  const leftOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 1], [0, 0.3, 0.6, 0.8]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.1, 0.3, 1], [0, 0.2, 0.5, 0.7]);
  const leftY = useTransform(scrollYProgress, [0, 1], [100, -50]);
  const rightY = useTransform(scrollYProgress, [0, 1], [-100, 50]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 1.3]);

  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {/* Left Side Metallic Gold Texture */}
      <motion.div
        className="absolute left-0 top-0 h-full w-96"
        style={{
          opacity: leftOpacity,
          y: leftY,
          scale
        }}
      >
        <div
          className="w-full h-full blur-3xl"
          style={{
            background: `
              radial-gradient(ellipse 400px 800px at -50% 20%, #f7dc88 0%, transparent 70%),
              radial-gradient(ellipse 300px 600px at -30% 60%, #f0b84c 0%, transparent 60%),
              radial-gradient(ellipse 500px 400px at -40% 80%, #fff9e3 0%, transparent 50%),
              linear-gradient(90deg, #f7dc88 0%, transparent 100%)
            `,
            mixBlendMode: 'soft-light'
          }}
        />
      </motion.div>

      {/* Right Side Metallic Gold Texture */}
      <motion.div
        className="absolute right-0 top-0 h-full w-96"
        style={{
          opacity: rightOpacity,
          y: rightY,
          scale
        }}
      >
        <div
          className="w-full h-full blur-3xl"
          style={{
            background: `
              radial-gradient(ellipse 400px 700px at 150% 30%, #f7dc88 0%, transparent 70%),
              radial-gradient(ellipse 350px 500px at 130% 70%, #f0b84c 0%, transparent 60%),
              radial-gradient(ellipse 450px 350px at 140% 90%, #fff9e3 0%, transparent 50%),
              linear-gradient(270deg, #f7dc88 0%, transparent 100%)
            `,
            mixBlendMode: 'soft-light'
          }}
        />
      </motion.div>

      {/* Additional Floating Particles - Only visible on scroll */}
      <motion.div
        className="absolute inset-0"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.2, 1], [0, 0.4, 0.6]) }}
      >
        <motion.div
          className="absolute top-1/4 left-1/4 w-3 h-3 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-100 blur-sm"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -200]),
            opacity: useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
          }}
        />
        <motion.div
          className="absolute top-3/4 right-1/3 w-2 h-2 rounded-full bg-gradient-to-r from-yellow-200 to-yellow-50 blur-sm"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -150]),
            opacity: useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0])
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-4 h-4 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-200 blur-md"
          style={{
            y: useTransform(scrollYProgress, [0, 1], [0, -100]),
            opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.8, 0])
          }}
        />
      </motion.div>
    </div>
  );
}