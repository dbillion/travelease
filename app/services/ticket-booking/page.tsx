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
    <div className="container px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-24">
      {/* Header Section */}
      <div className="mx-auto max-w-[800px] text-center">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tighter">Book Your Flights</h1>
        <p className="mt-4 text-lg sm:text-xl text-muted-foreground">
          Search and book flights at the best prices with our easy-to-use platform
        </p>
      </div>

      {/* Flight Search Form */}
      <Card className="mx-auto mt-8 sm:mt-12 max-w-[1000px]">
        <CardHeader>
          <CardTitle className="text-xl sm:text-2xl">Search Flights</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roundtrip" className="w-full">
            <TabsList className="grid w-full max-w-[400px] grid-cols-2">
              <TabsTrigger value="roundtrip" className="text-sm">Round Trip</TabsTrigger>
              <TabsTrigger value="oneway" className="text-sm">One Way</TabsTrigger>
            </TabsList>
            <TabsContent value="roundtrip" className="mt-6">
              <form className="grid gap-4 sm:gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="from" className="text-sm sm:text-base">From</Label>
                    <Input id="from" placeholder="Departure City" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to" className="text-sm sm:text-base">To</Label>
                    <Input id="to" placeholder="Destination City" className="w-full" />
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-sm sm:text-base">Departure Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal text-sm")}>
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
                    <Label className="text-sm sm:text-base">Return Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal text-sm")}>
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
                  <Label className="text-sm sm:text-base">Passengers</Label>
                  <div className="flex items-center gap-4">
                    <Input type="number" min="1" defaultValue="1" className="w-20 sm:w-24" />
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Button size="lg" className="w-full mt-2">
                  Search Flights
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="oneway" className="mt-6">
              <form className="grid gap-4 sm:gap-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="from" className="text-sm sm:text-base">From</Label>
                    <Input id="from" placeholder="Departure City" className="w-full" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="to" className="text-sm sm:text-base">To</Label>
                    <Input id="to" placeholder="Destination City" className="w-full" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm sm:text-base">Departure Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal text-sm")}>
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
                  <Label className="text-sm sm:text-base">Passengers</Label>
                  <div className="flex items-center gap-4">
                    <Input type="number" min="1" defaultValue="1" className="w-20 sm:w-24" />
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Button size="lg" className="w-full mt-2">
                  Search Flights
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Features Section */}
      <div className="mt-16 sm:mt-24">
        <h2 className="text-center text-2xl sm:text-3xl font-bold">Why Book With Us</h2>
        <div className="mt-8 sm:mt-12 grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader className="text-center sm:text-left">
                <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto sm:mx-0" />
                <CardTitle className="mt-4 text-lg sm:text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm sm:text-base text-muted-foreground text-center sm:text-left">{feature.description}</p>
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

