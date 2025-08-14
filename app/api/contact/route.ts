import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
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