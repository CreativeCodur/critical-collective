"use client"

import { Menu, X } from "lucide-react"
import { useState } from "react"

interface MobileMenuButtonProps {
  hasScrolled: boolean
}

export function MobileMenuButton({ hasScrolled }: MobileMenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return {
    isOpen,
    button: (
      <button 
        type="button"
        className={`${hasScrolled ? 'text-white' : 'text-black'}`} 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    )
  }
}
