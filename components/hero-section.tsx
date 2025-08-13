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

          {/* Right Content - Speech Bubbles */}
          <div className="relative animate-on-load opacity-0 w-full h-96">
            <svg className="w-full h-full animate-float" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 768">
              {/* First bubble: Exact shape as third bubble, but blue and top-right */}
              <path fill="#006ADF" transform="translate(-664, -588)" d="M664 588h180c37 0 68 30 68 68v68c0 22-22 34-44 34 14-15 14-32 14-32H732c-37 0-68-30-68-68v-70z"/>
              
              {/* Large central-left overlapping speech bubble (light blue) */}
              <path fill="#C5F1FF" d="M0 234h486c55 0 100 45 100 100v122H486c55 0 100 45 100 100v122H486c-9 40-32 62-32 62s88 0 101-62H136c-55 0-100-45-100-100V436h94c-55 0-100-45-100-100V234z"/>
              
              {/* Small bottom-right speech bubble (black) */}
              <path fill="#000" d="M664 588h180c37 0 68 30 68 68v68c0 22-22 34-44 34 14-15 14-32 14-32H732c-37 0-68-30-68-68v-70z"/>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
