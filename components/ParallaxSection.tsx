"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { PropsWithChildren, useRef } from "react";

export default function ParallaxSection({ children }: PropsWithChildren) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0,1], ["0%", "-30%"]); // background drift

  return (
    <section ref={ref} className="relative overflow-hidden min-h-[80vh] flex items-center">
      <motion.div style={{ y: bgY }} className="absolute inset-0 bg-gradient-to-b from-white to-neutral-100" />
      <div className="relative z-10 container mx-auto px-6">{children}</div>
    </section>
  );
}