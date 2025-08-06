"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

interface MobileMenuProps {
  hasScrolled: boolean
}

export function MobileMenu({ hasScrolled }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    
    <div className="md:hidden relative z-50">
            <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      {/* Backdrop overlay */}

            <button 
        type="button"
        className={`p-2 rounded-full transition-colors ${
          hasScrolled ? 'text-white hover:bg-white/10' : 'text-black hover:bg-black/10'
        }`} 
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Full-width menu panel */}
      <nav 
        className={`fixed left-0 right-0 top-[64px] transform transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none'
        } ${
          hasScrolled ? 'bg-black border-t border-gray-800' : 'bg-white border-t border-gray-100'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/services"
              className={`block py-2 px-3 rounded-lg text-lg transition-colors font-medium ${
                hasScrolled 
                  ? 'text-white hover:text-blue-300 hover:bg-white/10' 
                  : 'text-gray-900 hover:text-blue-600 hover:bg-black/5'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              href="/about"
              className={`block py-2 px-3 rounded-lg text-lg transition-colors font-medium ${
                hasScrolled 
                  ? 'text-white hover:text-blue-300 hover:bg-white/10' 
                  : 'text-gray-900 hover:text-blue-600 hover:bg-black/5'
              }`}
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              href="/spotlight"
              className={`block py-2 px-3 rounded-lg text-lg transition-colors font-medium ${
                hasScrolled 
                  ? 'text-white hover:text-blue-300 hover:bg-white/10' 
                  : 'text-gray-900 hover:text-blue-600 hover:bg-black/5'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Spotlight
            </Link>
            <Link
              href="/careers"
              className={`block py-2 px-3 rounded-lg text-lg transition-colors font-medium ${
                hasScrolled 
                  ? 'text-white hover:text-blue-300 hover:bg-white/10' 
                  : 'text-gray-900 hover:text-blue-600 hover:bg-black/5'
              }`}
              onClick={() => setIsOpen(false)}
            >
              Careers
            </Link>
          </div>
        </div>
      </nav>
    </div>
  )
}
