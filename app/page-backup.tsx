"use client"

import { BackgroundPaths } from "@/components/ui/background-paths"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TestimonialMarquee } from "@/components/testimonial-marquee"
import { TravelFeatures } from "@/components/travel-features"
import { FAQSection } from "@/components/faq-section"
import { StatisticsSection } from "@/components/statistics-section"
import { HeroTextAnimation } from "@/components/hero-text-animation"
import UnicornStudio from "@/components/unicorn-studio"
import { Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Home() {
  const [showLanding, setShowLanding] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLanding(false)
    }, 5000) // Adjust this value to change how long the landing page is shown

    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {showLanding ? (
        <motion.div key="landing" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
          <BackgroundPaths title="TravelEase Your Gateway" />
          <Button
            variant="ghost"
            className="absolute top-4 right-4 text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
            onClick={() => setShowLanding(false)}
          >
            Skip Intro
          </Button>
        </motion.div>
      ) : (
        <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
              {/* Unicorn Studio Background */}
              <div className="absolute inset-0 z-0">
                <UnicornStudio 
                  projectId="fmaHM5RrQgQSCnPzEugd"
                  className="w-full h-full"
                />
              </div>
              
              <div className="container mx-auto flex flex-col-reverse gap-8 py-8 sm:py-12 md:flex-row md:items-center md:py-16 lg:py-24 xl:py-32 relative z-10">
                <div className="flex-1 space-y-4 sm:space-y-6">
                  <div className="space-y-2">
                    <HeroTextAnimation
                      text="Experience Hassle-Free Travel"
                      className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white drop-shadow-lg"
                    />
                    <HeroTextAnimation
                      text="With Our Expert Services"
                      className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white/90 drop-shadow-lg"
                    />
                  </div>
                  <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-[600px] drop-shadow-md">
                    Our travel agency simplifies the booking process, ensuring you spend less time planning and more
                    time enjoying your journey. With expert visa assistance and personalized customer service, we cater
                    to your unique travel needs.
                  </p>
                  <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                    <Button size="lg" className="w-full sm:w-auto shadow-lg" asChild>
                      <Link href="/services">Learn More</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20" asChild>
                      <Link href="/signup">Sign Up</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* Travel Features Section with Glow Cards */}
            <TravelFeatures />

            {/* Services Section */}
            <section className="bg-muted py-8 sm:py-12 md:py-16 lg:py-24">
              <div className="container px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-[58rem] text-center">
                  <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                    Simplifying Your Travel: Booking Tickets and Visa Information Made Easy
                  </h2>
                  <p className="mt-4 text-sm sm:text-base md:text-lg text-muted-foreground">
                    Choose your destination and travel dates to begin your journey
                  </p>
                </div>
                <div className="mx-auto mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
                  <Card className="w-full">
                    <CardHeader className="text-center sm:text-left">
                      <CardTitle className="text-lg sm:text-xl">Seamless Ticket Booking</CardTitle>
                      <CardDescription className="text-sm sm:text-base">Book flights easily with our user-friendly platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/services/ticket-booking">
                        <Button className="w-full">Book Now</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card className="w-full">
                    <CardHeader className="text-center sm:text-left">
                      <CardTitle className="text-lg sm:text-xl">Student Visa Guidance</CardTitle>
                      <CardDescription className="text-sm sm:text-base">Get the latest information on student visas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/services/student-visa">
                        <Button className="w-full">Learn More</Button>
                      </Link>
                    </CardContent>
                  </Card>
                  <Card className="w-full sm:col-span-2 lg:col-span-1">
                    <CardHeader className="text-center sm:text-left">
                      <CardTitle className="text-lg sm:text-xl">Business Visa Solutions</CardTitle>
                      <CardDescription className="text-sm sm:text-base">Navigate business visa requirements with ease</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href="/services/business-visa">
                        <Button className="w-full">Get Started</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-8 sm:py-12 md:py-16 lg:py-24">
              <div className="container px-4 sm:px-6 lg:px-8">
                <h2 className="text-center text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl">Customer Testimonials</h2>
                <p className="mt-4 text-center text-sm sm:text-base md:text-lg text-muted-foreground">
                  Our clients love the seamless booking experience!
                </p>
                <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
                  {testimonials.map((testimonial, index) => (
                    <Card key={index} className="w-full">
                      <CardHeader>
                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                          ))}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm sm:text-base text-center sm:text-left">{testimonial.text}</p>
                        <div className="mt-4 flex items-center gap-4 justify-center sm:justify-start">
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={40}
                            height={40}
                            className="rounded-full"
                          />
                          <div className="text-center sm:text-left">
                            <p className="font-semibold text-sm sm:text-base">{testimonial.name}</p>
                            <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Statistics Section */}
            <StatisticsSection />

            {/* FAQ Section */}
            <FAQSection />

            {/* CTA Section */}
            <section className="bg-primary py-12 text-primary-foreground md:py-24">
              <div className="container text-center">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Start Your Journey Today</h2>
                <p className="mx-auto mt-4 max-w-[600px] text-primary-foreground/80">
                  Let us help you plan your next adventure. Contact our team for personalized assistance.
                </p>
                <div className="mt-8 flex justify-center gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="bg-transparent" asChild>
                    <Link href="/services">Learn More</Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const testimonials = [
  {
    text: "The service was exceptional and saved me so much time!",
    name: "John Doe",
    title: "Student, University",
    avatar: "/placeholder.svg",
  },
  {
    text: "I couldn't have asked for a better travel agency!",
    name: "Jane Smith",
    title: "Manager, Company",
    avatar: "/placeholder.svg",
  },
  {
    text: "They made my visa process so easy and stress-free!",
    name: "Emily Johnson",
    title: "Entrepreneur, Startup",
    avatar: "/placeholder.svg",
  },
]