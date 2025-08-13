import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rate-limit'

const RESEND_API_KEY = 're_GtHVfU94_9nMrxafqdiZuHCN94trqxXGw'

export async function POST(request: NextRequest) {
  try {
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
    const contactType = formData.get('contactType') as string
    const specificType = formData.get('specificType') as string
    const specificTypeName = formData.get('specificTypeName') as string
    const message = formData.get('message') as string
    
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
        'fulltime': 'Full-Time Application', 
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
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}