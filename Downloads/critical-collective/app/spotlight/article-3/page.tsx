"use client"

import { BackButton } from "@/components/back-button"

export default function ArticlePage() {
  return (
    <section className="bg-white py-20 lg:py-32 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        <BackButton />
        <h1 className="text-4xl font-bold text-black mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          SXSW: Innovation in Digital Truth-Seeking
        </h1>
        <div className="prose max-w-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <p className="text-lg text-gray-700 mb-6">
            At SXSW 2025, Critical Collective showcased groundbreaking approaches to combating digital misinformation through youth-led initiatives. Their presentation highlighted innovative methods for engaging young people in the fight for digital truth.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">Technology Meets Truth</h2>
          <p className="text-lg text-gray-700 mb-6">
            Critical Collective demonstrated new tools and methodologies that combine artificial intelligence with human insight to identify and counter misinformation more effectively than ever before.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">Community Engagement</h2>
          <p className="text-lg text-gray-700 mb-6">
            The organization's success in building a network of young truth-seekers and fact-checkers has created a model for youth engagement in digital literacy and critical thinking.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">Recognition and Impact</h2>
          <p className="text-lg text-gray-700 mb-6">
            Critical Collective's innovative approach earned recognition at SXSW, highlighting the essential role of youth leadership in shaping the future of digital truth and transparency.
          </p>
        </div>
      </div>
    </section>
  )
}
