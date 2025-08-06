import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function SpotlightPage() {
  const articles = [
    {
      category: "RESEARCH",
      title: "The Evolution of Digital Misinformation in 2025",
      excerpt:
        "Our latest research reveals emerging patterns in digital misinformation and proposes new strategies for combating false narratives in the modern age.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/spotlight/article-1",
    },
    {
      category: "ANALYSIS",
      title: "Youth-Led Fact-Checking: A New Paradigm",
      excerpt:
        "How Gen Z is revolutionizing the approach to truth verification and why their perspective is crucial in the fight against misinformation.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/spotlight/article-2",
    },
    {
      category: "INNOVATION",
      title: "AI and Truth: Building Better Verification Tools",
      excerpt:
        "Exploring how artificial intelligence can be leveraged to enhance fact-checking processes while maintaining human oversight and ethical considerations.",
      image: "/placeholder.svg?height=200&width=300",
      link: "/spotlight/article-3",
    },
    {
      category: "NEWS",
      title: "Outleft. Outplay. Outlast. Outspeak.",
      excerpt:
        "Note: This piece contains spoilers. Chandler Dean served as the bottom of her tribe of Survivor at the bottom of her tribe...",
      image: "/placeholder.svg?height=200&width=300",
      link: "/spotlight/article-4",
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main>
        {/* Hero Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-yellow-300 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold text-black mb-4 sm:mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Spotlight
              </h1>
              <p className="text-base sm:text-lg text-black max-w-xl sm:max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
                Explore our latest research, analysis, and commentary. Critical Collective shines a light on misinformation, challenges false narratives, and celebrates the pursuit of truth. Discover articles, essays, and resources that empower youth and the public to think critically and engage boldly.
              </p>
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
              {articles.map((article, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="bg-yellow-300 px-3 py-1">
                    <span className="text-xs font-bold text-black">{article.category}</span>
                  </div>
                  <img
                    src={article.image || "/placeholder.svg"}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-bold text-black mb-2 text-sm leading-tight">{article.title}</h3>
                    <p className="text-xs text-gray-600 mb-3 leading-relaxed">{article.excerpt}</p>
                    <Link href={article.link}>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-black text-black hover:bg-black hover:text-white rounded-full px-4 text-xs bg-transparent"
                      >
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SpeakEasy Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8">SpeakEasy</h2>
              </div>
              <div className="relative">
                {/* Large Brown Speech Bubble */}
                <div className="bg-amber-700 rounded-3xl p-6 sm:p-8 text-white relative">
                  <p className="text-base sm:text-lg leading-relaxed">
                    At SpeakEasy, you'll find a rotating cast of West Wingers, outside experts, and comedians who are
                    serious about speechwriting—and just about nothing else.
                  </p>
                  {/* Speech bubble tail */}
                  <div className="absolute -left-4 top-8 w-6 sm:w-8 h-6 sm:h-8 bg-amber-700 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
