"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

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
            <div className="border border-black px-3 py-2 text-sm font-bold mb-6 inline-block" style={{ fontFamily: 'DM Sans, sans-serif', fontSize: '1.25rem' }}>
              CRITICAL COLLECTIVE
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>
              Contact Info
            </h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-black">
                <span className="sr-only">Medium</span>
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <span className="sr-only">Twitter</span>
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <span className="sr-only">LinkedIn</span>
                <div className="w-6 h-6 bg-gray-400 rounded"></div>
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-2">
            <h4 className="font-bold text-black mb-4">Enter email to contact</h4>
            <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); window.location.href = '/contact'; }}>
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 rounded-full"
              />
              <Button type="submit" className="bg-black hover:bg-gray-800 text-white rounded-full px-6">
                Contact
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-600">©2025 Critical Collective, All Rights Reserved</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-sm text-gray-600 hover:text-black">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-black">
              Articles Index
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
