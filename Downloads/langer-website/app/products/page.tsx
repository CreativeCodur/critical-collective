import Image from "next/image"

const products = [
  {
    name: "Orange",
    description: "Florida Valencia oranges, cold-pressed at peak ripeness",
    detail: "No pulp, no added sugar, no compromise",
    image: "/images/orange-slice.jpg",
  },
  {
    name: "Cranberry",
    description: "Massachusetts bog cranberries, unsweetened",
    detail: "Pure tartness, natural antioxidants",
    image: "/images/cranberries.jpg",
  },
  {
    name: "Apple",
    description: "Washington orchard apples, unfiltered",
    detail: "Crisp flavor, natural cloudiness preserved",
    image: "/images/fresh-fruits.jpg",
  },
  {
    name: "Mango",
    description: "Tropical mangoes, nectar consistency",
    detail: "Rich texture, authentic tropical taste",
    image: "/images/fresh-fruits.jpg",
  },
]

export default function ProductsPage() {
  return (
    <main className="min-h-screen py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-32">
          <h1 className="text-5xl md:text-6xl font-light text-neutral-900 mb-16 leading-tight">Collection</h1>
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-6 md:col-start-2">
              <p className="text-xl text-neutral-600 leading-relaxed font-light">
                Each variety represents our commitment to preserving the essential character of exceptional fruit.
              </p>
            </div>
          </div>
        </div>

        {/* Products */}
        <div className="space-y-32">
          {products.map((product, index) => (
            <div key={product.name} className="grid grid-cols-12 gap-8 items-center">
              <div
                className={`col-span-12 md:col-span-7 ${
                  index % 2 === 1 ? "md:col-start-6" : ""
                } ${index % 2 === 1 ? "md:order-2" : ""}`}
              >
                <div className="aspect-[5/4] bg-neutral-100 overflow-hidden group cursor-pointer">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={`${product.name} detail`}
                    width={800}
                    height={640}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                  />
                </div>
              </div>
              <div
                className={`col-span-12 md:col-span-4 ${
                  index % 2 === 1 ? "md:col-start-2" : "md:col-start-9"
                } ${index % 2 === 1 ? "md:order-1" : ""}`}
              >
                <h2 className="text-3xl font-light text-neutral-900 mb-6">{product.name}</h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-4">{product.description}</p>
                <p className="text-sm text-neutral-500 leading-relaxed">{product.detail}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quality Statement */}
        <div className="mt-32 pt-32 border-t border-neutral-200">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
              <p className="text-lg text-neutral-600 leading-relaxed font-light">
                Available in 32oz and 64oz formats at select retailers. Each bottle is dated and inspected to ensure it
                meets our standards before leaving our facility.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
