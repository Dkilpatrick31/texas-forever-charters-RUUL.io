import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  packageId: z.string(),
  date: z.string(),
  partySize: z.number().min(1),
  usePoints: z.boolean().optional(),
})

export async function POST(req: Request) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { packageId, date, partySize, usePoints } = schema.parse(body)

    const pkg = await prisma.charterPackage.findUnique({ where: { id: packageId } })
    if (!pkg) return NextResponse.json({ error: 'Package not found' }, { status: 404 })

    const user = await prisma.user.findUnique({ where: { id: session.user.id } })
    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    let totalAmount = pkg.basePrice
    let discountApplied = false

    if (usePoints && user.points >= 200) {
      totalAmount = Math.floor(totalAmount * 0.5)
      discountApplied = true
    }

    const depositAmount = Math.floor(totalAmount * 0.5)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: depositAmount,
      currency: 'usd',
      metadata: {
        packageId,
        userId: session.user.id,
        date,
        partySize: String(partySize),
        totalAmount: String(totalAmount),
        discountApplied: String(discountApplied),
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      depositAmount,
      totalAmount,
      discountApplied,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 })
    }
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
