'use client'


import Navbar from "@/components/sections/navbar/default"
import Hero from "@/components/sections/hero/default"
import FooterSection from "@/components/sections/footer/default"
import { Card } from "@/components/ui/card"
import Items from "@/components/sections/items/default"
import CTA from "@/components/sections/cta/default"
import CardCourseSection from "@/components/courses/card-course-section"

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />

     <Items />
     <CardCourseSection />
     <CTA />
     <FooterSection />
    </>
  )
}
