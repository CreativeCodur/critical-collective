"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackButton } from "@/components/back-button"
import { useParams } from "next/navigation"

interface Article {
  title: string
  content: string
  image: string
  id: string
}

export default function ArticlePage() {
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const SHEET_ID = '1v2Ji1p66H8C9X1q056xlHbC-0cjD92QddfEXzQFDM7k'
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
          const articles: Article[] = []
          
          for (let rowIndex = 1; rowIndex < rows.length; rowIndex++) {
            const title = rows[rowIndex]?.[0] || ''
            const content = rows[rowIndex]?.[1] || ''
            const image = rows[rowIndex]?.[2] || ''
            
            if (title.trim() !== '') {
              articles.push({
                title: title.replace(/^"|"$/g, ''),
                content: content.replace(/^"|"$/g, ''),
                image: image.replace(/^"|"$/g, ''),
                id: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
              })
            }
          }
          
          const foundArticle = articles.find(a => a.id === params.id)
          setArticle(foundArticle || null)
        }
      } catch (error) {
        console.error('Error fetching article:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchArticle()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <p className="text-center text-gray-600">Loading article...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="py-20">
          <div className="max-w-4xl mx-auto px-6">
            <BackButton />
            <div className="text-center mt-12">
              <h1 className="text-4xl font-bold text-black mb-4">Article Not Found</h1>
              <p className="text-gray-600">The article you're looking for doesn't exist.</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <BackButton />
          
          <article className="mt-12">
            <header className="mb-8">
              <div className="bg-yellow-300 px-4 py-2 inline-block rounded mb-4">
                <span className="text-sm font-bold text-black">ARTICLE</span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                {article.title}
              </h1>
            </header>
            
            {article.image && (
              <div className="mb-8">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full max-w-3xl mx-auto rounded-lg shadow-lg"
                />
              </div>
            )}
            
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
                {article.content}
              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}