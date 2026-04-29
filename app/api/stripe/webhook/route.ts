import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { sendBookingConfirmation } from '@/lib/email'
import { formatDate } from '@/lib/utils'
import type Stripe from 'stripe'

export async function POST(req: Request) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object as Stripe.PaymentIntent
    const { packageId, userId, date, partySize, totalAmount, discountApplied } = pi.metadata

    const booking = await prisma.booking.create({
      data: {
        userId,
        packageId,
        date: new Date(date),
        partySize: Number(partySize),
        totalAmount: Number(totalAmount),
        depositAmount: pi.amount,
        status: 'DEPOSIT_PAID',
        stripePaymentIntent: pi.id,
        discountApplied: discountApplied === 'true',
      },
      include: { user: true, package: true },
    })

    if (discountApplied === 'true') {
      await prisma.user.update({
        where: { id: userId },
        data: { points: { decrement: 200 } },
      })
    }

    if (booking.user.email) {
      await sendBookingConfirmation({
        to: booking.user.email,
        customerName: booking.user.name ?? 'Guest',
        packageName: booking.package.name,
        date: formatDate(booking.date),
        partySize: booking.partySize,
        depositAmount: booking.depositAmount,
        totalAmount: booking.totalAmount,
      })
    }
  }

  return NextResponse.json({ received: true })
}
