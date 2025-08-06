const API_KEY = "wXRqDmGzvOE3dFt9mZumUzoibPgzWP14rVnYFevn"
const BASE_URL = "https://api.data.gov/ed/collegescorecard/v1/schools"

export interface CollegeData {
  id: number
  name: string
  city: string
  state: string
  website: string
  ownership: number
  admissionRate: number
  tuitionInState: number
  tuitionOutState: number
  studentSize: number
  businessPercent: number
  engineeringPercent: number
  whitePercent: number
  blackPercent: number
  hispanicPercent: number
  medianEarnings: number
}

const fields = [
  "id",
  "school.name",
  "school.city",
  "school.state",
  "school.school_url",
  "school.ownership",
  "2022.admissions.admission_rate.overall",
  "2022.cost.tuition.in_state",
  "2022.cost.tuition.out_of_state",
  "2022.student.size",
  "2022.academics.program_percentage.business_marketing",
  "2022.academics.program_percentage.engineering",
  "2022.student.demographics.race_ethnicity.white",
  "2022.student.demographics.race_ethnicity.black",
  "2022.student.demographics.race_ethnicity.hispanic",
  "2022.earnings.10_yrs_after_entry.median",
].join(",")

export async function fetchColleges(
  page = 1,
  perPage = 100,
): Promise<{
  colleges: CollegeData[]
  totalPages: number
  currentPage: number
}> {
  try {
    const url = `${BASE_URL}?api_key=${API_KEY}&fields=${fields}&per_page=${perPage}&page=${page}&school.degrees_awarded.predominant=2,3&school.operating=1`
    const response = await fetch(url)
    const data = await response.json()
    if (!data.results) throw new Error('No results from API')
    const colleges: CollegeData[] = data.results
      .filter(
        (school: any) =>
          school["school.name"] && school["school.city"] && school["school.state"] && school["2022.student.size"] > 500, // Filter for colleges with reasonable size
      )
      .map((school: any, index: number) => ({
        id: school.id || `${school["school.name"]}-${school["school.city"]}-${school["school.state"]}`,
        name: school["school.name"],
        city: school["school.city"],
        state: school["school.state"],
        website: school["school.school_url"] || "",
        ownership: school["school.ownership"] || 1,
        admissionRate: school["2022.admissions.admission_rate.overall"]
          ? Math.round(school["2022.admissions.admission_rate.overall"] * 100)
          : 0,
        tuitionInState: school["2022.cost.tuition.in_state"] || 0,
        tuitionOutState: school["2022.cost.tuition.out_of_state"] || 0,
        studentSize: school["2022.student.size"] || 0,
        businessPercent: school["2022.academics.program_percentage.business_marketing"]
          ? Math.round(school["2022.academics.program_percentage.business_marketing"] * 100)
          : 0,
        engineeringPercent: school["2022.academics.program_percentage.engineering"]
          ? Math.round(school["2022.academics.program_percentage.engineering"] * 100)
          : 0,
        whitePercent: school["2022.student.demographics.race_ethnicity.white"]
          ? Math.round(school["2022.student.demographics.race_ethnicity.white"] * 100)
          : 0,
        blackPercent: school["2022.student.demographics.race_ethnicity.black"]
          ? Math.round(school["2022.student.demographics.race_ethnicity.black"] * 100)
          : 0,
        hispanicPercent: school["2022.student.demographics.race_ethnicity.hispanic"]
          ? Math.round(school["2022.student.demographics.race_ethnicity.hispanic"] * 100)
          : 0,
        medianEarnings: school["2022.earnings.10_yrs_after_entry.median"] || 0,
      }))
    return {
      colleges,
      totalPages: Math.ceil(data.metadata.total / perPage),
      currentPage: page,
    }
  } catch (error) {
    // Fallback to local JSON
    try {
      const res = await fetch('/colleges.json')
      const localColleges = await res.json()
      return {
        colleges: localColleges.map((college: any) => ({
          ...college,
          admissionRate: Number.isFinite(college.admissionRate) ? college.admissionRate : 0,
        })),
        totalPages: 1,
        currentPage: 1,
      }
    } catch (err) {
      console.error('Error fetching colleges from API and local JSON:', err)
      return {
        colleges: [],
        totalPages: 0,
        currentPage: 1,
      }
    }
  }
}

