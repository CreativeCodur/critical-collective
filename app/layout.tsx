import type { Metadata } from 'next'
// Google Fonts will be imported via <link> in <head>
import './globals.css'

export const metadata: Metadata = {
  title: 'Critical Collective',
  description: 'Critical Collective is a youth-led think tank dedicated to fostering free and critical thinking in the face of widespread disinformation. We believe that truth is a public good, and that challenging false narratives requires bold, independent analysis grounded in integrity and intellectual curiosity. Through research, advocacy, and open dialogue, Critical Collective confronts misinformation across media, policy, and public discourse.'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Fonts: DM Sans for titles, Poppins for body */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/jpeg" href="/critical_institute_logo (1).jpeg" />
        {/* Font CSS is now in globals.css */}
      </head>
      <body>{children}</body>
    </html>
  )
}
