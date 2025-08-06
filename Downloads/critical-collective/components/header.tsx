"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MobileMenu } from "./mobile-menu"

export function Header() {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 relative ${
      hasScrolled ? 'bg-black' : 'bg-white'
    }`}>
      {/* Gradient line */}
      <div className={`absolute bottom-0 left-0 w-full h-[2px] transition-opacity duration-300 ${
        hasScrolled ? 'opacity-100' : 'opacity-70'
      }`}>
        <div className={`w-full h-full transition-all duration-300 ${
          hasScrolled 
            ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500' 
            : 'bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500'
        }`} />
      </div>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className={`rounded px-5 py-1 text-sm font-bold transition-colors flex items-center gap-4 group ${
              hasScrolled 
                ? 'border-white text-white hover:bg-white hover:text-black' 
                : 'border-black text-black hover:bg-black hover:text-white'
            }`} style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.25rem' }}>
              <img 
                src="/icons/e6ab6a17-6a98-498e-95df-0697cc6d7145.png" 
                alt="Critical Collective Logo" 
                className={`transition-all ${hasScrolled ? 'group-hover:invert-0 invert ' : 'group-hover:invert'}`}
                style={{ width: 75, height: 75 }} 
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/services" className={`transition-colors font-medium ${
              hasScrolled ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'
            }`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              Services
            </Link>
            <Link href="/about" className={`transition-colors font-medium ${
              hasScrolled ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'
            }`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              About
            </Link>
            <Link href="/spotlight" className={`transition-colors font-medium ${
              hasScrolled ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'
            }`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              Spotlight
            </Link>
            <Link href="/careers" className={`transition-colors font-medium ${
              hasScrolled ? 'text-white hover:text-blue-300' : 'text-gray-900 hover:text-blue-600'
            }`} style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
              Careers
            </Link>
          </nav>

          <MobileMenu hasScrolled={hasScrolled} />
        </div>
      </div>
    </header>
  )
}
