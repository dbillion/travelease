import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, Plane, Users } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export default function TicketBookingPage() {
  return (
    <div className="container py-12 md:py-24">
      {/* Header Section */}
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Book Your Flights</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Search and book flights at the best prices with our easy-to-use platform
        </p>
      </div>

      {/* Flight Search Form */}
      <Card className="mx-auto mt-12 max-w-[1000px]">
        <CardHeader>
          <CardTitle>Search Flights</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roundtrip" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="roundtrip">Round Trip</TabsTrigger>
              <TabsTrigger value="oneway">One Way</TabsTrigger>
            </TabsList>
            <TabsContent value="roundtrip" className="mt-6">
              <form className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <Input id="from" placeholder="Departure City" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <Input id="to" placeholder="Destination City" />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Departure Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Pick a date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Return Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          <span>Pick a date</span>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Passengers</Label>
                  <div className="flex items-center gap-4">
                    <Input type="number" min="1" defaultValue="1" className="w-24" />
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Button size="lg" className="w-full">
                  Search Flights
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="oneway" className="mt-6">
              <form className="grid gap-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="from">From</Label>
                    <Input id="from" placeholder="Departure City" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to">To</Label>
                    <Input id="to" placeholder="Destination City" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal")}>
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Pick a date</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
                <div className="space-y-2">
                  <Label>Passengers</Label>
                  <div className="flex items-center gap-4">
                    <Input type="number" min="1" defaultValue="1" className="w-24" />
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Button size="lg" className="w-full">
                  Search Flights
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Features Section */}
      <div className="mt-24">
        <h2 className="text-center text-3xl font-bold">Why Book With Us</h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <feature.icon className="h-8 w-8 text-primary" />
                <CardTitle className="mt-4">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

const features = [
  {
    icon: Plane,
    title: "Best Flight Deals",
    description: "Access to competitive prices and exclusive flight offers",
  },
  {
    icon: Users,
    title: "Group Bookings",
    description: "Special rates and assistance for group travel arrangements",
  },
  {
    icon: CalendarIcon,
    title: "Flexible Dates",
    description: "Easy date changes and cancellation options available",
  },
]

