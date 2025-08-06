import Link from "next/link"

const projects = [
  {
    title: "Meridian",
    category: "Brand Identity",
    year: "2024",
    description: "A complete visual identity for a precision engineering firm.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Axis",
    category: "Product Design",
    year: "2023",
    description: "Minimalist furniture collection emphasizing form and function.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Clarity",
    category: "Digital Experience",
    year: "2023",
    description: "A meditation app designed for focus and simplicity.",
    image: "/placeholder.svg?height=600&width=800",
  },
  {
    title: "Foundation",
    category: "Architecture",
    year: "2022",
    description: "Residential project showcasing clean lines and natural materials.",
    image: "/placeholder.svg?height=600&width=800",
  },
]

export default function WorkPage() {
  return (
    <main className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <h1 className="text-5xl md:text-6xl font-light text-neutral-900 mb-8 leading-tight">Selected Work</h1>
          <p className="text-xl text-neutral-600 font-light leading-relaxed max-w-3xl">
            Each project represents a unique challenge solved through careful consideration and purposeful design.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-24">
          {projects.map((project, index) => (
            <div key={project.title} className="group">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className={`${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <img
                      src={project.image || "/placeholder.svg"}
                      alt={`${project.title} project showcase`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className={`${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-sm text-neutral-500 uppercase tracking-wider">{project.category}</span>
                    <span className="text-sm text-neutral-400">{project.year}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-light text-neutral-900 mb-6">{project.title}</h2>
                  <p className="text-lg text-neutral-600 leading-relaxed mb-8">{project.description}</p>
                  <Link
                    href={`/work/${project.title.toLowerCase()}`}
                    className="text-neutral-900 hover:text-neutral-600 transition-colors duration-300 inline-flex items-center group"
                  >
                    View Project
                    <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
