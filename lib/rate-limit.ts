import { promises as fs } from 'fs'
import path from 'path'

interface RateLimit {
  daily: { count: number; date: string }
  monthly: { count: number; month: string }
}

const RATE_LIMIT_FILE = path.join(process.cwd(), 'rate-limits.json')

async function getRateLimits(): Promise<Record<string, RateLimit>> {
  try {
    const data = await fs.readFile(RATE_LIMIT_FILE, 'utf8')
    return JSON.parse(data)
  } catch {
    return {}
  }
}

async function saveRateLimits(limits: Record<string, RateLimit>) {
  await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(limits, null, 2))
}

export async function checkRateLimit(ip: string): Promise<{ allowed: boolean; reason?: string }> {
  const limits = await getRateLimits()
  const today = new Date().toISOString().split('T')[0]
  const thisMonth = new Date().toISOString().slice(0, 7)
  
  const userLimit = limits[ip] || {
    daily: { count: 0, date: today },
    monthly: { count: 0, month: thisMonth }
  }

  // Reset daily count if new day
  if (userLimit.daily.date !== today) {
    userLimit.daily = { count: 0, date: today }
  }

  // Reset monthly count if new month
  if (userLimit.monthly.month !== thisMonth) {
    userLimit.monthly = { count: 0, month: thisMonth }
  }

  // Check limits
  if (userLimit.daily.count >= 2) {
    return { allowed: false, reason: 'Daily limit exceeded (2 per day)' }
  }

  if (userLimit.monthly.count >= 3) {
    return { allowed: false, reason: 'Monthly limit exceeded (3 per month)' }
  }

  // Increment counters
  userLimit.daily.count++
  userLimit.monthly.count++
  
  limits[ip] = userLimit
  await saveRateLimits(limits)

  return { allowed: true }
}