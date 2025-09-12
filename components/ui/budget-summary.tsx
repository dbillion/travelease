"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PiggyBank, DollarSign, Calendar } from "lucide-react"

interface BudgetSummaryProps {
  totalBudget: number
  savingsBuffer: number
  dailyBudget: number
  weeklyBudget: number
  plannedSpend: number
  remaining: number
}

export function BudgetSummary({
  totalBudget,
  savingsBuffer,
  dailyBudget,
  weeklyBudget,
  plannedSpend,
  remaining,
}: BudgetSummaryProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Budget Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Savings Buffer */}
          <div className="mb-6 bg-green-50 dark:bg-green-950 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <PiggyBank className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-600">Savings Buffer</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">${savingsBuffer.toFixed(2)}</p>
            <p className="text-sm text-green-600/80">10% of your budget set aside for savings</p>
          </div>

          {/* Daily Budget */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <h3 className="font-semibold">Daily Budget</h3>
              </div>
              <p className="text-2xl font-bold">${dailyBudget.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Available per day after savings</p>
            </div>
            <div className="space-y-2">
              <h3 className="font-semibold">Weekly Overview</h3>
              <p className="text-2xl font-bold">${weeklyBudget.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground">Weekly spending allocation</p>
            </div>
          </div>

          {/* Budget Overview */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 border-t pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <p className="text-lg font-semibold">${totalBudget.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Planned Spend</p>
              <p className="text-lg font-semibold">${plannedSpend.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Savings</p>
              <p className="text-lg font-semibold text-green-600">${savingsBuffer.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Available</p>
              <p className="text-lg font-semibold text-green-600">${remaining.toFixed(2)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

