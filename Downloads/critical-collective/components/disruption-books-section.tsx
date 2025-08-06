import { Button } from "@/components/ui/button"
import { CareersCarousel } from "@/components/careers-carousel"

export function DisruptionBooksSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Join Our Mission
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed mb-12" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Be part of a movement that's redefining truth-seeking in the digital age. We're looking for passionate individuals who want to make a difference.
          </p>
          <div id="internship-roles">
            <CareersCarousel />
          </div>
        </div>
      </div>
    </section>
  )
}
