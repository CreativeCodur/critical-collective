import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sheetId = searchParams.get('sheetId')
    
    if (!sheetId) {
      return NextResponse.json({ error: 'Sheet ID is required' }, { status: 400 })
    }
    
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv`,
      {
        headers: {
          'Accept': 'text/csv',
          'Cache-Control': 'no-cache'
        }
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch sheet data')
    }
    
    const csvText = await response.text()
    
    return new NextResponse(csvText, {
      headers: {
        'Content-Type': 'text/csv',
        'Cache-Control': 'public, max-age=300'
      }
    })
  } catch (error) {
    console.error('Error fetching sheet:', error)
    return NextResponse.json({ error: 'Failed to fetch sheet data' }, { status: 500 })
  }
}