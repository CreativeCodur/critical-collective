import type { CollegeData } from "./college-api"

export interface OpportunityType {
  id: string
  title: string
  description: string
  amount?: string
  eligibility: string[]
  type: "scholarship" | "program" | "benefit" | "fellowship"
  deadline?: string
}

export interface CollegeCategory {
  id: string
  name: string
  description: string
  opportunities: OpportunityType[]
}

// Define college categories and their opportunities
export const collegeCategories: Record<string, CollegeCategory> = {
  "ivy-league": {
    id: "ivy-league",
    name: "Ivy League",
    description: "Elite private research universities with prestigious alumni networks",
    opportunities: [
      {
        id: "rhodes-scholarship",
        title: "Rhodes Scholarship Eligibility",
        description: "Access to one of the world's most prestigious international scholarships",
        amount: "Full funding",
        eligibility: ["Academic Excellence", "Leadership", "Service"],
        type: "fellowship",
        deadline: "October 2024",
      },
      {
        id: "alumni-network",
        title: "Exclusive Alumni Network",
        description: "Lifetime access to influential alumni in business, politics, and academia",
        eligibility: ["Enrollment"],
        type: "benefit",
      },
      {
        id: "research-fellowships",
        title: "Undergraduate Research Fellowships",
        description: "Work directly with Nobel laureates and world-renowned faculty",
        amount: "$5,000 - $15,000",
        eligibility: ["Academic Merit", "Research Interest"],
        type: "fellowship",
      },
      {
        id: "need-based-aid",
        title: "Need-Based Financial Aid",
        description: "Generous financial aid packages, often covering full tuition",
        amount: "Up to full tuition",
        eligibility: ["Financial Need"],
        type: "scholarship",
      },
    ],
  },
  "state-schools": {
    id: "state-schools",
    name: "State Universities",
    description: "Public universities offering excellent education at affordable costs",
    opportunities: [
      {
        id: "in-state-tuition",
        title: "In-State Tuition Benefits",
        description: "Significant tuition savings for state residents",
        amount: "Save $15,000 - $35,000/year",
        eligibility: ["State Residency"],
        type: "benefit",
      },
      {
        id: "state-grants",
        title: "State-Specific Merit Scholarships",
        description: "Scholarships funded by state governments for high achievers",
        amount: "$2,000 - $10,000",
        eligibility: ["State Residency", "Academic Merit"],
        type: "scholarship",
      },
      {
        id: "honors-programs",
        title: "Honors College Programs",
        description: "Small class sizes and enhanced academic experiences within large universities",
        eligibility: ["High GPA", "Test Scores"],
        type: "program",
      },
      {
        id: "regional-partnerships",
        title: "Regional Employer Partnerships",
        description: "Strong connections with local and regional employers for internships and jobs",
        eligibility: ["Enrollment"],
        type: "program",
      },
    ],
  },
  "stem-focused": {
    id: "stem-focused",
    name: "STEM-Focused Institutions",
    description: "Universities with strong science, technology, engineering, and mathematics programs",
    opportunities: [
      {
        id: "nsf-grants",
        title: "NSF Research Grants",
        description: "National Science Foundation funding for undergraduate research",
        amount: "$1,500 - $5,000",
        eligibility: ["STEM Major", "Research Proposal"],
        type: "fellowship",
        deadline: "Various",
      },
      {
        id: "tech-partnerships",
        title: "Tech Company Partnerships",
        description: "Direct pipelines to major tech companies like Google, Apple, Microsoft",
        eligibility: ["STEM Major"],
        type: "program",
      },
      {
        id: "research-assistantships",
        title: "Research Assistantships",
        description: "Paid positions working on cutting-edge research projects",
        amount: "$10,000 - $25,000/year",
        eligibility: ["STEM Major", "Academic Standing"],
        type: "program",
      },
      {
        id: "stem-scholarships",
        title: "STEM-Specific Scholarships",
        description: "Scholarships targeting science and engineering students",
        amount: "$2,500 - $15,000",
        eligibility: ["STEM Major", "Academic Merit"],
        type: "scholarship",
      },
    ],
  },
  "liberal-arts": {
    id: "liberal-arts",
    name: "Liberal Arts Colleges",
    description: "Small colleges focused on undergraduate education and critical thinking",
    opportunities: [
      {
        id: "creative-scholarships",
        title: "Creative Arts Scholarships",
        description: "Funding for students in visual arts, music, theater, and creative writing",
        amount: "$3,000 - $20,000",
        eligibility: ["Portfolio/Audition", "Artistic Merit"],
        type: "scholarship",
      },
      {
        id: "study-abroad",
        title: "Study Abroad Programs",
        description: "Extensive international study opportunities with financial support",
        amount: "Varies",
        eligibility: ["Academic Standing"],
        type: "program",
      },
      {
        id: "humanities-fellowships",
        title: "Humanities Research Fellowships",
        description: "Summer research opportunities in literature, history, and philosophy",
        amount: "$3,000 - $8,000",
        eligibility: ["Humanities Major", "Research Proposal"],
        type: "fellowship",
        deadline: "March 2024",
      },
      {
        id: "small-class-benefit",
        title: "Small Class Sizes",
        description: "Personalized attention with average class sizes under 20 students",
        eligibility: ["Enrollment"],
        type: "benefit",
      },
    ],
  },
  "research-universities": {
    id: "research-universities",
    name: "Research Universities",
    description: "Large universities with extensive research programs and graduate schools",
    opportunities: [
      {
        id: "reu-programs",
        title: "REU (Research Experience for Undergraduates)",
        description: "NSF-funded summer research programs across various disciplines",
        amount: "$5,000 - $8,000",
        eligibility: ["Undergraduate Status", "Research Interest"],
        type: "program",
        deadline: "February 2024",
      },
      {
        id: "grad-school-prep",
        title: "Graduate School Preparation",
        description: "Direct pathways to top graduate programs with faculty mentorship",
        eligibility: ["Academic Excellence"],
        type: "program",
      },
      {
        id: "teaching-assistantships",
        title: "Teaching Assistantships",
        description: "Opportunities to assist professors and gain teaching experience",
        amount: "$8,000 - $15,000/year",
        eligibility: ["Upper-level Student", "Academic Merit"],
        type: "program",
      },
    ],
  },
  "business-schools": {
    id: "business-schools",
    name: "Business-Focused Universities",
    description: "Universities with strong business programs and corporate connections",
    opportunities: [
      {
        id: "internship-programs",
        title: "Corporate Internship Programs",
        description: "Guaranteed internship placements with Fortune 500 companies",
        eligibility: ["Business Major", "Academic Standing"],
        type: "program",
      },
      {
        id: "entrepreneurship-competitions",
        title: "Entrepreneurship Competitions",
        description: "Business plan competitions with substantial cash prizes",
        amount: "$5,000 - $50,000",
        eligibility: ["Business Plan", "Presentation"],
        type: "program",
        deadline: "April 2024",
      },
      {
        id: "business-scholarships",
        title: "Business Merit Scholarships",
        description: "Scholarships for high-achieving business students",
        amount: "$5,000 - $25,000",
        eligibility: ["Business Major", "Academic Merit"],
        type: "scholarship",
      },
    ],
  },
}

