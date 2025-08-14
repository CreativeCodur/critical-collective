import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sheetId = searchParams.get('sheetId')
    
    if (!sheetId) {
      return NextResponse.json({ error: 'Sheet ID is required' }, { status: 400 })
    }
    
    const cacheBuster = Date.now()
    const response = await fetch(
      `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&t=${cacheBuster}`,
      {
        headers: {
          'Accept': 'text/csv',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        },
        cache: 'no-store'
      }
    )
    
    if (!response.ok) {
      throw new Error('Failed to fetch sheet data')
    }
    
    const csvText = await response.text()
    
    return new NextResponse(csvText, {
      headers: {
        'Content-Type': 'text/csv',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching sheet:', error)
    return NextResponse.json({ error: 'Failed to fetch sheet data' }, { status: 500 })
  }
}