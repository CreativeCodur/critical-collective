"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Story" },
  { href: "/products", label: "Collection" },
  { href: "/contact", label: "Connect" },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-light text-neutral-900 tracking-wide">
            Langer
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm tracking-wide transition-colors duration-500 ${
                  pathname === item.href ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-900"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-neutral-600 hover:text-neutral-900 transition-colors duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-8 pt-8 border-t border-neutral-200">
            <div className="space-y-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block text-lg transition-colors duration-500 ${
                    pathname === item.href ? "text-neutral-900" : "text-neutral-600 hover:text-neutral-900"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
