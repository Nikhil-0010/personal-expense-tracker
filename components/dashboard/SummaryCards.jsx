import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, ShoppingCart, Clock } from "lucide-react";

export default function SummaryCards({
  totalExpenses,
  mostSpentCategory,
  lastTransaction,
  getCategoryInfo,
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-medium">Total Expenses</CardTitle>
          <TrendingUp className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            ₹{totalExpenses?.toLocaleString("en-IN")}
          </div>
          <p className="text-xs text-muted-foreground">This month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-medium">
            Most Spent Category
          </CardTitle>
          <ShoppingCart className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {mostSpentCategory?.category !== "none"
              ? getCategoryInfo(mostSpentCategory?.category).label
              : "None"}
          </div>
          <p className="text-xs text-muted-foreground">
            {mostSpentCategory?.amount > 0
              ? `₹${mostSpentCategory?.amount.toLocaleString("en-IN")}`
              : "No expenses yet"}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-lg font-medium">
            Recent Transaction
          </CardTitle>
          <Clock className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          {lastTransaction ? (
            <>
              <div className="flex flex-row items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-green-700">
                    ₹{lastTransaction.amount?.toLocaleString("en-IN")}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {lastTransaction.formattedDate} • {lastTransaction.category.charAt(0).toUpperCase() + lastTransaction.category.slice(1)}
                  </p>
                </div>
                <div className="text-lg font-semibold">
                  {lastTransaction.description || "No description"}
                </div>
              </div>
            </>
          ) : (
            <div className="text-sm text-muted-foreground">
              No transactions yet
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
