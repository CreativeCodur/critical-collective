"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Sparkles } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/directory", label: "Directory" },
  { href: "/scholarships", label: "Scholarships" },
  { href: "/campus-life", label: "Campus Life" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1a3a]/90 backdrop-blur-sm border-b border-white/10">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Sparkles className="w-8 h-8 text-[#a2c8ff]" />
            <span className="text-3xl font-bold text-white font-['Pacifico']">Varsity</span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-[#a2c8ff] ${
                  pathname === item.href ? "text-[#a2c8ff] border-b-2 border-[#a2c8ff] pb-1" : "text-white/80"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
