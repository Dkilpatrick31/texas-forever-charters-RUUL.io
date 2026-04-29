import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-navy-900 overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-900/80 via-navy-900/60 to-navy-900" />

      {/* Animated water shimmer */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-700 to-navy-900 animate-pulse" />
      </div>

      {/* Stars / sparkle effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gold-400/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 60}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/30 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
          <span className="text-gold-300 text-sm font-medium tracking-wide">
            Lake Travis, Austin TX
          </span>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[1.05] mb-6">
          Life is Better{' '}
          <span className="text-gold-400 italic">on the Water</span>
        </h1>

        <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed mb-10">
          Premium boat charters on Lake Travis. Whether you&apos;re chasing sunsets, planning
          the ultimate party, or just need a perfect day on the lake — we&apos;ve got your crew covered.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/booking" className="btn-primary text-lg !px-10 !py-4">
            Book Your Charter
          </Link>
          <Link href="/#packages" className="btn-outline text-lg !px-10 !py-4">
            View Packages
          </Link>
        </div>

        <div className="flex justify-center gap-12 mt-16 text-center">
          {[
            { value: '500+', label: 'Happy Crews' },
            { value: '4.9★', label: 'Average Rating' },
            { value: '6+', label: 'Years on the Lake' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-2xl sm:text-3xl font-serif font-bold text-gold-400">
                {stat.value}
              </div>
              <div className="text-white/50 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#packages"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 hover:text-gold-400 transition-colors animate-bounce"
      >
        <ChevronDown className="w-8 h-8" />
      </a>

      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path
            d="M0 40C240 0 480 80 720 40C960 0 1200 80 1440 40V80H0V40Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
