import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative">
        <div className="container flex flex-col-reverse gap-8 py-12 md:flex-row md:items-center md:py-24 lg:py-32">
          <div className="flex-1 space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Experience Hassle-Free Travel With Our Services
            </h1>
            <p className="text-xl text-muted-foreground">
              Our travel agency simplifies the booking process, ensuring you spend less time planning and more time
              enjoying your journey. With expert visa assistance and personalized customer service, we cater to your
              unique travel needs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="lg" asChild>
                <Link href="/services">Learn More</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/landingpage2.jpg-m2dYtL9cUYIFI4gijbLcG4ogCsM8e2.jpeg"
              alt="People discussing travel plans"
              width={600}
              height={400}
              className="rounded-lg object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-muted py-12 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-[58rem] text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Simplifying Your Travel: Booking Tickets and Visa Information Made Easy
            </h2>
            <p className="mt-4 text-muted-foreground">Choose your destination and travel dates to begin your journey</p>
          </div>
          <div className="mx-auto mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Seamless Ticket Booking</CardTitle>
                <CardDescription>Book flights easily with our user-friendly platform</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/services/ticket-booking">
                  <Button className="w-full">Book Now</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Student Visa Guidance</CardTitle>
                <CardDescription>Get the latest information on student visas</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/services/student-visa">
                  <Button className="w-full">Learn More</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Business Visa Solutions</CardTitle>
                <CardDescription>Navigate business visa requirements with ease</CardDescription>
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
      <section className="py-12 md:py-24">
        <div className="container">
          <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-4xl">Customer Testimonials</h2>
          <p className="mt-4 text-center text-muted-foreground">Our clients love the seamless booking experience!</p>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{testimonial.text}</p>
                  <div className="mt-4 flex items-center gap-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

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

