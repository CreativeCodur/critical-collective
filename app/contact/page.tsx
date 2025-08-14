"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BackButton } from "@/components/back-button"
import { sanitizeInput, validateSheetId } from "@/lib/sanitize"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type ContactType = 'internship' | 'fulltime' | 'question' | 'collaboration' | 'partnership' | 'interview'

interface ContactFormData {
  email: string
  name: string
  phone: string
  contactType: ContactType
  specificType: string
  message: string
  files: FileList | null
}

interface InternshipOptions {
  [key: string]: string
}

const questionTypes = {
  'general': 'General Inquiry',
  'research': 'Research Methods',
  'verification': 'Fact Verification',
  'methodology': 'Our Methodology',
  'other': 'Other Questions'
}

const collaborationTypes = {
  'research': 'Research Collaboration',
  'content': 'Content Creation',
  'tech': 'Technology Development',
  'education': 'Educational Programs',
  'advocacy': 'Advocacy Campaigns'
}

const partnershipTypes = {
  'media': 'Media Partnership',
  'academic': 'Academic Institution',
  'nonprofit': 'Non-Profit Organization',
  'corporate': 'Corporate Partnership',
  'community': 'Community Organization'
}

const interviewTypes = {
  'media': 'Media Interview',
  'research': 'Research Interview',
  'podcast': 'Podcast Appearance',
  'speaking': 'Speaking Engagement',
  'expert': 'Expert Commentary'
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    email: '',
    name: '',
    phone: '',
    contactType: 'question' as ContactType,
    specificType: '',
    message: '',
    files: null
  })
  const [internshipPositions, setInternshipPositions] = useState<{[key: string]: string}>({})
  const [fullTimePositions, setFullTimePositions] = useState<{[key: string]: string}>({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    // Pre-fill email from URL parameter
    const urlParams = new URLSearchParams(window.location.search)
    const emailParam = urlParams.get('email')
    if (emailParam) {
      setFormData(prev => ({ ...prev, email: emailParam }))
    }

    const fetchPositions = async () => {
      try {
        const SHEET_ID = '1n8qKUFx2y_MO5tC9lGbWoJMNygJPwhZly-p5PAAni3U'
        if (!validateSheetId(SHEET_ID)) {
          throw new Error('Invalid sheet ID')
        }
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv`,
          {
            headers: {
              'Accept': 'text/csv',
              'Cache-Control': 'no-cache'
            }
          }
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
          // Extract internships from column 0 (skip header row)
          const internshipTitles = rows.slice(1).map(row => row[0]).filter(title => title && title.trim() !== '')
          const internships: {[key: string]: string} = {}
          internshipTitles.forEach((title, index) => {
            const cleanTitle = sanitizeInput(title.replace(/^"|"$/g, ''))
            internships[`intern-${index}`] = cleanTitle
          })
          
          // Extract full-time positions from column 1 (skip header row)
          const fullTimeTitles = rows.slice(1).map(row => row[1]).filter(title => title && title.trim() !== '')
          const fullTime: {[key: string]: string} = {}
          fullTimeTitles.forEach((title, index) => {
            const cleanTitle = sanitizeInput(title.replace(/^"|"$/g, ''))
            fullTime[`fulltime-${index}`] = cleanTitle
          })
          
          setInternshipPositions(internships)
          setFullTimePositions(fullTime)
        }
      } catch (error) {
        console.error('Error fetching positions:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPositions()
  }, [])

  const questionTypes = {
    'general': 'General Inquiry',
    'research': 'Research Methods',
    'verification': 'Fact Verification',
    'methodology': 'Our Methodology',
    'other': 'Other Questions'
  }
  
  const collaborationTypes = {
    'research': 'Research Collaboration',
    'content': 'Content Creation',
    'tech': 'Technology Development',
    'education': 'Educational Programs',
    'advocacy': 'Advocacy Campaigns'
  }
  
  const partnershipTypes = {
    'media': 'Media Partnership',
    'academic': 'Academic Institution',
    'nonprofit': 'Non-Profit Organization',
    'corporate': 'Corporate Partnership',
    'community': 'Community Organization'
  }
  
  const interviewTypes = {
    'media': 'Media Interview',
    'research': 'Research Interview',
    'podcast': 'Podcast Appearance',
    'speaking': 'Speaking Engagement',
    'expert': 'Expert Commentary'
  }

  const getOptionsForType = (type: ContactType): { [key: string]: string } => {
    switch (type) {
      case 'internship':
        return internshipPositions
      case 'fulltime':
        return fullTimePositions
      case 'question':
        return questionTypes
      case 'collaboration':
        return collaborationTypes
      case 'partnership':
        return partnershipTypes
      case 'interview':
        return interviewTypes
      default:
        return {}
    }
  }

  const getPromptForType = (): string => {
    if (formData.contactType === 'internship' && formData.specificType) {
      const roleName = internshipPositions[formData.specificType] || 'this internship'
      return `Tell us about your interest in the ${roleName} position, relevant experience, and what you hope to learn in this role.`
    }
    if (formData.contactType === 'fulltime' && formData.specificType) {
      const roleName = fullTimePositions[formData.specificType] || 'this position'
      return `Please share your relevant experience for the ${roleName} role, why you're interested in this position, and your vision for fighting misinformation.`
    }
    switch (formData.contactType) {
      case 'internship':
        return "Tell us about your interest in this internship position, relevant experience, and what you hope to learn."
      case 'fulltime':
        return "Please share your relevant experience, why you're interested in this role, and your vision for fighting misinformation."
      case 'question':
        return "What specific questions do you have for our team? Please be as detailed as possible."
      case 'collaboration':
        return "Tell us about your proposed collaboration, its goals, and how it aligns with our mission."
      case 'partnership':
        return "Describe your organization and how you envision partnering with Critical Collective."
      case 'interview':
        return "Please provide details about your interview request, including the topic, format, and intended audience."
      default:
        return "Please enter your message..."
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const submitData = new FormData()
      submitData.append('name', formData.name)
      submitData.append('email', formData.email)
      submitData.append('phone', formData.phone)
      submitData.append('contactType', formData.contactType)
      submitData.append('specificType', formData.specificType)
      submitData.append('specificTypeName', getOptionsForType(formData.contactType)[formData.specificType] || formData.specificType)
      submitData.append('message', formData.message)
      
      if (formData.files) {
        for (let i = 0; i < formData.files.length; i++) {
          submitData.append('files', formData.files[i])
        }
      }
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        body: submitData,
      })
      
      if (response.ok) {
        setSubmitted(true)
        setFormData({
          email: '',
          name: '',
          phone: '',
          contactType: 'question' as ContactType,
          specificType: '',
          message: '',
          files: null
        })
      } else if (response.status === 429) {
        const errorData = await response.json()
        alert(`Rate limit exceeded: ${errorData.error}`)
      } else {
        throw new Error('Failed to submit')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Failed to submit form. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="bg-white py-20 lg:py-32 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        <BackButton />
        <h1 className="text-5xl font-bold text-black mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Contact Us
        </h1>
        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold text-green-800 mb-2">Thank you!</h2>
            <p className="text-green-700">Your message has been sent successfully. We'll get back to you soon.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="mt-4 text-green-600 hover:text-green-800 underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <p className="text-lg text-gray-700 mb-8" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
            Get in touch with Critical Collective. Please provide the details below and we'll get back to you soon.
          </p>
        )}
        {!submitted && (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              type="text"
              placeholder="Full Name"
              required
              className="rounded-full"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: sanitizeInput(e.target.value) })}
            />
            <Input
              type="email"
              placeholder="Email Address"
              required
              className="rounded-full"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          
          <Input
            type="tel"
            placeholder="Phone Number (with country code, e.g., +1, +91)"
            required
            className="rounded-full"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: sanitizeInput(e.target.value) })}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <Select
              value={formData.contactType}
              onValueChange={(value: ContactType) => setFormData({ ...formData, contactType: value, specificType: '' })}
            >
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Contact Type" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
                <SelectItem value="internship" className="hover:bg-gray-100">Internship Application</SelectItem>
                <SelectItem value="fulltime" className="hover:bg-gray-100">Part-Time Application</SelectItem>
                <SelectItem value="question" className="hover:bg-gray-100">Question</SelectItem>
                <SelectItem value="collaboration" className="hover:bg-gray-100">Collaboration</SelectItem>
                <SelectItem value="partnership" className="hover:bg-gray-100">Partnership</SelectItem>
                <SelectItem value="interview" className="hover:bg-gray-100">Interview Request</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={formData.specificType}
              onValueChange={(value) => setFormData({ ...formData, specificType: value })}
            >
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Please specify..." />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-200 shadow-lg z-50 max-h-60 overflow-y-auto">
                {Object.entries(getOptionsForType(formData.contactType)).map(([key, value]) => (
                  <SelectItem key={key} value={key} className="hover:bg-gray-100">
                    {value}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <textarea
            placeholder={getPromptForType()}
            required
            className="rounded-xl p-4 border border-gray-300 min-h-[200px] w-full"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: sanitizeInput(e.target.value) })}
          />

          {(formData.contactType === 'internship' || formData.contactType === 'fulltime') && (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Upload your resume and any additional documents (PDF, DOC, DOCX)
              </label>
              <Input
                type="file"
                className="rounded-full"
                accept=".pdf,.doc,.docx"
                multiple
                onChange={(e) => setFormData({ ...formData, files: e.target.files })}
              />
              <p className="text-xs text-gray-500">
                You can upload multiple files. Maximum size: 10MB per file.
              </p>
            </div>
          )}

          <Button
            type="submit"
            disabled={submitting}
            className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-3 w-full md:w-auto md:self-start disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
        )}
      </div>
    </section>
  )
}
