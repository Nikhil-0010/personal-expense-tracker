"use client";
import SummaryCards from "@/components/dashboard/SummaryCards";
import { getCategoryInfo, calculateTotalExpenses, findMostSpentCategory } from "@/lib/utils/analytics";
import { useEffect, useState } from "react";
import TransactionList from "@/components/transactions/TransactionList";
import { CATEGORIES, CATEGORY_MAP } from "@/constants/categories";
import CategoryPieChart from "@/components/dashboard/CategoryPieChart";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Loader from '@/components/transactions/Loader';

export default function Dashboard() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTransactions = async () => {
        try {
            setLoading(true);
            const res = await fetch('api/transactions');
            const json = await res.json();
            if (json.success) {
                setTransactions(json.data || []);
            } else {
                toast.error(json.error || "Failed to fetch transactions");
            }
        } catch (error) {
            console.error("Fetch Error: ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchTransactions();
    }, [])


    const totalExpenses = calculateTotalExpenses(transactions);
    const mostSpentCategory = findMostSpentCategory(transactions);

    return (
        <>
            <Loader loading={loading} />
            <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto space-y-8">
                    {/* header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Finance Dashboard</h1>
                            <p className="mt-2 text-gray-600">Track and manage your personal finances</p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex flex-row items-start sm:items-center gap-2">
                            <Button variant="outline" className="flex items-center cursor-pointer" onClick={() => window.location.href = "/"}>
                                <ArrowLeft className="mr-1" /> Back
                            </Button>
                            <Button className="flex items-center cursor-pointer" onClick={() => window.location.href = "/transactions"}>
                                Transaction Page <ArrowRight className="ml-1" />
                            </Button>
                            </div>
                    </div>
                    <SummaryCards
                        totalExpenses={totalExpenses}
                        mostSpentCategory={mostSpentCategory}
                        lastTransaction={transactions[0]}
                        getCategoryInfo={getCategoryInfo}
                    />

                    <CategoryPieChart transactions={transactions} categories={CATEGORIES} />

                    <TransactionList categories={CATEGORY_MAP} transactions={transactions.slice(0, 5)} loc="dashboard" />
                </div>
            </div>
        </>
    )
}