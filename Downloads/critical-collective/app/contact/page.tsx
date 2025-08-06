"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BackButton } from "@/components/back-button"
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
  contactType: ContactType
  specificType: string
  message: string
  files: FileList | null
}

interface InternshipOptions {
  [key: string]: string
}

const internshipPositions = {
  'research': 'Research Intern',
  'content': 'Content Writing Intern',
  'advocacy': 'Youth Advocacy Intern',
  'tech': 'Technology & Innovation Intern',
  'media': 'Media Analysis Intern'
}

const fullTimePositions = {
  'researcher': 'Senior Researcher',
  'advocacy': 'Advocacy Director',
  'tech': 'Technology Lead',
  'content': 'Content Strategist',
  'media': 'Media Analysis Manager',
  'operations': 'Operations Manager'
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
    contactType: 'question' as ContactType,
    specificType: '',
    message: '',
    files: null
  })

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
    // Handle form submission here
    console.log(formData)
  }

  return (
    <section className="bg-white py-20 lg:py-32 min-h-screen flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-6">
        <BackButton />
        <h1 className="text-5xl font-bold text-black mb-8" style={{ fontFamily: 'DM Sans, sans-serif' }}>
          Contact Us
        </h1>
        <p className="text-lg text-gray-700 mb-8" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
          Get in touch with Critical Collective. Please provide the details below and we'll get back to you soon.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Input
              type="text"
              placeholder="Full Name"
              required
              className="rounded-full"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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

          <div className="grid md:grid-cols-2 gap-6">
            <Select
              value={formData.contactType}
              onValueChange={(value: ContactType) => setFormData({ ...formData, contactType: value, specificType: '' })}
            >
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Contact Type" />
              </SelectTrigger>
              <SelectContent className="bg-[url('/icons/OBOLOR0.jpg')] rounded bg-cover bg-no-repeat">
                <SelectItem value="internship" className="bg-transparent text-white hover:bg-black/50">Internship Application</SelectItem>
                <SelectItem value="fulltime" className="bg-transparent text-white hover:bg-black/50">Full-Time Application</SelectItem>
                <SelectItem value="question" className="bg-transparent text-white hover:bg-black/50">Question</SelectItem>
                <SelectItem value="collaboration" className="bg-transparent text-white hover:bg-black/50">Collaboration</SelectItem>
                <SelectItem value="partnership" className="bg-transparent text-white hover:bg-black/50">Partnership</SelectItem>
                <SelectItem value="interview" className="bg-transparent text-white hover:bg-black/50">Interview Request</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={formData.specificType}
              onValueChange={(value) => setFormData({ ...formData, specificType: value })}
            >
              <SelectTrigger className="rounded-full">
                <SelectValue placeholder="Please specify..." />
              </SelectTrigger>
              <SelectContent className="bg-[url('/icons/OBOLOR0.jpg')] bg-cover bg-no-repeat">
                {Object.entries(getOptionsForType(formData.contactType)).map(([key, value]) => (
                  <SelectItem key={key} value={key} className="bg-transparent text-white hover:bg-black/50">
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
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
            className="bg-black hover:bg-gray-800 text-white rounded-full px-8 py-3 w-full md:w-auto md:self-start"
          >
            Submit
          </Button>
        </form>
      </div>
    </section>
  )
}
