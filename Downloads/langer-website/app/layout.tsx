import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Langer — Pure Fruit Juice",
  description:
    "Four generations of crafting exceptional fruit juices with traditional methods and uncompromising standards.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Navigation />
        <div className="pt-20">{children}</div>
      </body>
    </html>
  )
}
