"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getPieCategory } from "@/lib/formatter";


export default function CategoryPieChart({ transactions = [], categories }) {
  const data = getPieCategory(transactions, categories);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Category Breakdown</CardTitle>
      </CardHeader>
      <CardContent>
        {data.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No data to display.</p>
        ) : (
          <div className="w-full overflow-x-auto">
            <div className="min-w-[350px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height={350} >
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name }) => name}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      `₹${value.toLocaleString("en-IN", {
                        maximumFractionDigits: 2,
                      })}`
                    }
                  />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
