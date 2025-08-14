"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useRef, useState } from "react"

interface JobPosting {
  title: string
  type: string
  location: string
  description: string
}

export function CareersCarousel() {
  const internshipRef = useRef<HTMLDivElement>(null)
  const fullTimeRef = useRef<HTMLDivElement>(null)
  const [internships, setInternships] = useState<JobPosting[]>([])
  const [fullTimeRoles, setFullTimeRoles] = useState<JobPosting[]>([])
  const [loading, setLoading] = useState(true)

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
          
          // Extract full-time positions from column 1 (skip header row)
          const fullTimeTitles = rows.slice(1).map(row => row[1]).filter(title => title && title.trim() !== '')
          const fetchedFullTime: JobPosting[] = fullTimeTitles.map(title => ({
            title: title.replace(/^"|"$/g, ''),
            type: "Full-time",
            location: "Remote",
            description: `Join our team as a ${title.replace(/^"|"$/g, '')} and help us combat misinformation through professional expertise.`
          }))
          
          setInternships(fetchedInternships)
          setFullTimeRoles(fetchedFullTime)
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

    const internshipInterval = setInterval(() => {
      if (internshipRef.current) {
        autoScroll(internshipRef.current, 'left')
      }
    }, 16) // 60fps for smoother animation

    const fullTimeInterval = setInterval(() => {
      if (fullTimeRef.current) {
        autoScroll(fullTimeRef.current, 'right')
      }
    }, 16) // 60fps for smoother animation

    return () => {
      clearInterval(internshipInterval)
      clearInterval(fullTimeInterval)
    }
  }, [])

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
      <div id="internship-roles" className="mb-12 sm:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 px-4">Internship Opportunities</h2>
        <div 
          ref={internshipRef}
          className="flex overflow-x-hidden gap-3 sm:gap-6 py-4"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          {renderJobCards([...internships, ...internships, ...internships, ...internships])}
        </div>
      </div>

      <div id="full-time-roles">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 sm:mb-8 px-4">Full-Time Positions</h2>
        <div 
          ref={fullTimeRef}
          className="flex overflow-x-hidden gap-3 sm:gap-6 py-4"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          {renderJobCards([...fullTimeRoles, ...fullTimeRoles, ...fullTimeRoles, ...fullTimeRoles])}
        </div>
      </div>
    </div>
  )
}
