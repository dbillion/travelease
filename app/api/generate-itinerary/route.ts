import { type NextRequest, NextResponse } from "next/server"
import { Groq } from "groq-sdk"

interface TripParams {
  destination: string
  duration: number
  budget: number
  interests: string
}

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
}

interface DayItinerary {
  day: number
  activities: Activity[]
  budget: DayBudget
}

interface Hotel {
  name: string
  pricePerNight: number
  location: string
  rating: number
  description?: string
}

interface Attraction {
  name: string
  estimatedCost: number
  suggestedDuration: string
  description?: string
}

interface ItineraryResponse {
  budgetSummary: {
    totalBudget: number
    savingsBuffer: number
    plannedSpend: number
    remaining: number
    dailySpending: number
    weeklyOverview: number
  }
  dailyItinerary: DayItinerary[]
  hotelRecommendations: Hotel[]
  mustSeeAttractions: Attraction[]
}

interface RawActivity {
  time: string
  description: string
}

const cleanJSON = (text: string): string => {
  try {
    // First try to find JSON within markdown code blocks
    const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/)
    if (jsonMatch) {
      return jsonMatch[1].trim()
    }

    // If no markdown blocks found, try to find raw JSON
    const rawMatch = text.match(/\{[\s\S]*\}/)
    if (rawMatch) {
      return rawMatch[0].trim()
    }

    throw new Error("No valid JSON found in response")
  } catch (error) {
    console.error("Error cleaning JSON:", error)
    throw new Error("Failed to parse AI response")
  }
}

const SAVINGS_BUFFER_PERCENTAGE = 0.1 // 10% savings buffer

const calculateBudgets = (totalBudget: number, duration: number) => {
  const savingsBuffer = totalBudget * SAVINGS_BUFFER_PERCENTAGE
  const availableBudget = totalBudget - savingsBuffer
  const dailyBudget = availableBudget / duration

  return {
    savingsBuffer,
    dailyBudget,
    availableBudget,
    weeklyBudget: dailyBudget * 7,
    dailyBreakdown: {
      accommodation: dailyBudget * 0.4, // 40% for accommodation
      food: dailyBudget * 0.2, // 20% for food
      transportation: dailyBudget * 0.2, // 20% for transportation
      activities: dailyBudget * 0.2, // 20% for activities
    },
  }
}

const BUDGET_ALLOCATIONS = {
  ACCOMMODATION: 0.4,
  FOOD: 0.2,
  TRANSPORTATION: 0.2,
  ACTIVITIES: 0.2,
} as const

const validateBudgetAllocations = (allocations: typeof BUDGET_ALLOCATIONS): boolean =>
  Object.values(allocations).reduce((sum, value) => sum + value, 0) === 1

type BudgetCategory = keyof typeof BUDGET_ALLOCATIONS
type DailyBudgetCalculation = Record<Lowercase<BudgetCategory>, number> & { total: number }

const calculateDailyAmount = (totalBudget: number, duration: number): number => totalBudget / duration

const calculateCategoryAmount = (dailyAmount: number, allocation: number): number => dailyAmount * allocation

const calculateDailyBudgets = (totalBudget: number, duration: number): DailyBudgetCalculation => {
  if (totalBudget <= 0 || duration <= 0) {
    throw new Error("Budget and duration must be positive numbers")
  }

  if (!validateBudgetAllocations(BUDGET_ALLOCATIONS)) {
    throw new Error("Budget allocations must sum to 1")
  }

  const dailyAmount = calculateDailyAmount(totalBudget, duration)

  const budgetCategories = Object.entries(BUDGET_ALLOCATIONS).reduce(
    (acc, [category, allocation]) => ({
      ...acc,
      [category.toLowerCase()]: calculateCategoryAmount(dailyAmount, allocation),
    }),
    {} as Record<Lowercase<BudgetCategory>, number>,
  )

  return {
    ...budgetCategories,
    total: dailyAmount,
  }
}

const calculateActivityCost = (activityBudget: number, numberOfActivities: number): number =>
  numberOfActivities > 0 ? activityBudget / numberOfActivities : 0

const formatActivities = (rawActivities: RawActivity[] | string[], dailyActivityBudget: number): Activity[] => {
  if (!Array.isArray(rawActivities) || rawActivities.length === 0) {
    return []
  }

  const numberOfActivities = rawActivities.length
  const costPerActivity = calculateActivityCost(dailyActivityBudget, numberOfActivities)

  return rawActivities.map((activity) => {
    if (typeof activity === "string") {
      return {
        time: "All day",
        description: activity,
        cost: costPerActivity,
      }
    } else {
      return {
        time: activity.time || "All day",
        description: activity.description || "",
        cost: costPerActivity,
      }
    }
  })
}

