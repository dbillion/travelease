"use client"

import { useState, useEffect } from "react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface Location {
  name: string
  country: string
  latitude: number
  longitude: number
  timezone: string
  population: number
  country_code: string
  admin1?: string
  admin2?: string
}

interface CitySearchProps {
  onLocationSelect: (location: Location) => void
  className?: string
}

export function CitySearch({ onLocationSelect, className }: CitySearchProps) {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchLocations = async () => {
      if (searchTerm.length < 2) {
        setLocations([])
        return
      }

      setLoading(true)
      try {
        const response = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(searchTerm)}&count=10&language=en&format=json`,
        )
        const data = await response.json()
        setLocations(data.results || [])
      } catch (error) {
        console.error("Error fetching locations:", error)
        setLocations([])
      } finally {
        setLoading(false)
      }
    }

    const debounceTimer = setTimeout(fetchLocations, 300)
    return () => clearTimeout(debounceTimer)
  }, [searchTerm])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value || "Search for a city..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search for a city..." value={searchTerm} onValueChange={setSearchTerm} />
          <CommandList>
            <CommandEmpty>{loading ? "Searching..." : "No location found."}</CommandEmpty>
            <CommandGroup>
              {locations.map((location) => (
                <CommandItem
                  key={`${location.latitude}-${location.longitude}`}
                  value={`${location.name}-${location.country}`}
                  onSelect={() => {
                    setValue(location.name)
                    onLocationSelect(location)
                    setOpen(false)
                  }}
                >
                  <Check className={cn("mr-2 h-4 w-4", value === location.name ? "opacity-100" : "opacity-0")} />
                  {location.name}, {location.country}
                  {location.admin1 && `, ${location.admin1}`}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

