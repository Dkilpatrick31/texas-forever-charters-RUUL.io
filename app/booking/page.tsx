import { Suspense } from 'react'
import { BookingForm } from '@/components/booking/BookingForm'
import { prisma } from '@/lib/db'

async function getPackages() {
  try {
    return await prisma.charterPackage.findMany({
      where: { active: true },
      orderBy: { basePrice: 'asc' },
    })
  } catch {
    return []
  }
}

export default async function BookingPage() {
  const packages = await getPackages()

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-navy-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold-400 text-sm font-semibold tracking-widest uppercase mb-3">
            Reserve Your Experience
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4">Book a Charter</h1>
          <p className="text-white/60 text-lg">
            Secure your date with a 50% deposit. Balance due on the day of your charter.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <Suspense fallback={<div className="text-center py-12 text-gray-400">Loading...</div>}>
          <BookingForm packages={packages} />
        </Suspense>
      </div>
    </div>
  )
}
