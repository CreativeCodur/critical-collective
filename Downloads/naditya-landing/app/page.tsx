"use client"

import { useState, useEffect } from "react"
import {
  ChevronRight,
  ArrowRight,
  Star,
  Users,
  Zap,
  Shield,
  Globe,
  Menu,
  X,
  Linkedin,
  Instagram,
  Youtube,
} from "lucide-react" // Import new icons
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ScrollReveal } from "@/components/scroll-reveal"
import Image from "next/image"

export default function NadityaLanding() {
  const [scrollY, setScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const testimonials = [
    {
      name: "sarah chen",
      role: "product manager",
      avatar: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/2091e695636919.5eb96c04456ac.jpg",
      quote: "naditya transformed our entire workflow. the results were immediate and impressive.",
    },
    {
      name: "marcus rodriguez",
      role: "tech lead",
      avatar: "https://mir-s3-cdn-cf.behance.net/project_modules/hd/599e3b95636919.5eb96c0445ea7.jpg?height=40&width=40",
      quote: "incredible innovation and seamless integration. this is the future of digital solutions.",
    },
    {
      name: "emily watson",
      role: "creative director",
      avatar: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/bcb04d95636919.61018563e88fd.jpg?height=40&width=40",
      quote: "the design philosophy and execution are absolutely phenomenal. game-changing technology.",
    },
  ]

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "lightning fast",
      description: "optimized performance with cutting-edge technology stack",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "ultra secure",
      description: "enterprise-grade security with advanced encryption protocols",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "global scale",
      description: "worldwide infrastructure for seamless user experiences",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "team collaboration",
      description: "built for modern teams with real-time collaboration features",
    },
  ]

  const timeline = [
    { year: "2024", title: "launch", description: "revolutionary platform debut" },
    { year: "2024", title: "growth", description: "rapid user adoption worldwide" },
    { year: "2025", title: "innovation", description: "next-gen features release" },
    { year: "2025", title: "expansion", description: "global market penetration" },
  ]

  const logos = [
    "https://media.licdn.com/dms/image/v2/D4E0BAQHNtNITaAPiNg/company-logo_100_100/company-logo_100_100/0/1736565351791?e=1756339200&v=beta&t=Cavvwd5yGGgANnzeSfPIVOOZ8Yi_3fNYlogiiLF0I7o",
    "https://media.licdn.com/dms/image/v2/D4E0BAQF8VUyw1hVSQA/company-logo_200_200/B4EZdsfBbUHYAI-/0/1749871761475?e=1756339200&v=beta&t=c6mERWzKf0PKtFc1BfLJTV-KNsRDeEaYVNdOpgnUrVg",
    "https://media.licdn.com/dms/image/v2/D560BAQEWQb7ELJCL2g/company-logo_100_100/company-logo_100_100/0/1688489186086/tutorlion_logo?e=1756339200&v=beta&t=zw3N-VBhqH0MhRb4HjGUWTJ9NKuoCCpuOyejZyizCsQ",
    "https://media.licdn.com/dms/image/v2/D4E0BAQEJSxgKUnS-WQ/company-logo_100_100/company-logo_100_100/0/1722077578724?e=1756339200&v=beta&t=S0wwI2pBMUxGF92-kiGJB2zN0GOGvJlRtPhdcEUQpK8",
    "https://media.licdn.com/dms/image/v2/D4E0BAQHJ4ygDhyFQeA/company-logo_100_100/company-logo_100_100/0/1733803281322?e=1756339200&v=beta&t=RJBNt4IQTwnglCDR5HFlfeI2YLJuM1UujdnmfPt5dhI",
  ]

  const isScrolled = scrollY > 100

  return (
    <div className="min-h-screen bg-black text-white font-['DM_Sans'] font-normal overflow-x-hidden relative">
      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0">
        <Image src="/background.png" alt="background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Fixed Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled ? "py-3" : "py-5"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto px-6 flex items-center justify-between transition-all duration-500 ease-out ${
            isScrolled
              ? "space-x-4 rounded-full backdrop-blur-2xl bg-white/10 border border-white/20 shadow-lg py-1"
              : "space-x-8 rounded-none bg-transparent"
          }`}
        >
          {/* naditya logo/text (left) */}
          <div className="flex items-center">
            <Image src="https://media.licdn.com/dms/image/v2/D4E0BAQF8VUyw1hVSQA/company-logo_200_200/B4EZdsfBbUHYAI-/0/1749871761475?e=1756339200&v=beta&t=c6mERWzKf0PKtFc1BfLJTV-KNsRDeEaYVNdOpgnUrVg" alt="naditya" width={32} height={32} className="brightness-50 mr-2" />
            <span className="text-lg font-['DM_Sans'] italic font-normal lowercase">naditya</span>
          </div>

          {/* page links (center, hidden on small) */}
          <div
            className={`hidden md:flex items-center font-['Geist'] font-normal transition-all duration-500 ease-out ${
              isScrolled ? "space-x-4 text-sm" : "space-x-6"
            }`}
          >
            <a href="#about" className="hover:text-[#CCFF99] transition-colors lowercase">
              about
            </a>
            <a href="#features" className="hover:text-[#CCFF99] transition-colors lowercase">
              features
            </a>
            <a href="#timeline" className="hover:text-[#CCFF99] transition-colors lowercase">
              timeline
            </a>
            <a href="#contact" className="hover:text-[#CCFF99] transition-colors lowercase">
              contact
            </a>
          </div>

          {/* get started button (right, hidden on small) */}
          <Button
            className={`hidden md:flex items-center bg-[#CCFF99] text-black hover:bg-[#CCFF99]/90 rounded-full font-['Geist'] font-medium group transition-all duration-300 lowercase ${
              isScrolled ? "px-4 py-1.5 text-sm" : "px-6 py-1.5"
            }`}
          >
            get started
            <ArrowRight
              className={`ml-2 group-hover:scale-110 transition-transform ${isScrolled ? "w-3 h-3" : "w-4 h-4"}`}
            />
          </Button>

          {/* hamburger icon (visible on small) */}
          <Button onClick={() => setIsMobileMenuOpen(true)} className="md:hidden bg-[#CCFF99] w-10 h-10 flex items-center justify-center p-0 rounded-full">
            <Menu className="w-5 h-5 text-black" />
          </Button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center py-16 px-6 animate-slide-in-right">
          <Button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-6 right-6 bg-[#CCFF99] w-10 h-10 flex items-center justify-center p-0 rounded-full"
          >
            <X className="w-5 h-5 text-black" />
          </Button>
          <div className="flex flex-col items-center space-y-8 text-2xl font-['Geist'] font-medium text-white text-center">
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              href="#about"
              className="hover:text-[#CCFF99] transition-colors lowercase"
            >
              about
            </a>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              href="#features"
              className="hover:text-[#CCFF99] transition-colors lowercase"
            >
              features
            </a>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              href="#timeline"
              className="hover:text-[#CCFF99] transition-colors lowercase"
            >
              timeline
            </a>
            <a
              onClick={() => setIsMobileMenuOpen(false)}
              href="#contact"
              className="hover:text-[#CCFF99] transition-colors lowercase"
            >
              contact
            </a>
          </div>
          <Button
            className="bg-[#CCFF99] text-black hover:bg-[#CCFF99]/90 rounded-full px-12 py-6 text-xl font-['Geist'] font-medium shadow-lg hover:shadow-xl transition-all duration-300 lowercase"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            get started
            <ArrowRight className="ml-3 w-6 h-6" />
          </Button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-end justify-center px-6 pb-32 pt-24">
        <div className="relative max-w-2xl text-center">
          {/* Background Layer */}
          <div className="absolute inset-0 backdrop-blur-xl bg-white/5 rounded-3xl scale-105" />

          {/* Middle Layer */}
          <div className="absolute inset-0 backdrop-blur-lg bg-white/3 rounded-3xl scale-102" />

          {/* Front Layer */}
          <Card className="relative backdrop-blur-2xl bg-white/8 border border-white/20 rounded-3xl p-12 shadow-2xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-60" />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-tl from-[#CCFF99]/10 via-transparent to-[#A259FF]/10 opacity-40" />

            <div className="relative z-10">
              <h1 className="text-6xl md:text-7xl font-['DM_Sans'] font-medium mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent lowercase leading-tight flex flex-col items-center">
                <span>let's get</span>
                <span>started.</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed font-normal lowercase">
                experience the future of digital innovation with{" "}
                <span className="text-[#CCFF99] font-medium italic">naditya</span> - where cutting-edge technology meets
                seamless user experience.
              </p>
              <Button className="bg-[#CCFF99] text-black hover:bg-[#CCFF99]/90 rounded-full px-8 py-4 text-lg font-['Geist'] font-medium shadow-lg hover:shadow-xl transition-all duration-300 lowercase">
                explore now
                <ChevronRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </Card>
        </div>
      </section>

      {/* Top Carousel */}
      <ScrollReveal>
        <section className="relative z-10 py-32 overflow-hidden">
          <div className="flex animate-scroll-left space-x-12">
            {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
              <div key={index} className="flex-shrink-0">
                <Image
                  src={logo || "/placeholder.svg"}
                  alt="partner logo"
                  width={120}
                  height={60}
                  className="opacity-40 hover:opacity-60 transition-opacity filter brightness-50 rounded-xl"
                />
              </div>
            ))}
          </div>
        </section>
      </ScrollReveal>

      {/* About Section */}
      <ScrollReveal delay={100}>
        <section id="about" className="relative z-10 py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-['Geist'] font-medium mb-6 lowercase">
                about <span className="text-[#CCFF99] italic font-['DM_Sans']">naditya</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-normal lowercase">
                we're pioneering the next generation of digital experiences through innovative technology and
                user-centric design principles.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <ScrollReveal delay={200}>
                <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h3 className="text-3xl font-['Geist'] font-medium mb-4 lowercase">our vision</h3>
                  <p className="text-gray-300 leading-relaxed font-normal lowercase">
                    to create a world where technology seamlessly integrates with human creativity, enabling
                    unprecedented levels of <span className="text-[#CCFF99] font-medium">innovation</span> and
                    <span className="text-[#CCFF99] font-medium"> collaboration</span>.
                  </p>
                </Card>
              </ScrollReveal>

              <ScrollReveal delay={300}>
                <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
                  <h3 className="text-3xl font-['Geist'] font-medium mb-4 lowercase">our mission</h3>
                  <p className="text-gray-300 leading-relaxed font-normal lowercase">
                    empowering businesses and individuals with cutting-edge tools that transform ideas into reality,
                    fostering a future of <span className="text-[#CCFF99] font-medium">limitless possibilities</span>.
                  </p>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Features Section */}
      <ScrollReveal delay={100}>
        <section id="features" className="relative z-10 py-32 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-['Geist'] font-medium mb-6 lowercase">
                powerful <span className="text-[#CCFF99]">features</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto font-normal lowercase">
                discover the capabilities that make naditya the ultimate platform for modern digital experiences.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 group">
                    <div className="text-[#CCFF99] mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                    <h3 className="text-xl font-['Geist'] font-medium mb-3 lowercase">{feature.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed font-normal lowercase">{feature.description}</p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Timeline Section */}
      <ScrollReveal delay={100}>
        <section id="timeline" className="relative z-10 py-32 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-['Geist'] font-medium mb-6 lowercase">
                our <span className="text-[#CCFF99]">journey</span>
              </h2>
            </div>

            <div className="space-y-8">
              {timeline.map((item, index) => (
                <ScrollReveal key={index} delay={index * 150}>
                  <div className="flex items-center space-x-8">
                    <div className="flex-shrink-0">
                      <Badge className="bg-[#CCFF99] text-black rounded-full px-4 py-2 font-['Geist'] font-medium text-lg lowercase">
                        {item.year}
                      </Badge>
                    </div>
                    <Card className="flex-1 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
                      <h3 className="text-2xl font-['Geist'] font-medium mb-2 lowercase">{item.title}</h3>
                      <p className="text-gray-300 font-normal lowercase">{item.description}</p>
                    </Card>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Screens Section */}
      <ScrollReveal delay={100}>
        <section className="relative z-10 py-32 px-6">
          <div className="relative max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-['Geist'] font-medium mb-6 lowercase">
                multi-platform <span className="text-[#CCFF99]">experience</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {["desktop", "mobile", "tablet"].map((platform, index) => (
                <ScrollReveal key={platform} delay={index * 100}>
                  <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
                    <div className="aspect-video bg-gradient-to-br from-[#A259FF]/20 to-black rounded-2xl mb-4 flex items-center justify-center">
                      <Image
                        src={`https://cdn.dribbble.com/userupload/16100141/file/original-29e3a3c53af2edd1382abecbd99b0a33.png?resize=2048x1536&vertical=center?height=200&width=${platform === "mobile" ? "150" : platform === "tablet" ? "250" : "300"}&text=${platform}+app`}
                        alt={`${platform} interface`}
                        width={platform === "mobile" ? 150 : platform === "tablet" ? 250 : 300}
                        height={200}
                        className="rounded-xl opacity-80"
                      />
                    </div>
                    <h3 className="text-xl font-['Geist'] font-medium mb-2 lowercase">{platform}</h3>
                    <p className="text-gray-300 text-sm font-normal lowercase">
                      {platform === "desktop"
                        ? "full-featured desktop experience"
                        : platform === "mobile"
                          ? "optimized mobile experience"
                          : "perfect tablet optimization"}
                    </p>
                  </Card>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Testimonials Section - Horizontal Infinite Carousel */}
      <ScrollReveal>
        <section className="relative z-10 py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex overflow-x-hidden">
              <div className="flex animate-slide-infinite space-x-6 py-4">
                {[...testimonials, ...testimonials, ...testimonials].map((testimonial, index) => (
                  <Card 
                    key={index} 
                    className="flex-none w-[280px] md:w-[300px] backdrop-blur-xl bg-white/5 rounded-3xl p-4 md:p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.5)] relative"
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <div className="flex items-center mb-3 md:mb-4">
                      <Image src={testimonial.avatar} alt={testimonial.name} width={32} height={32} className="rounded-md mr-2 md:w-10 md:h-10 md:mr-3" />
                      <div>
                        <h4 className="font-['Geist'] font-medium text-white lowercase text-sm md:text-base">{testimonial.name}</h4>
                        <p className="text-xs md:text-sm text-white/70 lowercase">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-white/90 italic font-normal lowercase mb-4 text-sm md:text-base">"{testimonial.quote}"</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 md:w-4 md:h-4 fill-[#CCFF99] text-[#CCFF99]" />
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>
      <ScrollReveal delay={100}>
        <section className="relative z-10 py-32 px-6">
          <div className="relative max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-['Geist'] font-medium mb-6 lowercase">
                frequently asked <span className="text-[#CCFF99]">questions</span>
              </h2>
            </div>

            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "what makes naditya different?",
                  answer:
                    "naditya combines cutting-edge technology with intuitive design, offering unparalleled performance and user experience.",
                },
                {
                  question: "how do i get started?",
                  answer:
                    "simply click the 'get started' button and follow our guided onboarding process. it takes less than 5 minutes.",
                },
                {
                  question: "is there customer support?",
                  answer:
                    "yes, we provide 24/7 customer support through multiple channels including chat, email, and phone.",
                },
              ].map((item, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <AccordionItem
                    value={`item-${index + 1}`}
                    className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl px-6"
                  >
                    <AccordionTrigger className="text-left font-['Geist'] font-medium lowercase">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 font-normal lowercase">{item.answer}</AccordionContent>
                  </AccordionItem>
                </ScrollReveal>
              ))}
            </Accordion>
          </div>
        </section>
      </ScrollReveal>

      {/* CTA Section */}
      <ScrollReveal delay={100}>
        <section className="relative z-10 py-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Card className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-[#A259FF]/20 via-transparent to-[#CCFF99]/20 opacity-50" />
              <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-['Geist'] font-medium mb-4 md:mb-6 lowercase">
                  ready to <span className="text-[#CCFF99]">transform</span>?
                </h2>
                <p className="text-lg sm:text-xl text-gray-300 mb-6 md:mb-8 leading-relaxed font-normal lowercase max-w-2xl mx-auto">
                  join thousands of innovators who are already using <span className="italic">naditya</span> to
                  revolutionize their digital presence.
                </p>
                <Button className="bg-[#CCFF99] text-black hover:bg-[#CCFF99]/90 rounded-full px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-base sm:text-lg md:text-xl font-['Geist'] font-medium shadow-2xl hover:shadow-[0_0_50px_rgba(204,255,153,0.3)] transition-all duration-300 group lowercase">
                  start your journey
                  <ArrowRight className="ml-2 md:ml-3 w-4 h-4 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </ScrollReveal>

      {/* Footer */}
      <ScrollReveal>
        <footer className="relative z-10 backdrop-blur-xl bg-black/40 border-t border-white/10 py-16 px-6 rounded-t-3xl">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center mb-4">
                  <Image
                    src="https://media.licdn.com/dms/image/v2/D4E0BAQF8VUyw1hVSQA/company-logo_200_200/B4EZdsfBbUHYAI-/0/1749871761475?e=1756339200&v=beta&t=c6mERWzKf0PKtFc1BfLJTV-KNsRDeEaYVNdOpgnUrVg"
                    alt="naditya"
                    width={32}
                    height={32}
                    className="brightness-50 mr-2"
                  />
                  <span className="text-xl font-['DM_Sans'] italic font-normal">naditya</span>
                </div>
                <p className="text-gray-400 text-sm font-normal lowercase">
                  pioneering the future of digital innovation.
                </p>
              </div>

              <div>
                <h4 className="font-['Geist'] font-medium mb-4 lowercase">product</h4>
                <ul className="space-y-2 text-sm text-gray-400 font-normal">
                  <li>
                    <a href="#" className="hover:text-[#CCFF99] transition-colors lowercase">
                      features
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#CCFF99] transition-colors lowercase">
                      pricing
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#CCFF99] transition-colors lowercase">
                      documentation
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-['Geist'] font-medium mb-4 lowercase">company</h4>
                <ul className="space-y-2 text-sm text-gray-400 font-normal">
                  <li>
                    <a href="#" className="hover:text-[#CCFF99] transition-colors lowercase">
                      about
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#CCFF99] transition-colors lowercase">
                      careers
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-[#CCFF99] transition-colors lowercase">
                      contact
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-['Geist'] font-medium mb-4 lowercase">connect</h4>
                <div className="flex space-x-4">
                  <Button variant="ghost" size="sm" className="rounded-full p-2 hover:bg-white/10">
                    <span className="sr-only">linkedin</span>
                    <Linkedin className="w-4 h-4 text-white" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full p-2 hover:bg-white/10">
                    <span className="sr-only">instagram</span>
                    <Instagram className="w-4 h-4 text-white" />
                  </Button>
                  <Button variant="ghost" size="sm" className="rounded-full p-2 hover:bg-white/10">
                    <span className="sr-only">youtube</span>
                    <Youtube className="w-4 h-4 text-white" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 text-center text-sm text-gray-400 font-normal lowercase">
              <p>&copy; 2024 naditya. all rights reserved.</p>
            </div>
          </div>
        </footer>
      </ScrollReveal>
    </div>
  )
}
