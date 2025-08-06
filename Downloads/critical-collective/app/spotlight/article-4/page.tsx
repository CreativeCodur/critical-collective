"use client"

import { BackButton } from "@/components/back-button"

export default function ArticlePage() {
  return (
    <section className="bg-white py-20 lg:py-32 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        <BackButton />
        <h1 className="text-4xl font-bold text-black mb-6" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Outleft. Outplay. Outlast. Outspeak.
        </h1>
        <div className="prose max-w-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
          <p className="text-lg text-gray-700 mb-6">
            Note: This piece contains spoilers. 
          </p>
          <p className="text-lg text-gray-700 mb-6">
            In an intense season of strategic gameplay and social dynamics, Chandler Dean emerged as a compelling figure on Survivor, demonstrating how principles of truth-telling and authentic communication can make a difference even in a game known for deception.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">From Bottom to Breakthrough</h2>
          <p className="text-lg text-gray-700 mb-6">
            Starting at the bottom of her tribe, Chandler's journey showcases how honest communication and genuine connections can transform one's position in both the game and life. Her story parallels the broader mission of speaking truth to power and building authentic relationships in challenging environments.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">The Power of Authentic Voice</h2>
          <p className="text-lg text-gray-700 mb-6">
            Throughout her time on the show, Chandler demonstrated that being true to oneself while navigating complex social situations is not just possible but can be a winning strategy. Her approach to the game offers valuable lessons for those fighting misinformation and advocating for truth in today's complex media landscape.
          </p>
          <h2 className="text-2xl font-bold text-black mb-4 mt-8">Lessons for Truth-Seekers</h2>
          <p className="text-lg text-gray-700 mb-6">
            The strategies and social dynamics displayed on Survivor can teach us important lessons about how truth and authenticity can prevail even in environments where deception is expected. These lessons have broader applications in our mission to combat misinformation and promote honest dialogue in society.
          </p>
        </div>
      </div>
    </section>
  )
}
