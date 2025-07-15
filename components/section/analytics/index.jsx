"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Analytics } from "./analytics"
import { Expenses } from "./expenses"
import { Income } from "./income"
// import { IncomeVsExpenses } from "./income-vs-expenses"
import { Balance } from "./balance"
import { TransactionHistory } from "./transaction-history"
import { IncomeVsExpenses } from "./income-vs-expenes"

const navigationItems = [
  { name: "Analytics", href: "#", component: Analytics },
  { name: "Expenses", href: "#", component: Expenses },
  { name: "Income", href: "#", component: Income },
  { name: "Income vs Expenses", href: "#", component: IncomeVsExpenses },
  { name: "Balance", href: "#", component: Balance },
  { name: "Transaction History", href: "#", component: TransactionHistory },
]

export default function AnalyticsSection() {
  return (
    <Tabs defaultValue="analytics" className="w-full">
      <TabsList className="w-full justify-start h-auto p-0 bg-transparent">
        {navigationItems.map((item) => (
          <TabsTrigger
            key={item.name}
            value={item.name.toLowerCase().replace(/\s+/g, "-")}
            className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none"
          >
            {item.name}
          </TabsTrigger>
        ))}
      </TabsList>

      {navigationItems.map((item) => (
        <TabsContent key={item.name} value={item.name.toLowerCase().replace(/\s+/g, "-")} className="mt-6">
          <item.component />
        </TabsContent>
      ))}
    </Tabs>
  )
}

