import { CATEGORIES } from "@/constants/categories";

// Total expense
export function calculateTotalExpenses(transactions) {
  return transactions.reduce((sum, tx) => sum + tx.amount, 0);
}

// Group by category and return max
export function findMostSpentCategory(transactions) {
  const grouped = {};

  for (const tx of transactions) {
    if (!tx.category) continue;
    grouped[tx.category] = (grouped[tx.category] || 0) + tx.amount;
  }

  const sorted = Object.entries(grouped).sort((a, b) => b[1] - a[1]);

  if (sorted.length === 0) return { category: "none", amount: 0 };

  return { category: sorted[0][0], amount: sorted[0][1] };
}

// Get category info (label, color)
export function getCategoryInfo(category) {
  return CATEGORIES?.find((c) => c.value === category) || {
    label: "Unknown",
    color: "#ccc",
  };
}
