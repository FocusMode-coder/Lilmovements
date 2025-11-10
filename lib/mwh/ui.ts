import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function buttonVariants({ variant }: { variant: 'primary' | 'ghost' }): string {
  const baseClasses = 'px-5 py-2 rounded-2xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'
  
  switch (variant) {
    case 'primary':
      return `${baseClasses} bg-lmv-accent text-white hover:bg-lmv-accent/90 focus-visible:ring-lmv-accent`
    case 'ghost':
      return `${baseClasses} bg-transparent border border-lmv-base/15 text-lmv-base hover:bg-lmv-base/5 focus-visible:ring-lmv-base`
    default:
      return baseClasses
  }
}