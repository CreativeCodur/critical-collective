"use client"

import { BackButton } from "@/components/back-button"

export default function ArticlePage() {
  return (
    <section className="bg-white py-20 lg:py-32 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        <BackButton />
        <h1 className="text-4xl font-bold text-black mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          The New York Times: Gen Z's Fight for Digital Truth
        </h1>
        <div className="prose max-w-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <p className="text-lg text-gray-700 mb-6">
            In an unprecedented era of information overload, Generation Z is stepping up to the challenge of distinguishing fact from fiction. Critical Collective exemplifies this generation's commitment to truth and transparency in the digital age.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">A New Approach to Truth-Seeking</h2>
          <p className="text-lg text-gray-700 mb-6">
            Critical Collective's innovative methodology combines traditional fact-checking with modern digital tools and social media awareness, creating a comprehensive approach to truth verification that resonates with today's digital landscape.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">Impact and Reach</h2>
          <p className="text-lg text-gray-700 mb-6">
            Through its network of young researchers and fact-checkers, Critical Collective has successfully debunked numerous viral misconceptions and provided accurate, well-researched information to millions of readers worldwide.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">The Future of Fact-Checking</h2>
          <p className="text-lg text-gray-700 mb-6">
            As disinformation becomes increasingly sophisticated, organizations like Critical Collective demonstrate how youth-led initiatives can lead the way in protecting truth and promoting critical thinking in the digital age.
          </p>
        </div>
      </div>
    </section>
  )
}
