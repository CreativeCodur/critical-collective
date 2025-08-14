import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

const RESEND_API_KEY = process.env.RESEND_API_KEY

export async function POST(request: NextRequest) {
  try {
    // Check if Resend API key is configured
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured')
      return NextResponse.json({ error: 'Email service not configured' }, { status: 500 })
    }
    
    // Get client IP
    const ip = request.ip || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Check rate limit
    const rateCheck = await checkRateLimit(ip)
    if (!rateCheck.allowed) {
      return NextResponse.json({ error: rateCheck.reason }, { status: 429 })
    }
    
    const formData = await request.formData()
    
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const contactType = formData.get('contactType') as string
    const specificType = formData.get('specificType') as string
    const specificTypeName = formData.get('specificTypeName') as string
    const message = formData.get('message') as string
    
    // Validate required fields
    if (!name || !email || !phone || !contactType || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Handle file attachments
    const attachments = []
    const files = formData.getAll('files') as File[]
    
    for (const file of files) {
      if (file.size > 0) {
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)
        
        attachments.push({
          filename: file.name,
          content: buffer,
        })
      }
    }

    const getSubject = () => {
      const typeMap: { [key: string]: string } = {
        'internship': 'Internship Application',
        'fulltime': 'Part-Time Application', 
        'question': 'Question/Inquiry',
        'collaboration': 'Collaboration Proposal',
        'partnership': 'Partnership Inquiry',
        'interview': 'Interview Request'
      }
      return `${typeMap[contactType] || 'Contact Form'} - ${name}`
    }

    const emailContent = `
New contact form submission:

Name: ${name}
Email: ${email}
Phone: ${phone}
Contact Type: ${contactType}
Specific Type: ${specificTypeName || specificType}
Message: ${message}

${attachments.length > 0 ? `Files attached: ${attachments.length}` : 'No files attached'}
    `.trim()

    const { Resend } = await import('resend')
    const resend = new Resend(RESEND_API_KEY)
    
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'criticalcollectivecontact@gmail.com',
      replyTo: email,
      subject: getSubject(),
      text: emailContent,
      attachments: attachments.length > 0 ? attachments : undefined,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    })
    return NextResponse.json({ 
      error: 'Failed to send email', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 })
  }
}