import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Briefcase, Check, FileText, Users } from "lucide-react"

export default function BusinessVisaPage() {
  return (
    <div className="container py-12 md:py-24">
      {/* Header Section */}
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Business Visa Solutions</h1>
        <p className="mt-4 text-xl text-muted-foreground">Professional visa services tailored for business travelers</p>
      </div>

      {/* Main Content */}
      <div className="mt-16">
        <Tabs defaultValue="types" className="mx-auto max-w-[1000px]">
          <TabsList className="grid w-full max-w-[600px] grid-cols-3">
            <TabsTrigger value="types">Visa Types</TabsTrigger>
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
          </TabsList>
          <TabsContent value="types" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Visa Categories</CardTitle>
                <CardDescription>Different types of business visas available</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {visaTypes.map((type, index) => (
                    <div key={index} className="space-y-2">
                      <h3 className="font-semibold">{type.title}</h3>
                      <p className="text-muted-foreground">{type.description}</p>
                      <ul className="mt-2 space-y-1">
                        {type.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-primary" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="requirements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Visa Requirements</CardTitle>
                <CardDescription>Essential requirements for business visa application</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">{req.title}</h3>
                        <p className="text-muted-foreground">{req.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="process" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
                <CardDescription>Step-by-step guide to obtaining your business visa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  {process.map((step, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Services Section */}
      <div className="mt-24">
        <h2 className="text-center text-3xl font-bold">Our Services</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader>
                <service.icon className="h-8 w-8 text-primary" />
                <CardTitle className="mt-4">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-24 text-center">
        <h2 className="text-3xl font-bold">Ready to Apply?</h2>
        <p className="mt-4 text-muted-foreground">
          Contact our team for professional assistance with your business visa application
        </p>
        <Button size="lg" className="mt-8">
          Get Started
        </Button>
      </div>
    </div>
  )
}

const visaTypes = [
  {
    title: "Short-term Business Visa",
    description: "For business meetings, conferences, and short visits",
    features: ["Valid for up to 90 days", "Single or multiple entry", "Quick processing available"],
  },
  {
    title: "Long-term Business Visa",
    description: "For extended business activities and investments",
    features: ["Valid for up to 5 years", "Multiple entry", "Work permit eligible"],
  },
]

const requirements = [
  {
    title: "Business Documentation",
    description: "Company registration, business licenses, and invitation letters",
  },
  {
    title: "Financial Requirements",
    description: "Bank statements, financial guarantees, and proof of funds",
  },
  {
    title: "Travel History",
    description: "Previous travel records and visa history",
  },
  {
    title: "Additional Documents",
    description: "Insurance, accommodation proof, and travel itinerary",
  },
]

const process = [
  {
    title: "Initial Consultation",
    description: "Discuss your business visa requirements with our experts",
  },
  {
    title: "Document Preparation",
    description: "Gather and verify all necessary documentation",
  },
  {
    title: "Application Submission",
    description: "Submit your application with our assistance",
  },
  {
    title: "Visa Processing",
    description: "Track and monitor your application status",
  },
]

const services = [
  {
    icon: Briefcase,
    title: "Visa Consultation",
    description: "Expert advice on the most suitable visa type for your business needs",
  },
  {
    icon: FileText,
    title: "Document Assistance",
    description: "Complete support with document preparation and verification",
  },
  {
    icon: Users,
    title: "Corporate Services",
    description: "Specialized services for corporate clients and business groups",
  },
]

