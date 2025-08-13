"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { SpotlightSection } from "@/components/spotlight-section"
import { DisruptionBooksSection } from "@/components/disruption-books-section"
import { FooterCTA } from "@/components/footer-cta"
import { Footer } from "@/components/footer"

export default function Home() {
  useEffect(() => {
    // Add page load animation class
    document.body.classList.add("page-loaded")
  }, [])

  return (
    <div className="min-h-screen bg-white page-enter">
      <Header />
      <main>
        <HeroSection />
        <SpotlightSection />
        <DisruptionBooksSection />
        <FooterCTA />
      </main>
      <Footer />
    </div>
  )
}
