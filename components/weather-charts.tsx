"use client"

import { useEffect, useState } from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fetchWeatherApi } from "openmeteo"
import { Loader2 } from "lucide-react"

interface WeatherChartsProps {
  latitude: number
  longitude: number
}

interface WeatherData {
  hourly: {
    time: Date[]
    temperature2m: Float32Array
    relativeHumidity2m: Float32Array
    precipitation: Float32Array
    windSpeed10m: Float32Array
  }
  daily: {
    time: Date[]
    temperatureMax: Float32Array
    temperatureMin: Float32Array
    precipitation: Float32Array
  }
}

export function WeatherCharts({ latitude, longitude }: WeatherChartsProps) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const startDate = new Date()
        const endDate = new Date()
        endDate.setDate(endDate.getDate() + 7)

        const params = {
          latitude,
          longitude,
          hourly: ["temperature_2m", "relative_humidity_2m", "precipitation", "wind_speed_10m"],
          daily: ["temperature_2m_max", "temperature_2m_min", "precipitation_sum"],
          timezone: "auto",
          start_date: startDate.toISOString().split("T")[0],
          end_date: endDate.toISOString().split("T")[0],
        }

        const responses = await fetchWeatherApi("https://api.open-meteo.com/v1/forecast", params)
        const response = responses[0]

        const utcOffsetSeconds = response.utcOffsetSeconds()
        const hourly = response.hourly()!
        const daily = response.daily()!

        const range = (start: number, stop: number, step: number) =>
          Array.from({ length: (stop - start) / step }, (_, i) => start + i * step)

        const data = {
          hourly: {
            time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000),
            ),
            temperature2m: hourly.variables(0)!.valuesArray()!,
            relativeHumidity2m: hourly.variables(1)!.valuesArray()!,
            precipitation: hourly.variables(2)!.valuesArray()!,
            windSpeed10m: hourly.variables(3)!.valuesArray()!,
          },
          daily: {
            time: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
              (t) => new Date((t + utcOffsetSeconds) * 1000),
            ),
            temperatureMax: daily.variables(0)!.valuesArray()!,
            temperatureMin: daily.variables(1)!.valuesArray()!,
            precipitation: daily.variables(2)!.valuesArray()!,
          },
        }

        setWeatherData(data)
      } catch (error) {
        console.error("Error fetching weather data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [latitude, longitude])

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!weatherData) {
    return <div>Failed to load weather data</div>
  }

  const hourlyData = weatherData.hourly.time.map((time, index) => ({
    time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    temperature: weatherData.hourly.temperature2m[index],
    humidity: weatherData.hourly.relativeHumidity2m[index],
    precipitation: weatherData.hourly.precipitation[index],
    windSpeed: weatherData.hourly.windSpeed10m[index],
  }))

  const dailyData = weatherData.daily.time.map((time, index) => ({
    date: time.toLocaleDateString(),
    max: weatherData.daily.temperatureMax[index],
    min: weatherData.daily.temperatureMin[index],
    precipitation: weatherData.daily.precipitation[index],
  }))

  return (
    <Tabs defaultValue="hourly" className="w-full space-y-4">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="hourly">Hourly Forecast</TabsTrigger>
        <TabsTrigger value="daily">7-Day Forecast</TabsTrigger>
      </TabsList>

      <TabsContent value="hourly" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Temperature & Humidity</CardTitle>
            <CardDescription>24-hour temperature and humidity forecast</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData.slice(0, 24)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="temperature" stroke="#8884d8" name="Temperature (°C)" />
                <Line yAxisId="right" type="monotone" dataKey="humidity" stroke="#82ca9d" name="Humidity (%)" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Precipitation & Wind Speed</CardTitle>
            <CardDescription>24-hour precipitation and wind speed forecast</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData.slice(0, 24)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="precipitation"
                  fill="#8884d8"
                  stroke="#8884d8"
                  name="Precipitation (mm)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="windSpeed"
                  fill="#82ca9d"
                  stroke="#82ca9d"
                  name="Wind Speed (km/h)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="daily" className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Temperature Range</CardTitle>
            <CardDescription>7-day temperature forecast</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="max" fill="#8884d8" name="Max Temperature (°C)" />
                <Bar dataKey="min" fill="#82ca9d" name="Min Temperature (°C)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Precipitation</CardTitle>
            <CardDescription>7-day precipitation forecast</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="precipitation" fill="#8884d8" name="Precipitation (mm)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

