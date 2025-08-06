import { GraduationCap, Compass, DollarSign } from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "Expert Guidance",
    description: "Personalized college recommendations based on your profile",
  },
  {
    icon: Compass,
    title: "Discover Hidden Gems",
    description: "Find colleges that perfectly match your unique interests",
  },
  {
    icon: DollarSign,
    title: "Financial Planning",
    description: "Compare costs and find the best scholarship opportunities",
  },
]

export default function WhyVarsity() {
  return (
    <section className="py-20 bg-[#0a1a3a]">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-white text-center mb-16">Why Choose Varsity?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 bg-[rgba(10,26,58,0.5)] rounded-2xl border border-white/10 hover:border-[#a2c8ff] transition-all duration-200"
            >
              <feature.icon className="w-16 h-16 text-[#ff9a9a] mx-auto mb-6" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-white/80 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
