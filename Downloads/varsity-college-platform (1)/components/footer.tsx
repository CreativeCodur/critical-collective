import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-[#0a1a3a] border-t border-gradient-to-r from-white/20 to-transparent">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">Varsity</h3>
            <p className="text-white/70 text-sm">Your gateway to higher education success</p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <div className="space-y-2">
              <Link href="/directory" className="block text-white/70 hover:text-[#a2c8ff] transition-colors text-sm">
                College Directory
              </Link>
              <Link href="/scholarships" className="block text-white/70 hover:text-[#a2c8ff] transition-colors text-sm">
                Scholarships
              </Link>
              <Link href="/campus-life" className="block text-white/70 hover:text-[#a2c8ff] transition-colors text-sm">
                Campus Life
              </Link>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Support</h4>
            <div className="space-y-2">
              <Link href="/faq" className="block text-white/70 hover:text-[#a2c8ff] transition-colors text-sm">
                FAQs
              </Link>
              <Link href="/contact" className="block text-white/70 hover:text-[#a2c8ff] transition-colors text-sm">
                Contact Us
              </Link>
              <Link href="/help" className="block text-white/70 hover:text-[#a2c8ff] transition-colors text-sm">
                Help Center
              </Link>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-white/70 hover:text-[#a2c8ff] cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-white/70 hover:text-[#a2c8ff] cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-white/70 hover:text-[#a2c8ff] cursor-pointer transition-colors" />
              <Linkedin className="w-6 h-6 text-white/70 hover:text-[#a2c8ff] cursor-pointer transition-colors" />
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-white/50 text-sm">
            © 2024 Varsity. All rights reserved. Data sourced from College Scorecard.
          </p>
        </div>
      </div>
    </footer>
  )
}
