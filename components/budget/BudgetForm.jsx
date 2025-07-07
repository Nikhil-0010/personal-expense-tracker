"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Plus, Target, List, IndianRupee } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function BudgetForm({
  categories = [],
  initialData = null,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    category: "",
    month: "",
    amount: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        category: initialData.category || "",
        month: new Date(initialData.monthDate).toISOString().slice(0, 7),
        amount: initialData.amount,
      });
    } else {
      setForm({
        category: "",
        month: "",
        amount: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (val) => {
    setForm((prev) => ({ ...prev, category: val }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { category, month, amount } = form;
    if (!category || !month || !amount) {
      toast.info("Please fill all fields");
      return;
    }

    const monthDate = new Date(month);

    setLoading(true);

    try {
      const res = await fetch(
        initialData ? `/api/budgets/${initialData._id}` : `/api/budgets`,
        {
          method: initialData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            category,
            monthDate,
            amount: Number.parseFloat(amount),
          }),
        }
      );

      const data = await res.json();
      console.log(data);
      if (!data.success) {
        toast.error("Something went wrong");
        throw new Error(data.error || "Something went wrong");
      }

      toast.success(initialData ? "Budget updated" : "Budget added");
      onSubmit();
      setForm({ category: "", month: "", amount: "" });
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2">
          <Target className="h-5 w-5" />
          {initialData ? "Update Budget" : "Set Monthly Budget"}
        </CardTitle>
        <CardDescription>
          Create budget limits for different expense categories
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="flex items-center gap-2">
                <List className="h-4 w-4" /> Category
              </Label>
              <Select
                value={form.category}
                onValueChange={handleCategoryChange}
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Month */}
            <div className="space-y-2">
              <Label htmlFor="month" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" /> Month
              </Label>
              <Input
                id="month"
                name="month"
                type="month"
                value={form.month}
                onChange={handleChange}
                required
              />
            </div>

            {/* Amount */}
            <div className="space-y-2">
              <Label htmlFor="amount" className="flex items-center gap-2">
                <IndianRupee className="h-4 w-4" /> Budget Amount
              </Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                step="0.0"
                min="0"
                value={form.amount}
                onChange={handleChange}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          <div className="md:col-span-3 flex gap-2 mt-2">
            <Button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto cursor-pointer"
            >
              <Plus className="h-4 w-4 mr-2" />
              {initialData
                ? loading
                  ? "Updating..."
                  : "Update Budget"
                : loading
                ? "Adding..."
                : "Add Budget"}
            </Button>
            {initialData && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                className="cursor-pointer"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
