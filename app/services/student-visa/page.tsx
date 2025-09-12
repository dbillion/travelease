import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, FileText, GraduationCap, Users } from "lucide-react"

export default function StudentVisaPage() {
  return (
    <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-24">
      {/* Header Section */}
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter">Student Visa Services</h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
          Get expert guidance for your student visa application process
        </p>
      </div>

      {/* Visa Types Section */}
      <div className="mt-12 sm:mt-16">
        <Tabs defaultValue="requirements" className="mx-auto max-w-[1000px]">
          <TabsList className="grid w-full max-w-[600px] grid-cols-3 mx-auto">
            <TabsTrigger value="requirements" className="text-xs sm:text-sm">Requirements</TabsTrigger>
            <TabsTrigger value="process" className="text-xs sm:text-sm">Process</TabsTrigger>
            <TabsTrigger value="documents" className="text-xs sm:text-sm">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="requirements" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl">Visa Requirements</CardTitle>
                <CardDescription className="text-sm sm:text-base">Essential requirements for student visa application</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <Check className="mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">{req.title}</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">{req.description}</p>
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
                <CardTitle className="text-xl sm:text-2xl">Application Process</CardTitle>
                <CardDescription className="text-sm sm:text-base">Step-by-step guide to applying for your student visa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 sm:space-y-8">
                  {process.map((step, index) => (
                    <div key={index} className="flex gap-3 sm:gap-4">
                      <div className="flex h-6 w-6 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm sm:text-base">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">{step.title}</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">{step.description}</p>
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
                <CardTitle className="text-xl sm:text-2xl">Required Documents</CardTitle>
                <CardDescription className="text-sm sm:text-base">Complete list of documents needed for your application</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {documents.map((doc, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <FileText className="mt-1 h-4 w-4 sm:h-5 sm:w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">{doc.title}</h3>
                        <p className="text-muted-foreground text-sm sm:text-base">{doc.description}</p>
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
      <div className="mt-16 sm:mt-24">
        <h2 className="text-center text-2xl sm:text-3xl font-bold">Our Services</h2>
        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader className="text-center sm:text-left">
                <service.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto sm:mx-0" />
                <CardTitle className="mt-4 text-lg sm:text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground text-center sm:text-left">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-16 sm:mt-24 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Ready to Start Your Journey?</h2>
        <p className="mt-4 text-sm sm:text-base text-muted-foreground px-4">
          Contact us today for a free consultation about your student visa application
        </p>
        <Button size="lg" className="mt-6 sm:mt-8 w-full sm:w-auto">
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

