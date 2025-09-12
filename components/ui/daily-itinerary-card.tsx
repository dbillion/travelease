"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Activity {
  time: string
  description: string
  cost: number
}

interface DailyItineraryCardProps {
  day: number
  activities: Activity[]
  budget: {
    accommodation: number
    food: number
    transportation: number
    activities: number
    savings: number
  }
}

export function DailyItineraryCard({ day, activities, budget }: DailyItineraryCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Day {day}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="grid grid-cols-[1fr,auto] gap-4 items-start">
              <div>
                <h3 className="font-medium">{activity.time}</h3>
                <p className="text-muted-foreground">{activity.description}</p>
              </div>
              <p className="text-right font-medium">${activity.cost.toFixed(2)}</p>
            </div>
          ))}
        </div>

        <div className="bg-muted/50 rounded-lg p-4 grid grid-cols-2 gap-y-2 text-sm">
          <h3 className="font-medium">Accommodation</h3>
          <p className="text-right">${budget.accommodation.toFixed(2)}</p>
          <h3 className="font-medium">Food</h3>
          <p className="text-right">${budget.food.toFixed(2)}</p>
          <h3 className="font-medium">Transportation</h3>
          <p className="text-right">${budget.transportation.toFixed(2)}</p>
          <h3 className="font-medium">Activities</h3>
          <p className="text-right">${budget.activities.toFixed(2)}</p>
          <h3 className="font-medium text-green-600">Savings</h3>
          <p className="text-right text-green-600">${budget.savings.toFixed(2)}</p>
        </div>
      </CardContent>
    </Card>
  )
}

