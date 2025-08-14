"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const elements = heroRef.current?.querySelectorAll(".animate-on-load")
    elements?.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("animate-fade-in-up")
      }, index * 200)
    })
  }, [])

  // Smooth scroll to services section
  const handleLearnMoreClick = () => {
    const servicesSection = document.getElementById("services")
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: "smooth", block: "start" })
    } else {
      // If services section is not found, scroll to services by offset as fallback
      const yOffset = window.innerHeight // Approximate height of hero section
      window.scrollTo({ top: yOffset, behavior: "smooth" })
    }
  }

  return (
    <section ref={heroRef} className="bg-white py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h1 className="text-6xl lg:text-8xl font-bold text-black mb-8 leading-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              <span className="block animate-on-load opacity-0">Critical Collective</span>
              <span className="block animate-on-load opacity-0 text-3xl font-semibold" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Youth-Led. Truth-Driven.
              </span>
              <span className="block animate-on-load opacity-0 text-3xl font-semibold" style={{ color: 'white', fontFamily: 'DM Sans, sans-serif' }}>
                Careers
              </span>
            </h1>

            <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-md animate-on-load opacity-0" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
              We are a youth-led think tank dedicated to fostering free and critical thinking in the face of widespread disinformation. Truth is a public good, and challenging false narratives requires bold, independent analysis grounded in integrity and curiosity.
            </p>

            <div className="animate-on-load opacity-0">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white rounded-full px-8 py-3 bg-transparent"
                style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}
                onClick={handleLearnMoreClick}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Logo */}
          <div className="relative animate-on-load opacity-0 w-full h-96 flex items-center justify-center">
            <img src="/icons/critical-collective-logo.svg" alt="Critical Collective" className="w-64 h-64 animate-float" />
          </div>
        </div>
      </div>
    </section>
  )
}
