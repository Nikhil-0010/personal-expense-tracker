"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useMemo } from "react";
import MonthYearPicker from "./MonthYearPicker";
import { ChartColumn } from "lucide-react";
import CustomTooltip from "../transactions/CustomTooltip";

export default function BudgetChart({
  data = [],
  selectedMonth,
  selectedYear,
  setSelectedMonth,
  setSelectedYear,
  years,
}) {
  const chartData = useMemo(() => {
    return data.map((entry) => ({
      category: entry.category,
      budgeted: entry.budgeted,
      spent: entry.spent,
    }));
  }, [data]);

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <CardTitle className="text-xl flex items-center gap-2 mb-1">
            <ChartColumn className="h-5 w-5" />
            Budget vs Actual
          </CardTitle>
          <CardDescription>
            Compare your planned budget with actual spending
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
        {chartData.length === 0 ? (
          <p className="text-center text-gray-500 py-8">
            No data available for this month.
          </p>
        ) : (
          <div className="w-full overflow-x-auto">
            <div className="min-w-[400px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={500}>
                <BarChart data={chartData} margin={{ top: 20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    className="text-xs sm:text-sm"
                    dataKey="category"
                    interval={0}
                    angle={-30}
                    dy={10}
                  />
                  <YAxis className="text-xs sm:text-sm" />
                  <Tooltip
                    content={<CustomTooltip />}
                    cursor={{
                      fill: "lightgray",
                      fillOpacity: "0.3",
                      stroke: "gray",
                      strokeOpacity: 0.2,
                    }}
                  />

                  <Legend   />
                  <Bar
                    isAnimationActive={true}
                    animationDuration={500}
                    animationEasing="ease"
                    dataKey="budgeted"
                    fill="#4F46E5"
                    name="Budgeted"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar
                    isAnimationActive={true}
                    animationDuration={600}
                    animationEasing="ease"
                    dataKey="spent"
                    fill="#EF4444"
                    name="Spent"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
