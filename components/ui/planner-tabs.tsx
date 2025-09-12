"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { BudgetCard } from "@/components/ui/budget-card"
import { DailyItineraryCard } from "@/components/ui/daily-itinerary-card"
import { HotelCard } from "@/components/ui/hotel-card"
import CountryInfo from "@/components/country-info"

interface PlannerTabsProps {
  destination: string
  itineraryData: any
}

export function PlannerTabs({ destination, itineraryData }: PlannerTabsProps) {
  return (
    <Tabs defaultValue="itinerary" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="itinerary">AI Generated Itinerary</TabsTrigger>
        <TabsTrigger value="country-info">Country Information</TabsTrigger>
      </TabsList>

      <TabsContent value="itinerary">
        {itineraryData ? (
          <div className="space-y-8">
            <Card>
              <CardContent className="p-6">
                <BudgetCard
                  totalBudget={itineraryData.budgetSummary.totalBudget}
                  savingsBuffer={itineraryData.budgetSummary.savingsBuffer}
                  dailyBudget={itineraryData.budgetSummary.dailySpending}
                  adjustedFrom={itineraryData.budgetSummary.totalBudget / itineraryData.dailyItinerary.length}
                  accommodation={itineraryData.dailyItinerary[0].budget.accommodation}
                  food={itineraryData.dailyItinerary[0].budget.food}
                  transportation={itineraryData.dailyItinerary[0].budget.transportation}
                  activities={itineraryData.dailyItinerary[0].budget.activities}
                  total={itineraryData.dailyItinerary[0].budget.total}
                  savings={itineraryData.budgetSummary.savingsBuffer / itineraryData.dailyItinerary.length}
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              {itineraryData.dailyItinerary.map((day: any, index: number) => (
                <DailyItineraryCard
                  key={index}
                  day={day.day}
                  activities={day.activities}
                  budget={{
                    accommodation: day.budget.accommodation,
                    food: day.budget.food,
                    transportation: day.budget.transportation,
                    activities: day.budget.activities,
                    savings: itineraryData.budgetSummary.savingsBuffer / itineraryData.dailyItinerary.length,
                  }}
                />
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recommended Hotels</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {itineraryData.hotelRecommendations.map((hotel: any, index: number) => (
                  <HotelCard
                    key={index}
                    name={hotel.name}
                    location={hotel.location}
                    pricePerNight={hotel.pricePerNight}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              Generate an itinerary to see the results here.
            </CardContent>
          </Card>
        )}
      </TabsContent>

      <TabsContent value="country-info">
        <Card>
          <CardContent>
            <CountryInfo country={destination} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