export async function searchColleges(query: string, state?: string, ownership?: string): Promise<CollegeData[]> {
  try {
    let url = `${BASE_URL}?api_key=${API_KEY}&fields=${fields}&per_page=50&school.operating=1&school.degrees_awarded.predominant=2,3`
    if (state && state !== "all") {
      url += `&school.state=${state}`
    }
    if (ownership && ownership !== "all") {
      url += `&school.ownership=${ownership}`
    }
    const response = await fetch(url)
    const data = await response.json()
    if (!data.results) throw new Error('No results from API')
    const colleges: CollegeData[] = data.results
      .filter((school: any) => {
        if (!school["school.name"] || !school["school.city"] || !school["school.state"]) return false
        if (school["2022.student.size"] < 500) return false
        if (query) {
          const searchTerm = query.toLowerCase()
          return (
            school["school.name"].toLowerCase().includes(searchTerm) ||
            school["school.city"].toLowerCase().includes(searchTerm) ||
            school["school.state"].toLowerCase().includes(searchTerm)
          )
        }
        return true
      })
      .slice(0, 50) // Limit results
      .map((school: any) => ({
        id: school.id || `${school["school.name"]}-${school["school.city"]}-${school["school.state"]}`,
        name: school["school.name"],
        city: school["school.city"],
        state: school["school.state"],
        website: school["school.school_url"] || "",
        ownership: school["school.ownership"] || 1,
        admissionRate: school["2022.admissions.admission_rate.overall"]
          ? Math.round(school["2022.admissions.admission_rate.overall"] * 100)
          : 0,
        tuitionInState: school["2022.cost.tuition.in_state"] || 0,
        tuitionOutState: school["2022.cost.tuition.out_of_state"] || 0,
        studentSize: school["2022.student.size"] || 0,
        businessPercent: school["2022.academics.program_percentage.business_marketing"]
          ? Math.round(school["2022.academics.program_percentage.business_marketing"] * 100)
          : 0,
        engineeringPercent: school["2022.academics.program_percentage.engineering"]
          ? Math.round(school["2022.academics.program_percentage.engineering"] * 100)
          : 0,
        whitePercent: school["2022.student.demographics.race_ethnicity.white"]
          ? Math.round(school["2022.student.demographics.race_ethnicity.white"] * 100)
          : 0,
        blackPercent: school["2022.student.demographics.race_ethnicity.black"]
          ? Math.round(school["2022.student.demographics.race_ethnicity.black"] * 100)
          : 0,
        hispanicPercent: school["2022.student.demographics.race_ethnicity.hispanic"]
          ? Math.round(school["2022.student.demographics.race_ethnicity.hispanic"] * 100)
          : 0,
        medianEarnings: school["2022.earnings.10_yrs_after_entry.median"] || 0,
      }))
    return colleges
  } catch (error) {
    // Fallback to local JSON
    try {
      const res = await fetch('/colleges.json')
      const localColleges = await res.json()
      // Filter local colleges by query/state/ownership
      return localColleges.filter((college: any) => {
        if (query) {
          const searchTerm = query.toLowerCase()
          if (
            !college.name.toLowerCase().includes(searchTerm) &&
            !college.city?.toLowerCase().includes(searchTerm) &&
            !college.state?.toLowerCase().includes(searchTerm)
          ) {
            return false
          }
        }
        if (state && state !== 'all' && college.state !== state) return false
        if (ownership && ownership !== 'all' && String(college.ownership) !== String(ownership)) return false
        return true
      }).map((college: any) => ({
        ...college,
        admissionRate: Number.isFinite(college.admissionRate) ? college.admissionRate : 0,
      }))
    } catch (err) {
      console.error('Error searching colleges from API and local JSON:', err)
      return []
    }
  }
}

export async function fetchCollegeById(id: string): Promise<CollegeData | null> {
  try {
    const url = `${BASE_URL}?api_key=${API_KEY}&fields=${fields}&id=${id}&school.operating=1`

    const response = await fetch(url)
    const data = await response.json()

    if (data.results && data.results.length > 0) {
      const school = data.results[0]

      if (!school["school.name"] || !school["school.city"] || !school["school.state"]) {
        return null
      }

      return {
        id: school.id || Number.parseInt(id),
        name: school["school.name"],
        city: school["school.city"],
        state: school["school.state"],
        website: school["school.school_url"] || "",
        ownership: school["school.ownership"] || 1,
        admissionRate: school["2022.admissions.admission_rate.overall"]
          ? Math.round(school["2022.admissions.admission_rate.overall"] * 100)
          : 0,
        tuitionInState: school["2022.cost.tuition.in_state"] || 0,
        tuitionOutState: school["2022.cost.tuition.out_of_state"] || 0,
        studentSize: school["2022.student.size"] || 0,
        businessPercent: school["2022.academics.program_percentage.business_marketing"]
          ? Math.round(school["2022.academics.program_percentage.business_marketing"] * 100)
          : 0,
        engineeringPercent: school["2022.academics.program_percentage.engineering"]
          ? Math.round(school["2022.academics.program_percentage.engineering"] * 100)
          : 0,
        whitePercent: school["2022.student.demographics.race_ethnicity.white"]
          ? Math.round(school["2022.student.demographics.race_ethnicity.white"] * 100)
          : 0,
        blackPercent: school["2022.student.demographics.race_ethnicity.black"]
          ? Math.round(school["2022.student.demographics.race_ethnicity.black"] * 100)
          : 0,
        hispanicPercent: school["2022.student.demographics.race_ethnicity.hispanic"]
          ? Math.round(school["2022.student.demographics.race_ethnicity.hispanic"] * 100)
          : 0,
        medianEarnings: school["2022.earnings.10_yrs_after_entry.median"] || 0,
      }
    }

    return null
  } catch (error) {
    console.error("Error fetching college by ID:", error)
    return null
  }
}
