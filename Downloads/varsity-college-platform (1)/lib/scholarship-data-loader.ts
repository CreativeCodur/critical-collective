import type { ScholarshipData } from "./scholarship-locator"
import {
  fetchCSVData,
  parseCSV,
  mapGradeLevelToEligibility,
  parseAwardAmount,
  categorizeScholarshipType,
  extractPrograms,
  extractDemographics,
  parseDeadline,
} from "./csv-parser"

// CSV URLs
const INDIVIDUAL_SCHOLARSHIPS_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scholarship%20Database%20-%20Individual%20Scholarships-cOuaBepQYpWoi0gzAFQNCNo8CWqiAh.csv"
const COLLEGE_SPECIFIC_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scholarship%20Database%20-%20College%20Specific%20Scholarship-MKWKHrR0CttIjX76LKmlFE4hkmAoXZ.csv"
const DATABASE_WEBSITES_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Scholarship%20Database%20-%20Scholarship%20Database-X9eraAP5vwOV1MLNYo9qtNFrSyDTAt.csv"

export async function loadScholarshipsFromCSV(): Promise<ScholarshipData[]> {
  const newScholarships: ScholarshipData[] = []

  try {
    // Load Individual Scholarships
    console.log("Loading individual scholarships...")
    const individualCSV = await fetchCSVData(INDIVIDUAL_SCHOLARSHIPS_URL)
    const individualData = parseCSV(individualCSV)

    for (const row of individualData) {
      if (!row["Name of Scholarship"] || row["Name of Scholarship"] === "Name of Scholarship") continue

      const scholarship: ScholarshipData = {
        id: generateScholarshipId(row["Name of Scholarship"]),
        name: row["Name of Scholarship"],
        description: row["Qualifying Factors"] || "Scholarship for eligible students",
        amount: parseAwardAmount(row["Award Amount"]),
        deadline: parseDeadline(row["Month Typically Due"]),
        type: categorizeScholarshipType(row["Qualifying Factors"] || "", row["Name of Scholarship"]),
        eligibility: [
          ...mapGradeLevelToEligibility(row["Grade Level"] || ""),
          ...extractEligibilityFromFactors(row["Qualifying Factors"] || ""),
        ],
        states: ["ALL"], // Most individual scholarships are national
        colleges: ["ALL"],
        programs: extractPrograms(row["Qualifying Factors"] || "", row["Name of Scholarship"]),
        demographics: extractDemographics(row["Qualifying Factors"] || "", row["Name of Scholarship"]),
        website: row["Website"] || undefined,
        provider: extractProvider(row["Name of Scholarship"]),
      }

      newScholarships.push(scholarship)
    }

    // Load College-Specific Scholarships
    console.log("Loading college-specific scholarships...")
    const collegeCSV = await fetchCSVData(COLLEGE_SPECIFIC_URL)
    const collegeData = parseCSV(collegeCSV)

    for (const row of collegeData) {
      if (!row["Scholarship Name"] || row["Scholarship Name"] === "Scholarship Name") continue
      if (!row["College Name"] || row["College Name"] === "College Name") continue

      const scholarship: ScholarshipData = {
        id: generateScholarshipId(row["Scholarship Name"] + "_" + row["College Name"]),
        name: row["Scholarship Name"],
        description: row["General Information"] || `Scholarship offered by ${row["College Name"]}`,
        amount: parseAwardAmount(row["Award Amount"]),
        deadline: row["Deadline"] || "TBD",
        type: categorizeScholarshipType(row["General Information"] || "", row["Scholarship Name"]),
        eligibility: [
          ...extractEligibilityFromFactors(row["How to be Considered"] || ""),
          ...extractEligibilityFromFactors(row["General Information"] || ""),
        ],
        states: ["ALL"], // Will be refined based on college location
        colleges: [row["College Name"]],
        programs: extractPrograms(row["General Information"] || "", row["Scholarship Name"]),
        demographics: extractDemographics(row["General Information"] || "", row["Scholarship Name"]),
        website: row["Scholarship Website"] || undefined,
        provider: row["College Name"],
      }

      newScholarships.push(scholarship)
    }

    console.log(`Loaded ${newScholarships.length} scholarships from CSV files`)
    return newScholarships
  } catch (error) {
    console.error("Error loading scholarships from CSV:", error)
    return []
  }
}

function generateScholarshipId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50)
}

function extractProvider(scholarshipName: string): string {
  // Try to extract organization name from scholarship name
  const commonPatterns = [/(.+?)\s+scholarship/i, /(.+?)\s+foundation/i, /(.+?)\s+award/i, /(.+?)\s+grant/i]

  for (const pattern of commonPatterns) {
    const match = scholarshipName.match(pattern)
    if (match) {
      return match[1].trim()
    }
  }

  // If no pattern matches, use the first few words
  const words = scholarshipName.split(" ")
  return words.slice(0, Math.min(3, words.length)).join(" ")
}

function extractEligibilityFromFactors(factors: string): string[] {
  const eligibility = []
  const lower = factors.toLowerCase()

  if (lower.includes("gpa") || lower.includes("grade point")) {
    const gpaMatch = factors.match(/(\d+\.\d+)\s*gpa/i)
    if (gpaMatch) {
      eligibility.push(`GPA ${gpaMatch[1]}+`)
    } else {
      eligibility.push("Academic Merit")
    }
  }

  if (lower.includes("act") || lower.includes("sat")) {
    eligibility.push("Test Scores Required")
  }

  if (lower.includes("financial need") || lower.includes("income")) {
    eligibility.push("Financial Need")
  }

  if (lower.includes("community service") || lower.includes("volunteer")) {
    eligibility.push("Community Service")
  }

  if (lower.includes("leadership")) {
    eligibility.push("Leadership")
  }

  if (lower.includes("essay") || lower.includes("application")) {
    eligibility.push("Application Required")
  }

  if (lower.includes("us citizen") || lower.includes("citizen")) {
    eligibility.push("US Citizen")
  }

  return eligibility
}

// Function to check for duplicates
export function isDuplicateScholarship(
  newScholarship: ScholarshipData,
  existingScholarships: ScholarshipData[],
): boolean {
  return existingScholarships.some((existing) => {
    // Check by name similarity
    const nameSimilarity = calculateSimilarity(newScholarship.name.toLowerCase(), existing.name.toLowerCase())

    // Check by website
    const websiteMatch = newScholarship.website && existing.website && newScholarship.website === existing.website

    // Consider it a duplicate if names are very similar or websites match
    return nameSimilarity > 0.85 || websiteMatch
  })
}

function calculateSimilarity(str1: string, str2: string): number {
  const longer = str1.length > str2.length ? str1 : str2
  const shorter = str1.length > str2.length ? str2 : str1

  if (longer.length === 0) return 1.0

  const editDistance = levenshteinDistance(longer, shorter)
  return (longer.length - editDistance) / longer.length
}

function levenshteinDistance(str1: string, str2: string): number {
  const matrix = []

  for (let i = 0; i <= str2.length; i++) {
    matrix[i] = [i]
  }

  for (let j = 0; j <= str1.length; j++) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= str2.length; i++) {
    for (let j = 1; j <= str1.length; j++) {
      if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1]
      } else {
        matrix[i][j] = Math.min(matrix[i - 1][j - 1] + 1, matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
      }
    }
  }

  return matrix[str2.length][str1.length]
}
