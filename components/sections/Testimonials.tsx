import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Sarah & Michael T.',
    location: 'Austin, TX',
    rating: 5,
    text: "We did the Full Day Adventure for our anniversary and WOW. Captain Jake knew every hidden cove on the lake. We swam, tubed, and watched the most incredible sunset. Hands down the best day we've had in Austin.",
    charter: 'Full Day Adventure',
  },
  {
    name: 'The Rodriguez Crew',
    location: 'San Antonio, TX',
    rating: 5,
    text: "Booked the Party Barge for my 30th birthday — 22 of us had the time of our lives. The crew was amazing, the sound system was insane, and the water slide was a hit. Already planning our next trip.",
    charter: 'Party Barge',
  },
  {
    name: 'James K.',
    location: 'Dallas, TX',
    rating: 5,
    text: "Brought our corporate team out for a team-building day on the water. Easy to book, professional crew, and everyone is still talking about it months later. Texas Forever Charters delivers.",
    charter: 'Half Day Explorer',
  },
  {
    name: 'Emily & Connor',
    location: 'Austin, TX',
    rating: 5,
    text: "The sunset cruise was pure magic. We got engaged out there — Captain Maria helped us set up the whole thing in secret. Texas Forever made it unforgettable. 10/10, no notes.",
    charter: 'Sunset Cruise',
  },
]

export function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-600 font-semibold tracking-widest text-sm uppercase mb-3">
            Happy Customers
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-navy-900 mb-4">
            What Our Crews Say
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Don&apos;t take our word for it — hear from the hundreds of happy crews who&apos;ve made memories with us.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-gray-50 rounded-3xl p-8 relative hover:shadow-lg transition-shadow duration-300"
            >
              <Quote className="w-10 h-10 text-gold-200 absolute top-6 right-6" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />
                ))}
              </div>

              <p className="text-gray-700 leading-relaxed mb-6 text-[15px]">&ldquo;{t.text}&rdquo;</p>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-navy-900">{t.name}</div>
                  <div className="text-gray-400 text-sm">{t.location}</div>
                </div>
                <span className="text-xs bg-navy-900 text-gold-400 px-3 py-1 rounded-full font-medium">
                  {t.charter}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Rating summary */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-3 bg-gold-50 border border-gold-200 rounded-2xl px-8 py-4">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
              ))}
            </div>
            <span className="font-serif text-2xl font-bold text-navy-900">4.9</span>
            <span className="text-gray-500 text-sm">from 200+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  )
}
