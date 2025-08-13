"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Instagram, Linkedin } from "lucide-react"

export function Footer() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter signup:", email)
    setEmail("")
  }

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo */}
          <div>
            <img 
              src="/critical_institute_logo (1).jpeg" 
              alt="Critical Collective Logo" 
              className="mb-6"
              style={{ width: 75, height: 75 }} 
            />
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Contact Info
            </h4>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/criticalcollectivee/" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                <span className="sr-only">Instagram</span>
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/company/criticalcollective/?viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                <span className="sr-only">LinkedIn</span>
                <Linkedin className="w-6 h-6" />
              </a>
              <a href="https://www.tiktok.com/@criticalcollective" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-black">
                <span className="sr-only">TikTok</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-black mb-4">Enter email to contact</h4>
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); window.location.href = `/contact?email=${encodeURIComponent(email)}`; }}>
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-full"
              />
              <Button type="submit" className="bg-black hover:bg-gray-800 text-white rounded-full px-6">
                Get Started
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">©2025 Critical Collective, All Rights Reserved</p>
          <a href="/privacy" className="text-sm text-gray-600 hover:text-black">
            Privacy Policy
          </a>
          <a href="mailto:hargunmalhotra31@gmail.com" className="text-sm text-gray-600 hover:text-black">
            Developed By Hargun Malhotra
          </a>
        </div>
      </div>
    </footer>
  )
}
