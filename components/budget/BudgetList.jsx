"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "../ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2, Edit3, Wallet, Target } from "lucide-react";
import { useState, useMemo } from "react";
import { toast } from "sonner";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import MonthYearPicker from "./MonthYearPicker";

export default function BudgetList({
  categories,
  budgets = [],
  onEdit,
  onDelete,
  selectedMonth,
  setSelectedMonth,
  selectedYear,
  setSelectedYear,
  years
}) {
  // console.log(categories, budgets, selectedMonth, selectedYear);


  const months = [
    { label: "January", value: "January" },
    { label: "February", value: "February" },
    { label: "March", value: "March" },
    { label: "April", value: "April" },
    { label: "May", value: "May" },
    { label: "June", value: "June" },
    { label: "July", value: "July" },
    { label: "August", value: "August" },
    { label: "September", value: "September" },
    { label: "October", value: "October" },
    { label: "November", value: "November" },
    { label: "December", value: "December" },
  ];

  const filteredBudgets = useMemo(() => {
    return budgets.filter((b) => {
      if (!b.monthDate) return false;

      const d = new Date(b.monthDate);
      const m = d.toLocaleString("default", { month: "long" });
      const y = d.getFullYear();
      const matchMonth = selectedMonth ? m === selectedMonth : true;
      const matchYear = selectedYear ? y === selectedYear : true;

      // console.log(matchMonth, matchYear)
      return matchMonth && matchYear;
    });
  }, [budgets, selectedMonth, selectedYear]);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/budgets/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error);
      toast.success("Budget deleted");
      onDelete();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const getCategoryLabel = (value) => {
    return categories.find((c) => c.value === value)?.label || value;
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <CardTitle className="text-xl flex items-center gap-2 mb-1">
              <Wallet className="h-5 w-5" />
              Budget Entries
            </CardTitle>
            <CardDescription>
              Manage your monthly budget allocations
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
          <div className="space-y-4 overflow-y-auto max-h-[32rem]">
            {filteredBudgets.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No budgets set for {selectedMonth} </p>
                <p className="text-sm">
                  Add your first budget above to get started
                </p>
              </div>
            ) : (
              <>
                {filteredBudgets.map((budget) => (
                  <div
                    key={budget._id}
                    className="flex flex-wrap items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                        <Target className="h-5 w-5" />
                      </div>
                      <div className="font-medium text-gray-900">
                        <p className="font-medium text-gray-900">
                          {getCategoryLabel(budget.category)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {new Date(budget.monthDate).toLocaleString(
                            "default",
                            {
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-auto">
                      <Badge
                        variant="outline"
                        className="text-lg rounded-2xl font-semibold"
                      >
                        ₹{budget.amount.toLocaleString("en-IN")}
                      </Badge>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 cursor-pointer"
                          onClick={() => onEdit(budget)}
                        >
                          <Edit3 className="h-4 w-4 " />
                        </Button>
                        <DeleteConfirmDialog
                          onConfirm={() => handleDelete(budget._id)}
                          description="This will delete the budget permanently."
                          trigger={
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-red-600 hover:text-red-700 cursor-pointer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
