"use client"

import React, { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle, MapPin, DollarSign, Heart, Users, Building, ArrowLeft, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import CountryInfo from "@/components/country-info"
import { CountryMap } from "@/components/country-map"
import { CitySearch } from "@/components/city-search"
import { WeatherCharts } from "@/components/weather-charts"
import { motion, AnimatePresence } from "framer-motion"

interface City {
  name: string
  country: string
  latitude: number
  longitude: number
  timezone: string
  population: number
  country_code: string
}

interface FormData {
  country: string
  city: City | null
  budget: number
  days: number
  touring: "country" | "city" | null
  interests: string[]
}

interface MultiStepFormProps {
  onSubmit: (data: FormData) => void
  loading: boolean
}

const INTEREST_OPTIONS = [
  { id: "culture", label: "Culture & History", icon: "🏛️" },
  { id: "nature", label: "Nature & Adventure", icon: "🌲" },
  { id: "food", label: "Food & Cuisine", icon: "🍽️" },
  { id: "shopping", label: "Shopping", icon: "🛍️" },
  { id: "nightlife", label: "Nightlife", icon: "🌃" },
  { id: "relaxation", label: "Relaxation & Wellness", icon: "💆" },
  { id: "business", label: "Business & Work", icon: "💼" },
  { id: "family", label: "Family Friendly", icon: "👨‍👩‍👧‍👦" },
]

const STEPS = [
  { title: "Choose Destination", icon: "🌍", description: "Select your country and city" },
  { title: "Set Budget & Duration", icon: "💰", description: "Define your budget and trip length" },
  { title: "Pick Interests", icon: "❤️", description: "What interests you most?" },
  { title: "Travel Type", icon: "✈️", description: "Country tour or city focus?" },
]

export default function MultiStepFormFixed({ onSubmit, loading }: MultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  
  const { control, handleSubmit, watch, setValue, getValues, trigger, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      country: "",
      city: null,
      budget: 1000,
      days: 7,
      touring: null,
      interests: [],
    },
    mode: "onChange"
  })

  const watchedValues = watch()
  const currentCountry = watch("country")
  const currentCity = watch("city")
  const currentBudget = watch("budget")
  const currentDays = watch("days")
  const currentInterests = watch("interests")

  // Save to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem("travelFormData", JSON.stringify(watchedValues))
    }, 500)
    
    return () => clearTimeout(timeoutId)
  }, [watchedValues])

  // Load from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("travelFormData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData) as FormData
        setValue("country", parsedData.country || "")
        setValue("city", parsedData.city || null)
        setValue("budget", parsedData.budget || 1000)
        setValue("days", parsedData.days || 7)
        setValue("interests", parsedData.interests || [])
        setValue("touring", parsedData.touring || null)
      } catch (e) {
        console.error("Failed to parse saved form data", e)
      }
    }
  }, [setValue])

  const validateCurrentStep = async () => {
    const stepFields: Record<number, (keyof FormData)[]> = {
      0: ["country", "city"],
      1: ["budget", "days"],
      2: ["interests"],
      3: ["touring"]
    }
    
    const fieldsToValidate = stepFields[currentStep]
    if (fieldsToValidate) {
      const isValid = await trigger(fieldsToValidate)
      return isValid
    }
    return true
  }

  const handleNext = async () => {
    const isValid = await validateCurrentStep()
    if (isValid) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep])
      }
      setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1))
    } else {
      toast.error("Please complete all required fields")
    }
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0))
  }

  const handleFormSubmit = async (data: FormData) => {
    console.log("Form submitted:", data)
    onSubmit(data)
  }

  const handleInterestToggle = (interestId: string, checked: boolean) => {
    const currentInterests = getValues("interests")
    let newInterests: string[]
    
    if (checked) {
      newInterests = [...currentInterests, interestId]
    } else {
      newInterests = currentInterests.filter(id => id !== interestId)
    }
    
    setValue("interests", newInterests, { shouldValidate: true })
  }

  const progressPercentage = ((currentStep + 1) / STEPS.length) * 100

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Country & City Selection Combined
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Left Side - Input */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">🌍 Choose Your Destination</h2>
                <p className="text-muted-foreground">Select your country and city</p>
              </div>
              
              <div className="space-y-6">
                {/* Country Input */}
                <div className="space-y-4">
                  <Label htmlFor="country">Country Name</Label>
                  <Controller
                    name="country"
                    control={control}
                    rules={{ 
                      required: "Please enter a country name",
                      minLength: { value: 2, message: "Country name must be at least 2 characters" }
                    }}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="country"
                        placeholder="e.g., Japan, France, Thailand..."
                        className="text-lg p-4"
                      />
                    )}
                  />
                  {errors.country && (
                    <p className="text-red-500 text-sm">{errors.country.message}</p>
                  )}
                </div>

                {/* City Search */}
                {currentCountry && currentCountry.length > 2 && (
                  <div className="space-y-4">
                    <Label>Select City</Label>
                    <Controller
                      name="city"
                      control={control}
                      rules={{ required: "Please select a city" }}
                      render={({ field }) => (
                        <CitySearch
                          onLocationSelect={(city) => {
                            field.onChange(city)
                          }}
                        />
                      )}
                    />
                    {errors.city && (
                      <p className="text-red-500 text-sm">{errors.city.message}</p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Country Info & Weather */}
            <div className="bg-gray-50 rounded-lg p-6 min-h-[400px]">
              {currentCountry && currentCountry.length > 2 ? (
                <div className="space-y-6">
                  <CountryInfo country={currentCountry} />
                  {currentCity && (
                    <div className="border-t pt-6">
                      <WeatherCharts city={currentCity.name} />
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-500">Enter a country name to see information</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 1: // Budget & Days Selection
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Left Side - Budget & Days Input */}
            <div className="space-y-8">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">💰 Set Your Budget & Duration</h2>
                <p className="text-muted-foreground">How much would you like to spend and for how long?</p>
              </div>
              
              {/* Budget Section */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 mb-2">
                    ${currentBudget?.toLocaleString() || 1000}
                  </div>
                  <p className="text-sm text-muted-foreground">Total Budget (USD)</p>
                </div>

                <Controller
                  name="budget"
                  control={control}
                  rules={{
                    required: "Budget is required",
                    min: { value: 100, message: "Minimum budget is $100" },
                    max: { value: 50000, message: "Maximum budget is $50,000" }
                  }}
                  render={({ field }) => (
                    <div className="space-y-4">
                      <Slider
                        value={[field.value || 1000]}
                        onValueChange={(value) => field.onChange(value[0])}
                        min={100}
                        max={50000}
                        step={100}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>$100</span>
                        <span>$50,000</span>
                      </div>
                    </div>
                  )}
                />
                {errors.budget && (
                  <p className="text-red-500 text-sm">{errors.budget.message}</p>
                )}
              </div>

              {/* Days Section */}
              <div className="space-y-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {currentDays || 7} Days
                  </div>
                  <p className="text-sm text-muted-foreground">Trip Duration</p>
                </div>

                <Controller
                  name="days"
                  control={control}
                  rules={{
                    required: "Trip duration is required",
                    min: { value: 1, message: "Minimum 1 day" },
                    max: { value: 30, message: "Maximum 30 days" }
                  }}
                  render={({ field }) => (
                    <div className="space-y-4">
                      <Slider
                        value={[field.value || 7]}
                        onValueChange={(value) => field.onChange(value[0])}
                        min={1}
                        max={30}
                        step={1}
                        className="w-full"
                      />
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>1 day</span>
                        <span>30 days</span>
                      </div>
                    </div>
                  )}
                />
                {errors.days && (
                  <p className="text-red-500 text-sm">{errors.days.message}</p>
                )}
              </div>
            </div>

            {/* Right Side - Budget Breakdown */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 min-h-[400px]">
              <div className="text-center">
                <CheckCircle className="w-16 h-16 mx-auto text-green-500 mb-6" />
                <h3 className="text-2xl font-bold text-green-700 mb-4">Perfect Planning!</h3>
                <p className="text-green-600 mb-6">
                  ${currentBudget?.toLocaleString()} for {currentDays} days in {currentCity?.name || currentCountry}!
                </p>
                <div className="grid grid-cols-1 gap-4 text-sm">
                  <div className="bg-white rounded-lg p-4 border-l-4 border-green-500">
                    <div className="font-semibold text-gray-700">Daily Budget</div>
                    <div className="text-2xl font-bold text-green-600">
                      ${Math.round((currentBudget || 1000) / (currentDays || 7))}
                    </div>
                    <div className="text-gray-500">per day</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-blue-500">
                    <div className="font-semibold text-gray-700">Weekly Overview</div>
                    <div className="text-xl font-bold text-blue-600">
                      ${Math.round(((currentBudget || 1000) / (currentDays || 7)) * 7)}
                    </div>
                    <div className="text-gray-500">per week</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border-l-4 border-purple-500">
                    <div className="font-semibold text-gray-700">Total Trip</div>
                    <div className="text-xl font-bold text-purple-600">
                      ${currentBudget?.toLocaleString()}
                    </div>
                    <div className="text-gray-500">for {currentDays} days</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      case 2: // Interests Selection
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Left Side - Interests */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">❤️ What Interests You?</h2>
                <p className="text-muted-foreground">Select all that apply</p>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {INTEREST_OPTIONS.map((interest) => (
                  <div 
                    key={interest.id} 
                    className={`flex items-center space-x-4 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                      currentInterests?.includes(interest.id) 
                        ? "border-blue-500 bg-blue-50 shadow-md" 
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      const isSelected = currentInterests?.includes(interest.id) || false
                      handleInterestToggle(interest.id, !isSelected)
                    }}
                  >
                    <Checkbox
                      id={interest.id}
                      checked={currentInterests?.includes(interest.id) || false}
                      onCheckedChange={(checked) => {
                        handleInterestToggle(interest.id, checked as boolean)
                      }}
                      className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                    />
                    <div className="flex items-center space-x-3 flex-1">
                      <span className="text-2xl">{interest.icon}</span>
                      <label
                        htmlFor={interest.id}
                        className={`text-base font-medium leading-none cursor-pointer ${
                          currentInterests?.includes(interest.id) ? "text-blue-700" : "text-gray-700"
                        }`}
                      >
                        {interest.label}
                      </label>
                    </div>
                    {currentInterests?.includes(interest.id) && (
                      <CheckCircle className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
              
              <Controller
                name="interests"
                control={control}
                rules={{
                  validate: (value) => value.length > 0 || "Please select at least one interest"
                }}
                render={() => null}
              />
              {errors.interests && (
                <p className="text-red-500 text-sm font-medium">{errors.interests.message}</p>
              )}
            </div>

            {/* Right Side - Selected Interests Preview */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6 min-h-[400px]">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Your Travel Profile</h3>
              {currentInterests && currentInterests.length > 0 ? (
                <div className="space-y-4">
                  <p className="text-gray-600 font-medium">Based on your interests, we'll recommend:</p>
                  <div className="space-y-3">
                    {currentInterests.map((interestId) => {
                      const interest = INTEREST_OPTIONS.find(opt => opt.id === interestId)
                      return interest ? (
                        <div key={interestId} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm border border-purple-100">
                          <span className="text-2xl">{interest.icon}</span>
                          <div>
                            <div className="font-semibold text-gray-800">{interest.label}</div>
                            <div className="text-sm text-gray-600">
                              {getInterestDescription(interestId)}
                            </div>
                          </div>
                        </div>
                      ) : null
                    })}
                  </div>
                  <div className="mt-6 p-4 bg-white rounded-lg border border-purple-200">
                    <div className="text-sm font-medium text-purple-700">
                      Selected {currentInterests.length} of {INTEREST_OPTIONS.length} interests
                    </div>
                    <div className="text-xs text-purple-600 mt-1">
                      Perfect! This gives us great insight into your travel preferences.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-center">
                  <div>
                    <Heart className="w-16 h-16 mx-auto text-purple-300 mb-4" />
                    <p className="text-gray-500 font-medium">Select your interests to see recommendations</p>
                    <p className="text-sm text-gray-400 mt-2">Choose what excites you most about traveling</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 3: // Touring Type
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
            {/* Left Side - Touring Options */}
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-2">✈️ How Would You Like to Travel?</h2>
                <p className="text-muted-foreground">Choose your travel style</p>
              </div>
              
              <div className="space-y-4">
                <Controller
                  name="touring"
                  control={control}
                  rules={{ required: "Please select a travel option" }}
                  render={({ field }) => (
                    <div className="space-y-4">
                      <div 
                        className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          field.value === "country" 
                            ? "border-blue-500 bg-blue-50 shadow-md" 
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => field.onChange("country")}
                      >
                        <div className="flex items-center space-x-4">
                          <input
                            type="radio"
                            checked={field.value === "country"}
                            onChange={() => field.onChange("country")}
                            className="text-blue-600 w-5 h-5"
                          />
                          <div>
                            <div className={`font-bold text-lg ${field.value === "country" ? "text-blue-700" : "text-gray-700"}`}>
                              🌍 Country Tour
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Explore multiple cities and regions across {currentCountry}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div 
                        className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                          field.value === "city" 
                            ? "border-blue-500 bg-blue-50 shadow-md" 
                            : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                        }`}
                        onClick={() => field.onChange("city")}
                      >
                        <div className="flex items-center space-x-4">
                          <input
                            type="radio"
                            checked={field.value === "city"}
                            onChange={() => field.onChange("city")}
                            className="text-blue-600 w-5 h-5"
                          />
                          <div>
                            <div className={`font-bold text-lg ${field.value === "city" ? "text-blue-700" : "text-gray-700"}`}>
                              🏙️ City Focus
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              Deep dive into {currentCity?.name || "your selected city"} and nearby attractions
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                />
                {errors.touring && (
                  <p className="text-red-500 text-sm font-medium">{errors.touring.message}</p>
                )}
              </div>
            </div>

            {/* Right Side - Trip Summary */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 min-h-[400px]">
              <h3 className="text-xl font-bold text-gray-800 mb-6">🎯 Your Trip Summary</h3>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="font-semibold text-gray-700 mb-2">📍 Destination</div>
                  <div className="text-gray-800">{currentCity?.name || "Selected City"}, {currentCountry}</div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="font-semibold text-gray-700 mb-2">💰 Budget & Duration</div>
                  <div className="text-gray-800">${currentBudget?.toLocaleString()} for {currentDays} days</div>
                  <div className="text-sm text-gray-600 mt-1">
                    ${Math.round((currentBudget || 1000) / (currentDays || 7))} per day
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <div className="font-semibold text-gray-700 mb-2">❤️ Interests</div>
                  <div className="flex flex-wrap gap-2">
                    {currentInterests?.map((interestId) => {
                      const interest = INTEREST_OPTIONS.find(opt => opt.id === interestId)
                      return interest ? (
                        <span key={interestId} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                          {interest.icon} {interest.label}
                        </span>
                      ) : null
                    })}
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-200">
                  <div className="text-center">
                    <CheckCircle className="w-8 h-8 mx-auto text-green-600 mb-2" />
                    <div className="font-semibold text-gray-800">Ready to Generate!</div>
                    <div className="text-sm text-gray-600 mt-1">
                      All details completed. Let's create your perfect itinerary!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const getInterestDescription = (interestId: string): string => {
    const descriptions: Record<string, string> = {
      culture: "Museums, historical sites, local traditions",
      nature: "National parks, hiking trails, outdoor activities", 
      food: "Local restaurants, food tours, cooking classes",
      shopping: "Markets, malls, local crafts and souvenirs",
      nightlife: "Bars, clubs, evening entertainment",
      relaxation: "Spas, beaches, wellness activities",
      business: "Conferences, networking, business districts",
      family: "Kid-friendly attractions, family activities"
    }
    return descriptions[interestId] || ""
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Progress Header */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Plan Your Perfect Trip</h1>
          <div className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {STEPS.length}
          </div>
        </div>
        
        <Progress value={progressPercentage} className="w-full" />
        
        <div className="flex justify-between text-xs text-muted-foreground">
          {STEPS.map((step, index) => (
            <div key={index} className={`flex flex-col items-center ${index <= currentStep ? 'text-blue-600' : ''}`}>
              <span className="text-lg mb-1">{step.icon}</span>
              <span className="hidden sm:block">{step.title}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form Content */}
      <Card className="min-h-[600px]">
        <CardContent className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>

        {currentStep === STEPS.length - 1 ? (
          <Button
            onClick={handleSubmit(handleFormSubmit)}
            disabled={loading}
            className="flex items-center space-x-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Generating Itinerary...</span>
              </>
            ) : (
              <>
                <span>Generate My Itinerary</span>
                <CheckCircle className="w-4 h-4" />
              </>
            )}
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleNext}
            className="flex items-center space-x-2"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
