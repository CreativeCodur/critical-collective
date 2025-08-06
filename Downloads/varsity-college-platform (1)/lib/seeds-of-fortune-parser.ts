import type { ScholarshipData } from "./scholarship-locator"
import { fetchCSVData, parseCSV } from "./csv-parser"

// URLs for the Seeds of Fortune CSV files
const SEEDS_OF_FORTUNE_URLS = [
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Master%20Scholarship%20Spreadsheet%20-%20Seeds%20of%20Fortune%20-%20July-9V2piyNvyC9eRTOyMSAGoqECOXELPH.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Master%20Scholarship%20Spreadsheet%20-%20Seeds%20of%20Fortune%20-%20June-dllsS7lzlD0Dm8knjvBu0Qr1xhVVgQ.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Master%20Scholarship%20Spreadsheet%20-%20Seeds%20of%20Fortune%20-%20December-tI6us8sT6xT6YTbZayjfRYj7WCupii.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Master%20Scholarship%20Spreadsheet%20-%20Seeds%20of%20Fortune%20-%20August-qF173RjLRDlAS0XpTAdjq5WgaLU5qC.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Master%20Scholarship%20Spreadsheet%20-%20Seeds%20of%20Fortune%20-%20April-dBQW9P3lMda9vAg6G90ZY69lUgdl7d.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scholarship%20Spreadsheet%20-%20Sheet1-uK3WTyId1y2tsaN4AFVW5INaYa47kd.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Master%20Scholarship%20Spreadsheet%20-%20Seeds%20of%20Fortune%20-%20February-iRuWQ2ar9IhEixGAT7iQUgb1HyCwmY.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Master%20Scholarship%20Spreadsheet%20-%20Seeds%20of%20Fortune%20-%20March-2G6EhteS4nviBeUEZHOWfDdA0rNybn.csv",
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Master%20Scholarship%20Spreadsheet%20-%20Seeds%20of%20Fortune%20-%20January-hABaJdxQ7tJB5ll1d4eYixEqZZsWft.csv",
]

// Date updating functions
function updateDatesIn2024To2025(text: string): string {
  if (!text) return text
  return text.replace(/2024/g, "2025")
}

function checkIfDateHasPassed(dateString: string): boolean {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth() + 1

  // If we're in 2025 and beyond, check if the date has passed
  if (currentYear >= 2025) {
    // Extract month from common date patterns
    const monthPatterns = [
      { pattern: /january|jan/i, month: 1 },
      { pattern: /february|feb/i, month: 2 },
      { pattern: /march|mar/i, month: 3 },
      { pattern: /april|apr/i, month: 4 },
      { pattern: /may/i, month: 5 },
      { pattern: /june|jun/i, month: 6 },
      { pattern: /july|jul/i, month: 7 },
      { pattern: /august|aug/i, month: 8 },
      { pattern: /september|sep|sept/i, month: 9 },
      { pattern: /october|oct/i, month: 10 },
      { pattern: /november|nov/i, month: 11 },
      { pattern: /december|dec/i, month: 12 },
    ]

    for (const { pattern, month } of monthPatterns) {
      if (pattern.test(dateString)) {
        // If current year is 2025 and we're past the month, or if current year is beyond 2025
        if (currentYear > 2025 || (currentYear === 2025 && currentMonth > month)) {
          return true
        }
        break
      }
    }
  }

  return false
}

function updateDatesIn2025To2026IfPassed(text: string): string {
  if (!text) return text

  // Check if any 2025 dates have passed and update them to 2026
  if (text.includes("2025") && checkIfDateHasPassed(text)) {
    return text.replace(/2025/g, "2026")
  }

  return text
}

function updateScholarshipDates(text: string): string {
  if (!text) return text

  // First, update any 2024 dates to 2025
  let updatedText = updateDatesIn2024To2025(text)

  // Then, check if any 2025 dates have passed and update to 2026
  updatedText = updateDatesIn2025To2026IfPassed(updatedText)

  return updatedText
}

// Extract scholarship type from the "Type of Scholarship" field
function extractScholarshipType(
  typeString: string,
): "need-based" | "merit" | "demographic" | "program-specific" | "geographic" {
  if (!typeString) return "merit"

  const lower = typeString.toLowerCase()

  if (lower.includes("need") || lower.includes("financial")) {
    return "need-based"
  }

  if (
    lower.includes("women") ||
    lower.includes("minority") ||
    lower.includes("hispanic") ||
    lower.includes("african") ||
    lower.includes("asian") ||
    lower.includes("native") ||
    lower.includes("lgbtq") ||
    lower.includes("gender") ||
    lower.includes("transgender")
  ) {
    return "demographic"
  }

  if (
    lower.includes("stem") ||
    lower.includes("engineering") ||
    lower.includes("computer") ||
    lower.includes("technology") ||
    lower.includes("science") ||
    lower.includes("math") ||
    lower.includes("business") ||
    lower.includes("education") ||
    lower.includes("liberal arts") ||
    lower.includes("medical") ||
    lower.includes("health")
  ) {
    return "program-specific"
  }

  if (lower.includes("state") || lower.includes("local") || lower.includes("regional")) {
    return "geographic"
  }

  return "merit"
}

