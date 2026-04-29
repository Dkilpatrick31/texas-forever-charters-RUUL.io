'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { Menu, X, Anchor } from 'lucide-react'

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900/95 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <Anchor className="w-7 h-7 text-gold-500 group-hover:rotate-12 transition-transform duration-300" />
            <span className="font-serif text-white text-lg md:text-xl font-bold leading-tight">
              Texas Forever<br className="hidden sm:block" />
              <span className="text-gold-400"> Charters</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#packages" className="text-white/80 hover:text-gold-400 transition-colors text-sm font-medium">
              Packages
            </Link>
            <Link href="/#how-it-works" className="text-white/80 hover:text-gold-400 transition-colors text-sm font-medium">
              How It Works
            </Link>
            <Link href="/contact" className="text-white/80 hover:text-gold-400 transition-colors text-sm font-medium">
              Contact
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            {session ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-white/80 hover:text-gold-400 transition-colors text-sm font-medium"
                >
                  My Account
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-white/60 hover:text-white transition-colors text-sm"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white/80 hover:text-white transition-colors text-sm font-medium"
                >
                  Log In
                </Link>
                <Link href="/booking" className="btn-primary !py-2 !px-6 text-sm">
                  Book Now
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-navy-900 border-t border-white/10 px-4 py-4 space-y-3">
          <Link href="/#packages" onClick={() => setIsOpen(false)} className="block text-white/80 hover:text-gold-400 py-2">
            Packages
          </Link>
          <Link href="/#how-it-works" onClick={() => setIsOpen(false)} className="block text-white/80 hover:text-gold-400 py-2">
            How It Works
          </Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-white/80 hover:text-gold-400 py-2">
            Contact
          </Link>
          {session ? (
            <>
              <Link href="/dashboard" onClick={() => setIsOpen(false)} className="block text-white/80 hover:text-gold-400 py-2">
                My Account
              </Link>
              <button onClick={() => signOut()} className="block text-white/60 hover:text-white py-2 text-left w-full">
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setIsOpen(false)} className="block text-white/80 py-2">
                Log In
              </Link>
              <Link href="/booking" onClick={() => setIsOpen(false)} className="btn-primary block text-center mt-2">
                Book Now
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
