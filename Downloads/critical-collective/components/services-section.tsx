"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

export function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
          }
        })
      },
      { threshold: 0.1 },
    )

    const elements = sectionRef.current?.querySelectorAll(".animate-on-scroll")
    elements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16 animate-on-scroll">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Our Services
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
          <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
            We confront misinformation and disinformation through rigorous research, bold advocacy, and open dialogue. Our work spans media analysis, policy review, and public engagement, empowering youth and communities to challenge false narratives and promote truth as a public good.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Develop Your Message */}
          <div className="text-center animate-on-scroll" style={{ animationDelay: "0.2s" }}>
            <div className="mb-8 flex justify-center">
              <div className="relative w-20 h-16">
                {/* Stack of orange rectangles */}
                <div className="absolute top-0 left-2 w-16 h-4 bg-orange-400 rounded transform rotate-12"></div>
                <div className="absolute top-2 left-0 w-14 h-4 bg-orange-500 rounded transform -rotate-6"></div>
                <div className="absolute top-4 left-3 w-12 h-4 bg-orange-300 rounded transform rotate-3"></div>
                <div className="absolute top-6 left-1 w-10 h-4 bg-orange-600 rounded transform -rotate-12"></div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-black mb-2">Develop</h3>
            <h4 className="text-xl text-gray-600 mb-4">Your Message</h4>

            <p className="text-gray-700 mb-6 leading-relaxed">
              We help you shape your story—your argument, your narrative, your truth.
            </p>

            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white rounded-full px-6 bg-transparent"
              onClick={() => window.location.href = '/contact'}
            >
              Develop Your Message
            </Button>
          </div>

          {/* Express Your Idea */}
          <div className="text-center animate-on-scroll" style={{ animationDelay: "0.4s" }}>
            <div className="mb-8 flex justify-center">
              <div className="relative w-20 h-16">
                {/* Stack of teal triangles */}
                <div className="absolute top-0 left-4">
                  <div className="w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-teal-500"></div>
                </div>
                <div className="absolute top-3 left-2">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-b-10 border-l-transparent border-r-transparent border-b-teal-400"></div>
                </div>
                <div className="absolute top-6 left-0">
                  <div className="w-0 h-0 border-l-10 border-r-10 border-b-12 border-l-transparent border-r-transparent border-b-teal-600"></div>
                </div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-black mb-2">Express</h3>
            <h4 className="text-xl text-gray-600 mb-4">Your Idea</h4>

            <p className="text-gray-700 mb-6 leading-relaxed">
              We help you share it—memorably, persuasively, in service of your vision, strategy, and objectives.
            </p>
          </div>

          {/* Amplify Your Voice */}
          <div className="text-center animate-on-scroll" style={{ animationDelay: "0.6s" }}>
            <div className="mb-8 flex justify-center">
              <div className="relative w-20 h-16">
                {/* Sound wave / megaphone shapes */}
                <div className="absolute top-2 left-0 w-3 h-12 bg-red-500 rounded-full"></div>
                <div className="absolute top-1 left-3 w-4 h-14 bg-red-400 rounded-full"></div>
                <div className="absolute top-0 left-7 w-5 h-16 bg-pink-400 rounded-full"></div>
                <div className="absolute top-1 left-12 w-4 h-14 bg-pink-500 rounded-full"></div>
                <div className="absolute top-3 left-16 w-3 h-10 bg-red-300 rounded-full"></div>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-black mb-2">Amplify</h3>
            <h4 className="text-xl text-gray-600 mb-4">Your Voice</h4>

            <p className="text-gray-700 mb-6 leading-relaxed">
              And we help you maximize its reach and impact—to move your audiences and mobilize them.
            </p>

            <Button
              variant="outline"
              className="border-black text-black hover:bg-black hover:text-white rounded-full px-6 bg-transparent"
              onClick={() => window.location.href = '/contact'}
            >
              Learn More About Workshops
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
