"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Save, Share2, PiggyBank, Calendar, DollarSign, Printer } from "lucide-react"
import { toast } from "sonner"
import CountryInfo from "@/components/country-info"
import MultiStepFormFixed from "@/components/multi-step-form-fixed"
import { PrintButton, enhancedPrint } from "@/components/print-utils"

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

export default function AIPlannerPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [itineraryData, setItineraryData] = useState<ItineraryResponse | null>(null)
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    duration: 7,
    budget: 1000,
    interests: ["culture"],
    touring: "city" as "country" | "city",
  })

  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      setIsLoggedIn(true)
    } else {
      router.push("/login")
    }
  }, [router])

   const handleSubmit = async (data: { 
    country: string; 
    city: { 
      name: string; 
      country: string; 
      latitude: number; 
      longitude: number; 
      timezone: string; 
      population: number; 
      country_code: string; 
    } | null; 
    budget: number; 
    days: number;
    touring: "country" | "city" | null;
    interests: string[] 
  }) => {
    setLoading(true)
    
    // Determine destination based on touring preference
    let destination = ""
    if (data.touring === "country") {
      destination = data.country
    } else {
      destination = data.city ? `${data.city.name}, ${data.country}` : data.country
    }

    try {
      const response = await fetch("/api/generate-itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          destination,
          duration: data.days,
          budget: data.budget,
          interests: data.interests,
          travelType: data.touring,
        }),
      })

      const responseData = await response.json()

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to generate itinerary")
      }

      if (!responseData || !responseData.dailyItinerary) {
        throw new Error("Invalid response format")
      }

      setItineraryData(responseData)
      // Clear form data from localStorage after successful submission
      localStorage.removeItem("travelFormData")
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

  const handlePrint = () => {
    enhancedPrint({
      title: "Travel Itinerary",
      hideElements: [
        ".tabs-list",
        "button:not(.print-keep)",
        "nav",
        ".form-container",
        ".multi-step-form"
      ],
      customStyles: `
        .daily-itinerary {
          page-break-inside: avoid;
          margin-bottom: 20px;
        }
        
        .itinerary-day {
          border-left: 3px solid #3b82f6;
          padding-left: 15px;
          margin-bottom: 15px;
        }
        
        .activity-item {
          margin-bottom: 8px;
          padding: 8px 0;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .cost-item {
          font-weight: 600;
          color: #059669 !important;
        }
        
        .budget-summary {
          background: #f9fafb !important;
          border: 2px solid #e5e7eb !important;
          page-break-inside: avoid;
        }
      `
    })
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

      {!itineraryData ? (
                    <MultiStepFormFixed onSubmit={handleSubmit} loading={loading} />
      ) : (
        <div className="space-y-8 print:space-y-4">
          {/* Budget Summary Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <PiggyBank className="mr-2" />
                    Budget Summary
                  </span>
                  <PrintButton 
                    title="Travel Itinerary"
                    variant="outline"
                    size="sm"
                    hideElements={[
                      ".tabs-list",
                      "button:not(.print-keep)",
                      "nav",
                      ".form-container",
                      ".multi-step-form"
                    ]}
                    customStyles={`
                      .daily-itinerary {
                        page-break-inside: avoid;
                        margin-bottom: 20px;
                      }
                      .budget-summary {
                        background: #f9fafb !important;
                        border: 2px solid #e5e7eb !important;
                        page-break-inside: avoid;
                      }
                    `}
                  >
                    Print Itinerary
                  </PrintButton>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 print:grid-cols-2 print:gap-6">
                  <div className="space-y-2 print:space-y-1">
                    <p className="text-sm opacity-90 print:text-gray-700 print:opacity-100">Total Budget</p>
                    <p className="text-2xl font-bold print:text-xl print:text-green-600">${formData.budget}</p>
                  </div>
                  <div className="space-y-2 print:space-y-1">
                    <p className="text-sm opacity-90 print:text-gray-700 print:opacity-100">Savings Buffer (10%)</p>
                    <p className="text-2xl font-bold print:text-xl print:text-green-600">${itineraryData.budgetSummary.savingsBuffer.toFixed(2)}</p>
                  </div>
                  <div className="space-y-2 print:space-y-1">
                    <p className="text-sm opacity-90 print:text-gray-700 print:opacity-100">Daily Spending</p>
                    <p className="text-2xl font-bold print:text-xl print:text-green-600">${itineraryData.budgetSummary.dailySpending.toFixed(2)}</p>
                  </div>
                  <div className="space-y-2 print:space-y-1">
                    <p className="text-sm opacity-90 print:text-gray-700 print:opacity-100">Weekly Overview</p>
                    <p className="text-2xl font-bold print:text-xl print:text-green-600">${itineraryData.budgetSummary.weeklyOverview.toFixed(2)}</p>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-3 gap-4 print:grid-cols-3 print:gap-6 print:mt-4">
                  <div className="space-y-2 print:space-y-1">
                    <p className="text-sm opacity-90 print:text-gray-700 print:opacity-100">Planned Spend</p>
                    <p className="text-xl font-bold print:text-lg print:text-blue-600">${itineraryData.budgetSummary.plannedSpend.toFixed(2)}</p>
                  </div>
                  <div className="space-y-2 print:space-y-1">
                    <p className="text-sm opacity-90 print:text-gray-700 print:opacity-100">Savings</p>
                    <p className="text-xl font-bold text-green-300 print:text-lg print:text-green-600">
                      ${itineraryData.budgetSummary.savingsBuffer.toFixed(2)}
                    </p>
                  </div>
                  <div className="space-y-2 print:space-y-1">
                    <p className="text-sm opacity-90 print:text-gray-700 print:opacity-100">Remaining</p>
                    <p className="text-xl font-bold text-green-300 print:text-lg print:text-green-600">
                      ${itineraryData.budgetSummary.remaining.toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Daily Itinerary */}
          <div className="grid gap-6 print:gap-4">
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
                  )} border border-gray-200 shadow-md print:shadow-none print:scale-100 print:bg-white print:border-2 print:border-gray-300 daily-itinerary no-page-break`}
                >
                  <CardHeader className="text-white print:text-black print:bg-gray-100">
                    <CardTitle className="flex items-center text-white drop-shadow-md print:text-black print:drop-shadow-none">
                      <Calendar className="mr-2 print:text-blue-600" />
                      Day {day.day}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 print:space-y-4">
                    {/* Activities */}
                    <div className="space-y-4 print:space-y-2">
                      {day.activities.map((activity, idx) => (
                        <motion.div
                          key={idx}
                          className="bg-white/95 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100 print:shadow-none print:border print:border-gray-300 activity-item"
                          whileHover={{ scale: 1.01 }}
                        >
                          <p className="font-semibold text-gray-900 print:text-black">{activity.time}</p>
                          <p className="mt-1 text-gray-700 print:text-gray-800">{activity.description}</p>
                          <p className="mt-2 text-sm text-gray-600 font-medium print:text-green-600 cost-item">
                            Estimated Cost: ${activity.cost.toFixed(2)}
                          </p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Daily Budget */}
                    <div className="bg-white/95 p-4 rounded-lg border border-gray-100 print:border-none">
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
                      className="bg-white p-4 rounded-lg hover:shadow-md transition-shadow border border-gray-200 shadow-sm print:shadow-none"
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
                  <div key={index} className="p-4 border border-gray-200 rounded-md bg-white shadow-sm hover:shadow-md transition-shadow print:shadow-none">
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
          <div className="flex gap-4 mt-6 print:hidden">
            <Button onClick={handleSave} variant="outline" className="flex-1">
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button onClick={handleShare} variant="outline" className="flex-1">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <PrintButton 
              title="Travel Itinerary"
              variant="outline"
              className="flex-1"
              hideElements={[
                ".tabs-list",
                "button:not(.print-keep)",
                "nav",
                ".form-container",
                ".multi-step-form"
              ]}
              customStyles={`
                .daily-itinerary {
                  page-break-inside: avoid;
                  margin-bottom: 20px;
                }
                .budget-summary {
                  background: #f9fafb !important;
                  border: 2px solid #e5e7eb !important;
                  page-break-inside: avoid;
                }
              `}
            >
              Print Itinerary
            </PrintButton>
          </div>
        </div>
      )}
    </div>
  )
}
