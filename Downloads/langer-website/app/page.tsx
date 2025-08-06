import Link from "next/link"
import Image from "next/image"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      {/* Opening Moment */}
      <section className="min-h-screen flex items-center justify-center px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-light tracking-tight text-neutral-900 leading-[0.9] mb-16">
            Pure fruit.
            <br />
            <span className="text-neutral-600">Nothing else.</span>
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-5 md:col-start-2">
            <p className="text-xl text-neutral-700 leading-relaxed font-light">
              Since 1960, four generations of the Langer family have maintained an unwavering commitment to a single
              principle: exceptional fruit deserves exceptional care.
            </p>
          </div>
          <div className="col-span-12 md:col-span-4 md:col-start-8">
            <p className="text-base text-neutral-600 leading-relaxed">
              We work directly with growers, use traditional methods, and refuse artificial additives. The result is
              juice that tastes as nature intended.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Showcase */}
      <section className="py-32 px-8 bg-neutral-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 md:col-span-6">
              <div className="aspect-[4/3] bg-neutral-200 overflow-hidden">
                <Image
                  src="/images/orange-juice-hero.jpg"
                  alt="Fresh oranges being pressed"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover grayscale"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <h2 className="text-4xl font-light text-neutral-900 mb-8 leading-tight">
                Craft over
                <br />
                convenience
              </h2>
              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                Each variety begins with fruit selected at peak ripeness. We press, filter, and bottle using methods
                refined over decades—never rushing, never compromising.
              </p>
              <Link
                href="/products"
                className="text-neutral-900 hover:text-neutral-600 transition-colors duration-500 text-sm tracking-wide uppercase"
              >
                View Collection
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <div className="aspect-[3/4] bg-neutral-100 overflow-hidden group cursor-pointer">
                <Image
                  src="/images/orange-slice.jpg"
                  alt="Orange juice detail"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-light text-neutral-900 mb-2">Orange</h3>
                <p className="text-sm text-neutral-600">Florida Valencia, cold-pressed</p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-3 md:col-start-5">
              <div className="aspect-[3/4] bg-neutral-100 overflow-hidden group cursor-pointer">
                <Image
                  src="/images/cranberries.jpg"
                  alt="Cranberry juice detail"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-light text-neutral-900 mb-2">Cranberry</h3>
                <p className="text-sm text-neutral-600">Massachusetts bog, unsweetened</p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-3 md:col-start-9">
              <div className="aspect-[3/4] bg-neutral-100 overflow-hidden group cursor-pointer">
                <Image
                  src="/images/fresh-fruits.jpg"
                  alt="Apple juice detail"
                  width={400}
                  height={533}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                />
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-light text-neutral-900 mb-2">Apple</h3>
                <p className="text-sm text-neutral-600">Washington orchards, unfiltered</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="py-32 px-8 bg-neutral-900">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl md:text-3xl font-light text-neutral-300 leading-relaxed">
            "Quality is not an act, it is a habit."
          </p>
          <p className="text-sm text-neutral-500 mt-8 tracking-wide uppercase">— Aristotle</p>
        </div>
      </section>
    </main>
  )
}
