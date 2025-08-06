import Hero from "@/components/hero"
import FeaturedColleges from "@/components/featured-colleges"
import WhyVarsity from "@/components/why-varsity"
import TestimonialCarousel from "@/components/testimonial-carousel"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedColleges />
      <WhyVarsity />
      <TestimonialCarousel />
      <Footer />
    </div>
  )
}
