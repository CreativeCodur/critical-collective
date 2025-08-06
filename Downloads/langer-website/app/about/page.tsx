import Image from "next/image"

export default function AboutPage() {
  return (
    <main className="min-h-screen py-20 px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-32">
          <h1 className="text-5xl md:text-6xl font-light text-neutral-900 mb-16 leading-tight">Our Story</h1>
        </div>

        {/* Essay */}
        <div className="grid grid-cols-12 gap-8 mb-32">
          <div className="col-span-12 md:col-span-8 md:col-start-3">
            <div className="prose prose-lg prose-neutral max-w-none">
              <p className="text-xl text-neutral-700 leading-relaxed font-light mb-8">
                In 1960, Bernard Langer made a simple observation: most juice had lost its way. Artificial flavors,
                excessive processing, and shortcuts had replaced the pure taste of fruit. He decided to do something
                about it.
              </p>

              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                What began as a small operation in California was guided by an unwavering principle—respect for the
                fruit. Bernard worked directly with growers, learning their methods, understanding their seasons. He
                invested in equipment that preserved rather than processed. He refused additives that promised
                convenience at the cost of flavor.
              </p>

              <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                Today, the fourth generation of Langers continues this approach. We still work with many of the same
                growers. We still use methods that prioritize quality over efficiency. We still believe that the best
                juice comes from the best fruit, handled with care.
              </p>

              <p className="text-lg text-neutral-600 leading-relaxed">
                This is not a story of growth or expansion. It is a story of consistency—of maintaining standards when
                others compromise, of choosing craft over convenience, of understanding that some things should not
                change.
              </p>
            </div>
          </div>
        </div>

        {/* Portrait */}
        <div className="grid grid-cols-12 gap-8 mb-32">
          <div className="col-span-12 md:col-span-6">
            <div className="aspect-[4/5] bg-neutral-100 overflow-hidden">
              <Image
                src="/images/family-business.jpg"
                alt="The Langer family at their facility"
                width={600}
                height={750}
                className="w-full h-full object-cover grayscale"
              />
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 flex items-end">
            <div>
              <p className="text-base text-neutral-600 leading-relaxed mb-4">
                The Langer family at their Baldwin Park facility, where every bottle is still inspected by hand.
              </p>
              <p className="text-sm text-neutral-500">California, 2023</p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 md:col-span-3 md:col-start-2">
            <h3 className="text-lg font-light text-neutral-900 mb-4">Method</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Traditional pressing techniques preserve the natural character of each fruit variety.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3">
            <h3 className="text-lg font-light text-neutral-900 mb-4">Source</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Direct relationships with growers who share our commitment to quality over quantity.
            </p>
          </div>
          <div className="col-span-12 md:col-span-3">
            <h3 className="text-lg font-light text-neutral-900 mb-4">Standard</h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              No artificial flavors, colors, or preservatives. Ever. This is not negotiable.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
