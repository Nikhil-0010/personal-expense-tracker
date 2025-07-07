"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, LayoutDashboard, PlusCircle, Target } from "lucide-react"
import TransactionsPage from "@/components/transactions/TransactionPage" 
import Dashboard from "@/components/dashboard/Dashboard" 
import BudgetPage from "@/components/budget/BudgetPage"
import Link from "next/link"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Header */}
            <div className="bg-white shadow-sm border-b">
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Link href="/" className="text-xl font-bold text-gray-900">
                    Personal Finance Tracker
                  </Link>
                </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Navigation */}
        <div className="px-4 sm:px-6 lg:px-8 py-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="dashboard" className="flex items-center gap-2 cursor-pointer">
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="tracker" className="flex items-center gap-2 cursor-pointer">
                <PlusCircle className="h-4 w-4" />
                Tracker
              </TabsTrigger>
              <TabsTrigger value="budget" className="flex items-center gap-2 cursor-pointer">
                <Target className="h-4 w-4" />
                Budget
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="mt-0">
              <Dashboard />
            </TabsContent>

            <TabsContent value="tracker" className="mt-0">
              <TransactionsPage />
            </TabsContent>

            <TabsContent value="budget" className="mt-0">
              <BudgetPage />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
