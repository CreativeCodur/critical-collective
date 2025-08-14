"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface JobPosting {
  title: string
  type: string
  location: string
  description: string
}

export function CareersCarousel() {
  const internshipRef = useRef<HTMLDivElement>(null)
  const partTimeRef = useRef<HTMLDivElement>(null)
  const [internships, setInternships] = useState<JobPosting[]>([])
  const [partTimeRoles, setPartTimeRoles] = useState<JobPosting[]>([])
  const [loading, setLoading] = useState(true)
  const [internshipAutoScroll, setInternshipAutoScroll] = useState(true)
  const [partTimeAutoScroll, setPartTimeAutoScroll] = useState(true)

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const SHEET_ID = '1n8qKUFx2y_MO5tC9lGbWoJMNygJPwhZly-p5PAAni3U'
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
          // Extract internships from column 0 (skip header row)
          const internshipTitles = rows.slice(1).map(row => row[0]).filter(title => title && title.trim() !== '')
          const fetchedInternships: JobPosting[] = internshipTitles.map(title => ({
            title: title.replace(/^"|"$/g, ''),
            type: "Internship",
            location: "Remote",
            description: `Join our team as a ${title.replace(/^"|"$/g, '')} and contribute to our mission of promoting critical thinking.`
          }))
          
          // Extract part-time positions from column 1 (skip header row)
          const partTimeTitles = rows.slice(1).map(row => row[1]).filter(title => title && title.trim() !== '')
          const fetchedPartTime: JobPosting[] = partTimeTitles.map(title => ({
            title: title.replace(/^"|"$/g, ''),
            type: "Part-time",
            location: "Remote",
            description: `Join our team as a ${title.replace(/^"|"$/g, '')} and help us combat misinformation through professional expertise.`
          }))
          
          setInternships(fetchedInternships)
          setPartTimeRoles(fetchedPartTime)
        }
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [])

  useEffect(() => {
    const autoScroll = (element: HTMLDivElement, direction: 'left' | 'right') => {
      const scrollAmount = direction === 'left' ? -0.5 : 0.5
      element.scrollLeft += scrollAmount

      if (direction === 'left' && element.scrollLeft <= 0) {
        element.scrollLeft = element.scrollWidth / 2
      } else if (direction === 'right' && element.scrollLeft >= element.scrollWidth - element.clientWidth) {
        element.scrollLeft = element.scrollWidth / 4
      }
    }

    const internshipInterval = internshipAutoScroll ? setInterval(() => {
      if (internshipRef.current) {
        autoScroll(internshipRef.current, 'left')
      }
    }, 16) : null

    const partTimeInterval = partTimeAutoScroll ? setInterval(() => {
      if (partTimeRef.current) {
        autoScroll(partTimeRef.current, 'right')
      }
    }, 16) : null

    return () => {
      if (internshipInterval) clearInterval(internshipInterval)
      if (partTimeInterval) clearInterval(partTimeInterval)
    }
  }, [internshipAutoScroll, partTimeAutoScroll])

  const scrollInternships = (direction: 'left' | 'right') => {
    if (internshipRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      internshipRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const scrollPartTime = (direction: 'left' | 'right') => {
    if (partTimeRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300
      partTimeRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const renderJobCards = (jobs: JobPosting[]) => {
    return jobs.map((job, index) => (
      <Card key={index} className="min-w-[280px] sm:min-w-[300px] md:min-w-[320px] p-4 sm:p-6 mx-2 sm:mx-4 backdrop-blur-md bg-white/30 border-none shadow-lg hover:shadow-xl transition-all">
        <h3 className="text-lg sm:text-xl font-bold mb-2">{job.title}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mb-1">{job.type}</p>
        <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4">{job.location}</p>
        <p className="text-xs sm:text-sm mb-3 sm:mb-4">{job.description}</p>
        <Button
          onClick={() => {
            window.location.href = '/contact'
          }}
          variant="outline"
          className="w-full text-sm sm:text-base"
        >
          Apply Now
        </Button>
      </Card>
    ))
  }

  if (loading) {
    return (
      <div className="py-12 sm:py-16 md:py-20">
        <div className="text-center">
          <p className="text-gray-600">Loading career opportunities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="py-12 sm:py-16 md:py-20">
      <div id="internship-roles" className="mb-12 sm:mb-16 relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 px-4">Internship Opportunities</h2>
        <div className="relative">
          <button
            onClick={() => scrollInternships('left')}
            onMouseEnter={() => setInternshipAutoScroll(false)}
            onMouseLeave={() => setInternshipAutoScroll(true)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollInternships('right')}
            onMouseEnter={() => setInternshipAutoScroll(false)}
            onMouseLeave={() => setInternshipAutoScroll(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div 
            ref={internshipRef}
            className="flex overflow-x-hidden gap-3 sm:gap-6 py-4"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
            onMouseEnter={() => setInternshipAutoScroll(false)}
            onMouseLeave={() => setInternshipAutoScroll(true)}
          >
            {renderJobCards([...internships, ...internships, ...internships, ...internships])}
          </div>
        </div>
      </div>

      <div id="part-time-roles" className="relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 px-4">Part-Time Positions</h2>
        <div className="relative">
          <button
            onClick={() => scrollPartTime('left')}
            onMouseEnter={() => setPartTimeAutoScroll(false)}
            onMouseLeave={() => setPartTimeAutoScroll(true)}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scrollPartTime('right')}
            onMouseEnter={() => setPartTimeAutoScroll(false)}
            onMouseLeave={() => setPartTimeAutoScroll(true)}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div 
            ref={partTimeRef}
            className="flex overflow-x-hidden gap-3 sm:gap-6 py-4"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
            onMouseEnter={() => setPartTimeAutoScroll(false)}
            onMouseLeave={() => setPartTimeAutoScroll(true)}
          >
            {renderJobCards([...partTimeRoles, ...partTimeRoles, ...partTimeRoles, ...partTimeRoles])}
          </div>
        </div>
      </div>
    </div>
  )
}
