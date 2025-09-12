import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, FileText, GraduationCap, Users } from "lucide-react"

export default function StudentVisaPage() {
  return (
    <div className="container py-12 md:py-24">
      {/* Header Section */}
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Student Visa Services</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Get expert guidance for your student visa application process
        </p>
      </div>

      {/* Visa Types Section */}
      <div className="mt-16">
        <Tabs defaultValue="requirements" className="mx-auto max-w-[1000px]">
          <TabsList className="grid w-full max-w-[600px] grid-cols-3">
            <TabsTrigger value="requirements">Requirements</TabsTrigger>
            <TabsTrigger value="process">Process</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="requirements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Visa Requirements</CardTitle>
                <CardDescription>Essential requirements for student visa application</CardDescription>
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
                <CardDescription>Step-by-step guide to applying for your student visa</CardDescription>
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
          <TabsContent value="documents" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>Complete list of documents needed for your application</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {documents.map((doc, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <FileText className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold">{doc.title}</h3>
                        <p className="text-muted-foreground">{doc.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
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
        <h2 className="text-3xl font-bold">Ready to Start Your Journey?</h2>
        <p className="mt-4 text-muted-foreground">
          Contact us today for a free consultation about your student visa application
        </p>
        <Button size="lg" className="mt-8">
          Get Started
        </Button>
      </div>
    </div>
  )
}

const requirements = [
  {
    title: "University Acceptance",
    description: "A valid acceptance letter from an accredited educational institution",
  },
  {
    title: "Financial Requirements",
    description: "Proof of sufficient funds to cover tuition fees and living expenses",
  },
  {
    title: "Language Proficiency",
    description: "Required language test scores (IELTS, TOEFL, etc.)",
  },
  {
    title: "Academic Records",
    description: "Previous academic transcripts and certificates",
  },
]

const process = [
  {
    title: "Initial Consultation",
    description: "Meet with our visa experts to discuss your requirements",
  },
  {
    title: "Document Preparation",
    description: "Gather and prepare all necessary documents",
  },
  {
    title: "Application Submission",
    description: "Submit your visa application with our assistance",
  },
  {
    title: "Interview Preparation",
    description: "Get ready for your visa interview with mock sessions",
  },
]

const documents = [
  {
    title: "Valid Passport",
    description: "Current passport with at least 6 months validity",
  },
  {
    title: "Academic Documents",
    description: "Certificates, transcripts, and test scores",
  },
  {
    title: "Financial Documents",
    description: "Bank statements, sponsorship letters, or scholarship proof",
  },
  {
    title: "Additional Requirements",
    description: "Photos, medical reports, and other supporting documents",
  },
]

const services = [
  {
    icon: GraduationCap,
    title: "Application Guidance",
    description: "Expert assistance throughout your visa application process",
  },
  {
    icon: FileText,
    title: "Document Review",
    description: "Thorough review and verification of all required documents",
  },
  {
    icon: Users,
    title: "Interview Preparation",
    description: "Comprehensive preparation for visa interviews",
  },
]

