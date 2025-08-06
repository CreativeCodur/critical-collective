import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import type { CollegeData } from "@/lib/college-api"
import Link from "next/link"
import { getCollegeOpportunities } from "@/lib/college-categories"

interface CollegeCardProps {
  college: CollegeData
}

export default function CollegeCard({ college }: CollegeCardProps) {
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

  const getOwnershipColor = (ownership: number) => {
    switch (ownership) {
      case 1:
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case 2:
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case 3:
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  const formatTuition = (tuition: number | undefined) => {
    if (!tuition || tuition === 0) return "N/A"
    return `$${tuition.toLocaleString()}`
  }

  const formatEarnings = (earnings: number | undefined) => {
    if (!earnings || earnings === 0) return "N/A"
    return `$${earnings.toLocaleString()}`
  }

  const getDiversityScore = () => {
    // Calculate diversity based on racial demographics
    const total = college.whitePercent + college.blackPercent + college.hispanicPercent
    if (total === 0) return 0

    // Higher diversity when percentages are more evenly distributed
    const entropy = [college.whitePercent, college.blackPercent, college.hispanicPercent]
      .filter((p) => p > 0)
      .reduce((acc, p) => {
        const ratio = p / total
        return acc - ratio * Math.log2(ratio)
      }, 0)

    return Math.min(100, Math.round(entropy * 50)) // Scale to 0-100
  }

  const getProgressBar = (value: number) => {
    const filled = Math.floor(value / 20)
    const empty = 5 - filled
    return "▰".repeat(filled) + "▱".repeat(empty)
  }

  return (
    <div>
      <Link href={`/college/${college.id}`} passHref legacyBehavior>
        <a className="block card-glass rounded-2xl p-6 shadow-lg hover:scale-[1.03] transition-transform duration-300 cursor-pointer">
          <div className="flex items-start justify-between mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#f9e7c4] via-[#f9c4d2] to-[#ffb3a7] rounded-lg flex items-center justify-center">
              <span className="text-[#ffb3a7] font-bold text-2xl font-accent">{college.name.charAt(0)}</span>
            </div>
            <div className="flex flex-wrap gap-1">
              <Badge className={getOwnershipColor(college.ownership)}>{getOwnershipType(college.ownership)}</Badge>
              {college.businessPercent > 20 && (
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Business</Badge>
              )}
              {college.engineeringPercent > 15 && (
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Engineering</Badge>
              )}
            </div>
          </div>
          <h3 className="text-xl font-semibold font-geist text-[#0a1a3a] mb-2 line-clamp-2">{college.name}</h3>
          <p className="text-slate-500 font-barlow text-sm mb-4">{college.city}, {college.state}</p>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400 font-barlow">Diversity:</span>
              <span className="text-sm font-mono text-[#0a1a3a]">{getProgressBar(getDiversityScore())}</span>
            </div>
            {college.medianEarnings > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400 font-barlow">Grad Earnings:</span>
                <span className="text-sm font-mono text-[#0a1a3a]">
                  {getProgressBar(Math.min(100, college.medianEarnings / 800))}
                </span>
              </div>
            )}
          </div>
          <div className="border-t border-white/10 pt-4 space-y-2">
            {college.admissionRate && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-barlow">Acceptance Rate:</span>
                <span className="font-semibold text-[#0a1a3a]">{college.admissionRate}%</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-barlow">Students:</span>
              <span className="font-semibold text-[#0a1a3a]">{typeof college.studentSize === 'number' ? college.studentSize.toLocaleString() : 'N/A'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-barlow">Out-of-State Tuition:</span>
              <span className="font-semibold text-[#0a1a3a]">{formatTuition(college.tuitionOutState)}</span>
            </div>
            {college.medianEarnings > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-slate-400 font-barlow">Median Earnings:</span>
                <span className="font-semibold text-[#0a1a3a]">{formatEarnings(college.medianEarnings)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span className="text-slate-400 font-barlow">Opportunities:</span>
              <span className="font-semibold text-[#ffb3a7]">
                {(() => {
                  const { totalOpportunities } = getCollegeOpportunities(college)
                  return totalOpportunities
                })()}
              </span>
            </div>
          </div>
        </a>
      </Link>
      {college.website && (
        <div className="mt-4 pt-4 border-t border-white/10">
          <button
            onClick={e => {
              e.stopPropagation();
              window.open(college.website.startsWith("http") ? college.website : `https://${college.website}`, '_blank')
            }}
            className="inline-flex items-center text-[#ffb3a7] hover:text-[#0a1a3a] text-sm font-medium transition-colors"
          >
            Visit Website
            <ExternalLink className="w-3 h-3 ml-1" />
          </button>
        </div>
      )}
    </div>
  )
}
