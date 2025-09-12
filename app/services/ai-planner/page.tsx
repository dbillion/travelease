"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Save, Share2, PiggyBank, Calendar, DollarSign } from "lucide-react"
import { toast } from "sonner"
import CountryInfo from "@/components/country-info"

interface ItineraryResponse {
  dailyItinerary: Array<{
    day: number
    activities: Array<{
      time: string
      description: string
      cost: number
    }>
    budget: {
      accommodation: number
      food: number
      transportation: number
      activities: number
      total: number
    }
  }>
  hotelRecommendations: Array<{
    name: string
    pricePerNight: number
    location: string
    rating: number
    description?: string
  }>
  mustSeeAttractions: Array<{
    name: string
    estimatedCost: number
    suggestedDuration: string
    description?: string
  }>
  budgetBreakdown: {
    totalCost: number
    remaining: number
  }
  budgetSummary: {
    savingsBuffer: number
    dailySpending: number
    weeklyOverview: number
    plannedSpend: number
    remaining: number
  }
}

const MAX_DAYS = 20
const MIN_DESTINATION_LENGTH = 2

export default function AIPlannerPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [itineraryData, setItineraryData] = useState<ItineraryResponse | null>(null)
  const [formData, setFormData] = useState({
    destination: "",
    duration: 7,
    budget: 1000,
    interests: ["culture"],
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setIsLoggedIn(true)
    } else {
      router.push("/login")
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.destination || formData.destination.length < MIN_DESTINATION_LENGTH) {
      toast.error("Please enter a valid destination")
      return
    }

    if (formData.duration > MAX_DAYS) {
      toast.error(`Trip duration cannot exceed ${MAX_DAYS} days`)
      return
    }

    if (formData.interests.length === 0) {
      toast.error("Please select at least one interest")
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          interests: formData.interests.join(", "),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate itinerary")
      }

      if (!data || !data.dailyItinerary) {
        throw new Error("Invalid response format")
      }

      setItineraryData(data)
      toast.success("Itinerary generated successfully!")
    } catch (error) {
      console.error("Error generating itinerary:", error)
      toast.error(error instanceof Error ? error.message : "Failed to generate itinerary. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleShare = () => {
    toast.success("Itinerary shared successfully!")
  }

  const handleSave = () => {
    toast.success("Itinerary saved to your profile!")
  }

  if (!isLoggedIn) {
    return null
  }

  const getGradientColor = (index: number) => {
    const colors = [
      "from-blue-500 to-cyan-500",
      "from-purple-500 to-pink-500",
      "from-orange-500 to-yellow-500",
      "from-green-500 to-emerald-500",
      "from-red-500 to-orange-500",
    ]
    return colors[index % colors.length]
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">AI Travel Planner</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Plan Your Trip</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="destination">Destination</Label>
              <Input
                id="destination"
                placeholder="Enter city or country"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                required
                minLength={MIN_DESTINATION_LENGTH}
              />
            </div>
            <div className="space-y-2">
              <Label>Trip Duration (days)</Label>
              <Slider
                value={[formData.duration]}
                onValueChange={(value) => setFormData({ ...formData, duration: Math.min(value[0], MAX_DAYS) })}
                min={1}
                max={MAX_DAYS}
              />
              <span className="text-sm text-muted-foreground">{formData.duration} days</span>
            </div>
            <div className="space-y-2">
              <Label>Budget (USD)</Label>
              <Slider
                value={[formData.budget]}
                onValueChange={(value) => setFormData({ ...formData, budget: value[0] })}
                min={100}
                max={10000}
                step={100}
              />
              <span className="text-sm text-muted-foreground">${formData.budget}</span>
            </div>
            <div className="space-y-2">
              <Label>Interests</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="culture"
                    checked={formData.interests.includes("culture")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, interests: [...formData.interests, "culture"] })
                      } else {
                        setFormData({ ...formData, interests: formData.interests.filter(i => i !== "culture") })
                      }
                    }}
                  />
                  <label
                    htmlFor="culture"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Culture & History
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="school"
                    checked={formData.interests.includes("school")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, interests: [...formData.interests, "school"] })
                      } else {
                        setFormData({ ...formData, interests: formData.interests.filter(i => i !== "school") })
                      }
                    }}
                  />
                  <label
                    htmlFor="school"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    School & Research
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="business"
                    checked={formData.interests.includes("business")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, interests: [...formData.interests, "business"] })
                      } else {
                        setFormData({ ...formData, interests: formData.interests.filter(i => i !== "business") })
                      }
                    }}
                  />
                  <label
                    htmlFor="business"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Business & Work
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="nature"
                    checked={formData.interests.includes("nature")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, interests: [...formData.interests, "nature"] })
                      } else {
                        setFormData({ ...formData, interests: formData.interests.filter(i => i !== "nature") })
                      }
                    }}
                  />
                  <label
                    htmlFor="nature"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Nature & Adventure
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="food"
                    checked={formData.interests.includes("food")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, interests: [...formData.interests, "food"] })
                      } else {
                        setFormData({ ...formData, interests: formData.interests.filter(i => i !== "food") })
                      }
                    }}
                  />
                  <label
                    htmlFor="food"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Food & Cuisine
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="relaxation"
                    checked={formData.interests.includes("relaxation")}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setFormData({ ...formData, interests: [...formData.interests, "relaxation"] })
                      } else {
                        setFormData({ ...formData, interests: formData.interests.filter(i => i !== "relaxation") })
                      }
                    }}
                  />
                  <label
                    htmlFor="relaxation"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Relaxation & Wellness
                  </label>
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating Itinerary...
                </>
              ) : (
                "Generate Itinerary"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {formData.destination && (
        <Tabs defaultValue="itinerary" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="itinerary">AI Generated Itinerary</TabsTrigger>
            <TabsTrigger value="country-info">Country Information</TabsTrigger>
          </TabsList>
          <TabsContent value="itinerary">
            {itineraryData ? (
              <div className="space-y-8">
                {/* Budget Summary Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PiggyBank className="mr-2" />
                        Budget Summary
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm opacity-90">Total Budget</p>
                          <p className="text-2xl font-bold">${formData.budget}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm opacity-90">Savings Buffer (10%)</p>
                          <p className="text-2xl font-bold">${itineraryData.budgetSummary.savingsBuffer.toFixed(2)}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm opacity-90">Daily Spending</p>
                          <p className="text-2xl font-bold">${itineraryData.budgetSummary.dailySpending.toFixed(2)}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm opacity-90">Weekly Overview</p>
                          <p className="text-2xl font-bold">${itineraryData.budgetSummary.weeklyOverview.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="mt-6 grid grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <p className="text-sm opacity-90">Planned Spend</p>
                          <p className="text-xl font-bold">${itineraryData.budgetSummary.plannedSpend.toFixed(2)}</p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm opacity-90">Savings</p>
                          <p className="text-xl font-bold text-green-300">
                            ${itineraryData.budgetSummary.savingsBuffer.toFixed(2)}
                          </p>
                        </div>
                        <div className="space-y-2">
                          <p className="text-sm opacity-90">Remaining</p>
                          <p className="text-xl font-bold text-green-300">
                            ${itineraryData.budgetSummary.remaining.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Daily Itinerary */}
                <div className="grid gap-6">
                  {itineraryData.dailyItinerary.map((day, index) => (
                    <motion.div
                      key={day.day}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card
                        className={`hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-gradient-to-r ${getGradientColor(
                          index,
                        )} border border-gray-200 shadow-md`}
                      >
                        <CardHeader className="text-white">
                          <CardTitle className="flex items-center text-white drop-shadow-md">
                            <Calendar className="mr-2" />
                            Day {day.day}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                          {/* Activities */}
                          <div className="space-y-4">
                            {day.activities.map((activity, idx) => (
                              <motion.div
                                key={idx}
                                className="bg-white/95 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
                                whileHover={{ scale: 1.01 }}
                              >
                                <p className="font-semibold text-gray-900">{activity.time}</p>
                                <p className="mt-1 text-gray-700">{activity.description}</p>
                                <p className="mt-2 text-sm text-gray-600 font-medium">
                                  Estimated Cost: ${activity.cost.toFixed(2)}
                                </p>
                              </motion.div>
                            ))}
                          </div>

                          {/* Daily Budget */}
                          <div className="bg-white/95 p-4 rounded-lg border border-gray-100">
                            <h4 className="font-semibold mb-3 flex items-center text-gray-900">
                              <DollarSign className="mr-2" />
                              Daily Budget Breakdown
                            </h4>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <p className="text-gray-700">Accommodation:</p>
                              <p className="text-right text-gray-900 font-medium">${day.budget.accommodation.toFixed(2)}</p>
                              <p className="text-gray-700">Food:</p>
                              <p className="text-right text-gray-900 font-medium">${day.budget.food.toFixed(2)}</p>
                              <p className="text-gray-700">Transportation:</p>
                              <p className="text-right text-gray-900 font-medium">${day.budget.transportation.toFixed(2)}</p>
                              <p className="text-gray-700">Activities:</p>
                              <p className="text-right text-gray-900 font-medium">${day.budget.activities.toFixed(2)}</p>
                              <p className="font-semibold border-t pt-2 text-gray-900">Total:</p>
                              <p className="text-right font-semibold border-t pt-2 text-gray-900">${day.budget.total.toFixed(2)}</p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Hotel Recommendations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>Recommended Hotels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {itineraryData.hotelRecommendations.map((hotel, index) => (
                          <motion.div
                            key={index}
                            className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow border border-gray-200 shadow-sm"
                            whileHover={{ scale: 1.03 }}
                          >
                            <h3 className="font-semibold text-lg text-gray-900">{hotel.name}</h3>
                            <p className="text-sm text-gray-700 mt-1">{hotel.description}</p>
                            <div className="mt-2 space-y-1 text-sm">
                              <p className="text-blue-600 font-medium">${hotel.pricePerNight}/night</p>
                              <p className="text-gray-700">{hotel.location}</p>
                              <p className="text-gray-700">Rating: {hotel.rating}/5</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Must-See Attractions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Must-See Attractions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                      {(itineraryData.mustSeeAttractions || []).map((attraction, index) => (
                        <div key={index} className="p-4 border border-gray-200 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow">
                          <h3 className="font-medium text-gray-900">{attraction.name}</h3>
                          <p className="text-sm text-gray-700 mt-1">{attraction.description}</p>
                          <p className="text-sm text-gray-600 mt-1">Duration: {attraction.suggestedDuration}</p>
                          <p className="text-sm text-gray-600">Cost: ${(attraction.estimatedCost || 0).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-4 mt-6">
                  <Button onClick={handleSave} variant="outline" className="flex-1">
                    <Save className="mr-2 h-4 w-4" />
                    Save
                  </Button>
                  <Button onClick={handleShare} variant="outline" className="flex-1">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </Button>
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
                <CountryInfo country={formData.destination} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}

