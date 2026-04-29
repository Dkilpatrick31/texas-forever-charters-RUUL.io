import Link from 'next/link'
import { Clock, Users, Check, Star } from 'lucide-react'
import { prisma } from '@/lib/db'
import { formatCurrency } from '@/lib/utils'
import type { CharterPackage } from '@/app/generated/prisma/client'

async function getPackages() {
  try {
    return await prisma.charterPackage.findMany({
      where: { active: true },
      orderBy: [{ featured: 'desc' }, { basePrice: 'asc' }],
    })
  } catch {
    return []
  }
}

export async function Packages() {
  const packages = await getPackages()

  if (packages.length === 0) {
    return (
      <section id="packages" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif font-bold text-navy-900 mb-4">Charter Packages</h2>
          <p className="text-gray-500">Packages coming soon. Connect your database and run the seed to see them here.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="packages" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gold-600 font-semibold tracking-widest text-sm uppercase mb-3">
            Our Experiences
          </p>
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-navy-900 mb-4">
            Charter Packages
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto text-lg">
            From intimate sunset sails to all-out lake parties — choose the experience
            that fits your crew.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {packages.map((pkg: CharterPackage) => (
            <div
              key={pkg.id}
              className={`relative rounded-3xl overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl group ${
                pkg.featured
                  ? 'border-gold-400 shadow-xl shadow-gold-100'
                  : 'border-gray-100 shadow-md'
              }`}
            >
              {pkg.featured && (
                <div className="absolute top-4 right-4 z-10 bg-gold-500 text-navy-900 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3 h-3 fill-current" /> Most Popular
                </div>
              )}

              {/* Image placeholder */}
              <div className={`h-52 relative overflow-hidden ${pkg.featured ? 'bg-gradient-to-br from-navy-800 to-navy-600' : 'bg-gradient-to-br from-navy-900 to-navy-700'}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-6xl opacity-30">⚓</span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/40" />
                <div className="absolute bottom-4 left-6">
                  <span className="bg-navy-900/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                    Up to {pkg.capacity} guests
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-navy-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{pkg.description}</p>

                <div className="flex items-center gap-6 mb-6 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gold-500" />
                    {pkg.duration} hours
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gold-500" />
                    Up to {pkg.capacity} guests
                  </div>
                </div>

                <ul className="space-y-2 mb-8">
                  {pkg.amenities.slice(0, 4).map((amenity: string) => (
                    <li key={amenity} className="flex items-center gap-2 text-sm text-gray-600">
                      <Check className="w-4 h-4 text-gold-500 flex-shrink-0" />
                      {amenity}
                    </li>
                  ))}
                  {pkg.amenities.length > 4 && (
                    <li className="text-sm text-gray-400 ml-6">
                      +{pkg.amenities.length - 4} more included
                    </li>
                  )}
                </ul>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div>
                    <div className="text-3xl font-serif font-bold text-navy-900">
                      {formatCurrency(pkg.basePrice)}
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5">50% deposit at booking</div>
                  </div>
                  <Link
                    href={`/booking?package=${pkg.id}`}
                    className={pkg.featured ? 'btn-primary !px-6 !py-2.5 text-sm' : 'btn-navy !px-6 !py-2.5 text-sm'}
                  >
                    Book This Charter
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-400 text-sm">
            Need something custom? <Link href="/contact" className="text-gold-600 hover:text-gold-700 font-medium">Contact us</Link> for private events and corporate charters.
          </p>
        </div>
      </div>
    </section>
  )
}
