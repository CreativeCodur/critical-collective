"use client"

import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"

interface JobPosting {
  title: string
  type: string
  location: string
  description: string
}

const internships: JobPosting[] = [
  {
    title: "Research Intern",
    type: "Internship",
    location: "Remote",
    description: "Join our research team to analyze disinformation trends and develop counter-narratives."
  },
  {
    title: "Content Writing Intern",
    type: "Internship",
    location: "Remote",
    description: "Help create compelling content that promotes critical thinking and fact-based discourse."
  },
  {
    title: "Social Media Intern",
    type: "Internship",
    location: "Remote",
    description: "Help manage our social media presence and create engaging content to combat misinformation."
  },
  {
    title: "Data Analysis Intern",
    type: "Internship",
    location: "Remote",
    description: "Work with our team to analyze trends and patterns in digital misinformation."
  },
  {
    title: "Design Intern",
    type: "Internship",
    location: "Remote",
    description: "Create compelling visuals and infographics to help communicate complex ideas effectively."
  }
]

const fullTimeRoles: JobPosting[] = [
  {
    title: "Senior Researcher",
    type: "Full-time",
    location: "Hybrid",
    description: "Lead research initiatives and mentor junior team members in investigating complex topics."
  },
  {
    title: "Content Strategist",
    type: "Full-time",
    location: "Remote",
    description: "Develop and execute content strategies that advance our mission of promoting truth and critical thinking."
  },
  {
    title: "Data Scientist",
    type: "Full-time",
    location: "Remote",
    description: "Apply advanced analytics and machine learning to detect and analyze misinformation patterns."
  },
  {
    title: "Community Manager",
    type: "Full-time",
    location: "Remote",
    description: "Build and nurture our community of truth-seekers and manage our social media presence."
  },
  {
    title: "Editorial Director",
    type: "Full-time",
    location: "Hybrid",
    description: "Guide our editorial strategy and ensure high-quality content across all platforms."
  }
]

export function CareersCarousel() {
  const internshipRef = useRef<HTMLDivElement>(null)
  const fullTimeRef = useRef<HTMLDivElement>(null)

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
