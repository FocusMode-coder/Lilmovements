'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function GoldenEdgeLines() {
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress to height (line drawing effect)
  const leftHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);
  const rightHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 0.7, 0.9, 0.5]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {/* Left Golden Edge Line */}
      <motion.div
        className="absolute left-0 top-0 w-1"
        style={{
          height: leftHeight,
          opacity,
          filter: 'blur(2.5px)',
          background: `linear-gradient(to bottom, 
            transparent 0%, 
            #f7e9b4 15%, 
            #f1c05b 35%,
            #d89d2b 65%, 
            #f1c05b 85%,
            transparent 100%)`
        }}
      />
      
      {/* Right Golden Edge Line */}
      <motion.div
        className="absolute right-0 top-0 w-1"
        style={{
          height: rightHeight,
          opacity,
          filter: 'blur(2.5px)',
          background: `linear-gradient(to bottom, 
            transparent 0%, 
            #f7e9b4 15%, 
            #f1c05b 35%,
            #d89d2b 65%, 
            #f1c05b 85%,
            transparent 100%)`
        }}
      />
    </div>
  );
}