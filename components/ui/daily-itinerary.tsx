"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, DollarSign } from "lucide-react"

interface Activity {
  time: string
  description: string
  cost: number
}

interface DayBudget {
  accommodation: number
  food: number
  transportation: number
  activities: number
  total: number
  savings: number
}

interface DayItinerary {
  day: number
  activities: Activity[]
  budget: DayBudget
}

interface DailyItineraryProps {
  itinerary: DayItinerary[]
}

const gradients = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-orange-500 to-yellow-500",
  "from-green-500 to-emerald-500",
  "from-red-500 to-orange-500",
]

export function DailyItinerary({ itinerary }: DailyItineraryProps) {
  return (
    <div className="grid gap-6">
      {itinerary.map((day, index) => (
        <motion.div
          key={day.day}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <Card className={`bg-gradient-to-r ${gradients[index % gradients.length]} text-white`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Day {day.day}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Activities */}
              <div className="space-y-4">
                {day.activities.map((activity, idx) => (
                  <motion.div
                    key={idx}
                    className="bg-white/90 p-4 rounded-lg text-gray-900"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="font-semibold text-primary">{activity.time}</p>
                    <p className="mt-1">{activity.description}</p>
                    <p className="mt-2 text-sm text-gray-500">Estimated Cost: ${activity.cost.toFixed(2)}</p>
                  </motion.div>
                ))}
              </div>

              {/* Daily Budget */}
              <div className="bg-white/90 p-4 rounded-lg text-gray-900">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Daily Budget Breakdown
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <p>Accommodation:</p>
                  <p className="text-right">${day.budget.accommodation.toFixed(2)}</p>
                  <p>Food:</p>
                  <p className="text-right">${day.budget.food.toFixed(2)}</p>
                  <p>Transportation:</p>
                  <p className="text-right">${day.budget.transportation.toFixed(2)}</p>
                  <p>Activities:</p>
                  <p className="text-right">${day.budget.activities.toFixed(2)}</p>
                  <p className="font-semibold border-t pt-2">Daily Total:</p>
                  <p className="text-right font-semibold border-t pt-2">${day.budget.total.toFixed(2)}</p>
                  <p className="text-green-600">Daily Savings:</p>
                  <p className="text-right text-green-600">${day.budget.savings.toFixed(2)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

