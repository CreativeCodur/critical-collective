"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import CollegeCard from "@/components/college-card"
import { searchColleges, type CollegeData } from "@/lib/college-api"
import SearchFilterBar from "@/components/search-filter-bar"
import HandwritingTitle from '@/components/HandwritingTitle'

export default function DirectoryPage() {
  const [colleges, setColleges] = useState<CollegeData[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [stateFilter, setStateFilter] = useState("all")
  const [ownershipFilter, setOwnershipFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = async () => {
    setLoading(true)
    try {
      const results = await searchColleges(searchTerm, stateFilter, ownershipFilter)
      setColleges(results)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    // Load initial colleges
    handleSearch()
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

  const clearFilters = () => {
    setSearchTerm("")
    setStateFilter("all")
    setOwnershipFilter("all")
    handleSearch()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-rose-100 to-slate-100 relative">
      <div className="absolute inset-0 hero-noise" aria-hidden="true" />
      <section className="relative flex flex-col justify-center items-start min-h-[75vh] section-padding overflow-hidden">
        <div className="absolute inset-0 z-0" id="parallax-bg" />
        <div className="mb-4">
          <HandwritingTitle
            words={["College", "Directory"]}
            accentColors={["#f9e7c4", "#ffb3a7"]}
            highlightColor="#a2c8ff"
            fontSize={120}
            highlightPath="M20 80 Q 120 20 220 80 L 320 20 Q 370 60 400 40"
          />
        </div>
      </section>
      <div className="container mx-auto section-padding">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#0a1a3a]">
          <span className="font-accent text-[#f9c4d2]">Explore</span> Colleges
        </h2>
        {/* Search Section */}
        <SearchFilterBar
          searchValue={searchTerm}
          onSearchValueChange={setSearchTerm}
          onSearch={handleSearch}
          onFilterClick={() => setShowFilters(!showFilters)}
          onClear={clearFilters}
          loading={loading}
          searchPlaceholder="Search colleges or locations..."
          buttonLabel="Search"
          extraFilters={showFilters ? (
            <div className="flex flex-col md:flex-row gap-4 mt-4">
              <Select value={stateFilter} onValueChange={setStateFilter}>
                <SelectTrigger className="h-12 rounded-full bg-white/80 border-none shadow-none text-[#0a1a3a] px-6 min-w-[120px] focus:ring-2 focus:ring-[#a2c8ff]">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All States</SelectItem>
                  {states.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={ownershipFilter} onValueChange={setOwnershipFilter}>
                <SelectTrigger className="h-12 rounded-full bg-white/80 border-none shadow-none text-[#0a1a3a] px-6 min-w-[120px] focus:ring-2 focus:ring-[#a2c8ff]">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="1">Public</SelectItem>
                  <SelectItem value="2">Private</SelectItem>
                  <SelectItem value="3">For-Profit</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={handleSearch} className="h-12 rounded-full px-8 bg-[#a2c8ff] hover:bg-[#a2c8ff]/90 text-[#0a1a3a] font-semibold shadow-none border-none text-base transition-all">
                Apply Filters
              </Button>
            </div>
          ) : null}
        />
        {/* Results */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-slate-400 text-xl">Searching colleges...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-slate-400 text-center">
                Found {colleges.length} colleges with scholarship and program opportunities
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {colleges.map((college) => (
                <CollegeCard key={college.id} college={college} />
              ))}
            </div>
          </>
        )}
        {!loading && colleges.length === 0 && (
          <div className="text-center py-12">
            <p className="text-slate-400 text-xl">No colleges found matching your criteria.</p>
            <p className="text-slate-400 text-sm mt-2">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}
