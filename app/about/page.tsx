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
          `/api/sheets?sheetId=${SHEET_ID}`
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
              Critical Collective conducts in-depth research to break down complex policies and world events into clear, digestible social media content and publications.
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
