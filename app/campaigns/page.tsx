"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function CampaignsPage() {
  useEffect(() => {
    document.body.classList.add("page-loaded")
  }, [])

  return (
    <div className="min-h-screen bg-white page-enter">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center animate-on-load opacity-0">
                <img 
                  src="/Screenshot 2025-08-14 104952.png" 
                  alt="Our Campaigns" 
                  className="max-w-full h-auto rounded-lg shadow-lg"
                />
              </div>
              <div className="animate-on-load opacity-0">
                <h2 className="text-4xl font-bold text-black mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Our Campaigns
                </h2>
                <h3 className="text-2xl text-gray-600 mb-6" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
                  Truth in Action
                </h3>
                <p className="text-lg text-gray-700 mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  Critical Collective runs targeted campaigns to combat today's most pressing issues and tomorrow's most urgent threats. Our goal is to mobilize like-minded individuals and advance action through advocacy efforts both online and in-person.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Active Campaigns Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center animate-on-load opacity-0">
                <div className="relative w-24 h-20">
                  {/* Active campaign icons */}
                  <div className="absolute top-0 left-6">
                    <div className="w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-green-500"></div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-b-10 border-l-transparent border-r-transparent border-b-green-400"></div>
                  </div>
                  <div className="absolute top-8 left-2">
                    <div className="w-0 h-0 border-l-10 border-r-10 border-b-12 border-l-transparent border-r-transparent border-b-green-600"></div>
                  </div>
                </div>
              </div>
              <div className="animate-on-load opacity-0">
                <h2 className="text-4xl font-bold text-black mb-2">Active Campaigns</h2>
                <h3 className="text-2xl text-gray-600 mb-6">Making Impact Now</h3>
                <Link href="/about">
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white rounded-full px-6 bg-transparent"
                  >
                    Explore what we do
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>



        {/* Get Involved Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="animate-on-load opacity-0">
                <h2 className="text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
                  Get
                  <br />
                  Involved
                </h2>
                <div className="border border-gray-300 px-4 py-2 inline-block mb-8">
                  <span className="text-sm font-bold text-gray-600">JOIN THE MOVEMENT</span>
                </div>
              </div>
              <div className="animate-on-load opacity-0">
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Every campaign needs passionate advocates. Whether you're a student, professional, or concerned citizen, 
                  there's a place for you in our movement toward truth and transparency.
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white rounded-full px-6 bg-transparent"
                  >
                    Join Our Campaigns
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}