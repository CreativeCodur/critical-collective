"use client"

import { BackButton } from "@/components/back-button"

export default function ArticlePage() {
  return (
    <section className="bg-white py-20 lg:py-32 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        <BackButton />
        <h1 className="text-4xl font-bold text-black mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          The New Yorker: Youth Perspectives on Digital Misinformation
        </h1>
        <div className="prose max-w-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <p className="text-lg text-gray-700 mb-6">
            In an era where digital literacy has become as crucial as traditional reading and writing, youth-led organizations are taking the helm in combating misinformation. Critical Collective stands at the forefront of this movement, bringing fresh perspectives and innovative approaches to fact-checking and digital truth-seeking.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">The Digital Native Advantage</h2>
          <p className="text-lg text-gray-700 mb-6">
            As digital natives, today's youth possess an intuitive understanding of online platforms and their dynamics. This natural fluency, combined with critical thinking skills, creates a powerful force for truth in the digital age.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">Building Digital Resilience</h2>
          <p className="text-lg text-gray-700 mb-6">
            Through peer-to-peer education and community engagement, young fact-checkers are developing new methodologies for verifying information and building digital resilience in their communities.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">Looking Forward</h2>
          <p className="text-lg text-gray-700 mb-6">
            As we continue to navigate the challenges of digital misinformation, the role of youth-led organizations like Critical Collective becomes increasingly vital. Their work not only addresses current challenges but helps shape a more discerning and truthful digital future.
          </p>
        </div>
      </div>
    </section>
  )
}
