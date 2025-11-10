// TODO: Add sizes prop to Image component for responsive loading optimization
// TODO: Add focus-visible styles to Link button for keyboard navigation

import Image from 'next/image'
import Link from 'next/link'
import { displayInstructor } from '../../lib/instructors'

interface ClassCardProps {
  title: string
  coach: string
  duration: string
  tag: string
  thumbnailSrc: string
}

export default function ClassCard({ title, coach, duration, tag, thumbnailSrc }: ClassCardProps) {
  const instructorName = displayInstructor(coach)
  
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
      {/* Thumbnail with fixed 16:9 aspect ratio */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={thumbnailSrc}
          alt={`${title} class with ${instructorName}`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      
      {/* Card Content */}
      <div className="p-6">
        {/* Tag Badge */}
        <div className="mb-3">
          <span className="inline-block px-3 py-1 text-xs font-medium text-lmv-accentQuiet bg-lmv-muted rounded-full uppercase tracking-wide">
            {tag}
          </span>
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-semibold text-lmv-accent mb-2 leading-tight">
          {title}
        </h3>
        
        {/* Coach and Duration */}
        <div className="flex items-center justify-between text-sm text-lmv-accentQuiet mb-4">
          <span>with {instructorName}</span>
          <span>{duration}</span>
        </div>
        
        {/* Start Now Button */}
        <Link 
          href="/login" 
          className="btn-primary w-full inline-block text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2"
          aria-label={`Start ${title} class with ${instructorName}`}
        >
          Start Now
        </Link>
      </div>
    </div>
  )
}