"use client"

import { useState, useEffect } from "react"
import { fetchColleges, type CollegeData } from "@/lib/college-api"

export default function FeaturedColleges() {
  const [colleges, setColleges] = useState<CollegeData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadFeaturedColleges = async () => {
      try {
        const { colleges: allColleges } = await fetchColleges(1, 20)
        // Get a mix of different types of colleges
        const featured = allColleges
          .filter((college) => college.admissionRate && college.studentSize > 1000)
          .sort((a, b) => (b.medianEarnings || 0) - (a.medianEarnings || 0))
          .slice(0, 4)
        setColleges(featured)
      } catch (error) {
        console.error("Error loading featured colleges:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedColleges()
  }, [])

  const getOwnershipType = (ownership: number) => {
    switch (ownership) {
      case 1:
        return "Public"
      case 2:
        return "Private"
      case 3:
        return "For-Profit"
      default:
        return "Unknown"
    }
  }

  const formatTuition = (tuition: number | undefined) => {
    if (!tuition || tuition === 0) return "N/A"
    return `$${tuition.toLocaleString()}`
  }

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-[#1a4b8c] to-[#0a1a3a]">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-white text-center mb-16 border-b-2 border-dashed border-[#a2c8ff] pb-4">
            TRENDING SCHOOLS
          </h2>
          <div className="flex justify-center">
            <div className="text-white text-xl">Loading colleges...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-[#1a4b8c] to-[#0a1a3a]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16 border-b-2 border-dashed border-[#a2c8ff] pb-4 inline-block w-full">
          TRENDING SCHOOLS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {colleges.map((college) => (
            <div
              key={college.id}
              className="w-72 h-96 backdrop-blur-[10px] bg-[rgba(10,26,58,0.7)] rounded-2xl p-6 border border-white/10 hover:rotate-3 hover:border-[#ff9a9a] hover:border-2 transition-all duration-300 ease-in-out cursor-pointer group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-16 h-16 bg-[#a2c8ff]/20 rounded-lg flex items-center justify-center">
                  <span className="text-[#a2c8ff] font-bold text-lg">{college.name.charAt(0)}</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#a2c8ff] transition-colors line-clamp-2">
                {college.name}
              </h3>

              <p className="text-[#a2c8ff] text-sm mb-4">
                {college.city}, {college.state}
              </p>

              <div className="border-t border-dashed border-white/20 pt-4 space-y-2">
                <div className="flex justify-between text-white text-sm">
                  <span>Type:</span>
                  <span className="font-semibold">{getOwnershipType(college.ownership)}</span>
                </div>
                {college.admissionRate && (
                  <div className="flex justify-between text-white text-sm">
                    <span>Acceptance:</span>
                    <span className="font-semibold">{college.admissionRate}%</span>
                  </div>
                )}
                <div className="flex justify-between text-white text-sm">
                  <span>Students:</span>
                  <span className="font-semibold">{typeof college.studentSize === 'number' ? college.studentSize.toLocaleString() : 'N/A'}</span>
                </div>
                <div className="flex justify-between text-white text-sm">
                  <span>Tuition:</span>
                  <span className="font-semibold">{formatTuition(college.tuitionOutState)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
