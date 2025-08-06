"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function SpotlightSection() {
  const router = useRouter()
  return (
    <section id="spotlight" className="py-20 bg-yellow-300 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Spotlight
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
            Explore our latest research, analysis, and commentary. Critical Collective shines a light on misinformation, challenges false narratives, and celebrates the pursuit of truth. Discover articles, essays, and resources that empower youth and the public to think critically and engage boldly.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="block bg-white p-8 rounded-lg shadow-sm transition">
              <div className="text-6xl font-bold text-black mb-4">BRAND1</div>
            </div>
          </div>
          <div className="text-center">
            <div className="block bg-white p-8 rounded-lg shadow-sm transition">
              <div className="text-6xl font-bold text-black mb-4">BRAND2</div>
            </div>
          </div>
          <div className="text-center">
            <div className="block bg-white p-8 rounded-lg shadow-sm transition">
              <div className="text-6xl font-bold text-black mb-4">BRAND3</div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white rounded-full px-8 py-3 bg-transparent"
            onClick={() => router.push('/contact')}
          >
            Explore Our Thinking
          </Button>
        </div>
      </div>

      {/* Background Triangle */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-white transform -skew-y-2 origin-bottom-left"></div>
    </section>
  )
}
