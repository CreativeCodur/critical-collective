"use client"

import Image from "next/image"
import { Hash } from "lucide-react"

const campusGuides = [
  {
    id: 1,
    title: "Dorm Room Essentials",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["#DormHacks", "#Freshman", "#Organization"],
    description: "Everything you need to make your dorm feel like home",
  },
  {
    id: 2,
    title: "Study Abroad Adventures",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["#StudyAbroad", "#Travel", "#Culture"],
    description: "Navigate international education opportunities",
  },
  {
    id: 3,
    title: "Campus Dining Guide",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["#FoodHacks", "#Budget", "#Nutrition"],
    description: "Make the most of your meal plan and campus dining",
  },
  {
    id: 4,
    title: "Greek Life 101",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["#GreekLife", "#Social", "#Leadership"],
    description: "Everything about fraternities and sororities",
  },
  {
    id: 5,
    title: "Internship Success",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["#Internships", "#Career", "#Networking"],
    description: "Land your dream internship with these tips",
  },
  {
    id: 6,
    title: "Campus Safety Tips",
    image: "/placeholder.svg?height=300&width=400",
    tags: ["#Safety", "#Security", "#Awareness"],
    description: "Stay safe and aware on campus",
  },
]

export default function CampusLifePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1a3a] to-[#1a4b8c]">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl font-bold text-white text-center mb-12">Campus Life Guides</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campusGuides.map((guide) => (
            <div key={guide.id} className="group cursor-pointer">
              {/* Polaroid-style card */}
              <div className="bg-white p-4 rounded-lg shadow-lg transform rotate-1 group-hover:rotate-0 transition-transform duration-300 hover:shadow-2xl">
                <div className="relative overflow-hidden rounded-md mb-4">
                  <Image
                    src={guide.image || "/placeholder.svg"}
                    alt={guide.title}
                    width={400}
                    height={300}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Ripped paper effect */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-white opacity-80 clip-path-[polygon(0_0,100%_0,95%_100%,5%_100%)]" />
                </div>

                <h3 className="text-xl font-bold text-[#0a1a3a] mb-2 font-handwriting">{guide.title}</h3>

                <p className="text-gray-600 text-sm mb-3">{guide.description}</p>

                <div className="flex flex-wrap gap-1">
                  {guide.tags.map((tag, index) => (
                    <span key={index} className="inline-flex items-center text-xs text-[#a2c8ff] font-medium">
                      <Hash className="w-3 h-3 mr-1" />
                      {tag.slice(1)}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
