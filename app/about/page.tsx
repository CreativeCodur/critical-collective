"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { sanitizeInput, validateSheetId } from "@/lib/sanitize"

interface TeamMember {
  name: string
  role: string
  bio: string
  color: string
  shape: string
}

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)

  const colors = [
    "bg-blue-500", "bg-orange-400", "bg-purple-400", "bg-green-500", "bg-red-400",
    "bg-pink-400", "bg-yellow-400", "bg-indigo-400", "bg-teal-400", "bg-cyan-400",
    "bg-lime-400", "bg-amber-400", "bg-rose-400"
  ]

  const shapes = [
    "polygon(23% 15%, 87% 8%, 92% 73%, 45% 95%, 12% 67%, 8% 32%)",
    "polygon(15% 25%, 65% 5%, 95% 45%, 78% 85%, 35% 92%, 5% 58%)",
    "polygon(28% 12%, 72% 18%, 88% 42%, 85% 78%, 52% 95%, 18% 88%, 8% 55%, 15% 28%)",
    "polygon(35% 8%, 78% 22%, 92% 58%, 68% 88%, 25% 92%, 8% 65%, 12% 35%)",
    "polygon(42% 5%, 85% 15%, 95% 52%, 82% 78%, 58% 95%, 22% 85%, 5% 48%, 18% 22%)",
    "polygon(18% 35%, 55% 8%, 88% 28%, 92% 65%, 75% 92%, 38% 88%, 8% 68%, 12% 42%)",
    "polygon(32% 18%, 68% 12%, 85% 38%, 95% 72%, 62% 88%, 28% 95%, 12% 68%, 5% 35%)",
    "polygon(25% 22%, 72% 5%, 92% 42%, 88% 75%, 45% 92%, 15% 78%, 8% 45%, 18% 28%)",
    "polygon(38% 15%, 75% 8%, 95% 35%, 85% 68%, 58% 95%, 22% 82%, 5% 55%, 15% 32%)",
    "polygon(45% 12%, 82% 18%, 92% 48%, 78% 82%, 48% 88%, 18% 75%, 8% 42%, 22% 25%)",
    "polygon(28% 8%, 65% 15%, 88% 45%, 95% 72%, 68% 85%, 35% 92%, 12% 65%, 5% 38%)",
    "polygon(52% 5%, 85% 25%, 95% 58%, 72% 88%, 42% 95%, 15% 75%, 5% 42%, 28% 12%)",
    "polygon(35% 18%, 78% 8%, 92% 38%, 88% 72%, 55% 88%, 22% 95%, 8% 62%, 12% 28%)"
  ]

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const SHEET_ID = '1EvUKnEAuW09V_9vY1-1QMPrdrXcQNPcOGGklwk6jAy8'
        if (!validateSheetId(SHEET_ID)) {
          throw new Error('Invalid sheet ID')
        }
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`,
          { 
            headers: {
              'Accept': 'text/csv',
              'Cache-Control': 'no-cache'
            }
          }
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }
        
        const csvText = await response.text()
        const rows = csvText.split('\n').filter(row => row.trim()).map(row => {
          const cells = []
          let current = ''
          let inQuotes = false
          
          for (let i = 0; i < row.length; i++) {
            const char = row[i]
            if (char === '"') {
              if (inQuotes && row[i + 1] === '"') {
                current += '"'
                i++
              } else {
                inQuotes = !inQuotes
              }
            } else if (char === ',' && !inQuotes) {
              cells.push(current.trim())
              current = ''
            } else {
              current += char
            }
          }
          cells.push(current.trim())
          return cells
        })
        
        if (rows.length >= 2) {
          const fetchedMembers: TeamMember[] = []
          
          for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
            const name = rows[rowIndex]?.[0] || ''
            const role = rows[rowIndex]?.[1] || ''
            const bio = rows[rowIndex]?.[2] || ''
            
            if (name.trim() !== '') {
              fetchedMembers.push({
                name: sanitizeInput(name.replace(/^"|"$/g, '')),
                role: sanitizeInput(role.replace(/^"|"$/g, '')),
                bio: sanitizeInput(bio.replace(/^"|"$/g, '')),
                color: colors[rowIndex % colors.length],
                shape: shapes[rowIndex % shapes.length]
              })
            }
          }
          
          setTeamMembers(fetchedMembers)
        }
      } catch (error) {
        console.error('Error fetching team members:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-center items-center">
              <div className="text-center">
                <h1 className="text-8xl lg:text-9xl font-bold text-black mb-12 leading-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                  About
                  <br />
                  Critical
                  <br />
                  Collective
                </h1>
                <p className="text-xl text-gray-700 mb-12 leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  Critical Collective is a youth-led think tank dedicated to fostering free and critical thinking in the face of widespread disinformation. We believe that truth is a public good, and that challenging false narratives requires bold, independent analysis grounded in integrity and intellectual curiosity. Through research, advocacy, and open dialogue, we confront misinformation across media, policy, and public discourse.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What We Do Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-black mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>What We Do</h2>
            <p className="text-lg text-gray-700 mb-12 leading-relaxed max-w-2xl" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
              Critical Collective confronts misinformation and disinformation through rigorous research, bold advocacy, and open dialogue. We analyze media, policy, and public discourse to challenge false narratives and promote truth as a public good.
            </p>
            
            {/* Research, Advocacy, Dialogue */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div className="flex justify-center">
                <div className="relative w-24 h-20">
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
              <div>
                <h3 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>Research, Advocacy, Dialogue</h3>
                <p className="text-lg text-gray-700 mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  We provide comprehensive services to combat misinformation:
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

            {/* Amplify Your Voice */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h3 className="text-3xl font-bold text-black mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>Amplify Your Voice</h3>
                <p className="text-lg text-gray-700 mb-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  We help you maximize your reach and impact through:
                </p>
                <ul className="space-y-2 text-gray-700 mb-8" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                  <li>• Coaching, training, & workshops</li>
                  <li>• Strategic scheduling & placement</li>
                  <li>• Political work, public affairs campaigns</li>
                  <li>• Publishing & promotion with television hooks</li>
                </ul>
              </div>
              <div className="flex justify-center">
                <div className="relative w-24 h-20">
                  <div className="absolute top-4 left-0 w-3 h-12 bg-red-500 rounded-full"></div>
                  <div className="absolute top-2 left-3 w-4 h-16 bg-red-400 rounded-full"></div>
                  <div className="absolute top-0 left-7 w-5 h-20 bg-pink-400 rounded-full"></div>
                  <div className="absolute top-2 left-12 w-4 h-16 bg-pink-500 rounded-full"></div>
                  <div className="absolute top-4 left-16 w-3 h-12 bg-red-300 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* Core Services */}
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
                <Link href="/contact">
                  <button className="border border-black text-black hover:bg-black hover:text-white rounded-full px-6 py-2 bg-transparent transition-colors" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600 }}>
                    Develop Your Message
                  </button>
                </Link>
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
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading team members...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                {teamMembers.map((member, index) => (
                  <div key={index} className="text-center">
                    <div 
                      className={`${member.color} p-8 mb-6 relative overflow-hidden w-32 h-32 mx-auto flex items-center justify-center cursor-pointer transition-transform duration-300 hover:rotate-12`} 
                      style={{ clipPath: member.shape }}
                      onClick={() => setSelectedMember(member)}
                    >
                      <span className="text-white font-bold text-2xl">{member.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <h3 className="text-xl font-bold text-black mb-2" style={{ fontFamily: 'DM Sans, sans-serif' }}>{member.name}</h3>
                    <p className="text-gray-600 mb-4" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>{member.role}</p>
                    <div className="w-8 h-1 bg-black mx-auto"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Bio Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedMember(null)}>
          <div className="bg-white rounded-lg p-8 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-black mb-1" style={{ fontFamily: 'DM Sans, sans-serif' }}>{selectedMember.name}</h3>
                <p className="text-gray-600" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>{selectedMember.role}</p>
              </div>
              <button onClick={() => setSelectedMember(null)} className="text-black hover:text-gray-600 text-2xl">&times;</button>
            </div>
            <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>{selectedMember.bio}</p>
          </div>
        </div>
      )}
    </div>
  )
}
