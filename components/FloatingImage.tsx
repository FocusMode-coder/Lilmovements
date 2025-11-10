"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  float?: number;      // subtle up/down pixels
  speed?: number;      // parallax intensity
  className?: string;
  priority?: boolean;
};

export default function FloatingImage({
  src, alt, width=640, height=640, float=10, speed=0.2, className="", priority
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * 60, -speed * 60]); // parallax
  const floatY = useTransform(scrollYProgress, [0, 0.5, 1], [ -float, 0, float ]);

  return (
    <motion.div ref={ref} style={{ y }} className={className} aria-hidden="false">
      <motion.div
        animate={{ translateY: [ -float, float, -float ] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image src={src} alt={alt} width={width} height={height} priority={priority}
               className="w-full h-auto select-none pointer-events-none will-change-transform" />
      </motion.div>
    </motion.div>
  );
}