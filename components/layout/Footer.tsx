import Link from 'next/link'
import { Anchor, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Anchor className="w-7 h-7 text-gold-500" />
              <span className="font-serif text-xl font-bold">
                Texas Forever <span className="text-gold-400">Charters</span>
              </span>
            </div>
            <p className="text-white/60 leading-relaxed max-w-sm">
              Your premier charter company on Lake Travis. Making memories on the water
              since 2018 — come experience why Austin&apos;s best day is always on the lake.
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-900 flex items-center justify-center transition-all duration-200 text-sm font-bold"
              >
                IG
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-900 flex items-center justify-center transition-all duration-200 text-sm font-bold"
              >
                FB
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Charter Packages', href: '/#packages' },
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'Book a Charter', href: '/booking' },
                { label: 'Contact Us', href: '/contact' },
                { label: 'My Account', href: '/dashboard' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold-400 mb-4">Get In Touch</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-gold-500 flex-shrink-0" />
                Lake Travis, Austin, TX
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href="tel:+15125550100" className="text-white/60 hover:text-gold-400 transition-colors">
                  (512) 555-0100
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail className="w-4 h-4 text-gold-500 flex-shrink-0" />
                <a href="mailto:tx4evercharters@gmail.com" className="text-white/60 hover:text-gold-400 transition-colors">
                  tx4evercharters@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Texas Forever Charters. All rights reserved.
          </p>
          <p className="text-white/30 text-xs">
            Lake Travis, Austin, Texas
          </p>
        </div>
      </div>
    </footer>
  )
}
