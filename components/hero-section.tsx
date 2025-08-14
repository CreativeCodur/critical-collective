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
              We are a youth-led think tank dedicated to fostering productive conversations by enabling free and critical thought through the analysis of perspectives from both sides of the political spectrum. We seek to find the truth from our analysis – forming our own perspective and defining our own solutions to today's most pressing issues.
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

          {/* Right Content - Cloud Thought Bubbles */}
          <div className="relative animate-on-load opacity-0 w-full h-96">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
              {/* Large pink cloud */}
              <g transform="translate(30,50) scale(2.2)">
                <ellipse cx="60" cy="40" rx="50" ry="30" fill="#FFB3D9"/>
                <ellipse cx="30" cy="50" rx="35" ry="25" fill="#FFB3D9"/>
                <ellipse cx="90" cy="50" rx="40" ry="28" fill="#FFB3D9"/>
                <ellipse cx="60" cy="70" rx="45" ry="20" fill="#FFB3D9"/>
                <circle cx="45" cy="85" r="8" fill="#FFB3D9"/>
                <circle cx="35" cy="95" r="5" fill="#FFB3D9"/>
                <circle cx="25" cy="100" r="3" fill="#FFB3D9"/>
              </g>
              
              {/* Medium blue cloud */}
              <g transform="translate(180,20) scale(1.8)">
                <ellipse cx="40" cy="30" rx="35" ry="20" fill="#B3D9FF"/>
                <ellipse cx="20" cy="35" rx="25" ry="18" fill="#B3D9FF"/>
                <ellipse cx="60" cy="35" rx="28" ry="20" fill="#B3D9FF"/>
                <ellipse cx="40" cy="50" rx="30" ry="15" fill="#B3D9FF"/>
                <circle cx="55" cy="60" r="6" fill="#B3D9FF"/>
                <circle cx="62" cy="68" r="4" fill="#B3D9FF"/>
                <circle cx="67" cy="74" r="2" fill="#B3D9FF"/>
              </g>
              
              {/* Small green cloud */}
              <g transform="translate(250,120) scale(1.7)">
                <ellipse cx="30" cy="25" rx="25" ry="15" fill="#B3FFB3"/>
                <ellipse cx="15" cy="30" rx="18" ry="12" fill="#B3FFB3"/>
                <ellipse cx="45" cy="30" rx="20" ry="14" fill="#B3FFB3"/>
                <ellipse cx="30" cy="40" rx="22" ry="10" fill="#B3FFB3"/>
                <circle cx="15" cy="48" r="4" fill="#B3FFB3"/>
                <circle cx="10" cy="53" r="3" fill="#B3FFB3"/>
                <circle cx="6" cy="57" r="2" fill="#B3FFB3"/>
              </g>
              
              {/* Medium yellow cloud */}
              <g transform="translate(100,160) scale(1.9)">
                <ellipse cx="35" cy="25" rx="30" ry="18" fill="#FFFF99"/>
                <ellipse cx="18" cy="30" rx="22" ry="15" fill="#FFFF99"/>
                <ellipse cx="52" cy="30" rx="25" ry="17" fill="#FFFF99"/>
                <ellipse cx="35" cy="42" rx="27" ry="12" fill="#FFFF99"/>
                <circle cx="50" cy="52" r="5" fill="#FFFF99"/>
                <circle cx="57" cy="58" r="3" fill="#FFFF99"/>
                <circle cx="62" cy="62" r="2" fill="#FFFF99"/>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
