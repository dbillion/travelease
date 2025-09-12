"use client"

import React, { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Loader2, CheckCircle, MapPin, DollarSign, Heart, Users, Building } from "lucide-react"
import { toast } from "sonner"
import CountryInfo from "@/components/country-info"
import { CountryMap } from "@/components/country-map"
import { CitySearch } from "@/components/city-search"
import { WeatherCharts } from "@/components/weather-charts"

interface FormData {
  country: string
  city: {
    name: string
    country: string
    latitude: number
    longitude: number
    timezone: string
    population: number
    country_code: string
  } | null
  budget: number
  touring: "country" | "city" | null
  interests: string[]
}

interface MultiStepFormProps {
  onSubmit: (data: FormData) => void
  loading: boolean
}

const DEFAULT_FORM_DATA: FormData = {
  country: "",
  city: null,
  budget: 1000,
  touring: null,
  interests: [],
}

const MAX_BUDGET = 10000
const MIN_BUDGET = 100
const STEP_AMOUNT = 100

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

export default function MultiStepForm({ onSubmit, loading }: MultiStepFormProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(DEFAULT_FORM_DATA)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const prevFormDataRef = useRef<FormData>(DEFAULT_FORM_DATA)
  
  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("travelFormData")
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
        prevFormDataRef.current = parsedData
        // Set step based on completed steps
        if (parsedData.country && parsedData.city) {
          setStep(3)
        } else if (parsedData.country) {
          setStep(2)
        }
      } catch (e) {
        console.error("Failed to parse saved form data", e)
      }
    }
  }, [])
  
  // Save data to localStorage whenever formData changes
  useEffect(() => {
    // Only save if formData has changed and has meaningful data
    const hasChanged = JSON.stringify(formData) !== JSON.stringify(prevFormDataRef.current)
    const hasMeaningfulData = formData.country || formData.city || formData.budget !== 1000 || formData.interests.length > 0
    
    if (hasChanged && hasMeaningfulData) {
      localStorage.setItem("travelFormData", JSON.stringify(formData))
      prevFormDataRef.current = formData
    }
  })
  
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}
    
    switch (step) {
      case 1: // Country step
        if (!formData.country || formData.country.length < 2) {
          newErrors.country = "Please enter a valid country"
        }
        break
      case 2: // City step
        if (!formData.city) {
          newErrors.city = "Please select a city"
        }
        break
      case 3: // Budget step
        if (formData.budget < MIN_BUDGET) {
          newErrors.budget = `Budget must be at least $${MIN_BUDGET}`
        }
        if (formData.budget > MAX_BUDGET) {
          newErrors.budget = `Budget cannot exceed $${MAX_BUDGET}`
        }
        break
      case 4: // Interests step
        if (formData.interests.length === 0) {
          newErrors.interests = "Please select at least one interest"
        }
        break
      case 5: // Touring step
        if (!formData.touring) {
          newErrors.touring = "Please select an option"
        }
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    } else {
      toast.error("Please fix the errors before proceeding")
    }
  }
  
  const handleBack = () => {
    setStep(step - 1)
  }
  
  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: "",
      }))
    }
  }
  
  const handleInterestChange = (interest: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, interest]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        interests: prev.interests.filter(i => i !== interest)
      }))
    }
    
    // Clear error when user selects an interest
    if (errors.interests) {
      setErrors(prev => ({
        ...prev,
        interests: "",
      }))
    }
  }
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(step)) {
      onSubmit(formData)
    } else {
      toast.error("Please fix the errors before submitting")
    }
  }
  
  const getStepIcon = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return "🌍"
      case 2: return "🏙️"
      case 3: return "💰"
      case 4: return "❤️"
      case 5: return "🗺️"
      case 6: return "🤖"
      default: return ""
    }
  }
  
  const getStepTitle = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return "Country"
      case 2: return "City"
      case 3: return "Budget"
      case 4: return "Interests"
      case 5: return "Touring"
      case 6: return "AI Plan"
      default: return ""
    }
  }
  
  const isStepValid = () => {
    return validateStep(step)
  }
  
  const progress = (step - 1) / 5 * 100
  
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>AI Travel Planner</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5, 6].map((stepNumber) => (
              <div 
                key={stepNumber} 
                className={`flex flex-col items-center ${
                  step === stepNumber ? "text-primary" : step > stepNumber ? "text-green-500" : "text-muted-foreground"
                }`}
              >
                <span className="text-2xl">{getStepIcon(stepNumber)}</span>
                <span className="text-sm mt-1">{getStepTitle(stepNumber)}</span>
              </div>
            ))}
          </div>
          <Progress value={progress} className="w-full" />
        </div>
        
        {/* Split screen layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Form side */}
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit}>
              {/* Step 1: Country */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      placeholder="Enter country"
                      value={formData.country}
                      onChange={(e) => handleInputChange("country", e.target.value)}
                      className={errors.country ? "border-red-500" : ""}
                    />
                    {errors.country && <p className="text-sm text-red-500">{errors.country}</p>}
                    <p className="text-sm text-muted-foreground">Enter the country you want to visit</p>
                  </div>
                </div>
              )}
              
              {/* Step 2: City */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Select City</Label>
                    <CitySearch 
                      onLocationSelect={(location) => handleInputChange("city", location)}
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && <p className="text-sm text-red-500">{errors.city}</p>}
                    <p className="text-sm text-muted-foreground">Search and select the city you want to visit</p>
                  </div>
                  
                  {formData.city && (
                    <div className="p-4 bg-muted rounded-lg">
                      <h3 className="font-semibold flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        Selected City
                      </h3>
                      <p className="mt-1">{formData.city.name}, {formData.city.country}</p>
                      <p className="text-sm text-muted-foreground">
                        Population: {formData.city.population.toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Step 3: Budget */}
              {step === 3 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Budget (USD)</Label>
                    <Slider
                      value={[formData.budget]}
                      onValueChange={(value) => handleInputChange("budget", value[0])}
                      min={MIN_BUDGET}
                      max={MAX_BUDGET}
                      step={STEP_AMOUNT}
                      className="py-4"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>${MIN_BUDGET}</span>
                      <span className="text-lg font-bold text-primary">${formData.budget}</span>
                      <span>${MAX_BUDGET}</span>
                    </div>
                    {errors.budget && <p className="text-sm text-red-500">{errors.budget}</p>}
                    <p className="text-sm text-muted-foreground">Set your travel budget</p>
                  </div>
                </div>
              )}
              
              {/* Step 4: Interests */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>What are your interests?</Label>
                    {errors.interests && <p className="text-sm text-red-500">{errors.interests}</p>}
                    <p className="text-sm text-muted-foreground">Select all that apply</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    {INTEREST_OPTIONS.map((option) => (
                      <div 
                        key={option.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all ${
                          formData.interests.includes(option.id) 
                            ? "border-primary bg-primary/10" 
                            : "border-muted hover:border-primary/50"
                        }`}
                        onClick={() => handleInterestChange(option.id, !formData.interests.includes(option.id))}
                      >
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={formData.interests.includes(option.id)}
                            className="h-5 w-5"
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                          >
                            <span>{option.icon}</span>
                            {option.label}
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Step 5: Touring */}
              {step === 5 && (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>What are you planning to do?</Label>
                    {errors.touring && <p className="text-sm text-red-500">{errors.touring}</p>}
                    <p className="text-sm text-muted-foreground">Select your travel preference</p>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.touring === "country" 
                          ? "border-primary bg-primary/10" 
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() => handleInputChange("touring", "country")}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="country-touring"
                          checked={formData.touring === "country"}
                          className="h-5 w-5"
                        />
                        <label
                          htmlFor="country-touring"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                        >
                          <Users className="h-4 w-4" />
                          Tour the entire country
                        </label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 ml-7">
                        Explore multiple cities and regions within the country
                      </p>
                    </div>
                    
                    <div 
                      className={`border rounded-lg p-4 cursor-pointer transition-all ${
                        formData.touring === "city" 
                          ? "border-primary bg-primary/10" 
                          : "border-muted hover:border-primary/50"
                      }`}
                      onClick={() => handleInputChange("touring", "city")}
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="city-touring"
                          checked={formData.touring === "city"}
                          className="h-5 w-5"
                        />
                        <label
                          htmlFor="city-touring"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                        >
                          <Building className="h-4 w-4" />
                          Focus on the selected city
                        </label>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2 ml-7">
                        Explore the selected city in depth
                      </p>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Step 6: Final Review */}
              {step === 6 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Review Your Travel Plan</h3>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Country:</span>
                        <span className="font-medium">{formData.country}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">City:</span>
                        <span className="font-medium">{formData.city?.name}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="font-medium">${formData.budget}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Travel Style:</span>
                        <span className="font-medium">
                          {formData.touring === "country" ? "Country Tour" : "City Focus"}
                        </span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Interests:</span>
                        <span className="font-medium text-right">
                          {formData.interests.map(id => 
                            INTEREST_OPTIONS.find(opt => opt.id === id)?.label
                          ).join(", ")}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Navigation buttons */}
              <div className="flex justify-between mt-8">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={step === 1}
                >
                  Back
                </Button>
                
                {step < 6 ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!isStepValid()}
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit" 
                    disabled={loading || !isStepValid()}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Plan...
                      </>
                    ) : (
                      "Generate AI Plan"
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
          
          {/* Information side */}
          <div className="lg:w-1/2">
            {/* Country Information Panel */}
            {step === 1 && formData.country && (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Country Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-60px)]">
                  <CountryInfo country={formData.country} />
                </CardContent>
              </Card>
            )}
            
            {/* City Weather Panel */}
            {step === 2 && formData.city && (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {formData.city.name} Weather
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-60px)]">
                  <WeatherCharts 
                    latitude={formData.city.latitude} 
                    longitude={formData.city.longitude} 
                  />
                </CardContent>
              </Card>
            )}
            
            {/* Budget Congratulatory Panel */}
            {step === 3 && (
              <Card className="h-full flex flex-col items-center justify-center text-center p-8">
                <CardContent className="flex flex-col items-center justify-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Great Choice!</h3>
                  <p className="text-muted-foreground mb-4">
                    A budget of ${formData.budget} will allow you to have an amazing trip.
                  </p>
                  <div className="bg-primary/10 rounded-lg p-4 w-full max-w-xs">
                    <p className="text-lg font-semibold">${formData.budget}</p>
                    <p className="text-sm text-muted-foreground">Your travel budget</p>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Interests Visualization Panel */}
            {step === 4 && (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Your Interests
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {formData.interests.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                      {formData.interests.map((interestId) => {
                        const interest = INTEREST_OPTIONS.find(opt => opt.id === interestId)
                        return interest ? (
                          <div 
                            key={interestId} 
                            className="border rounded-lg p-4 flex items-center gap-3"
                          >
                            <span className="text-2xl">{interest.icon}</span>
                            <span>{interest.label}</span>
                          </div>
                        ) : null
                      })}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-muted-foreground">
                      <p>Select your interests to see them here</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
            
            {/* Touring Selection Panel */}
            {step === 5 && (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Travel Style
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-60px)]">
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    {formData.touring === "country" ? (
                      <div className="space-y-4">
                        <Users className="h-16 w-16 text-primary mx-auto" />
                        <h3 className="text-xl font-bold">Country Tour</h3>
                        <p className="text-muted-foreground">
                          You'll explore multiple cities and regions, getting a comprehensive experience of the entire country.
                        </p>
                      </div>
                    ) : formData.touring === "city" ? (
                      <div className="space-y-4">
                        <Building className="h-16 w-16 text-primary mx-auto" />
                        <h3 className="text-xl font-bold">City Focus</h3>
                        <p className="text-muted-foreground">
                          You'll dive deep into your selected city, exploring its neighborhoods, culture, and attractions in detail.
                        </p>
                      </div>
                    ) : (
                      <div className="h-full flex items-center justify-center text-muted-foreground">
                        <p>Select your travel preference to see details</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
            
            {/* Final Review Panel */}
            {step === 6 && (
              <Card className="h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Your AI Travel Plan
                  </CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-60px)] overflow-auto">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Ready for your adventure?</h3>
                      <p className="text-muted-foreground">
                        Click "Generate AI Plan" to create your personalized travel itinerary
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          Destination
                        </h4>
                        <p className="mt-1">{formData.city?.name}, {formData.country}</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          Budget
                        </h4>
                        <p className="mt-1">${formData.budget}</p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          Interests
                        </h4>
                        <p className="mt-1 text-sm">
                          {formData.interests.length} selected
                        </p>
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Users className="h-4 w-4" />
                          Travel Style
                        </h4>
                        <p className="mt-1">
                          {formData.touring === "country" ? "Country Tour" : "City Focus"}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}