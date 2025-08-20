"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { sanitizeInput, sanitizeUrl, validateSheetId } from "@/lib/sanitize"

interface Article {
  title: string
  content: string
  image: string
  id: string
}

export function SpotlightSection() {
  const router = useRouter()
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const SHEET_ID = '1v2Ji1p66H8C9X1q056xlHbC-0cjD92QddfEXzQFDM7k'
        if (!validateSheetId(SHEET_ID)) {
          throw new Error('Invalid sheet ID')
        }
        const response = await fetch(`/api/sheets?sheetId=${SHEET_ID}`)
        
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
          
          setArticles(fetchedArticles.reverse().slice(0, 3))
        }
      } catch (error) {
        console.error('Error fetching articles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])
  return (
    <section id="spotlight" className="py-20 bg-yellow-300 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-black mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            Insights
          </h2>
          <p className="text-lg text-black max-w-2xl mx-auto leading-relaxed" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
           Discover our insights into today — and tomorrow's — most critical challenges to break through the noise and make sense of the chaos. From news articles & op-eds to podcast episodes and social media content, we have you covered.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {loading ? (
            <div className="col-span-3 text-center py-8">
              <p className="text-black">Loading latest articles...</p>
            </div>
          ) : (
            articles.map((article, index) => (
              <div key={index} className="text-center">
                <Link href={`/spotlight/${article.id}`} className="block bg-white p-6 rounded-lg shadow-sm transition hover:shadow-md h-full">
                  <div className="bg-gray-100 h-32 mb-4 rounded overflow-hidden">
                    {article.image ? (
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm">
                        Article Image
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-black mb-2 text-sm leading-tight line-clamp-2">{article.title}</h3>
                  <p className="text-xs text-gray-600 line-clamp-3">
                    {article.content.length > 100 ? article.content.substring(0, 100) + '...' : article.content}
                  </p>
                </Link>
              </div>
            ))
          )}
        </div>

        <div className="text-center">
          <Button
            variant="outline"
            className="border-black text-black hover:bg-black hover:text-white rounded-full px-8 py-3 bg-transparent"
            onClick={() => router.push('/contact')}
          >
            Explore Our Thinking
          </Button>
        </div>
      </div>

      {/* Background Triangle */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-white transform -skew-y-2 origin-bottom-left"></div>
    </section>
  )
}
