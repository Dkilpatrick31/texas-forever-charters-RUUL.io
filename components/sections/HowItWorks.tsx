import { Search, CreditCard, Anchor, Sun } from 'lucide-react'

const steps = [
  {
    icon: Search,
    step: '01',
    title: 'Choose Your Charter',
    description:
      'Browse our packages — sunset cruise, half-day, full day, or party barge. Pick what fits your crew and vibe.',
  },
  {
    icon: CreditCard,
    step: '02',
    title: 'Secure With a Deposit',
    description:
      'Lock in your date with a 50% deposit. Easy, secure payment through Stripe. The rest is due on the day.',
  },
  {
    icon: Anchor,
    step: '03',
    title: 'Meet at the Marina',
    description:
      'Show up at the dock, meet your captain and crew. We handle everything — you just show up and have fun.',
  },
  {
    icon: Sun,
    step: '04',
    title: 'Make Memories',
    description:
      'Swim, sun, tube, or just float. Lake Travis is calling — and the best days of your life happen on the water.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-navy-900 relative overflow-hidden">
      {/* Top wave */}
      <div className="absolute top-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full rotate-180">
          <path d="M0 40C240 0 480 80 720 40C960 0 1200 80 1440 40V80H0V40Z" fill="white" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-500 font-semibold tracking-widest text-sm uppercase mb-3">
            Simple Process
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-white/60 max-w-xl mx-auto text-lg">
            From browsing to boarding in just a few clicks.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, i) => (
            <div key={step.step} className="relative text-center group">
              {/* Connector line */}
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-gold-500/30 to-transparent" />
              )}

              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/10 border border-white/20 mb-6 group-hover:bg-gold-500/20 group-hover:border-gold-400/40 transition-all duration-300">
                <step.icon className="w-9 h-9 text-gold-400" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-gold-500 text-navy-900 text-xs font-bold rounded-full flex items-center justify-center">
                  {i + 1}
                </span>
              </div>

              <h3 className="text-xl font-serif font-bold text-white mb-3">{step.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C240 0 480 80 720 40C960 0 1200 80 1440 40V80H0V40Z" fill="white" />
        </svg>
      </div>
    </section>
  )
}
