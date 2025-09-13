"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { CitySearch } from "@/components/city-search"
import { WeatherCharts } from "@/components/weather-charts"
import { Loader2 } from "lucide-react"

// Dynamically import the map component with no SSR
const CountryMap = dynamic(() => import("@/components/country-map").then((mod) => mod.CountryMap), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-gray-200 animate-pulse rounded-lg" />
})

interface CountryData {
  name: {
    common: string
  }
  capital: string[]
  population: number
  languages: { [key: string]: string }
  flags: { png: string }
  latlng: [number, number]
}

interface WeatherData {
  daily: {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
  }
}

interface GDPData {
  date: string
  value: number
}

interface LeaderData {
  name: string
  position: string
  summary: string
}

export default function CountryInfo({ country }: { country: string }) {
  const [countryData, setCountryData] = useState<CountryData | null>(null)
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [gdpData, setGDPData] = useState<GDPData[]>([])
  const [leaderData, setLeaderData] = useState<LeaderData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<{
    latitude: number
    longitude: number
    name: string
  } | null>(null)

  const fetchCountryData = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${encodeURIComponent(country)}`)
      if (!response.ok) throw new Error("Country not found")
      const data = await response.json()
      setCountryData(data[0])
      fetchWeatherData(data[0].capital[0], data[0].latlng[0], data[0].latlng[1])
      fetchGDPData(data[0].cca3)
      fetchLeaderData(data[0].name.common)
    } catch (err) {
      setError("Failed to fetch country data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const fetchWeatherData = async (capital: string, lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min`,
      )
      if (!response.ok) throw new Error("Failed to fetch weather data")
      const data: WeatherData = await response.json()
      setWeatherData(data)
    } catch (err) {
      console.error("Error fetching weather data:", err)
    }
  }

  const fetchGDPData = async (countryCode: string) => {
    try {
      const response = await fetch(
        `https://api.worldbank.org/v2/country/${countryCode}/indicator/NY.GDP.MKTP.KD.ZG?format=json`,
        { mode: "cors" },
      )
      if (!response.ok) throw new Error("Failed to fetch GDP data")
      const data = await response.json()
      if (data && data[1] && Array.isArray(data[1])) {
        const gdpData = data[1]
          .slice(0, 10)
          .reverse()
          .map((item: any) => ({
            date: item.date,
            value: item.value,
          }))
        setGDPData(gdpData)
      } else {
        throw new Error("Invalid GDP data format")
      }
    } catch (err) {
      console.error("Error fetching GDP data:", err)
      setError("Failed to fetch GDP data. Please try again.")
    }
  }

  const fetchLeaderData = async (countryName: string) => {
    try {
      const response = await fetch(
        `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(countryName)}`,
      )
      if (!response.ok) throw new Error("Failed to fetch leader data")
      const data = await response.json()
      const leaderInfo: LeaderData = {
        name: data.title,
        position: "Leader",
        summary: data.extract,
      }
      setLeaderData(leaderInfo)
    } catch (err) {
      console.error("Error fetching leader data:", err)
    }
  }

  useEffect(() => {
    if (country) {
      fetchCountryData()
    }
  }, [country])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return <div className="text-center text-red-500 p-4">{error}</div>
  }

  return (
    <div className="space-y-8">
      <CitySearch
        onLocationSelect={(location) => {
          setSelectedLocation({
            latitude: location.latitude,
            longitude: location.longitude,
            name: location.name,
          })
        }}
        className="mb-4"
      />

      <Tabs defaultValue={selectedLocation ? "weather" : "country"} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="country">Country Information</TabsTrigger>
          <TabsTrigger value="weather">Weather Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="country">
          {countryData && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>{countryData.name.common}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6">
                    <img
                      src={countryData.flags.png || "/placeholder.svg"}
                      alt={`Flag of ${countryData.name.common}`}
                      className="w-full md:w-1/3 h-auto object-cover rounded-lg"
                    />
                    <div className="flex-1 space-y-4">
                      <p>
                        <strong>Capital:</strong> {countryData.capital[0]}
                      </p>
                      <p>
                        <strong>Population:</strong> {countryData.population.toLocaleString()}
                      </p>
                      <p>
                        <strong>Languages:</strong> {Object.values(countryData.languages).join(", ")}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Map</CardTitle>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <CountryMap center={countryData.latlng} zoom={5} />
                </CardContent>
              </Card>

              {gdpData.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>GDP Growth</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ChartContainer
                      config={{
                        gdp: {
                          label: "GDP Growth",
                          color: "hsl(var(--chart-3))",
                        },
                      }}
                      className="h-[200px]"
                    >
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={gdpData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line type="monotone" dataKey="value" stroke="var(--color-gdp)" />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </CardContent>
                </Card>
              )}

              {leaderData && (
                <Card>
                  <CardHeader>
                    <CardTitle>{leaderData.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>
                      <strong>Position:</strong> {leaderData.position}
                    </p>
                    <p className="mt-2">{leaderData.summary}</p>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="weather">
          {selectedLocation ? (
            <WeatherCharts city={selectedLocation.name} />
          ) : (
            <Card>
              <CardContent className="p-6 text-center text-muted-foreground">
                Please select a city to view detailed weather information.
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
