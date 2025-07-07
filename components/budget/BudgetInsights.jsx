"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle, Info, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import MonthYearPicker from "./MonthYearPicker";

export default function BudgetInsights({ data = [], selectedMonth, setSelectedMonth, selectedYear, setSelectedYear, years }) {
  if (!data || data.length === 0) return null;

  const insights = useMemo(() => {
    const result = [];
    let withinBudgetCount = 0;
    let noBudgetCount = 0;

    data.forEach((item) => {
      const diff = item.spent - item.budgeted;

      if (item.budgeted === 0 && item.spent > 0) {
        noBudgetCount++;
        result.push({
          type: "noBudget",
          message: `Spent ₹${item.spent} in ${item.category} with no budget set`,
          icon: Info,
          color: "text-yellow-600",
        });
      } else if (diff > 0) {
        result.push({
          type: "overspent",
          message: `Overspent in ${item.category} by ₹${diff}`,
          icon: AlertCircle,
          color: "text-red-600",
        });
      } else if (diff < 0) {
        result.push({
          type: "under",
          message: `Under budget in ${item.category} by ₹${Math.abs(diff)}`,
          icon: CheckCircle,
          color: "text-green-600",
        });
        withinBudgetCount++;
      } else if (diff === 0 && item.budgeted > 0) {
        withinBudgetCount++;
      }
    });

    if (withinBudgetCount > 0) {
      result.push({
        type: "summary",
        message: `You stayed within budget in ${withinBudgetCount} categories`,
        icon: CheckCircle,
        color: "text-blue-600",
      });
    }

    return result
  }, [data]);

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
        <CardTitle className="flex items-center gap-2 mb-1">
          <TrendingUp className="h-5 w-5" />
          Budget Insights
        </CardTitle>
        <CardDescription>
          Key observations about your spending patterns
        </CardDescription>
        </div>
        <MonthYearPicker
                  selectedMonth={selectedMonth}
                  selectedYear={selectedYear}
                  years={years}
                  setSelectedMonth={setSelectedMonth}
                  setSelectedYear={setSelectedYear}
                />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {insights.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <AlertCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No insights available</p>
              <p className="text-sm">
                Set budgets and track expenses to see insights
              </p>
            </div>
          ) : (
            insights.map((insight, index) => {
              const Icon = insight.icon;
              return (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                >
                  <Icon className={`h-5 w-5 ${insight.color}`} />
                  <p className="text-gray-900">{insight.message}</p>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}
