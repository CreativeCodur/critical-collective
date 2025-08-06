"use client"

import { useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
  useEffect(() => {
    document.body.classList.add("page-loaded")
  }, [])

  return (
    <div className="min-h-screen bg-white page-enter">
      <Header />

      <main>
        {/* Express Your Idea Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center animate-on-load opacity-0">
                <div className="relative w-24 h-20">
                  {/* Stack of teal triangles */}
                  <div className="absolute top-0 left-6">
                    <div className="w-0 h-0 border-l-6 border-r-6 border-b-8 border-l-transparent border-r-transparent border-b-teal-500"></div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <div className="w-0 h-0 border-l-8 border-r-8 border-b-10 border-l-transparent border-r-transparent border-b-teal-400"></div>
                  </div>
                  <div className="absolute top-8 left-2">
                    <div className="w-0 h-0 border-l-10 border-r-10 border-b-12 border-l-transparent border-r-transparent border-b-teal-600"></div>
                  </div>
                </div>
              </div>
              <div className="animate-on-load opacity-0">
                <h2 className="text-4xl font-bold text-black mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  Our Services
                </h2>
                <h3 className="text-2xl text-gray-600 mb-6" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>
                  Research, Advocacy, Dialogue
                </h3>
                <p className="text-lg text-gray-700 mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  Critical Collective confronts misinformation and disinformation through rigorous research, bold advocacy, and open dialogue. We analyze media, policy, and public discourse to challenge false narratives and promote truth as a public good.
                </p>
                <ul className="space-y-2 text-gray-700 mb-8" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  <li>• Virtual & in-person events</li>
                  <li>• Manifestos & narratives</li>
                  <li>• Talking points, speeches, & presentations</li>
                  <li>• Op-eds, essays, & other written communications</li>
                  <li>• Manuscripts of all lengths</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Amplify Your Voice Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center animate-on-load opacity-0">
                <div className="relative w-24 h-20">
                  {/* Sound wave / megaphone shapes */}
                  <div className="absolute top-4 left-0 w-3 h-12 bg-red-500 rounded-full"></div>
                  <div className="absolute top-2 left-3 w-4 h-16 bg-red-400 rounded-full"></div>
                  <div className="absolute top-0 left-7 w-5 h-20 bg-pink-400 rounded-full"></div>
                  <div className="absolute top-2 left-12 w-4 h-16 bg-pink-500 rounded-full"></div>
                  <div className="absolute top-4 left-16 w-3 h-12 bg-red-300 rounded-full"></div>
                </div>
              </div>
              <div className="animate-on-load opacity-0">
                <h2 className="text-4xl font-bold text-black mb-2">Amplify</h2>
                <h3 className="text-2xl text-gray-600 mb-6">Your Voice</h3>
                <p className="text-lg text-gray-700 mb-6">And we help you maximize its reach and impact through:</p>
                <ul className="space-y-2 text-gray-700 mb-8">
                  <li>• Coaching, training, & workshops</li>
                  <li>• Strategic scheduling & placement</li>
                  <li>• Political work, public affairs campaigns</li>
                  <li>• Publishing & promotion with television hooks</li>
                </ul>
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white rounded-full px-6 bg-transparent"
                >
                  Learn More About Workshops
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Who We Work With Section */}
        <section className="py-20 bg-blue-100">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-black mb-8 animate-on-load opacity-0">Who We Work With</h2>
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="animate-on-load opacity-0">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Our clients are changing everything about everything—the ways we think and act, what we watch and buy,
                  for what and whom we vote.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We can't name names here; you'd know them all. But our clients expect confidentiality. (They don't
                  even have to ask.)
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {["Business", "Philanthropy", "Culture", "Public Service"].map((category, index) => (
                <div key={category} className="animate-on-load opacity-0" style={{ animationDelay: `${index * 0.2}s` }}>
                  <h3 className="text-xl font-bold text-black mb-4">{category}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {category === "Business" &&
                      "We work with Fortune 500 CEOs who lead Fortune's Most Admired Companies, groundbreaking CMOs who steward Interbrand's Best Global Brands, and visionary entrepreneurs behind FastCompany's Most Innovative Companies."}
                    {category === "Philanthropy" &&
                      "We work with leaders at the largest, most long-established foundations as well as newer, smaller NGOs—helping them share strategies of investment and influence, helping shape their calls to action on everything from climate change to global health."}
                    {category === "Culture" &&
                      "Our clients have earned Emmys, Grammys, Oscars, and Tonys—as well as NFL, NBA, and MLB championships. We help them advocate for changes in our culture, communities, policies, and laws."}
                    {category === "Public Service" &&
                      "We develop the winning arguments and breakthrough messages that decide elections and shape policy initiatives. We craft the poetry of politics and take pride in good government—for the campaigns that end in debates, victory speeches, and addresses on the State of the City, State, and Union."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Disruption Books Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="animate-on-load opacity-0">
                <h2 className="text-5xl lg:text-6xl font-bold text-black mb-8 leading-tight">
                  Disruption
                  <br />
                  Books
                </h2>
                <div className="border border-gray-300 px-4 py-2 inline-block mb-8">
                  <span className="text-sm font-bold text-gray-600">CHECK IT OUT</span>
                </div>
              </div>
              <div className="animate-on-load opacity-0">
                <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                  Disruption Books is our nonfiction publishing company. We believe that a brilliant idea can change the
                  world. But first, it has to change minds. We help bold thinkers do both.
                </p>
                <Button
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white rounded-full px-6 bg-transparent"
                >
                  Visit Disruption Books
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
