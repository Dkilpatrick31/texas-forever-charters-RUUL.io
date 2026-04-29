import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.charterPackage.deleteMany()

  await prisma.charterPackage.createMany({
    data: [
      {
        name: 'Sunset Cruise',
        slug: 'sunset-cruise',
        description:
          'Experience the magic of a Lake Travis sunset from the water. Perfect for couples and small groups seeking a romantic evening on the lake.',
        duration: 2,
        capacity: 8,
        pricePerHour: 45000,
        basePrice: 90000,
        amenities: ['Captain & crew', 'Bluetooth speaker', 'Cooler with ice', 'Life jackets', 'Swim ladder'],
        imageUrl: '/images/boats/sunset-cruise.jpg',
        featured: false,
        active: true,
      },
      {
        name: 'Full Day Adventure',
        slug: 'full-day-adventure',
        description:
          'The ultimate Lake Travis experience. Spend the entire day exploring hidden coves, swimming holes, and cliff-jumping spots with your crew.',
        duration: 8,
        capacity: 12,
        pricePerHour: 38000,
        basePrice: 300000,
        amenities: [
          'Captain & crew',
          'Bluetooth speaker',
          'Cooler with ice',
          'Life jackets',
          'Swim ladder',
          'Snorkeling gear',
          'Paddleboards (2)',
          'Tubing',
          'Anchor & swim platform',
        ],
        imageUrl: '/images/boats/full-day.jpg',
        featured: true,
        active: true,
      },
      {
        name: 'Party Barge',
        slug: 'party-barge',
        description:
          'Go big or go home. Our flagship party barge fits up to 25 guests and comes fully loaded for the ultimate Lake Travis celebration.',
        duration: 4,
        capacity: 25,
        pricePerHour: 75000,
        basePrice: 300000,
        amenities: [
          'Captain & crew',
          'Premium sound system',
          'Cooler with ice',
          'Life jackets',
          'Swim ladder',
          'Water slide',
          'Tubing',
          'Anchor & swim platform',
          'Shade canopy',
          'Tables & seating',
        ],
        imageUrl: '/images/boats/party-barge.jpg',
        featured: true,
        active: true,
      },
      {
        name: 'Half Day Explorer',
        slug: 'half-day-explorer',
        description:
          'The perfect midday escape. Four hours on the water to discover the best swimming spots and soak up the Texas sun.',
        duration: 4,
        capacity: 12,
        pricePerHour: 42000,
        basePrice: 168000,
        amenities: [
          'Captain & crew',
          'Bluetooth speaker',
          'Cooler with ice',
          'Life jackets',
          'Swim ladder',
          'Paddleboard (1)',
          'Anchor & swim platform',
        ],
        imageUrl: '/images/boats/half-day.jpg',
        featured: false,
        active: true,
      },
    ],
  })

  console.log('Seed complete — 4 charter packages created.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
