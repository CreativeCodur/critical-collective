"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BackButton } from "@/components/back-button"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="py-20">
        <div className="max-w-4xl mx-auto px-6">
          <BackButton />
          
          <article className="mt-12">
            <header className="mb-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-black mb-6 leading-tight" style={{ fontFamily: 'DM Sans, sans-serif' }}>
                Privacy Policy
              </h1>
              <p className="text-gray-600 mb-8">Effective Date: August 11th, 2025</p>
            </header>
            
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed space-y-6" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 400 }}>
                
                <section>
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>1. Who We Are</h2>
                  <p>Critical Collective ("we," "our," or "us") is a youth-led think tank dedicated to fostering free and critical thinking in the face of widespread disinformation. We believe that truth is a public good, and that challenging false narratives requires bold, independent analysis grounded in integrity and intellectual curiosity.</p>
                  <p>Through research, advocacy, and open dialogue, we confront misinformation across media, policy, and public discourse.</p>
                  <p>This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or interact with us.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>2. Information We Collect</h2>
                  <p>We only collect the information necessary to respond to inquiries and improve our website. Specifically:</p>
                  <p><strong>Contact Form Information:</strong> When you use our contact form, we collect the email address you provide and any other information you choose to share in your message.</p>
                  <p><strong>Automatically Collected Information:</strong> Like most websites, we may collect basic technical data such as your IP address, browser type, operating system, and referring URLs to help improve our site and ensure security. This data is collected via cookies or similar technologies (see Section 6).</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>3. How We Use Your Information</h2>
                  <p>We use the information we collect for the following purposes:</p>
                  <p><strong>Responding to Your Inquiries:</strong> To reply to questions, comments, or requests sent through our contact form.</p>
                  <p><strong>Improving Our Website:</strong> To better understand how visitors use our site and improve user experience.</p>
                  <p><strong>Ensuring Security:</strong> To prevent abuse, fraud, or unauthorized access to our systems.</p>
                  <p>We do not sell, rent, or share your personal information with third parties for marketing purposes.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>4. How We Share Your Information</h2>
                  <p>We may share your information only in the following limited circumstances:</p>
                  <p><strong>Service Providers:</strong> We may use trusted third-party services (such as web hosting providers or email service platforms) to operate our website and communicate with you. These providers are contractually obligated to protect your data.</p>
                  <p><strong>Legal Requirements:</strong> We may disclose your information if required by law, court order, or government request, or if we believe disclosure is necessary to protect our rights or safety.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>5. Data Retention</h2>
                  <p>We retain personal information only for as long as necessary to fulfill the purposes described in this policy. Emails sent through our contact form are stored securely and may be deleted upon request (see Section 8).</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>6. Cookies & Tracking</h2>
                  <p>Our website may use cookies or similar technologies to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Improve website performance and functionality</li>
                    <li>Understand visitor traffic patterns</li>
                    <li>Maintain site security</li>
                  </ul>
                  <p>You can control or disable cookies through your browser settings, though some features of the site may not function properly without them.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>7. Your Rights</h2>
                  <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
                  <p><strong>Access:</strong> You can request a copy of the personal data we hold about you.</p>
                  <p><strong>Correction:</strong> You can request we correct inaccurate or incomplete information.</p>
                  <p><strong>Deletion:</strong> You can request we delete your personal information, subject to legal obligations.</p>
                  <p><strong>Objection & Restriction:</strong> You may object to or request we limit our use of your personal data.</p>
                  <p>To exercise any of these rights, contact us at: thecriticalcollective0@gmail.com</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>8. Data Security</h2>
                  <p>We implement reasonable technical and organizational measures to protect your personal information from unauthorized access, use, alteration, or destruction. However, no system can guarantee complete security.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>9. International Visitors</h2>
                  <p>If you access our site from outside the United States, please note that your information may be transferred to and processed in countries with different data protection laws.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>10. Changes to This Policy</h2>
                  <p>We may update this Privacy Policy from time to time. When we do, we will revise the "Effective Date" at the top of this page and post the updated version on our website.</p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-black mb-4" style={{ fontFamily: 'DM Sans, sans-serif' }}>11. Contact Us</h2>
                  <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p><strong>Critical Collective</strong></p>
                    <p>Email: thecriticalcollective0@gmail.com</p>
                    <p>Website: https://criticalcollective.vercel.app</p>
                  </div>
                </section>

              </div>
            </div>
          </article>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}