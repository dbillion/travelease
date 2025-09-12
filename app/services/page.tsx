import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Plane, GraduationCap, Briefcase, Clock, Headphones, CreditCard } from "lucide-react"
import Link from "next/link"

export default function ServicesPage() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
      {/* Header Section */}
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter">Our Services</h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
          Discover our comprehensive range of travel services designed to make your journey seamless and enjoyable.
        </p>
      </div>

      {/* Services Section */}
      <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 max-w-7xl mx-auto">
        <Card className="w-full">
          <CardHeader className="text-center sm:text-left">
            <Plane className="h-8 w-8 sm:h-10 sm:w-10 text-primary mx-auto sm:mx-0" />
            <CardTitle className="mt-4 text-lg sm:text-xl">Ticket Booking</CardTitle>
            <CardDescription className="text-sm sm:text-base">Book flights easily with our user-friendly platform</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base">Competitive pricing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base">Multiple airlines</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm sm:text-base">Real-time availability</span>
              </li>
            </ul>
            <Button className="w-full" asChild>
              <Link href="/services/ticket-booking">Book Now</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full">
          <CardHeader className="text-center sm:text-left">
            <GraduationCap className="h-8 w-8 sm:h-10 sm:w-10 text-primary mx-auto sm:mx-0" />
            <CardTitle className="mt-4 text-lg sm:text-xl">Student Visa</CardTitle>
            <CardDescription className="text-sm sm:text-base">Complete visa assistance for students</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Document guidance</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Application support</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Interview preparation</span>
              </li>
            </ul>
            <Button className="mt-6 w-full" asChild>
              <Link href="/services/student-visa">Learn More</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Briefcase className="h-10 w-10 text-primary" />
            <CardTitle className="mt-4">Business Visa</CardTitle>
            <CardDescription>Professional visa services for business travelers</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Fast processing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Multiple entry visas</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" />
                <span>Priority service</span>
              </li>
            </ul>
            <Button className="mt-6 w-full" asChild>
              <Link href="/services/business-visa">Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Features Section */}
      <div className="mt-24">
        <h2 className="text-center text-3xl font-bold">Why Choose Us</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex gap-4">
            <Clock className="h-6 w-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">24/7 Support</h3>
              <p className="text-muted-foreground">Round-the-clock customer support for all your travel needs</p>
            </div>
          </div>
          <div className="flex gap-4">
            <Headphones className="h-6 w-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">Expert Assistance</h3>
              <p className="text-muted-foreground">Professional guidance from experienced travel consultants</p>
            </div>
          </div>
          <div className="flex gap-4">
            <CreditCard className="h-6 w-6 shrink-0 text-primary" />
            <div>
              <h3 className="font-semibold">Secure Payments</h3>
              <p className="text-muted-foreground">Safe and secure payment processing for all transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mt-24">
        <div className="mx-auto max-w-[800px] text-center">
          <h2 className="text-3xl font-bold">Benefits of Our Services</h2>
          <p className="mt-4 text-muted-foreground">
            Experience the advantages of booking with a trusted travel partner
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-4">
              <Check className="h-6 w-6 shrink-0 text-primary" />
              <div>
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const benefits = [
  {
    title: "Time-Saving Solutions",
    description: "Quick and efficient booking process that saves your valuable time",
  },
  {
    title: "Cost-Effective Options",
    description: "Competitive prices and special deals for all travel services",
  },
  {
    title: "Personalized Service",
    description: "Tailored travel solutions based on your specific needs",
  },
  {
    title: "Hassle-Free Experience",
    description: "Streamlined processes for all your travel requirements",
  },
]

