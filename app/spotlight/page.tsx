"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { sanitizeInput, sanitizeUrl, validateSheetId } from "@/lib/sanitize"

interface Article {
  title: string
  content: string
  image: string
  id: string
}

export default function SpotlightPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const SHEET_ID = '1v2Ji1p66H8C9X1q056xlHbC-0cjD92QddfEXzQFDM7k'
        if (!validateSheetId(SHEET_ID)) {
          throw new Error('Invalid sheet ID')
        }
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
          const fetchedArticles: Article[] = []
          
          // Skip header row (index 0) and process data rows
          for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
            const title = rows[rowIndex]?.[0] || ''
            const content = rows[rowIndex]?.[1] || ''
            const image = rows[rowIndex]?.[2] || ''
            
            if (title.trim() !== '') {
              const cleanImage = image.replace(/^"|"$/g, '')
              fetchedArticles.push({
                title: sanitizeInput(title.replace(/^"|"$/g, '')),
                content: sanitizeInput(content.replace(/^"|"$/g, '')),
                image: cleanImage ? sanitizeUrl(cleanImage) : '',
                id: sanitizeInput(title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
              })
            }
          }
          
          setArticles(fetchedArticles.reverse())
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.max(1, articles.length - 2))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.max(1, articles.length - 2)) % Math.max(1, articles.length - 2))
  }

  const getExcerpt = (content: string) => {
    return content.length > 150 ? content.substring(0, 150) + '...' : content
  }

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
        Critical Collective shines a light on misinformation, challenges false narratives, and celebrates the pursuit of truth. Discover articles, essays, and resources that empower youth and the public to think critically and engage boldly.        
              </p>
            </div>
          </div>
        </section>

        {/* Articles Carousel */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            {loading ? (
              <div className="text-center py-12">
                <p className="text-gray-600">Loading articles...</p>
              </div>
            ) : articles.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No articles available at the moment.</p>
              </div>
            ) : (
              <div className="relative">
                {/* Carousel Controls */}
                {articles.length > 3 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white border border-gray-300 rounded-full p-2 shadow-lg hover:bg-gray-50"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
                
                {/* Articles Grid */}
                <div className="overflow-hidden mx-8">
                  <div 
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
                  >
                    {articles.map((article, index) => (
                      <div key={index} className="w-1/3 flex-shrink-0 px-2">
                        <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow h-full">
                          <div className="bg-yellow-300 px-3 py-1">
                            <span className="text-xs font-bold text-black">ARTICLE</span>
                          </div>
                          <div className="bg-gray-100 h-48 flex items-center justify-center overflow-hidden">
                            {article.image ? (
                              <img 
                                src={article.image} 
                                alt={article.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-gray-500 text-sm">Article Image</span>
                            )}
                          </div>
                          <div className="p-4 flex flex-col flex-grow">
                            <h3 className="font-bold text-black mb-2 text-sm leading-tight">{article.title}</h3>
                            <p className="text-xs text-gray-600 mb-3 leading-relaxed flex-grow">{getExcerpt(article.content)}</p>
                            <Link href={`/spotlight/${article.id}`}>
                              <Button
                                variant="outline"
                                size="sm"
                                className="border-black text-black hover:bg-black hover:text-white rounded-full px-4 text-xs bg-transparent w-full"
                              >
                                Read More
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* SpeakEasy Section */}
        <section className="py-12 sm:py-16 md:py-20 bg-white relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-6 sm:mb-8">Find The Truth</h2>
              </div>
              <div className="relative">
                {/* Large Brown Speech Bubble */}
                <div className="bg-amber-700 rounded-3xl p-6 sm:p-8 text-white relative">
                  <p className="text-base sm:text-lg leading-relaxed">
                    At Critical Collective, you'll find a rotating cast of Opportunities, Outside Experts, and Professionals who are
                    serious about Advocacy—and just about nothing else.
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
