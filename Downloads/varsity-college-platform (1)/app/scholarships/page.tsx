"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MapPin, Calendar, DollarSign, Users, Award, ExternalLink } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  scholarshipDatabase,
  filterScholarships,
  getScholarshipStats,
  initializeScholarshipDatabase,
  type ScholarshipData,
  type ScholarshipFilters,
} from "@/lib/scholarship-locator"
import SearchFilterBar from "@/components/search-filter-bar"
import HandwritingTitle from '@/components/HandwritingTitle'

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<ScholarshipData[]>([])
  const [filteredScholarships, setFilteredScholarships] = useState<ScholarshipData[]>([])
  const [displayedCount, setDisplayedCount] = useState(25)
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<Partial<ScholarshipFilters>>({})
  const [showFilters, setShowFilters] = useState(false)
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  // Initialize scholarship database on component mount
  useEffect(() => {
    const loadData = async () => {
      setInitialLoading(true)
      await initializeScholarshipDatabase()
      setScholarships([...scholarshipDatabase])
      setFilteredScholarships([...scholarshipDatabase])
      setInitialLoading(false)
    }

    loadData()
  }, [])

  const states = [
    "AL",
    "AK",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "FL",
    "GA",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "OH",
    "OK",
    "OR",
    "PA",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ]

  const scholarshipTypes = ["need-based", "merit", "demographic", "program-specific", "geographic"]
  const programs = ["Engineering", "Computer Science", "Business", "Medicine", "Education", "Arts", "Mathematics"]
  const demographics = ["Women", "Hispanic", "African American", "Native American", "LGBTQ+", "First Generation"]

  useEffect(() => {
    if (scholarships.length > 0) {
      const filtered = filterScholarships(scholarships, filters, searchQuery)
      setFilteredScholarships(filtered)
      setDisplayedCount(25) // Reset to initial count when filters change
    }
  }, [scholarships, filters, searchQuery])

  const handleFilterChange = (filterType: keyof ScholarshipFilters, value: string, checked: boolean) => {
    setFilters((prev) => {
      const currentFilter = prev[filterType] || []
      if (checked) {
        return { ...prev, [filterType]: [...currentFilter, value] }
      } else {
        return { ...prev, [filterType]: currentFilter.filter((item) => item !== value) }
      }
    })
  }

  const clearFilters = () => {
    setFilters({})
    setSearchQuery("")
  }

  const loadMoreScholarships = () => {
    setLoading(true)
    setTimeout(() => {
      setDisplayedCount((prev) => prev + 30)
      setLoading(false)
    }, 500)
  }

  const getScholarshipIcon = (type: string) => {
    switch (type) {
      case "need-based":
        return <DollarSign className="w-5 h-5" />
      case "merit":
        return <Award className="w-5 h-5" />
      case "demographic":
        return <Users className="w-5 h-5" />
      case "program-specific":
        return <Award className="w-5 h-5" />
      case "geographic":
        return <MapPin className="w-5 h-5" />
      default:
        return <Award className="w-5 h-5" />
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

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1a3a] to-[#1a4b8c] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-2xl mb-4">Loading Scholarship Database...</div>
          <div className="text-white/70">Fetching scholarships from multiple sources...</div>
        </div>
      </div>
    )
  }

  // Use full filtered list for stats, but only display limited count
  const stats = getScholarshipStats(filteredScholarships)
  const displayedScholarships = filteredScholarships.slice(0, displayedCount)
  const hasMore = displayedCount < filteredScholarships.length

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-rose-100 to-slate-100 relative">
      <div className="absolute inset-0 hero-noise" aria-hidden="true" />
      <section className="relative flex flex-col justify-center items-start min-h-[75vh] section-padding overflow-hidden">
        <div className="absolute inset-0 z-0" id="parallax-bg" />
        <div className="mb-4">
          <HandwritingTitle
            words={["Scholarships", "Opportunities"]}
            accentColors={["#ffb3a7", "#f9c4d2"]}
            highlightColor="#a2c8ff"
            fontSize={120}
            highlightPath="M30 100 Q 150 10 250 100 L 350 30 Q 390 90 420 60"
          />
        </div>
      </section>
      <div className="container mx-auto section-padding">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#0a1a3a]">
          <span className="font-accent text-[#ffb3a7]">Find</span> Your Match
        </h2>
        {/* Search and Filter Section */}
        <SearchFilterBar
          searchValue={searchQuery}
          onSearchValueChange={setSearchQuery}
          onSearch={() => {}}
          onFilterClick={() => setShowFilters(!showFilters)}
          onClear={clearFilters}
          loading={loading}
          searchPlaceholder="Search scholarships, providers, or keywords..."
          buttonLabel="Search"
          extraFilters={showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-6 border-t border-white/20">
              {/* Location Filter */}
              <div>
                <h3 className="text-white font-semibold mb-3">Location</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {states.map((state) => (
                    <div key={state} className="flex items-center space-x-2">
                      <Checkbox
                        id={`location-${state}`}
                        checked={filters.location?.includes(state) || false}
                        onCheckedChange={(checked) => handleFilterChange("location", state, checked as boolean)}
                      />
                      <label htmlFor={`location-${state}`} className="text-white/80 text-sm">
                        {state}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Type Filter */}
              <div>
                <h3 className="text-white font-semibold mb-3">Type</h3>
                <div className="space-y-2">
                  {scholarshipTypes.map((type) => (
                    <div key={type} className="flex items-center space-x-2">
                      <Checkbox
                        id={`type-${type}`}
                        checked={filters.type?.includes(type) || false}
                        onCheckedChange={(checked) => handleFilterChange("type", type, checked as boolean)}
                      />
                      <label htmlFor={`type-${type}`} className="text-white/80 text-sm capitalize">
                        {type.replace("-", " ")}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Programs Filter */}
              <div>
                <h3 className="text-white font-semibold mb-3">Programs</h3>
                <div className="space-y-2">
                  {programs.map((program) => (
                    <div key={program} className="flex items-center space-x-2">
                      <Checkbox
                        id={`program-${program}`}
                        checked={filters.programs?.includes(program) || false}
                        onCheckedChange={(checked) => handleFilterChange("programs", program, checked as boolean)}
                      />
                      <label htmlFor={`program-${program}`} className="text-white/80 text-sm">
                        {program}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {/* Demographics Filter */}
              <div>
                <h3 className="text-white font-semibold mb-3">Demographics</h3>
                <div className="space-y-2">
                  {demographics.map((demo) => (
                    <div key={demo} className="flex items-center space-x-2">
                      <Checkbox
                        id={`demo-${demo}`}
                        checked={filters.demographics?.includes(demo) || false}
                        onCheckedChange={(checked) => handleFilterChange("demographics", demo, checked as boolean)}
                      />
                      <label htmlFor={`demo-${demo}`} className="text-white/80 text-sm">
                        {demo}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        />

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Award className="w-8 h-8 text-[#a2c8ff]" />
                <div>
                  <p className="text-2xl font-bold text-white">{stats.totalScholarships}</p>
                  <p className="text-white/70">Available Scholarships</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <DollarSign className="w-8 h-8 text-green-400" />
                <div>
                  <p className="text-2xl font-bold text-white">${stats.totalAmount.toLocaleString()}</p>
                  <p className="text-white/70">Total Funding Available</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-purple-400" />
                <div>
                  <p className="text-2xl font-bold text-white">{Object.keys(stats.typeDistribution).length}</p>
                  <p className="text-white/70">Scholarship Categories</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-white/70 text-center">
            Showing {displayedScholarships.length} of {filteredScholarships.length} scholarships
          </p>
        </div>

        {/* Scholarships Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayedScholarships.map((scholarship, idx) => (
            <Card key={scholarship.id} className="card-glass">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="flex-shrink-0">
                  {getScholarshipIcon(scholarship.type)}
                </div>
                <CardTitle className="text-xl font-semibold font-geist text-[#0a1a3a]">
                  {scholarship.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex flex-wrap gap-2 mb-2">
                  <Badge className={getScholarshipColor(scholarship.type)}>{scholarship.type}</Badge>
                  {scholarship.eligibility && (
                    <Badge className="bg-slate-200 text-slate-500 border-slate-300 font-barlow">{scholarship.eligibility}</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-barlow text-sm">
                  <DollarSign className="w-4 h-4" />
                  {scholarship.amount}
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-barlow text-sm">
                  <Calendar className="w-4 h-4" />
                  Deadline: {scholarship.deadline}
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-barlow text-sm">
                  <Users className="w-4 h-4" />
                  {Array.isArray(scholarship.demographics) ? scholarship.demographics.join(', ') : ''}
                </div>
                <Button asChild className="w-full mt-4">
                  <a href={scholarship.website} target="_blank" rel="noopener noreferrer">
                    View Details
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <Button onClick={loadMoreScholarships} disabled={loading}>
              {loading ? "Loading..." : "Load More"}
            </Button>
          </div>
        )}

        {filteredScholarships.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/70 text-xl">No scholarships found matching your criteria.</p>
            <p className="text-white/50 text-sm mt-2">Try adjusting your filters or search terms.</p>
          </div>
        )}
      </div>
    </div>
  )
}
