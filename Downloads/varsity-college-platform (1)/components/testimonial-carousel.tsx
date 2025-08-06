"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    quote: "Varsity helped me discover my dream school. The personalized recommendations were spot-on!",
    student: "Sarah Chen",
    university: "Stanford University",
    avatar: "/placeholder.svg?height=60&width=60",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    quote: "The scholarship finder saved me thousands. I found opportunities I never knew existed.",
    student: "Marcus Johnson",
    university: "MIT",
    avatar: "/placeholder.svg?height=60&width=60",
    logo: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    quote: "Amazing platform! The campus life guides gave me real insights into college culture.",
    student: "Emma Rodriguez",
    university: "UC Berkeley",
    avatar: "/placeholder.svg?height=60&width=60",
    logo: "/placeholder.svg?height=40&width=40",
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-[#0a1a3a] to-[#1a4b8c]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Student Success Stories</h2>

        <div className="relative max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="relative">
              <Image
                src={testimonials[currentIndex].logo || "/placeholder.svg"}
                alt="University logo"
                width={40}
                height={40}
                className="absolute top-0 right-0 opacity-10"
              />

              <blockquote className="text-xl italic text-white mb-6 leading-relaxed">
                "{testimonials[currentIndex].quote}"
              </blockquote>

              <div className="flex items-center space-x-4">
                <Image
                  src={testimonials[currentIndex].avatar || "/placeholder.svg"}
                  alt={testimonials[currentIndex].student}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-white">{testimonials[currentIndex].student}</p>
                  <p className="text-[#a2c8ff] text-sm">{testimonials[currentIndex].university}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 space-x-4">
            <button
              onClick={prevTestimonial}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentIndex ? "bg-[#a2c8ff]" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
