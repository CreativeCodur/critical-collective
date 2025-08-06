"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, ExternalLink, Calendar, DollarSign, Users, Award } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { searchColleges, fetchCollegeById, type CollegeData } from "@/lib/college-api"
import { getCollegeOpportunities, type OpportunityType, type CollegeCategory } from "@/lib/college-categories"
import ScholarshipSuggestions from "@/components/scholarship-suggestions"
import HandwritingTitle from "../../../components/HandwritingTitle"

export default function CollegePage() {
  const params = useParams()
  const [college, setCollege] = useState<CollegeData | null>(null)
  const [opportunities, setOpportunities] = useState<{
    categories: CollegeCategory[]
    stateOpportunities: OpportunityType[]
    totalOpportunities: number
  } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCollege = async () => {
      try {
        // First try to fetch by ID directly from the API
        const foundCollege = await fetchCollegeById(params.id as string)

        if (foundCollege) {
          setCollege(foundCollege)
          const collegeOpportunities = getCollegeOpportunities(foundCollege)
          setOpportunities(collegeOpportunities)
        } else {
          // Fallback: search all colleges and find by ID
          const colleges = await searchColleges("", "", "")
          const fallbackCollege = colleges.find((c) => c.id.toString() === params.id)

          if (fallbackCollege) {
            setCollege(fallbackCollege)
            const collegeOpportunities = getCollegeOpportunities(fallbackCollege)
            setOpportunities(collegeOpportunities)
          }
        }
      } catch (error) {
        console.error("Error loading college:", error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      loadCollege()
    }
  }, [params.id])

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

  const formatTuition = (tuition: number) => {
    if (tuition === 0) return "N/A"
    return `$${tuition.toLocaleString()}`
  }

  const getOpportunityIcon = (type: string) => {
    switch (type) {
      case "scholarship":
        return <DollarSign className="w-5 h-5" />
      case "fellowship":
        return <Award className="w-5 h-5" />
      case "program":
        return <Users className="w-5 h-5" />
      case "benefit":
        return <ExternalLink className="w-5 h-5" />
      default:
        return <Award className="w-5 h-5" />
    }
  }

  const getOpportunityColor = (type: string) => {
    switch (type) {
      case "scholarship":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "fellowship":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30"
      case "program":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30"
      case "benefit":
        return "bg-orange-500/20 text-orange-400 border-orange-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1a3a] to-[#1a4b8c] flex items-center justify-center">
        <div className="text-white text-xl">Loading college information...</div>
      </div>
    )
  }

  if (!college || !opportunities) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1a3a] to-[#1a4b8c] flex items-center justify-center">
        <div className="text-center">
          <div className="text-white text-xl mb-4">College not found</div>
          <Link href="/directory">
            <Button className="bg-[#a2c8ff] hover:bg-[#a2c8ff]/90 text-[#0a1a3a]">Back to Directory</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-rose-100 to-slate-100 relative">
      <div className="absolute inset-0 hero-noise" aria-hidden="true" />
      <section className="relative flex flex-col justify-center items-start min-h-[75vh] section-padding overflow-hidden">
        <div className="absolute inset-0 z-0" id="parallax-bg" />
        <div className="hero-title-wrapper mb-4">
          <HandwritingTitle
            words={[college.name]}
            accentColors={["#111"]}
            highlightColor="#a2c8ff"
            fontSize={120}
            showHighlight={false}
          />
        </div>
      </section>
      <div className="container mx-auto section-padding">
        <div className="mb-8">
          <Link href="/directory">
            <Button variant="ghost" className="text-[#111] hover:text-[#ffb3a7] mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Directory
            </Button>
          </Link>
        </div>
        <div className="card-glass rounded-2xl p-8 mb-8 border border-white/10 backdrop-blur-md shadow-lg">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-[#111] mb-4 font-geist">
                <span className="font-accent text-[#111]">{college.name}</span>
              </h2>
              <p className="text-[#111] text-xl mb-4 font-barlow">
                {college.city}, {college.state}
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 font-barlow">
                  {getOwnershipType(college.ownership)}
                </Badge>
                {opportunities.categories.map((category) => (
                  <Badge key={category.id} className="bg-purple-500/20 text-purple-400 border-purple-500/30 font-barlow">
                    {category.name}
                  </Badge>
                ))}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[#111]">
                <div>
                  <div className="text-sm text-[#888] font-barlow">Students</div>
                  <div className="font-semibold">{college.studentSize.toLocaleString()}</div>
                </div>
                {college.admissionRate && (
                  <div>
                    <div className="text-sm text-[#888] font-barlow">Acceptance Rate</div>
                    <div className="font-semibold">{college.admissionRate}%</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-[#888] font-barlow">Out-of-State Tuition</div>
                  <div className="font-semibold">{formatTuition(college.tuitionOutState)}</div>
                </div>
                <div>
                  <div className="text-sm text-[#888] font-barlow">Total Opportunities</div>
                  <div className="font-semibold text-[#ffb3a7]">{opportunities.totalOpportunities}</div>
                </div>
              </div>
            </div>
            {college.website && (
              <div className="mt-6 md:mt-0">
                <a
                  href={college.website.startsWith("http") ? college.website : `https://${college.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#ffb3a7] hover:bg-[#f9c4d2] text-[#0a1a3a] px-6 py-3 rounded-lg font-semibold transition-colors font-barlow"
                >
                  Visit Website
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </div>
            )}
          </div>
        </div>
                {/* Scholarship Suggestions */}
                <div className="mt-8">
          <ScholarshipSuggestions college={college} />
        </div>
        <br></br>
        <br></br>
        {/* Opportunities Tabs */}
        <Tabs defaultValue="categories" className="space-y-6">
          <TabsList className="bg-white/10 border border-white/20 card-glass">
            <TabsTrigger
              value="categories"
              className="data-[state=active]:bg-[#a2c8ff] data-[state=active]:text-[#0a1a3a]"
            >
              Category Opportunities
            </TabsTrigger>
            <TabsTrigger value="state" className="data-[state=active]:bg-[#a2c8ff] data-[state=active]:text-[#0a1a3a]">
              State-Specific ({opportunities.stateOpportunities.length})
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-[#a2c8ff] data-[state=active]:text-[#0a1a3a]">
              All Opportunities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="categories" className="space-y-6">
            {opportunities.categories.map((category) => (
              <Card key={category.id} className="bg-white/10 backdrop-blur-sm border-white/20">
                <CardHeader>
                  <CardTitle className="text-[#111] text-2xl">{category.name}</CardTitle>
                  <CardDescription className="text-[#111]/70">{category.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {category.opportunities.map((opportunity) => (
                      <div key={opportunity.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getOpportunityIcon(opportunity.type)}
                            <h4 className="text-[#111] font-semibold text-lg">{opportunity.title}</h4>
                          </div>
                          <Badge className={getOpportunityColor(opportunity.type)}>{opportunity.type}</Badge>
                        </div>

                        <p className="text-[#111] mb-3">{opportunity.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm">
                          {opportunity.amount && (
                            <div className="flex items-center text-[#a2c8ff]">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {opportunity.amount}
                            </div>
                          )}
                          {opportunity.deadline && (
                            <div className="flex items-center text-[#111]">
                              <Calendar className="w-4 h-4 mr-1" />
                              {opportunity.deadline}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {opportunity.eligibility.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-white/30 text-[#111]/70">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="state" className="space-y-6">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <CardTitle className="text-[#111] text-2xl">{college.state} State Opportunities</CardTitle>
                <CardDescription className="text-[#111]/70">
                  Scholarships and benefits available to {college.state} residents
                </CardDescription>
              </CardHeader>
              <CardContent>
                {opportunities.stateOpportunities.length > 0 ? (
                  <div className="grid gap-4">
                    {opportunities.stateOpportunities.map((opportunity) => (
                      <div key={opportunity.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getOpportunityIcon(opportunity.type)}
                            <h4 className="text-[#111] font-semibold text-lg">{opportunity.title}</h4>
                          </div>
                          <Badge className={getOpportunityColor(opportunity.type)}>{opportunity.type}</Badge>
                        </div>

                        <p className="text-[#111] mb-3">{opportunity.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm">
                          {opportunity.amount && (
                            <div className="flex items-center text-[#a2c8ff]">
                              <DollarSign className="w-4 h-4 mr-1" />
                              {opportunity.amount}
                            </div>
                          )}
                          {opportunity.deadline && (
                            <div className="flex items-center text-[#111]">
                              <Calendar className="w-4 h-4 mr-1" />
                              {opportunity.deadline}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {opportunity.eligibility.map((req, index) => (
                            <Badge key={index} variant="outline" className="text-xs border-white/30 text-[#111]/70">
                              {req}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-[#111]/70">No state-specific opportunities found for {college.state}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6">
              {/* All category opportunities */}
              {opportunities.categories.map((category) =>
                category.opportunities.map((opportunity) => (
                  <div
                    key={`${category.id}-${opportunity.id}`}
                    className="bg-white/5 rounded-lg p-4 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        {getOpportunityIcon(opportunity.type)}
                        <div>
                          <h4 className="text-[#111] font-semibold text-lg">{opportunity.title}</h4>
                          <p className="text-[#a2c8ff] text-sm">{category.name}</p>
                        </div>
                      </div>
                      <Badge className={getOpportunityColor(opportunity.type)}>{opportunity.type}</Badge>
                    </div>

                    <p className="text-[#111] mb-3">{opportunity.description}</p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      {opportunity.amount && (
                        <div className="flex items-center text-[#a2c8ff]">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {opportunity.amount}
                        </div>
                      )}
                      {opportunity.deadline && (
                        <div className="flex items-center text-[#111]">
                          <Calendar className="w-4 h-4 mr-1" />
                          {opportunity.deadline}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {opportunity.eligibility.map((req, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-white/30 text-[#111]/70">
                          {req}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )),
              )}

              {/* State opportunities */}
              {opportunities.stateOpportunities.map((opportunity) => (
                <div key={`state-${opportunity.id}`} className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getOpportunityIcon(opportunity.type)}
                      <div>
                        <h4 className="text-[#111] font-semibold text-lg">{opportunity.title}</h4>
                        <p className="text-[#a2c8ff] text-sm">{college.state} State Opportunity</p>
                      </div>
                    </div>
                    <Badge className={getOpportunityColor(opportunity.type)}>{opportunity.type}</Badge>
                  </div>

                  <p className="text-[#111] mb-3">{opportunity.description}</p>

                  <div className="flex flex-wrap gap-4 text-sm">
                    {opportunity.amount && (
                      <div className="flex items-center text-[#a2c8ff]">
                        <DollarSign className="w-4 h-4 mr-1" />
                        {opportunity.amount}
                      </div>
                    )}
                    {opportunity.deadline && (
                      <div className="flex items-center text-[#111]">
                        <Calendar className="w-4 h-4 mr-1" />
                        {opportunity.deadline}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1 mt-3">
                    {opportunity.eligibility.map((req, index) => (
                      <Badge key={index} variant="outline" className="text-xs border-white/30 text-[#111]/70">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