// Extract programs from type and qualifiers
function extractPrograms(typeString: string, qualifiers: string): string[] {
  const text = (typeString + " " + qualifiers).toLowerCase()
  const programs = []

  if (text.includes("stem") || text.includes("science") || text.includes("technology")) {
    programs.push("STEM")
  }
  if (text.includes("engineering")) programs.push("Engineering")
  if (text.includes("computer") || text.includes("technology")) programs.push("Computer Science")
  if (text.includes("business") || text.includes("marketing") || text.includes("advertising")) programs.push("Business")
  if (text.includes("medical") || text.includes("health") || text.includes("mental health")) programs.push("Medicine")
  if (text.includes("education") || text.includes("teaching")) programs.push("Education")
  if (text.includes("liberal arts") || text.includes("arts")) programs.push("Arts")
  if (text.includes("math")) programs.push("Mathematics")
  if (text.includes("psychology") || text.includes("counseling")) programs.push("Psychology")
  if (text.includes("public service") || text.includes("government")) programs.push("Public Service")

  return programs.length > 0 ? programs : ["ALL"]
}

// Extract demographics from type and qualifiers
function extractDemographics(typeString: string, qualifiers: string): string[] {
  const text = (typeString + " " + qualifiers).toLowerCase()
  const demographics = []

  if (text.includes("women") || text.includes("woman") || text.includes("female")) {
    demographics.push("Women")
  }
  if (text.includes("hispanic") || text.includes("latino") || text.includes("latina")) {
    demographics.push("Hispanic")
  }
  if (text.includes("african american") || text.includes("black")) {
    demographics.push("African American")
  }
  if (text.includes("asian") || text.includes("pacific islander")) {
    demographics.push("Asian Pacific Islander")
  }
  if (text.includes("native american") || text.includes("american indian")) {
    demographics.push("Native American")
  }
  if (text.includes("transgender") || text.includes("non-binary") || text.includes("gender")) {
    demographics.push("LGBTQ+")
  }
  if (text.includes("daca") || text.includes("immigrant")) {
    demographics.push("Immigrants")
  }
  if (text.includes("first generation")) {
    demographics.push("First Generation")
  }

  return demographics.length > 0 ? demographics : ["ALL"]
}

// Extract eligibility requirements
function extractEligibility(qualifiers: string, supportingMaterials: string): string[] {
  const text = (qualifiers + " " + supportingMaterials).toLowerCase()
  const eligibility = []

  if (text.includes("high school senior") || text.includes("graduating")) {
    eligibility.push("High School Senior")
  }
  if (text.includes("undergraduate") || text.includes("college student")) {
    eligibility.push("Undergraduate")
  }
  if (text.includes("graduate") && !text.includes("undergraduate")) {
    eligibility.push("Graduate Student")
  }
  if (text.includes("gpa") || text.includes("grade point")) {
    const gpaMatch = text.match(/(\d+\.\d+)\s*gpa/)
    if (gpaMatch) {
      eligibility.push(`GPA ${gpaMatch[1]}+`)
    } else {
      eligibility.push("Academic Merit")
    }
  }
  if (text.includes("us citizen") || text.includes("citizen")) {
    eligibility.push("US Citizen")
  }
  if (text.includes("permanent resident")) {
    eligibility.push("Permanent Resident")
  }
  if (text.includes("essay") || text.includes("application")) {
    eligibility.push("Application Required")
  }
  if (text.includes("video") || text.includes("creative")) {
    eligibility.push("Creative Submission")
  }
  if (text.includes("financial need") || text.includes("income")) {
    eligibility.push("Financial Need")
  }
  if (text.includes("leadership")) {
    eligibility.push("Leadership")
  }
  if (text.includes("community service") || text.includes("volunteer")) {
    eligibility.push("Community Service")
  }

  return eligibility.length > 0 ? eligibility : ["Student"]
}

// Generate scholarship ID
function generateScholarshipId(name: string): string {
  return (
    "sof-" +
    name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50)
  )
}

// Extract provider from scholarship name
function extractProvider(name: string): string {
  // Common patterns to extract organization names
  const patterns = [
    /(.+?)\s+scholarship/i,
    /(.+?)\s+foundation/i,
    /(.+?)\s+award/i,
    /(.+?)\s+grant/i,
    /(.+?)\s+program/i,
  ]

  for (const pattern of patterns) {
    const match = name.match(pattern)
    if (match && match[1].length > 2) {
      return match[1].trim()
    }
  }

  // If no pattern matches, use the first few words
  const words = name.split(" ")
  return words.slice(0, Math.min(3, words.length)).join(" ")
}

