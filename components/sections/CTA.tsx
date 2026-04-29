import Link from 'next/link'

export function CTA() {
  return (
    <section className="relative py-32 bg-navy-900 overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full rotate-180">
          <path d="M0 40C240 0 480 80 720 40C960 0 1200 80 1440 40V80H0V40Z" fill="white" />
        </svg>
      </div>

      {/* Decorative gold ring */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-gold-500/20 pointer-events-none" />
      <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-64 h-64 rounded-full border-2 border-gold-500/10 pointer-events-none" />
      <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-2 border-gold-500/10 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <p className="text-gold-400 font-semibold tracking-widest text-sm uppercase mb-4">
          Ready?
        </p>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight">
          Your Best Day on the Lake{' '}
          <span className="text-gold-400 italic">Starts Here</span>
        </h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10">
          Don&apos;t let another Austin summer go by without getting out on Lake Travis.
          Book today and we&apos;ll take care of everything else.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/booking" className="btn-primary text-lg !px-12 !py-4">
            Book Your Charter
          </Link>
          <Link href="/contact" className="btn-outline text-lg !px-12 !py-4">
            Ask a Question
          </Link>
        </div>

        <p className="text-white/30 text-sm mt-8">
          50% deposit secures your date · Balance due on the day · Free cancellation 7 days prior
        </p>
      </div>
    </section>
  )
}
