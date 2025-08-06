import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Joshua Boize",
      role: "Director",
      image: "/placeholder.svg?height=300&width=300",
      color: "bg-blue-500",
    },
    {
      name: "Veronica Bryant Bean",
      role: "Associate",
      image: "/placeholder.svg?height=300&width=300",
      color: "bg-orange-400",
    },
    {
      name: "Heather Brewer",
      role: "Media Trainer",
      image: "/placeholder.svg?height=300&width=300",
      color: "bg-purple-400",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-6xl lg:text-8xl font-bold text-black mb-8 leading-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  About
                  <br />
                  Critical
                  <br />
                  Collective
                </h1>
                <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-md" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  Critical Collective is a youth-led think tank dedicated to fostering free and critical thinking in the face of widespread disinformation. We believe that truth is a public good, and that challenging false narratives requires bold, independent analysis grounded in integrity and intellectual curiosity. Through research, advocacy, and open dialogue, we confront misinformation across media, policy, and public discourse.
                </p>
                <p className="text-black leading-relaxed">
                  We're senior staffers from the Clinton, Obama, and Biden Administrations, veterans of campaign war rooms and state houses and Capitol Hill. We're authors and teachers and improv performers. We're mission-driven, socially engaged, and diverse in perspective and lived experience.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-black mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>What We Do</h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-2xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
              We are strategic thinkers, strategic storytellers, strategic partners. We help our clients do three big things:
            </p>
            <div className="grid md:grid-cols-3 gap-12">
              <div>
                <div className="text-6xl font-bold text-blue-500 mb-4">1</div>
                <h3 className="text-xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>Leadership Communications</h3>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  Change-up lead communications about issues and ideas, transformation opportunities—locally, nationally, and globally.
                </p>
              </div>
              <div>
                <div className="text-6xl font-bold text-blue-500 mb-4">2</div>
                <h3 className="text-xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>Executive Communications</h3>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  Advocate for change, for good, within organizations and in the wider world.
                </p>
              </div>
              <div>
                <div className="text-6xl font-bold text-blue-500 mb-4">3</div>
                <h3 className="text-xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>Brand, Product, & Program Communications</h3>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  We help our clients develop their brand story and voice, launch products and services, and announce partnerships, campaigns, and coalitions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How We Work Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-black mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>How We Work</h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-2xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
              We work across a continuum to help you shape your story, share it, and maximize your impact.
            </p>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-16 h-12 bg-orange-400 rounded transform rotate-12"></div>
                  <div className="w-20 h-8 bg-orange-500 rounded absolute top-4 -left-1 transform -rotate-6"></div>
                  <div className="w-12 h-16 bg-orange-300 rounded absolute -top-2 left-4"></div>
                </div>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>Develop</h3>
                <h4 className="text-xl text-gray-600 mb-6" style={{ fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}>Your Message</h4>
                <p className="text-gray-700 mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>We work with you to shape your story through:</p>
                <ul className="space-y-2 text-gray-700 mb-8" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  <li>• Thought leadership platforms</li>
                  <li>• Organizational narratives</li>
                  <li>• Message frameworks</li>
                  <li>• Executive positioning</li>
                </ul>
                <button className="border border-black text-black hover:bg-black hover:text-white rounded-full px-6 py-2 bg-transparent transition-colors" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                  Develop Your Message
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Our Mission Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-black mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed max-w-2xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
              We help good ideas get heard, good organizations lead meaningful change, and good people make a difference in the world.
            </p>
          </div>
        </section>

        {/* Our Team Section */}
        <section className="py-20 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-black mb-12" style={{ fontFamily: 'DM Sans, sans-serif' }}>Our Team</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className={`${member.color} rounded-2xl p-8 mb-6 relative overflow-hidden`}>
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>{member.name}</h3>
                  <p className="text-gray-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>{member.role}</p>
                  <div className="w-8 h-1 bg-black mx-auto"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
