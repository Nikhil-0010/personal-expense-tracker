"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

import { useMemo, useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import CustomTooltip from "./CustomeTooltip";


//  group transactions by month
function getLastNMonths(data, n) {
  const monthsSet = new Set();
  const result = [];

  // Keep only last N months from the end
  for (let i = 0; i < data.length  && result.length < n; i++) {
    if (!monthsSet.has(data[i].month)) {
      result.unshift(data[i]); 
      monthsSet.add(data[i].month);
    }
  }
//   console.log(result);
  return result;
}

export default function MonthlyChart({ transactions = [] }) {
  const [range, setRange] = useState("last6");
  const rangeOptions = [
    { last3: "Last 3 months" },
    { last6: "Last 6 Months" },
    { year: "Full Year" } ];

const [data, setData] = useState([]);

useEffect(() => {
    let result = [];
    if (range === "last3") result = getLastNMonths(transactions, 3);
    else if (range === "last6") result = getLastNMonths(transactions, 6);
    else if (range === "year") result = getLastNMonths(transactions, 12);
    setData(result);
}, [range, transactions]);

  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="text-xl">Monthly Transactions</CardTitle>
        <CardDescription>
          Your spending patterns over the months
        </CardDescription>
        <div className="absolute right-8">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="hover:ring-2 hover:ring-gray-200 ">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
                {rangeOptions.map((option) => {
                  const value = Object.keys(option)[0];
                  const label = option[value];
                  return (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  );
                })}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No data to display.</p>
        ) : (
          <ResponsiveContainer width="100%" height={500}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  fill: "lightgray",
                  fillOpacity: "0.3",
                  stroke: "gray",
                  strokeOpacity: 0.2,
                }}
              />
              <Bar
                dataKey="amount"
                fill="#8884d8"
                radius={[4, 4, 0, 0]}
                isAnimationActive={true}
                animationDuration={600}
                animationEasing="ease"
                activeBar={{
                  stroke: "#6366f1",
                  strokeWidth: 1,
                  radius: [12, 12, 0, 0],
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
