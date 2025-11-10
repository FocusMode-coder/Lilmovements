'use client'

import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/mwh/ui'

interface SectionProps {
  id?: string
  title?: string
  subtitle?: string
  children?: ReactNode
  bg?: 'default' | 'muted'
  className?: string
}

const fadeInVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.25, 0.25, 1] }
  }
}

export default function Section({ 
  id, 
  title, 
  subtitle, 
  children, 
  bg = 'default',
  className 
}: SectionProps) {
  const backgroundClass = bg === 'muted' ? 'bg-lmv-muted' : ''

  return (
    <section 
      id={id}
      className={cn(
        'py-16 md:py-20 scroll-mt-20',
        backgroundClass,
        className
      )}
    >
      <motion.div
        className="container mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        {/* Title and Subtitle */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-semibold text-lmv-accent mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-lg text-lmv-base/80 max-w-2xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}
        
        {/* Content */}
        {children}
      </motion.div>
    </section>
  )
}