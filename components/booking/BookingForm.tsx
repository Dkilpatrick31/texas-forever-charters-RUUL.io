'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Clock, Users, Check, ChevronDown } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import type { CharterPackage } from '@/app/generated/prisma/client'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Props {
  packages: CharterPackage[]
}

function CheckoutForm({
  depositAmount,
  totalAmount,
  discountApplied,
  onSuccess,
}: {
  depositAmount: number
  totalAmount: number
  discountApplied: boolean
  onSuccess: () => void
}) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)
    setError('')

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/dashboard?booking=success`,
      },
    })

    if (stripeError) {
      setError(stripeError.message ?? 'Payment failed')
      setLoading(false)
    } else {
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {discountApplied && (
        <div className="bg-gold-50 border border-gold-200 rounded-xl p-4 text-sm text-gold-800">
          ✨ <strong>200-point discount applied!</strong> Your charter is 50% off.
        </div>
      )}

      <div className="bg-gray-50 rounded-2xl p-6">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500">Charter Total</span>
          <span className="font-medium">{formatCurrency(totalAmount)}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span className="text-gray-500">Remaining (due on day)</span>
          <span className="font-medium">{formatCurrency(totalAmount - depositAmount)}</span>
        </div>
        <div className="flex justify-between font-bold text-navy-900 border-t border-gray-200 pt-3">
          <span>Deposit Due Now (50%)</span>
          <span className="text-xl">{formatCurrency(depositAmount)}</span>
        </div>
      </div>

      <PaymentElement />

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading || !stripe}
        className="w-full btn-primary !rounded-xl text-center disabled:opacity-60 disabled:cursor-not-allowed text-lg !py-4"
      >
        {loading ? 'Processing...' : `Pay Deposit — ${formatCurrency(depositAmount)}`}
      </button>

      <p className="text-center text-xs text-gray-400">
        Secured by Stripe · Free cancellation 7+ days prior
      </p>
    </form>
  )
}

export function BookingForm({ packages }: Props) {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [selectedPackage, setSelectedPackage] = useState<CharterPackage | null>(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('10:00')
  const [partySize, setPartySize] = useState(2)
  const [specialRequests, setSpecialRequests] = useState('')
  const [usePoints, setUsePoints] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  const [depositAmount, setDepositAmount] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [discountApplied, setDiscountApplied] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const pkgId = searchParams.get('package')
    if (pkgId) {
      const pkg = packages.find((p) => p.id === pkgId)
      if (pkg) setSelectedPackage(pkg)
    }
  }, [packages, searchParams])

  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  async function handleProceedToPayment() {
    if (!session) {
      router.push(`/login?callbackUrl=/booking`)
      return
    }

    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/stripe/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageId: selectedPackage!.id,
          date: `${date}T${time}:00`,
          partySize,
          usePoints,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to create payment intent')
        return
      }

      setClientSecret(data.clientSecret)
      setDepositAmount(data.depositAmount)
      setTotalAmount(data.totalAmount)
      setDiscountApplied(data.discountApplied)
      setStep(3)
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main form area */}
      <div className="lg:col-span-2 space-y-6">
        {/* Step 1: Package Selection */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setStep(1)}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-navy-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {selectedPackage ? <Check className="w-4 h-4" /> : '1'}
              </div>
              <div>
                <div className="font-semibold text-navy-900">Choose Your Charter</div>
                {selectedPackage && (
                  <div className="text-sm text-gray-400">{selectedPackage.name}</div>
                )}
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${step === 1 ? 'rotate-180' : ''}`} />
          </button>

          {step === 1 && (
            <div className="px-6 pb-6 space-y-3 border-t border-gray-50">
              {packages.map((pkg) => (
                <label
                  key={pkg.id}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedPackage?.id === pkg.id
                      ? 'border-navy-900 bg-navy-900/5'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <input
                    type="radio"
                    name="package"
                    value={pkg.id}
                    checked={selectedPackage?.id === pkg.id}
                    onChange={() => setSelectedPackage(pkg)}
                    className="mt-1 accent-navy-900"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-navy-900">{pkg.name}</span>
                      <span className="font-bold text-navy-900">{formatCurrency(pkg.basePrice)}</span>
                    </div>
                    <div className="flex gap-4 text-xs text-gray-500 mb-2">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {pkg.duration}h
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" /> Up to {pkg.capacity}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 leading-relaxed">{pkg.description}</p>
                  </div>
                </label>
              ))}

              <button
                onClick={() => selectedPackage && setStep(2)}
                disabled={!selectedPackage}
                className="w-full btn-navy !rounded-xl disabled:opacity-40 disabled:cursor-not-allowed mt-2"
              >
                Continue
              </button>
            </div>
          )}
        </div>

        {/* Step 2: Date/Time/Party Size */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => step > 1 && setStep(2)}
            className="w-full flex items-center justify-between p-6 text-left"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-navy-900 text-white' : 'bg-gray-200 text-gray-500'}`}>
                {date ? <Check className="w-4 h-4" /> : '2'}
              </div>
              <div>
                <div className="font-semibold text-navy-900">Date, Time & Party Size</div>
                {date && (
                  <div className="text-sm text-gray-400">{date} at {time} · {partySize} guests</div>
                )}
              </div>
            </div>
            <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${step === 2 ? 'rotate-180' : ''}`} />
          </button>

          {step === 2 && (
            <div className="px-6 pb-6 border-t border-gray-50 space-y-5 pt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Date</label>
                <input
                  type="date"
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Start Time</label>
                <select
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="input-field"
                >
                  {times.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Party Size {selectedPackage && <span className="text-gray-400">(max {selectedPackage.capacity})</span>}
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setPartySize(Math.max(1, partySize - 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-navy-400 flex items-center justify-center font-bold text-navy-900 transition-colors"
                  >
                    −
                  </button>
                  <span className="text-2xl font-serif font-bold text-navy-900 w-8 text-center">{partySize}</span>
                  <button
                    type="button"
                    onClick={() => setPartySize(Math.min(selectedPackage?.capacity ?? 25, partySize + 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-navy-400 flex items-center justify-center font-bold text-navy-900 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Special Requests <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="input-field resize-none"
                  placeholder="Anything we should know? Special occasions, dietary needs, etc."
                />
              </div>

              {session && (
                <label className="flex items-center gap-3 cursor-pointer bg-gold-50 border border-gold-200 rounded-xl p-4">
                  <input
                    type="checkbox"
                    checked={usePoints}
                    onChange={(e) => setUsePoints(e.target.checked)}
                    className="w-4 h-4 accent-gold-500"
                  />
                  <div>
                    <span className="text-sm font-medium text-navy-900">Use 200 points for 50% off</span>
                    <p className="text-xs text-gray-500 mt-0.5">Requires 200+ points in your account balance</p>
                  </div>
                </label>
              )}

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl p-3">
                  {error}
                </div>
              )}

              <button
                onClick={handleProceedToPayment}
                disabled={!date || loading}
                className="w-full btn-primary !rounded-xl disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? 'Setting up payment...' : session ? 'Continue to Payment' : 'Sign In to Continue'}
              </button>
            </div>
          )}
        </div>

        {/* Step 3: Payment */}
        {step === 3 && clientSecret && (
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-navy-900 text-white flex items-center justify-center text-sm font-bold">
                3
              </div>
              <span className="font-semibold text-navy-900">Payment</span>
            </div>

            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: {
                  theme: 'stripe',
                  variables: { colorPrimary: '#040f30' },
                },
              }}
            >
              <CheckoutForm
                depositAmount={depositAmount}
                totalAmount={totalAmount}
                discountApplied={discountApplied}
                onSuccess={() => router.push('/dashboard?booking=success')}
              />
            </Elements>
          </div>
        )}
      </div>

      {/* Sidebar summary */}
      <div className="lg:col-span-1">
        <div className="bg-navy-900 text-white rounded-3xl p-6 sticky top-24">
          <h3 className="font-serif text-xl font-bold mb-6">Booking Summary</h3>

          {selectedPackage ? (
            <div className="space-y-4">
              <div>
                <div className="text-gold-400 font-semibold">{selectedPackage.name}</div>
                <div className="text-white/60 text-sm">{selectedPackage.duration} hours · Up to {selectedPackage.capacity} guests</div>
              </div>

              {date && (
                <div className="border-t border-white/10 pt-4">
                  <div className="text-sm text-white/60">Date & Time</div>
                  <div className="font-medium">{date} at {time}</div>
                </div>
              )}

              {partySize > 0 && (
                <div>
                  <div className="text-sm text-white/60">Party Size</div>
                  <div className="font-medium">{partySize} guests</div>
                </div>
              )}

              <div className="border-t border-white/10 pt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-white/60">Charter Total</span>
                  <span>{formatCurrency(selectedPackage.basePrice)}</span>
                </div>
                <div className="flex justify-between font-bold text-gold-400 text-lg mt-3">
                  <span>Deposit (50%)</span>
                  <span>{formatCurrency(Math.floor(selectedPackage.basePrice * 0.5))}</span>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-white/40 text-sm">Select a charter package to see your summary.</p>
          )}

          <div className="mt-6 pt-6 border-t border-white/10 space-y-2 text-xs text-white/40">
            <p>✓ Secure payment via Stripe</p>
            <p>✓ Free cancellation 7+ days prior</p>
            <p>✓ Balance due on day of charter</p>
          </div>
        </div>
      </div>
    </div>
  )
}
