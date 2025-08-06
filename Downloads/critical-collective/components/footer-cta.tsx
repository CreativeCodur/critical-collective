import { Button } from "@/components/ui/button"

export function FooterCTA() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Let's Collaborate */}
          <div className="bg-blue-200 p-12 relative">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Collaborate With Us
              </h3>
              <p className="text-gray-800 mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                Partner with Critical Collective to advance truth, challenge misinformation, and foster critical thinking. Reach out to discuss research, advocacy, or educational initiatives.
              </p>
              {/* Removed Contact Us button as per request */}
            </div>
            {/* Decorative curve */}
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-teal-600 rounded-full transform translate-x-16 translate-y-16"></div>
          </div>

          {/* Join Our Team */}
          <div className="bg-gray-100 p-12 relative">
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Join Our Team
              </h3>
              <p className="text-gray-800 mb-6 leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                Explore opportunities to join a youth-led movement for truth. We welcome bold, curious, and principled individuals ready to make an impact.
              </p>
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white rounded-full px-6 bg-transparent"
                onClick={() => window.location.href = '/contact'}
              >
                Introduce Yourself Here
              </Button>
            </div>
            {/* Decorative curve */}
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-400 rounded-full transform -translate-x-16 translate-y-16"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
