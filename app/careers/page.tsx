import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CareersCarousel } from "@/components/careers-carousel"
import { CareersHero } from "@/components/careers-hero"

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-purple-400 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-6xl lg:text-8xl font-bold text-black mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Careers
                </h1>
                <CareersHero />
              </div>
            </div>
          </div>
        </section>

        {/* Careers Carousel Section */}
        <CareersCarousel />
      </main>

      <Footer />
    </div>
  )
}
