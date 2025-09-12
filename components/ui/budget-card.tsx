"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PiggyBank } from "lucide-react"

interface BudgetCardProps {
  totalBudget: number
  savingsBuffer: number
  dailyBudget: number
  adjustedFrom: number
  accommodation: number
  food: number
  transportation: number
  activities: number
  total: number
  savings: number
}

export function BudgetCard({
  totalBudget,
  savingsBuffer,
  dailyBudget,
  adjustedFrom,
  accommodation,
  food,
  transportation,
  activities,
  total,
  savings,
}: BudgetCardProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <PiggyBank className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Budget Summary</h2>
      </div>

      <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <PiggyBank className="h-4 w-4 text-green-600 dark:text-green-400" />
          <h3 className="font-medium text-green-600 dark:text-green-400">Savings Buffer</h3>
        </div>
        <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">${savingsBuffer.toFixed(2)}</p>
        <p className="text-sm text-green-600/80 dark:text-green-400/80">10% of your budget set aside for savings</p>
      </div>

      <div>
        <h3 className="font-medium mb-2">Daily Budget (after savings): ${dailyBudget.toFixed(2)}</h3>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Day Budget Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p className="text-amber-600">Adjusted from: ${adjustedFrom.toFixed(2)}</p>
            <div className="grid grid-cols-2 gap-1">
              <p>accommodation:</p>
              <p className="text-right">${accommodation.toFixed(2)}</p>
              <p>food:</p>
              <p className="text-right">${food.toFixed(2)}</p>
              <p>transportation:</p>
              <p className="text-right">${transportation.toFixed(2)}</p>
              <p>activities:</p>
              <p className="text-right">${activities.toFixed(2)}</p>
              <p className="border-t pt-1">total:</p>
              <p className="text-right border-t pt-1">${total.toFixed(2)}</p>
              <p className="text-green-600">savings:</p>
              <p className="text-right text-green-600">${savings.toFixed(2)}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-4 gap-4 pt-4 border-t">
        <div>
          <p className="text-sm text-muted-foreground">Total Budget</p>
          <p className="text-lg font-semibold">${totalBudget.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Savings</p>
          <p className="text-lg font-semibold text-green-600">${savingsBuffer.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Planned Spend</p>
          <p className="text-lg font-semibold">${(totalBudget - savingsBuffer).toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Available</p>
          <p className="text-lg font-semibold text-green-600">
            ${(savingsBuffer - (totalBudget - savingsBuffer)).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  )
}

