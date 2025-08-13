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
                <div className="relative w-24 h-20">
                  {/* Campaign megaphone icon */}
                  <div className="absolute top-4 left-0 w-3 h-12 bg-blue-500 rounded-full"></div>
                  <div className="absolute top-2 left-3 w-4 h-16 bg-blue-400 rounded-full"></div>
                  <div className="absolute top-0 left-7 w-5 h-20 bg-purple-400 rounded-full"></div>
                  <div className="absolute top-2 left-12 w-4 h-16 bg-purple-500 rounded-full"></div>
                  <div className="absolute top-4 left-16 w-3 h-12 bg-blue-300 rounded-full"></div>
                </div>
              </div>
              <div className="animate-on-load opacity-0">
                <h2 className="text-4xl font-bold text-black mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Our Campaigns
                </h2>
                <h3 className="text-2xl text-gray-600 mb-6" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
                  Truth in Action
                </h3>
                <p className="text-lg text-gray-700 mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  Critical Collective runs targeted campaigns to combat misinformation, promote media literacy, and advocate for truth in public discourse. Our campaigns mobilize communities, influence policy, and create lasting change.
                </p>
                <ul className="space-y-2 text-gray-700 mb-8" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  <li>• Media literacy initiatives</li>
                  <li>• Fact-checking campaigns</li>
                  <li>• Policy advocacy efforts</li>
                  <li>• Community engagement programs</li>
                  <li>• Digital truth campaigns</li>
                </ul>
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
                <p className="text-lg text-gray-700 mb-6">Our current campaigns focus on:</p>
                <ul className="space-y-2 text-gray-700 mb-8">
                  <li>• Truth in Elections: Combating electoral misinformation</li>
                  <li>• Digital Literacy: Teaching critical evaluation of online content</li>
                  <li>• Policy Transparency: Advocating for clear, factual policy communication</li>
                  <li>• Youth Engagement: Empowering young voices in truth-telling</li>
                </ul>
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

        {/* Campaign Impact Section */}
        <section className="py-20 bg-blue-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-black mb-8 animate-on-load opacity-0">Campaign Impact</h2>
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="animate-on-load opacity-0">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our campaigns have reached millions of people, influenced policy decisions, and created measurable 
                  improvements in media literacy and critical thinking skills.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We measure success not just in reach, but in real behavioral change and improved information 
                  consumption habits.
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {["Education", "Policy", "Community", "Digital"].map((category, index) => (
                <div key={category} className="animate-on-load opacity-0" style={{ animationDelay: `${index * 0.2}s` }}>
                  <h3 className="text-xl font-bold text-black mb-4">{category}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {category === "Education" &&
                      "We've trained thousands of educators and students in media literacy, critical thinking, and fact-checking techniques through workshops, curricula, and digital resources."}
                    {category === "Policy" &&
                      "Our policy campaigns have influenced legislation on digital transparency, platform accountability, and information integrity at local, state, and federal levels."}
                    {category === "Community" &&
                      "We've built grassroots networks of truth advocates, creating local chapters that combat misinformation in their communities through events and outreach."}
                    {category === "Digital" &&
                      "Our digital campaigns leverage social media, online tools, and technology to counter false narratives and promote accurate information in real-time."}
                  </p>
                </div>
              ))}
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
                  there's a place for you in our movement for truth and transparency.
                </p>
                <Link href="/contact">
                  <Button
                    variant="outline"
                    className="border-black text-black hover:bg-black hover:text-white rounded-full px-6 bg-transparent"
                  >
                    Start Your Campaign
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