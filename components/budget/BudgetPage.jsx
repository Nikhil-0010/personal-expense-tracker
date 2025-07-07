"use client"
import { useEffect, useMemo, useState } from "react";
import { CATEGORIES } from "@/constants/categories";
import BudgetForm from "@/components/budget/BudgetForm";
import BudgetList from "@/components/budget/BudgetList";
import BudgetChart from "@/components/budget/BudgetChart";
import BudgetInsights from "@/components/budget/BudgetInsights";

import { getBudgetData } from "@/lib/formatter";
import { toast } from "sonner";
import Loader from "@/components/Loader";

export default function BudgetPage() {
    const [budgets, setBudgets] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [selectedBudget, setSelectedBudget] = useState(null);

    const [selectedMonth, setSelectedMonth] = useState(new Date().toLocaleString("default", { month: "long" }));
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            setLoading(true);
            const [budgetRes, transactionRes] = await Promise.all([
                fetch("/api/budgets"),
                fetch("/api/transactions"),
            ]);

            const budgetData = await budgetRes.json();
            const transactionData = await transactionRes.json();

            setBudgets(budgetData.data || []);
            setTransactions(transactionData.data || []);
        } catch (err) {
            toast.error(err);
            console.error("Error fetching data:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const chartData = useMemo(() => {
        return getBudgetData(budgets, transactions, selectedMonth, selectedYear);
    }, [budgets, transactions, selectedMonth, selectedYear]);

      const years = useMemo(() => {
    const allYears = budgets.map((b) => new Date(b.monthDate).getFullYear());
    return [...new Set(allYears)].sort();
  }, [budgets]);

    return (
        <>
        <Loader loading={loading} />
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* header */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Budget Management</h2>
                        <p className="mt-2 text-gray-600">Set and track your monthly spending budgets</p>
                    </div>

                    {/* Budget Form */}
                    <BudgetForm
                        categories={CATEGORIES}
                        initialData={selectedBudget}
                        onSubmit={fetchData}
                        onCancel={() => setSelectedBudget(null)}
                    />

                    {/* Budget List */}
                    <BudgetList
                        categories={CATEGORIES}
                        budgets={budgets}
                        onEdit={(b) => setSelectedBudget(b)}
                        onDelete={fetchData}
                        selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        years={years}
                    />

                    {/* Budget vs Actual Chart */}
                    <BudgetChart data={chartData} selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        years={years} />

                    {/* Insights */}
                    <BudgetInsights data={chartData} selectedMonth={selectedMonth}
                        setSelectedMonth={setSelectedMonth}
                        selectedYear={selectedYear}
                        setSelectedYear={setSelectedYear}
                        years={years}/>
                </div>
        </>
    )
}