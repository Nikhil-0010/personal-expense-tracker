"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Calendar, IndianRupee, FileText, Plus } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function TransactionFrom({
  categories = [],
  initialData = null,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    amount: "",
    date: "",
    description: "",
    category: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setForm({
        amount: initialData.amount,
        date: initialData.date.slice(0, 10),
        description: initialData.description,
        category: initialData.category || "",
      });
    } else {
      setForm({
        amount: "",
        date: "",
        description: "",
        category: "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value) => {
    setForm((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.amount || !form.date || !form.description || !form.category) {
      toast.info("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(
        initialData
          ? `/api/transactions/${initialData._id}`
          : "/api/transactions",
        {
          method: initialData ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number.parseFloat(form.amount),
            date: form.date,
            description: form.description,
            category: form.category,
          }),
        }
      );

      const data = await res.json();
      if (!data.success) {
        toast.error("Something went wrong");
        throw new Error(data.error || "Something went wrong");
      }

      toast.success(
        initialData ? "Transaction updated" : "New transaction added"
      );

      onSubmit();
      setForm({ amount: "", date: "", description: "", category: "" });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-xl gap-2">
            <Plus className="h-5 w-5" />
            {initialData ? "Update Transaction" : "Add New Transaction"}
          </CardTitle>
          <CardDescription>Enter the details of your expense</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-rows-2 gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="amount" className="flex items-center gap-2">
                    <IndianRupee className="h-4 w-4" />
                    Amount
                  </Label>
                  <Input
                    id="amount"
                    name="amount"
                    type="number"
                    step="0.01"
                    min="0"
                    value={form.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="grid  md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="description"
                    className="flex items-center gap-2"
                  >
                    <FileText className="h-4 w-4" />
                    Description
                  </Label>
                  <Input
                    id="description"
                    name="description"
                    type="text"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Enter description"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-2">
                    Category
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
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto cursor-pointer"
              >
                <Plus className="h-4 w-4 mr-2" />
                {initialData
                  ? loading
                    ? "Updating..."
                    : "Update Transaction"
                  : loading
                  ? "Adding"
                  : "Add Transaction"}
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
    </>
  );
}
