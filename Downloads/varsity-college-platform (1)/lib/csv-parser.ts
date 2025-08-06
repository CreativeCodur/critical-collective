// CSV parsing utilities and scholarship extraction
export async function fetchCSVData(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.text()
  } catch (error) {
    console.error("Error fetching CSV:", error)
    return ""
  }
}

export function parseCSV(csvText: string): any[] {
  const lines = csvText.split("\n").filter((line) => line.trim())
  if (lines.length < 2) return []

  const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
  const data = []

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i])
    if (values.length === headers.length) {
      const row: any = {}
      headers.forEach((header, index) => {
        row[header] = values[index]?.trim().replace(/"/g, "") || ""
      })
      data.push(row)
    }
  }

  return data
}

function parseCSVLine(line: string): string[] {
  const result = []
  let current = ""
  let inQuotes = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]

    if (char === '"') {
      inQuotes = !inQuotes
    } else if (char === "," && !inQuotes) {
      result.push(current)
      current = ""
    } else {
      current += char
    }
  }

  result.push(current)
  return result
}

export function mapGradeLevelToEligibility(gradeLevel: string): string[] {
  const eligibility = []
  const lower = gradeLevel.toLowerCase()

  if (lower.includes("high school") || lower.includes("hs") || lower.includes("senior")) {
    eligibility.push("High School Senior")
  }
  if (lower.includes("junior")) {
    eligibility.push("High School Junior")
  }
  if (lower.includes("undergraduate") || lower.includes("college")) {
    eligibility.push("Undergraduate")
  }
  if (lower.includes("graduate")) {
    eligibility.push("Graduate Student")
  }
  if (lower.includes("freshman")) {
    eligibility.push("High School Freshman")
  }
  if (lower.includes("k-12") || lower.includes("k12")) {
    eligibility.push("K-12 Student")
  }

  // Age ranges
  const ageMatch = lower.match(/(\d+)-(\d+)\s*years?\s*old/)
  if (ageMatch) {
    eligibility.push(`Ages ${ageMatch[1]}-${ageMatch[2]}`)
  }

  return eligibility.length > 0 ? eligibility : ["Student"]
}

export function parseAwardAmount(amount: string): string {
  if (!amount) return "Varies"

  // Clean up the amount string
  const cleanAmount = amount.replace(/[^\d$,.\-\s]/g, " ").trim()

  // Look for dollar amounts
  const dollarMatch = cleanAmount.match(/\$[\d,]+/)
  if (dollarMatch) {
    return dollarMatch[0]
  }

  // Look for "full ride" or similar
  if (amount.toLowerCase().includes("full")) {
    return "Full Ride"
  }

  return amount.length > 50 ? "Varies" : amount
}

export function categorizeScholarshipType(
  qualifyingFactors: string,
  name: string,
): "need-based" | "merit" | "demographic" | "program-specific" | "geographic" {
  const factors = (qualifyingFactors + " " + name).toLowerCase()

  if (factors.includes("financial need") || factors.includes("income") || factors.includes("need-based")) {
    return "need-based"
  }

  if (
    factors.includes("women") ||
    factors.includes("minority") ||
    factors.includes("hispanic") ||
    factors.includes("african american") ||
    factors.includes("lgbtq") ||
    factors.includes("veteran") ||
    factors.includes("first generation")
  ) {
    return "demographic"
  }

  if (
    factors.includes("stem") ||
    factors.includes("engineering") ||
    factors.includes("computer science") ||
    factors.includes("business") ||
    factors.includes("medicine") ||
    factors.includes("nursing") ||
    factors.includes("education") ||
    factors.includes("arts")
  ) {
    return "program-specific"
  }

  if (factors.includes("state") || factors.includes("resident") || factors.includes("local")) {
    return "geographic"
  }

  return "merit"
}

export function extractPrograms(qualifyingFactors: string, name: string): string[] {
  const text = (qualifyingFactors + " " + name).toLowerCase()
  const programs = []

  if (text.includes("engineering")) programs.push("Engineering")
  if (text.includes("computer science") || text.includes("technology")) programs.push("Computer Science")
  if (text.includes("business") || text.includes("entrepreneur")) programs.push("Business")
  if (text.includes("medicine") || text.includes("medical") || text.includes("health")) programs.push("Medicine")
  if (text.includes("nursing")) programs.push("Nursing")
  if (text.includes("education") || text.includes("teaching")) programs.push("Education")
  if (text.includes("arts") || text.includes("creative") || text.includes("design")) programs.push("Arts")
  if (text.includes("math") || text.includes("mathematics")) programs.push("Mathematics")
  if (text.includes("science") && !text.includes("computer science")) programs.push("Science")
  if (text.includes("journalism") || text.includes("communications")) programs.push("Communications")
  if (text.includes("law") || text.includes("legal")) programs.push("Law")

  return programs.length > 0 ? programs : ["ALL"]
}

export function extractDemographics(qualifyingFactors: string, name: string): string[] {
  const text = (qualifyingFactors + " " + name).toLowerCase()
  const demographics = []

  if (text.includes("women") || text.includes("female")) demographics.push("Women")
  if (text.includes("hispanic") || text.includes("latino") || text.includes("latina")) demographics.push("Hispanic")
  if (text.includes("african american") || text.includes("black")) demographics.push("African American")
  if (text.includes("native american") || text.includes("indigenous")) demographics.push("Native American")
  if (text.includes("asian") || text.includes("pacific islander")) demographics.push("Asian Pacific Islander")
  if (text.includes("lgbtq") || text.includes("gay") || text.includes("lesbian")) demographics.push("LGBTQ+")
  if (text.includes("veteran") || text.includes("military")) demographics.push("Military")
  if (text.includes("first generation")) demographics.push("First Generation")
  if (text.includes("disability") || text.includes("disabled")) demographics.push("Disability")

  return demographics.length > 0 ? demographics : ["ALL"]
}

export function parseDeadline(monthDue: string): string {
  if (!monthDue) return "TBD"

  const currentYear = new Date().getFullYear()
  const nextYear = currentYear + 1

  // Map month names to numbers
  const monthMap: { [key: string]: number } = {
    january: 1,
    jan: 1,
    february: 2,
    feb: 2,
    march: 3,
    mar: 3,
    april: 4,
    apr: 4,
    may: 5,
    june: 6,
    jun: 6,
    july: 7,
    jul: 7,
    august: 8,
    aug: 8,
    september: 9,
    sep: 9,
    sept: 9,
    october: 10,
    oct: 10,
    november: 11,
    nov: 11,
    december: 12,
    dec: 12,
  }

  const lower = monthDue.toLowerCase()

  // Look for month names
  for (const [monthName, monthNum] of Object.entries(monthMap)) {
    if (lower.includes(monthName)) {
      // Determine year (if month has passed this year, use next year)
      const currentMonth = new Date().getMonth() + 1
      const year = monthNum < currentMonth ? nextYear : currentYear

      // Look for day
      const dayMatch = monthDue.match(/\d{1,2}/)
      const day = dayMatch ? Number.parseInt(dayMatch[0]) : 1

      return `${monthName.charAt(0).toUpperCase() + monthName.slice(1)} ${day}, ${year}`
    }
  }

  return monthDue
}
