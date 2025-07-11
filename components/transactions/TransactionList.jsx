"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit3, IndianRupee, Trash2 } from "lucide-react";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";

export default function TransactionList({
  categories,
  transactions = [],
  onEdit,
  onDelete,
  loc = "",
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl ">Recent Transactions</CardTitle>
        <CardDescription>
          {" "}
          {loc === "dashboard"
            ? "Your latest 5 financial activities"
            : "Your latest financial activities"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 overflow-y-auto max-h-[32rem]">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No transactions yet. Add your first transaction above!
            </p>
          ) : (
            transactions.map((transaction) => (
              <div
                key={transaction._id}
                className="flex flex-wrap items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-red-100 text-red-600`}
                    >
                      <IndianRupee className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-medium text-gray-900 truncate">
                          {transaction.description}
                        </p>
                        <Badge
                          variant="secondary"
                          style={{
                            backgroundColor:
                              `${categories[transaction.category]?.color}20` ||
                              "#ddd",
                            color: categories[transaction.category]?.color,
                          }}
                        >
                          {categories[transaction.category]?.label ||
                            transaction.category}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">
                        {transaction.formattedDate}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-auto">
                  <span className={`font-semibold text-red-600`}>
                    {"-"} {transaction.formattedAmount}
                  </span>
                  <div
                    className={`flex gap-1 ${
                      loc === "dashboard" ? "hidden" : ""
                    }`}
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 cursor-pointer"
                      onClick={() => onEdit(transaction)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <DeleteConfirmDialog
                      onConfirm={() => onDelete(transaction._id)}
                      trigger={
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      }
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}
