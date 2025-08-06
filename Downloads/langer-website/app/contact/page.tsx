"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  return (
    <main className="min-h-screen py-20 px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-32">
          <h1 className="text-5xl md:text-6xl font-light text-neutral-900 mb-16 leading-tight">Connect</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl p-8 border border-slate-200">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className="w-full"
                  required
                />
              </div>

              <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3">
                Send Message
              </Button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6 md:col-start-2">
              <div className="mb-16">
                <h2 className="text-lg font-light text-neutral-900 mb-6">Correspondence</h2>
                <a
                  href="mailto:hello@langers.com"
                  className="text-neutral-600 hover:text-neutral-900 transition-colors duration-500 text-lg"
                >
                  hello@langers.com
                </a>
              </div>

              <div className="mb-16">
                <h2 className="text-lg font-light text-neutral-900 mb-6">Facility</h2>
                <address className="text-neutral-600 not-italic leading-relaxed">
                  14500 Ramona Boulevard
                  <br />
                  Baldwin Park, California 91706
                </address>
              </div>

              <div>
                <h2 className="text-lg font-light text-neutral-900 mb-6">Availability</h2>
                <p className="text-neutral-600 leading-relaxed">
                  Our products are available at select retailers nationwide. For specific locations, please contact us
                  directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