// Parse amount string
function parseAmount(amountString: string): string {
  if (!amountString) return "Varies"

  // Clean up the amount
  const cleaned = amountString.replace(/[^\d$,.\-\s]/g, " ").trim()

  // Look for dollar amounts
  const dollarMatch = cleaned.match(/\$[\d,]+/)
  if (dollarMatch) {
    return dollarMatch[0]
  }

  // Check for common phrases
  if (amountString.toLowerCase().includes("varies")) {
    return "Varies"
  }
  if (amountString.toLowerCase().includes("full")) {
    return "Full Ride"
  }

  return amountString.length > 50 ? "Varies" : amountString
}

// Extract deadline from various text fields
function extractDeadline(qualifiers: string, supportingMaterials: string, name: string): string {
  const text = (qualifiers + " " + supportingMaterials + " " + name).toLowerCase()

  // Look for month patterns
  const monthPatterns = [
    { pattern: /january|jan/i, month: "January" },
    { pattern: /february|feb/i, month: "February" },
    { pattern: /march|mar/i, month: "March" },
    { pattern: /april|apr/i, month: "April" },
    { pattern: /may/i, month: "May" },
    { pattern: /june|jun/i, month: "June" },
    { pattern: /july|jul/i, month: "July" },
    { pattern: /august|aug/i, month: "August" },
    { pattern: /september|sep|sept/i, month: "September" },
    { pattern: /october|oct/i, month: "October" },
    { pattern: /november|nov/i, month: "November" },
    { pattern: /december|dec/i, month: "December" },
  ]

  for (const { pattern, month } of monthPatterns) {
    if (pattern.test(text)) {
      // Look for day
      const dayMatch = text.match(new RegExp(`${pattern.source}\\s*(\\d{1,2})`, "i"))
      const day = dayMatch ? dayMatch[1] : "1"

      return updateScholarshipDates(`${month} ${day}, 2025`)
    }
  }

  // Look for specific date patterns
  const datePatterns = [
    /(\w+)\s+(\d{1,2}),?\s*(\d{4})/i, // Month Day, Year
    /(\d{1,2})\/(\d{1,2})\/(\d{4})/i, // MM/DD/YYYY
  ]

  for (const pattern of datePatterns) {
    const match = text.match(pattern)
    if (match) {
      return updateScholarshipDates(match[0])
    }
  }

  return "TBD"
}

// Main function to load Seeds of Fortune scholarships
export async function loadSeedsOfFortuneScholarships(): Promise<ScholarshipData[]> {
  const newScholarships: ScholarshipData[] = []

  for (const url of SEEDS_OF_FORTUNE_URLS) {
    try {
      console.log(`Loading scholarships from: ${url}`)
      const csvData = await fetchCSVData(url)
      const parsedData = parseCSV(csvData)

      for (const row of parsedData) {
        // Skip header rows or empty rows
        if (!row.Name || row.Name === "Name" || row.Name.toLowerCase().includes("scholarship")) {
          if (row.Name === "Name") continue // Skip header
        }

        // Handle different CSV schemas
        const name = row.Name || row["Name"] || ""
        const amount = row["Prize Amount"] || row.Amount || "Varies"
        const qualifiers = row.Qualifers || row.Qualifiers || ""
        const supportingMaterials = row["Supporting Materials"] || ""
        const website = row["Link for More Info"] || row["Link for Additional Info"] || ""
        const typeOfScholarship = row["Type of Scholarship"] || ""
        const dateDue = row["Date Due"] || ""

        if (!name || name.length < 3) continue

        // Update all text fields for dates
        const updatedName = updateScholarshipDates(name)
        const updatedQualifiers = updateScholarshipDates(qualifiers)
        const updatedSupportingMaterials = updateScholarshipDates(supportingMaterials)
        const updatedDateDue = updateScholarshipDates(dateDue)

        const scholarship: ScholarshipData = {
          id: generateScholarshipId(name),
          name: updatedName,
          description: updatedQualifiers || `Scholarship for eligible students`,
          amount: parseAmount(amount),
          deadline: updatedDateDue || extractDeadline(updatedQualifiers, updatedSupportingMaterials, updatedName),
          type: extractScholarshipType(typeOfScholarship),
          eligibility: extractEligibility(updatedQualifiers, updatedSupportingMaterials),
          states: ["ALL"], // Most scholarships are national unless specified
          colleges: ["ALL"],
          programs: extractPrograms(typeOfScholarship, updatedQualifiers),
          demographics: extractDemographics(typeOfScholarship, updatedQualifiers),
          website: website || undefined,
          provider: extractProvider(name),
        }

        newScholarships.push(scholarship)
      }
    } catch (error) {
      console.error(`Error loading scholarships from ${url}:`, error)
    }
  }

  console.log(`Loaded ${newScholarships.length} scholarships from Seeds of Fortune CSVs`)
  return newScholarships
}

// Function to update existing scholarship dates
export function updateExistingScholarshipDates(scholarships: ScholarshipData[]): ScholarshipData[] {
  return scholarships.map((scholarship) => ({
    ...scholarship,
    deadline: updateScholarshipDates(scholarship.deadline),
    description: updateScholarshipDates(scholarship.description),
    name: updateScholarshipDates(scholarship.name),
  }))
}
