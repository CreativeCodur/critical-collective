import { NextRequest, NextResponse } from 'next/server'

const submissions = new Map<string, { count: number, month: string }>()

export async function POST(request: NextRequest) {
  try {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const currentMonth = new Date().toISOString().slice(0, 7) // YYYY-MM
    
    const userSubmissions = submissions.get(ip)
    if (userSubmissions && userSubmissions.month === currentMonth) {
      if (userSubmissions.count >= 5) {
        return NextResponse.json({ error: 'Monthly submission limit reached (5 per month)' }, { status: 429 })
      }
      userSubmissions.count++
    } else {
      submissions.set(ip, { count: 1, month: currentMonth })
    }
    
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const contactType = formData.get('contactType') as string
    const message = formData.get('message') as string

    const emailContent = `New contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone}
Contact Type: ${contactType}
Message: ${message}`

    const { Resend } = await import('resend')
    const resend = new Resend('re_dgCULfdW_K9VQXTRQicQgKUrqJbLxc1wd')
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'criticalcollectivecontact@gmail.com',
      subject: `Contact Form - ${name}`,
      text: emailContent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email error:', error)
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}