// Geographic scholarships by state
export const stateScholarships: Record<string, OpportunityType[]> = {
  CA: [
    {
      id: "cal-grant",
      title: "Cal Grant",
      description: "California state grant for college expenses",
      amount: "Up to $12,570",
      eligibility: ["California Resident", "Financial Need"],
      type: "scholarship",
      deadline: "March 2024",
    },
    {
      id: "middle-class-scholarship",
      title: "Middle Class Scholarship",
      description: "For middle-income California families attending UC or CSU",
      amount: "Up to $40,000",
      eligibility: ["California Resident", "Income Requirements"],
      type: "scholarship",
    },
  ],
  TX: [
    {
      id: "texas-grant",
      title: "TEXAS Grant",
      description: "Need-based grant for Texas residents",
      amount: "Up to $5,000",
      eligibility: ["Texas Resident", "Financial Need"],
      type: "scholarship",
    },
    {
      id: "top-ten-percent",
      title: "Top 10% Rule",
      description: "Automatic admission to Texas public universities",
      eligibility: ["Top 10% of Texas High School Class"],
      type: "benefit",
    },
  ],
  NY: [
    {
      id: "excelsior-scholarship",
      title: "Excelsior Scholarship",
      description: "Free tuition at SUNY and CUNY schools",
      amount: "Full tuition",
      eligibility: ["New York Resident", "Income Under $125,000"],
      type: "scholarship",
    },
  ],
  FL: [
    {
      id: "bright-futures",
      title: "Bright Futures Scholarship",
      description: "Merit-based scholarship for Florida students",
      amount: "75% - 100% tuition",
      eligibility: ["Florida Resident", "Academic Merit"],
      type: "scholarship",
    },
  ],
}

// Function to categorize a college based on its data
export function categorizeCollege(college: CollegeData): string[] {
  const categories: string[] = []

  // Ivy League (hardcoded list)
  const ivyLeagueSchools = [
    "Harvard University",
    "Yale University",
    "Princeton University",
    "Columbia University",
    "University of Pennsylvania",
    "Dartmouth College",
    "Brown University",
    "Cornell University",
  ]

  if (ivyLeagueSchools.some((ivy) => college.name.includes(ivy))) {
    categories.push("ivy-league")
  }

  // State schools (public ownership)
  if (college.ownership === 1) {
    categories.push("state-schools")
  }

  // STEM-focused (high engineering percentage)
  if (
    college.engineeringPercent > 25 ||
    college.name.toLowerCase().includes("institute of technology") ||
    college.name.toLowerCase().includes("polytechnic")
  ) {
    categories.push("stem-focused")
  }

  // Liberal arts (small size, private, low engineering percentage)
  if (
    college.studentSize < 5000 &&
    college.ownership === 2 &&
    college.engineeringPercent < 10 &&
    !categories.includes("ivy-league")
  ) {
    categories.push("liberal-arts")
  }

  // Research universities (large size, high student count)
  if (college.studentSize > 15000) {
    categories.push("research-universities")
  }

  // Business schools (high business percentage)
  if (college.businessPercent > 30) {
    categories.push("business-schools")
  }

  // Default to state-schools if no other category
  if (categories.length === 0 && college.ownership === 1) {
    categories.push("state-schools")
  }

  return categories
}

// Function to get opportunities for a college
export function getCollegeOpportunities(college: CollegeData): {
  categories: CollegeCategory[]
  stateOpportunities: OpportunityType[]
  totalOpportunities: number
} {
  const categoryIds = categorizeCollege(college)
  const categories = categoryIds.map((id) => collegeCategories[id]).filter(Boolean)

  const stateOpportunities = stateScholarships[college.state] || []

  const totalOpportunities =
    categories.reduce((sum, cat) => sum + cat.opportunities.length, 0) + stateOpportunities.length

  return {
    categories,
    stateOpportunities,
    totalOpportunities,
  }
}
