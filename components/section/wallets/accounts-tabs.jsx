"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import {
  Building2,
  CreditCard,
  Home,
  LineChart,
  Shield,
  ShoppingCart,
  TrendingUp,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Award,
  PieChart,
  DollarSign,
} from "lucide-react"

const accounts = [
  {
    id: "checking",
    name: "Premium Checking",
    balance: "87,549.32",
    icon: Building2,
    bgColor: "bg-indigo-600",
    availableBalance: "85,049.32",
    creditLimit: "10,000.00",
    lastMonth: "82,412.15",
    growth: 3.2,
  },
  {
    id: "savings",
    name: "Savings Account",
    balance: "157,632",
    icon: Building2,
    bgColor: "bg-emerald-600",
    availableBalance: "157,632",
    lastMonth: "152,450",
    growth: 3.4,
  },
  {
    id: "credit",
    name: "Credit Card",
    balance: "8,745",
    icon: CreditCard,
    bgColor: "bg-red-600",
    availableBalance: "1,255",
    creditLimit: "10,000.00",
    lastMonth: "7,890",
    growth: -10.8,
  },
  {
    id: "investment",
    name: "Investment Portfolio",
    balance: "342,915",
    icon: LineChart,
    bgColor: "bg-blue-600",
    availableBalance: "342,915",
    lastMonth: "325,780",
    growth: 5.3,
  },
  {
    id: "emergency",
    name: "Emergency Fund",
    balance: "25,000",
    icon: Shield,
    bgColor: "bg-amber-600",
    availableBalance: "25,000",
    lastMonth: "25,000",
    growth: 0,
  },
]

const transactions = [
  {
    type: "Groceries",
    icon: ShoppingCart,
    iconBg: "bg-emerald-500",
    date: "03.15.2024",
    description: "Whole Foods Market",
    amount: -187.35,
    currency: "USD",
  },
  {
    type: "Utilities",
    icon: Home,
    iconBg: "bg-blue-500",
    date: "03.10.2024",
    description: "Electric Company",
    amount: -142.5,
    currency: "USD",
  },
]

const savingsData = {
  interestRate: 2.5,
  nextInterestDate: "04.01.2024",
  goals: [
    { name: "Vacation", target: 10000, current: 8000 },
    { name: "New Car", target: 30000, current: 15000 },
  ],
  recentActivity: [
    { type: "Deposit", amount: 1500, date: "03.14.2024", icon: ArrowUpRight },
    { type: "Withdrawal", amount: -500, date: "03.10.2024", icon: ArrowDownRight },
  ],
}

const creditData = {
  dueDate: "03.25.2024",
  minimumPayment: 350,
  rewardPoints: 12450,
  utilization: 65,
  recentPurchases: [
    { merchant: "Amazon", amount: 129.99, date: "03.15.2024", category: "Shopping" },
    { merchant: "Netflix", amount: 15.99, date: "03.14.2024", category: "Entertainment" },
  ],
}

const investmentData = {
  performance: {
    daily: 1.2,
    weekly: 2.8,
    monthly: 5.3,
    yearly: 12.5,
  },
  allocation: [
    { type: "Stocks", percentage: 60 },
    { type: "Bonds", percentage: 25 },
    { type: "Cash", percentage: 15 },
  ],
  topHoldings: [
    { name: "AAPL", value: 45000, change: 2.3 },
    { name: "MSFT", value: 38000, change: 1.8 },
  ],
}

const emergencyData = {
  target: 50000,
  monthlyContribution: 1000,
  timeToGoal: "8 months",
  coverage: "6 months",
  suggestions: ["Increase monthly contribution by $200", "Reduce non-essential expenses"],
}