export async function POST(request: NextRequest) {
  try {
    const params = await request.json()

    // Validate input parameters
    if (!params.destination || !params.duration || !params.budget || !params.interests) {
      return NextResponse.json({ error: "Missing required parameters", details: { params } }, { status: 400 })
    }

    if (!process.env.GROQ_API_KEY) {
      console.error("GROQ_API_KEY is not defined")
      return NextResponse.json({ error: "API configuration error", details: "Missing API key" }, { status: 500 })
    }

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    })

    const prompt = `As an AI travel planner, create a detailed ${params.duration}-day itinerary for a trip to ${params.destination} with a budget of $${params.budget}. The traveler is interested in ${params.interests}.

    Please structure each day's activities into Morning, Afternoon, and Evening segments.
    
    Return the result as a JSON object with the following structure:
    {
      "dailyItinerary": [
        {
          "day": 1,
          "activities": [
            {
              "time": "Morning",
              "description": "Detailed morning activity description"
            },
            {
              "time": "Afternoon",
              "description": "Detailed afternoon activity description"
            },
            {
              "time": "Evening",
              "description": "Detailed evening activity description"
            }
          ]
        }
      ],
      "hotelRecommendations": [
        {
          "name": "Hotel Name",
          "location": "Hotel Location",
          "description": "Hotel Description"
        }
      ],
      "mustSeeAttractions": [
        {
          "name": "Attraction Name",
          "description": "Attraction Description"
        }
      ]
    }`

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are an experienced travel planner who creates detailed, personalized travel itineraries.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "qwen/qwen3-32b",
        temperature: 0.7,
        max_tokens: 4096,
        top_p: 0.95,
        stream: false,
      })

      const rawOutput = completion.choices[0]?.message?.content

      if (!rawOutput) {
        throw new Error("No content received from AI model")
      }

      console.log("Raw AI Output:", rawOutput) // Debug log

      const cleanedJSON = cleanJSON(rawOutput)
      console.log("Cleaned JSON:", cleanedJSON) // Debug log

      let parsed
      try {
        parsed = JSON.parse(cleanedJSON)
      } catch (parseError) {
        console.error("JSON Parse Error:", parseError)
        return NextResponse.json({ error: "Failed to parse AI response", details: parseError.message }, { status: 500 })
      }

      const budgets = calculateBudgets(params.budget, params.duration)

      const dailyItinerary = Array.from({ length: params.duration }, (_, index): DayItinerary => {
        const dayData = parsed.dailyItinerary?.[index] || { activities: [] }

        return {
          day: index + 1,
          activities: formatActivities(dayData.activities || [], budgets.dailyBreakdown.activities),
          budget: budgets.dailyBreakdown,
        }
      })

      const hotelRecommendations = (parsed.hotelRecommendations || []).map(
        (hotel: any): Hotel => ({
          name: hotel.name || "Recommended Hotel",
          pricePerNight: budgets.dailyBreakdown.accommodation,
          location: hotel.location || params.destination,
          rating: 4,
          description: hotel.description || "A comfortable stay in a great location.",
        }),
      )

      const mustSeeAttractions = (parsed.mustSeeAttractions || []).map(
        (attraction: any): Attraction => ({
          name: attraction.name || "Must-See Attraction",
          estimatedCost: budgets.dailyBreakdown.activities / 4,
          suggestedDuration: "2-3 hours",
          description: attraction.description || "A popular attraction worth visiting.",
        }),
      )

      const itineraryResponse: ItineraryResponse = {
        budgetSummary: {
          totalBudget: params.budget,
          savingsBuffer: budgets.savingsBuffer,
          plannedSpend: budgets.availableBudget,
          remaining: budgets.savingsBuffer,
          dailySpending: budgets.dailyBudget,
          weeklyOverview: budgets.weeklyBudget,
        },
        dailyItinerary: dailyItinerary.map((day, index) => ({
          ...day,
          budget: {
            accommodation: budgets.dailyBreakdown.accommodation,
            food: budgets.dailyBreakdown.food,
            transportation: budgets.dailyBreakdown.transportation,
            activities: budgets.dailyBreakdown.activities,
            total: budgets.dailyBudget,
          },
        })),
        hotelRecommendations,
        mustSeeAttractions,
      }

      return NextResponse.json(itineraryResponse)
    } catch (aiError) {
      console.error("AI Service Error:", aiError)
      return NextResponse.json(
        { error: "Failed to generate itinerary from AI service", details: aiError.message },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Server Error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

