import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import { DashboardClient } from '@/components/dashboard/DashboardClient'

export default async function DashboardPage() {
  const session = await auth()
  if (!session?.user?.id) redirect('/login?callbackUrl=/dashboard')

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, name: true, email: true, points: true, referralCode: true },
  })

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { package: { select: { name: true, duration: true } } },
    orderBy: { createdAt: 'desc' },
  })

  if (!user) redirect('/login')

  return <DashboardClient user={user} bookings={bookings} />
}
