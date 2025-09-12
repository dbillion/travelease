"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin } from "lucide-react"

interface HotelCardProps {
  name: string
  location: string
  pricePerNight: number
}

export function HotelCard({ name, location, pricePerNight }: HotelCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-muted-foreground mb-2">
          <MapPin className="h-4 w-4" />
          <p className="text-sm">{location}</p>
        </div>
        <p className="text-right font-medium">
          ${pricePerNight.toFixed(2)} <span className="text-muted-foreground text-sm">per night</span>
        </p>
      </CardContent>
    </Card>
  )
}

