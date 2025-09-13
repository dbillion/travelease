import { NextRequest, NextResponse } from "next/server"
import { Groq } from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

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
  description: string
}

interface Attraction {
  name: string
  estimatedCost: number
  suggestedDuration: string
  description: string
}

interface BudgetBreakdown {
  savingsBuffer: number
  dailyBudget: number
  availableBudget: number
  weeklyBudget: number
  dailyBreakdown: DayBudget
}

const cleanJSON = (str: string): string => {
  try {
    // Remove any text before the first '{' or '['
    const jsonStart = Math.min(
      str.indexOf("{") === -1 ? Infinity : str.indexOf("{"),
      str.indexOf("[") === -1 ? Infinity : str.indexOf("[")
    )
    if (jsonStart === Infinity) {
      throw new Error("No JSON object or array found")
    }
    str = str.substring(jsonStart)

    // Remove any text after the last '}' or ']'
    const jsonEnd = Math.max(
      str.lastIndexOf("}"),
      str.lastIndexOf("]")
    )
    if (jsonEnd === -1) {
      throw new Error("No closing JSON bracket found")
    }
    str = str.substring(0, jsonEnd + 1)

    // Try to parse and re-stringify to ensure valid JSON
    JSON.parse(str)
    return str
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

  const dailyBreakdown: DayBudget = {
    accommodation: dailyBudget * 0.4, // 40% for accommodation
    food: dailyBudget * 0.2, // 20% for food
    transportation: dailyBudget * 0.2, // 20% for transportation
    activities: dailyBudget * 0.2, // 20% for activities
    total: dailyBudget // Add the total property
  }

  return {
    savingsBuffer,
    dailyBudget,
    availableBudget,
    weeklyBudget: dailyBudget * 7,
    dailyBreakdown,
  }
}

const BUDGET_ALLOCATIONS = {
  ACCOMMODATION: 0.4,
  FOOD: 0.2,
  TRANSPORTATION: 0.2,
  ACTIVITIES: 0.2,
}

const formatActivities = (activities: any[], budget: number): Activity[] => {
  if (!Array.isArray(activities)) {
    return []
  }

  return activities.map((activity: any): Activity => ({
    time: activity.time || "Flexible",
    description: activity.description || "Enjoy your time",
    cost: activity.cost || budget / 4, // Distribute budget evenly if not specified
  }))
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    console.log("Received request body:", body);
    
    const { destination, duration, budget, interests, travelType } = body

    if (!destination || !duration || !budget || !interests || !travelType) {
      return NextResponse.json(
        { error: "Missing required parameters" },
        { status: 400 }
      )
    }
    
    console.log("Parameters validated successfully");

    const prompt = `You are an expert travel planner AI. Create a detailed travel itinerary for a ${duration}-day trip to ${destination} with a budget of $${budget}. The traveler is interested in ${interests.join(
      ", "
    )} and prefers a ${travelType} style trip.

    Please provide the following information in valid JSON format:
    1. A daily itinerary with activities, times, and estimated costs
    2. Hotel recommendations with names, prices, locations, ratings, and descriptions
    3. Must-see attractions with names, estimated costs, suggested durations, and descriptions

    Budget breakdown:
    - Accommodation: ${(budget * BUDGET_ALLOCATIONS.ACCOMMODATION).toFixed(2)}
    - Food: ${(budget * BUDGET_ALLOCATIONS.FOOD).toFixed(2)}
    - Transportation: ${(budget * BUDGET_ALLOCATIONS.TRANSPORTATION).toFixed(2)}
    - Activities: ${(budget * BUDGET_ALLOCATIONS.ACTIVITIES).toFixed(2)}

    Requirements:
    - Provide exactly ${duration} days of activities
    - Each day should have 3-5 activities
    - Include a mix of the requested interests
    - Ensure activities fit within the allocated budget
    - For hotel recommendations, provide 3 options at different price points
    - For attractions, list 5-7 must-see places

    Format the response as a valid JSON object with the following structure:
    {
      "dailyItinerary": [
        {
          "day": 1,
          "activities": [
            {
              "time": "09:00 AM",
              "description": "Visit local museum",
              "cost": 15
            }
          ]
        }
      ],
      "hotelRecommendations": [
        {
          "name": "Grand Hotel",
          "pricePerNight": 120,
          "location": "City Center",
          "rating": 4.5,
          "description": "Luxury hotel with excellent amenities"
        }
      ],
      "mustSeeAttractions": [
        {
          "name": "Historic Landmark",
          "estimatedCost": 20,
          "suggestedDuration": "2-3 hours",
          "description": "A must-visit historical site"
        }
      ]
    }`

    console.log("Making request to Groq API");
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "llama3-8b-8192",
      temperature: 0.7,
      max_tokens: 2048,
    })
    console.log("Received response from Groq API");

    const rawOutput = chatCompletion.choices[0]?.message?.content || ""
    console.log("Raw AI Output:", rawOutput) // Debug log

    // Clean the JSON output
    const cleanedJSON = cleanJSON(rawOutput)
    console.log("Cleaned JSON:", cleanedJSON) // Debug log

    let parsed
    try {
      parsed = JSON.parse(cleanedJSON)
    } catch (parseError: unknown) {
      console.error("JSON Parse Error:", parseError)
      if (parseError instanceof Error) {
        return NextResponse.json({ error: "Failed to parse AI response", details: parseError.message }, { status: 500 })
      } else {
        return NextResponse.json({ error: "Failed to parse AI response", details: "Unknown error" }, { status: 500 })
      }
    }

    const budgets = calculateBudgets(budget, duration)

    const dailyItinerary = Array.from({ length: duration }, (_, index): DayItinerary => {
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
        pricePerNight: hotel.pricePerNight || budgets.dailyBreakdown.accommodation,
        location: hotel.location || destination,
        rating: hotel.rating || 4,
        description: hotel.description || "A comfortable stay in a great location.",
      }),
    )

    const mustSeeAttractions = (parsed.mustSeeAttractions || []).map(
      (attraction: any): Attraction => ({
        name: attraction.name || "Must-See Attraction",
        estimatedCost: attraction.estimatedCost || budgets.dailyBreakdown.activities / 4,
        suggestedDuration: attraction.suggestedDuration || "2-3 hours",
        description: attraction.description || "A popular attraction worth visiting.",
      }),
    )

    // Calculate budget summary values
    const totalCost = budget;
    const savingsBuffer = budgets.savingsBuffer;
    const dailySpending = budgets.dailyBudget;
    const weeklyOverview = budgets.weeklyBudget;
    const plannedSpend = budgets.availableBudget;
    const remaining = 0; // This would need to be calculated based on actual spending

    const response = {
      dailyItinerary: dailyItinerary,
      hotelRecommendations: hotelRecommendations,
      mustSeeAttractions: mustSeeAttractions,
      budgetBreakdown: {
        totalCost: totalCost,
        remaining: remaining,
      },
      budgetSummary: {
        savingsBuffer: savingsBuffer,
        dailySpending: dailySpending,
        weeklyOverview: weeklyOverview,
        plannedSpend: plannedSpend,
        remaining: remaining,
      },
    }

    return NextResponse.json(response)
  } catch (error: unknown) {
    console.error("API Error:", error)
    if (error instanceof Error) {
      return NextResponse.json({ error: "Failed to generate itinerary", details: error.message }, { status: 500 })
    } else {
      return NextResponse.json({ error: "Failed to generate itinerary", details: "Unknown error" }, { status: 500 })
    }
  }
}
