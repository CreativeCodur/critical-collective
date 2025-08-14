"use client"

import { Button } from "@/components/ui/button"

export function CareersHero() {
  return (
    <div className="relative">
      {/* White Speech Bubble */}
      <div className="bg-white rounded-3xl p-8 relative">
        <p className="text-lg text-black mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
          Join Critical Collective and help shape the future of truth. We seek bold, curious, and principled youth who are passionate about research, advocacy, and challenging misinformation.
        </p>
        <div className="flex space-x-4">
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white rounded-full px-4 text-sm bg-transparent"
            onClick={() => {
              const partTimeSection = document.getElementById("part-time-roles")
              partTimeSection?.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
          >
            Part-Time Positions
          </Button>
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white rounded-full px-4 text-sm bg-transparent"
            onClick={() => {
              const internshipSection = document.getElementById("internship-roles")
              internshipSection?.scrollIntoView({ behavior: "smooth", block: "start" })
            }}
          >
            Internships
          </Button>
        </div>
      </div>
    </div>
  )
}
