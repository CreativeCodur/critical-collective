"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import HandwritingTitle from "./HandwritingTitle"

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a3a] to-[#1a4b8c] opacity-95" />

      {/* Noise Overlay */}
      <div
        className="absolute inset-0"
        style={{
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Floating Blobs */}
      <div className="absolute bottom-[20%] left-[20%] w-20 h-32 bg-[#ff9a9a] rounded-full blur-[50px] opacity-80 border border-white/10" />
      <div className="absolute bottom-[15%] left-1/2 transform -translate-x-1/2 w-36 h-36 bg-white/30 rounded-full blur-[70px] border border-white/10" />
      <div className="absolute bottom-[10%] right-[10%] w-24 h-48 bg-[#a2c8ff] rounded-full blur-[60px] opacity-90 border border-white/10" />

      {/* Content */}
      <div className="relative z-10 text-center space-y-5">
        <HandwritingTitle
          words={["FIND", "YOUR", "FUTURE"]}
          accentColors={["#fff", "#fff", "#fff"]}
          highlightColor="#a2c8ff"
          fontSize={90}
          highlightType="line"
          showHighlight={false}
        />
        <p className="text-3xl md:text-4xl text-white font-['Dancing_Script'] drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
          dream * explore * belong
        </p>
        <div className="pt-8">
          <Link href="/directory">
            <Button
              size="lg"
              className="w-52 h-16 bg-white text-[#0a1a3a] font-bold text-lg rounded-full border-2 border-white/50 hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-200 ease-in-out"
            >
              SEARCH COLLEGES
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
