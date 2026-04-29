'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Copy, Check, Anchor, Star, Calendar, Users, Gift } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

type User = {
  id: string
  name: string | null
  email: string | null
  points: number
  referralCode: string
}

type Booking = {
  id: string
  date: Date
  partySize: number
  totalAmount: number
  depositAmount: number
  status: string
  discountApplied: boolean
  createdAt: Date
  package: { name: string; duration: number }
}

interface Props {
  user: User
  bookings: Booking[]
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  DEPOSIT_PAID: 'bg-blue-100 text-blue-800',
  CONFIRMED: 'bg-green-100 text-green-800',
  COMPLETED: 'bg-gray-100 text-gray-600',
  CANCELLED: 'bg-red-100 text-red-700',
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pending',
  DEPOSIT_PAID: 'Deposit Paid',
  CONFIRMED: 'Confirmed',
  COMPLETED: 'Completed',
  CANCELLED: 'Cancelled',
}

export function DashboardClient({ user, bookings }: Props) {
  const [copied, setCopied] = useState(false)
  const pointsNeeded = Math.max(0, 200 - user.points)
  const progress = Math.min(100, (user.points / 200) * 100)
  const referralUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/register?ref=${user.referralCode}`
    : `/register?ref=${user.referralCode}`

  function copyReferralCode() {
    navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-navy-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-gold-400 text-sm font-semibold mb-1">Welcome back,</p>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold">
            {user.name ?? user.email?.split('@')[0]}
          </h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10 space-y-8">
        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-navy-900/10 rounded-xl flex items-center justify-center">
                <Anchor className="w-5 h-5 text-navy-900" />
              </div>
              <span className="text-sm text-gray-500">Total Bookings</span>
            </div>
            <div className="text-3xl font-serif font-bold text-navy-900">{bookings.length}</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gold-500/10 rounded-xl flex items-center justify-center">
                <Star className="w-5 h-5 text-gold-600" />
              </div>
              <span className="text-sm text-gray-500">Points Balance</span>
            </div>
            <div className="text-3xl font-serif font-bold text-navy-900">{user.points}</div>
            <div className="text-xs text-gray-400 mt-1">200 pts = 50% off next charter</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Calendar className="w-5 h-5 text-green-600" />
              </div>
              <span className="text-sm text-gray-500">Upcoming Charters</span>
            </div>
            <div className="text-3xl font-serif font-bold text-navy-900">
              {bookings.filter((b) => new Date(b.date) >= new Date() && b.status !== 'CANCELLED').length}
            </div>
          </div>
        </div>

        {/* Points progress + Referral */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Points Progress */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-serif text-xl font-bold text-navy-900">Points Balance</h2>
              {user.points >= 200 && (
                <span className="bg-gold-100 text-gold-800 text-xs font-bold px-3 py-1 rounded-full">
                  Reward Ready!
                </span>
              )}
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className="text-4xl font-serif font-bold text-navy-900">{user.points}</span>
              <span className="text-gray-400 text-sm mb-1">/ 200 points</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 mb-3">
              <div
                className="bg-gradient-to-r from-gold-400 to-gold-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            {user.points >= 200 ? (
              <div className="text-sm text-green-600 font-medium">
                🎉 You have a 50% discount ready on your next booking!
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                {pointsNeeded} more points for a <strong>50% off</strong> charter
              </div>
            )}
          </div>

          {/* Referral */}
          <div className="bg-navy-900 text-white rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Gift className="w-5 h-5 text-gold-400" />
              <h2 className="font-serif text-xl font-bold">Refer &amp; Earn</h2>
            </div>
            <p className="text-white/60 text-sm mb-4">
              Share your referral link — earn <strong className="text-gold-400">10 points</strong> for every friend who signs up.
            </p>
            <div className="bg-white/10 rounded-xl p-3 mb-3">
              <div className="text-gold-400 font-mono font-bold text-lg tracking-widest">
                {user.referralCode}
              </div>
            </div>
            <button
              onClick={copyReferralCode}
              className="w-full flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-semibold py-2.5 rounded-xl transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Referral Link'}
            </button>
          </div>
        </div>

        {/* Bookings */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <h2 className="font-serif text-xl font-bold text-navy-900">My Bookings</h2>
            <Link href="/booking" className="btn-primary !py-2 !px-5 text-sm">
              + New Booking
            </Link>
          </div>

          {bookings.length === 0 ? (
            <div className="text-center py-16">
              <Anchor className="w-12 h-12 text-gray-200 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No bookings yet — let&apos;s get you on the water!</p>
              <Link href="/booking" className="btn-navy !py-2 !px-6 text-sm">
                Book Your First Charter
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {bookings.map((booking) => (
                <div key={booking.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-navy-900/5 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Anchor className="w-6 h-6 text-navy-700" />
                    </div>
                    <div>
                      <div className="font-semibold text-navy-900">{booking.package.name}</div>
                      <div className="flex items-center gap-3 text-sm text-gray-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(booking.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {booking.partySize} guests
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:text-right">
                    <div>
                      <div className="font-bold text-navy-900">{formatCurrency(booking.totalAmount)}</div>
                      <div className="text-xs text-gray-400">
                        Deposit: {formatCurrency(booking.depositAmount)}
                      </div>
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLORS[booking.status] ?? 'bg-gray-100 text-gray-600'}`}>
                      {STATUS_LABELS[booking.status] ?? booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