function AccountCard({ account }) {
  return (
    <Card
      className={cn(
        "overflow-hidden transition-all hover:shadow-md",
        account.id === "credit" && "bg-gradient-to-br from-red-500 to-red-700 text-white",
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={cn("p-3 rounded-xl", account.id === "credit" ? "bg-white/20" : account.bgColor)}>
            <account.icon className={cn("h-5 w-5", account.id === "credit" ? "text-white" : "text-white")} />
          </div>
          <div>
            <div className={cn("text-sm font-medium", account.id === "credit" && "text-white/80")}>{account.name}</div>
            <div className={cn("text-lg font-bold", account.id === "credit" && "text-white")}>${account.balance}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SavingsContent({ account, data }) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Interest Details</CardTitle>
            <div className="text-2xl font-bold text-emerald-600">{data.interestRate}%</div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Next interest payment on {data.nextInterestDate}</div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Savings Goals</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.goals.map((goal) => (
            <div key={goal.name} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="font-medium">{goal.name}</div>
                <div className="text-sm text-muted-foreground">
                  ${goal.current} / ${goal.target}
                </div>
              </div>
              <Progress value={(goal.current / goal.target) * 100} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("p-2 rounded-full", activity.amount > 0 ? "bg-emerald-500" : "bg-red-500")}>
                  <activity.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="font-medium">{activity.type}</div>
                  <div className="text-sm text-muted-foreground">{activity.date}</div>
                </div>
              </div>
              <div className={cn("font-medium", activity.amount > 0 ? "text-emerald-600" : "text-red-600")}>
                ${Math.abs(activity.amount)}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function CreditContent({ account, data }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm font-medium">Payment Due</div>
              <div className="text-2xl font-bold">{data.dueDate}</div>
              <div className="text-sm text-muted-foreground">Minimum: ${data.minimumPayment}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Award className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm font-medium">Reward Points</div>
              <div className="text-2xl font-bold">{data.rewardPoints}</div>
              <div className="text-sm text-muted-foreground">Worth: ${(data.rewardPoints * 0.01).toFixed(2)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <PieChart className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm font-medium">Credit Utilization</div>
              <div className="text-2xl font-bold">{data.utilization}%</div>
              <Progress value={data.utilization} className="mt-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Purchases</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.recentPurchases.map((purchase, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="font-medium">{purchase.merchant}</div>
                <div className="text-sm text-muted-foreground">{purchase.date}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">${purchase.amount}</div>
                <div className="text-sm text-muted-foreground">{purchase.category}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

function InvestmentContent({ account, data }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(data.performance).map(([period, value]) => (
          <Card key={period}>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground capitalize">{period}</div>
                <div
                  className={cn(
                    "text-lg font-bold flex items-center gap-1",
                    value > 0 ? "text-emerald-600" : "text-red-600",
                  )}
                >
                  {value > 0 ? <TrendingUp className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                  {value}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Asset Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.allocation.map((asset) => (
                <div key={asset.type} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{asset.type}</div>
                    <div className="text-sm text-muted-foreground">{asset.percentage}%</div>
                  </div>
                  <Progress value={asset.percentage} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Holdings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.topHoldings.map((holding) => (
                <div key={holding.name} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{holding.name}</div>
                    <div className="text-sm text-muted-foreground">${holding.value}</div>
                  </div>
                  <div className={cn("text-sm font-medium", holding.change > 0 ? "text-emerald-600" : "text-red-600")}>
                    {holding.change > 0 ? "+" : ""}
                    {holding.change}%
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function EmergencyContent({ account, data }) {
  const progress = (account.balance / data.target) * 100

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Emergency Fund Progress</CardTitle>
            <div className="text-2xl font-bold">
              ${account.balance} / ${data.target}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-4" />
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <div>Current: {progress.toFixed(1)}%</div>
            <div>Target: {data.coverage} coverage</div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm font-medium">Monthly Contribution</div>
              <div className="text-2xl font-bold">${data.monthlyContribution}</div>
              <div className="text-sm text-muted-foreground">Time to goal: {data.timeToGoal}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <Target className="h-5 w-5 text-muted-foreground" />
              <div className="text-sm font-medium">Suggestions</div>
              <ul className="space-y-1 text-sm text-muted-foreground">
                {data.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export function AccountsTabs() {
  return (
    <Tabs defaultValue="checking" className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Accounts</h2>
        <TabsList>
          {accounts.map((account) => (
            <TabsTrigger key={account.id} value={account.id} className="flex items-center gap-2">
              <div className={cn("p-1 rounded-md", account.bgColor)}>
                <account.icon className="h-3 w-3 text-white" />
              </div>
              <span>{account.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {accounts.map((account) => (
        <TabsContent key={account.id} value={account.id} className="mt-0">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-3 space-y-4">
              <AccountCard account={account} />
              <button className="w-full rounded-lg border border-dashed p-4 text-center hover:border-primary">
                Add new account
              </button>
            </div>

            <div className="col-span-9">
              {account.id === "checking" && (
                <div>
                  <Card>
                    <CardHeader>
                      <CardTitle>{account.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground">Total Balance</div>
                        <div className="text-3xl font-bold">${account.balance}</div>
                        <div className="mt-4 grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm font-medium text-muted-foreground">Available Balance</div>
                            <div className="text-xl font-bold">${account.availableBalance}</div>
                          </div>
                          {account.creditLimit && (
                            <div>
                              <div className="text-sm font-medium text-muted-foreground">Credit Limit</div>
                              <div className="text-xl font-bold">${account.creditLimit}</div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <div className="flex items-baseline justify-between">
                          <div className="text-sm font-medium text-muted-foreground">Available Balance</div>
                          <div className="text-2xl font-bold">${account.availableBalance}</div>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-sm">
                          <span className={account.growth >= 0 ? "text-emerald-600" : "text-red-600"}>
                            {account.growth >= 0 ? "↑" : "↓"} {Math.abs(account.growth)}%
                          </span>
                          <span className="text-muted-foreground">Last month ${account.lastMonth}</span>
                        </div>
                      </div>

                      <div>
                        <div className="mb-4 text-sm font-medium">Transaction History</div>
                        <div className="space-y-4">
                          {transactions.map((transaction) => (
                            <div key={transaction.description} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className={cn("p-2 rounded-full", transaction.iconBg)}>
                                  <transaction.icon className="h-4 w-4 text-white" />
                                </div>
                                <div>
                                  <div className="font-medium">{transaction.type}</div>
                                  <div className="text-sm text-muted-foreground">{transaction.date}</div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{transaction.amount}</div>
                                <div className="text-sm text-muted-foreground">{transaction.description}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {account.id === "savings" && <SavingsContent account={account} data={savingsData} />}

              {account.id === "credit" && <CreditContent account={account} data={creditData} />}

              {account.id === "investment" && <InvestmentContent account={account} data={investmentData} />}

              {account.id === "emergency" && <EmergencyContent account={account} data={emergencyData} />}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  )
}

