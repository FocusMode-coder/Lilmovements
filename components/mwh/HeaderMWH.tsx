// TODO: Add keyboard navigation - mobile menu should close with Escape key
// TODO: Add keyboard support for Enter/Space on mobile menu toggle
// TODO: Ensure buttons have accessible names for screen readers

'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import Image from "next/image"

function SiteBrand() {
  return (
    <Link href="/" aria-label="Lil Movements — Home" className="flex items-center gap-2 flex-shrink-0">
      <Image
        src="/brand/lilmovements-logo.png"
        alt="Lil Movements logo"
        width={32}
        height={32}
        priority
      />
      <span className="text-lg sm:text-xl font-semibold tracking-tight text-lmv-accent whitespace-nowrap">
        Lil Movements
      </span>
    </Link>
  )
}

export default function HeaderMWH() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsScrolled(!entry.isIntersecting)
      },
      { threshold: 1.0 }
    )

    // Create a sentinel element at the top of the page
    const sentinel = document.createElement('div')
    sentinel.style.height = '1px'
    sentinel.style.position = 'absolute'
    sentinel.style.top = '0'
    sentinel.style.left = '0'
    sentinel.style.pointerEvents = 'none'
    document.body.insertBefore(sentinel, document.body.firstChild)

    observer.observe(sentinel)

    // Add Escape key listener for mobile menu
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      observer.disconnect()
      document.removeEventListener('keydown', handleKeyDown)
      if (document.body.contains(sentinel)) {
        document.body.removeChild(sentinel)
      }
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleKeyToggle = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleMenu()
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-lmv-bg border-b border-lmv-muted shadow-soft' 
          : 'bg-lmv-bg/80 backdrop-blur-sm'
      }`}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between h-16 min-w-0">
          {/* Left: Brand Logo + Title - Always visible, never collapses */}
          <div className="flex items-center flex-shrink-0">
            <SiteBrand />
          </div>

          {/* Center: Navigation - Hidden on mobile */}
          <nav className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            <a 
              href="/mwh-preview" 
              className="text-lmv-base hover:text-lmv-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2 rounded-md px-2 py-1"
            >
              Home
            </a>
            <a 
              href="/mwh-preview#classes" 
              className="text-lmv-base hover:text-lmv-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2 rounded-md px-2 py-1"
            >
              Classes
            </a>
            <a 
              href="/mwh-preview#nutrition" 
              className="text-lmv-base hover:text-lmv-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2 rounded-md px-2 py-1"
            >
              Nutrition
            </a>
            <a 
              href="/mwh-preview#shop" 
              className="text-lmv-base hover:text-lmv-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2 rounded-md px-2 py-1"
            >
              Shop
            </a>
            <a 
              href="/mwh-preview#about" 
              className="text-lmv-base hover:text-lmv-accent transition-colors font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2 rounded-md px-2 py-1"
            >
              About
            </a>
          </nav>

          {/* Right: Desktop Actions + Mobile Menu Button */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Desktop Actions - Hidden on mobile */}
            <div className="hidden md:flex items-center space-x-3">
              <button className="btn-ghost" aria-label="Log in to your account">Log in</button>
              <button className="btn-primary" aria-label="Join our membership program">Join</button>
            </div>

            {/* Mobile menu button - Always visible on mobile, aligned right */}
            <button
              className="md:hidden p-2 text-lmv-base hover:text-lmv-accent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2 rounded-md"
              onClick={toggleMenu}
              onKeyDown={handleKeyToggle}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            id="mobile-menu"
            className="md:hidden py-4 border-t border-lmv-muted"
          >
            <nav className="flex flex-col space-y-1">
              <a 
                href="/mwh-preview" 
                className="text-lmv-base hover:text-lmv-accent hover:bg-lmv-muted/50 transition-colors font-medium px-4 py-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a 
                href="/mwh-preview#classes" 
                className="text-lmv-base hover:text-lmv-accent hover:bg-lmv-muted/50 transition-colors font-medium px-4 py-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Classes
              </a>
              <a 
                href="/mwh-preview#nutrition" 
                className="text-lmv-base hover:text-lmv-accent hover:bg-lmv-muted/50 transition-colors font-medium px-4 py-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Nutrition
              </a>
              <a 
                href="/mwh-preview#shop" 
                className="text-lmv-base hover:text-lmv-accent hover:bg-lmv-muted/50 transition-colors font-medium px-4 py-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Shop
              </a>
              <a 
                href="/mwh-preview#about" 
                className="text-lmv-base hover:text-lmv-accent hover:bg-lmv-muted/50 transition-colors font-medium px-4 py-3 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lmv-accent focus-visible:ring-offset-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              
              <div className="flex flex-col space-y-2 pt-4 px-4">
                <button className="btn-ghost text-left" aria-label="Log in to your account">Log in</button>
                <button className="btn-primary text-left" aria-label="Join our membership program">Join</button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}