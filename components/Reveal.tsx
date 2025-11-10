"use client";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";

export default function Reveal({ children, delay=0, y=20 }: PropsWithChildren<{delay?:number; y?:number;}>) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}