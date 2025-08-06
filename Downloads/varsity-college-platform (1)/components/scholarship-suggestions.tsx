"use client"

import { useState, useEffect } from "react"
import { Award, ExternalLink, Calendar, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { suggestScholarshipsForCollege, type ScholarshipData } from "@/lib/scholarship-locator"
import type { CollegeData } from "@/lib/college-api"

interface ScholarshipSuggestionsProps {
  college: CollegeData
}

export default function ScholarshipSuggestions({ college }: ScholarshipSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<ScholarshipData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const scholarshipSuggestions = suggestScholarshipsForCollege(college)
        setSuggestions(scholarshipSuggestions)
      } catch (error) {
        console.error("Error loading scholarship suggestions:", error)
      } finally {
        setLoading(false)
      }
    }

    loadSuggestions()
  }, [college])

  const getScholarshipIcon = (type: string) => {
    switch (type) {
      case "need-based":
        return <DollarSign className="w-4 h-4" />
      case "merit":
        return <Award className="w-4 h-4" />
      default:
        return <Award className="w-4 h-4" />
    }
  }

  const getScholarshipColor = (type: string) => {
    switch (type) {
      case "need-based":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "merit":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "demographic":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "program-specific":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      case "geographic":
        return "bg-pink-500/20 text-pink-400 border-pink-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const getDaysUntilDeadline = (deadline: string) => {
    try {
      const deadlineDate = new Date(deadline)
      const today = new Date()
      const diffTime = deadlineDate.getTime() - today.getTime()
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    } catch {
      return null
    }
  }

  if (loading) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Suggested Scholarships</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70">Loading scholarship suggestions...</p>
        </CardContent>
      </Card>
    )
  }

  if (suggestions.length === 0) {
    return (
      <Card className="bg-white/10 backdrop-blur-sm border-white/20">
        <CardHeader>
          <CardTitle className="text-white">Suggested Scholarships</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/70 mb-4">No specific suggestions found for this college.</p>
          <Link href="/scholarships">
            <Button className="bg-[#a2c8ff] hover:bg-[#a2c8ff]/90 text-[#0a1a3a]">Browse All Scholarships</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-white/10 backdrop-blur-sm border-white/20">
      <CardHeader>
        <CardTitle className="text-white flex items-center space-x-2">
          <Award className="w-5 h-5 text-[#a2c8ff]" />
          <span>Suggested Scholarships for {college.name}</span>
        </CardTitle>
        <CardDescription className="text-white/70">
          Scholarships matched to this college's location, programs, and characteristics
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.slice(0, 5).map((scholarship) => {
            const daysLeft = getDaysUntilDeadline(scholarship.deadline)
            const isUrgent = daysLeft !== null && daysLeft <= 30

            return (
              <div key={scholarship.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    {getScholarshipIcon(scholarship.type)}
                    <h4 className="text-white font-semibold">{scholarship.name}</h4>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getScholarshipColor(scholarship.type)}>
                      {scholarship.type.replace("-", " ")}
                    </Badge>
                    <span className="text-[#a2c8ff] font-semibold text-sm">{scholarship.amount}</span>
                  </div>
                </div>

                <p className="text-white/80 text-sm mb-3">{scholarship.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center text-white/70 text-xs">
                    <Calendar className="w-3 h-3 mr-1" />
                    <span className={isUrgent ? "text-red-400 font-semibold" : ""}>
                      {scholarship.deadline}
                      {isUrgent && daysLeft !== null && ` (${daysLeft} days left!)`}
                    </span>
                  </div>

                  {scholarship.website && (
                    <a
                      href={scholarship.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-[#a2c8ff] hover:text-white text-xs transition-colors"
                    >
                      Apply
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-white/20 text-center">
          <Link href="/scholarships">
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 bg-transparent">
              View All {suggestions.length} Suggested Scholarships
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
