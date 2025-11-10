'use client'

import { cn } from '@/lib/mwh/ui'

interface ClassFiltersProps {
  activeTag: string
  onChange: (tag: string) => void
}

const filterTags = [
  { id: 'all', label: 'All' },
  { id: 'strength', label: 'Strength' },
  { id: 'meditation', label: 'Meditation' },
  { id: 'quick', label: 'Quick' },
  { id: 'new', label: 'New' },
]

export default function ClassFilters({ activeTag, onChange }: ClassFiltersProps) {
  return (
    <div 
      role="tablist" 
      className="flex flex-wrap gap-3 mb-8"
      aria-label="Filter classes by category"
    >
      {filterTags.map((tag) => (
        <button
          key={tag.id}
          role="tab"
          aria-selected={activeTag === tag.id}
          aria-controls={`classes-${tag.id}`}
          onClick={() => onChange(tag.id)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2',
            'hover:scale-105',
            activeTag === tag.id
              ? 'bg-lmv-accent text-white shadow-md'
              : 'bg-transparent border border-lmv-base/20 text-lmv-base hover:border-lmv-accent/30 hover:bg-lmv-accent/5'
          )}
        >
          {tag.label}
        </button>
      ))}
    </div>
  )
}