import { Hero } from '@/components/sections/Hero'
import { Packages } from '@/components/sections/Packages'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Testimonials } from '@/components/sections/Testimonials'
import { CTA } from '@/components/sections/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Packages />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </>
  )
}
