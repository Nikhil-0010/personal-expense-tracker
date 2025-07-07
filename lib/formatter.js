import { CATEGORIES } from "@/constants/categories";

export function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
    })
};

export function formatAmount(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
    }).format(Math.abs(amount))
};

export function getMonthLabel(dateString) {
    return new Date(dateString).toLocaleString("default", {
        month: "short",
        year: "numeric",
    });
}

export function formatData(transactions) {
    return transactions.map((tx) => {
        const formattedDate = formatDate(tx.date);
        const formattedAmount = formatAmount(tx.amount);
        const month = getMonthLabel(tx.date);
        return {
            _id: tx._id,
            amount: tx.amount,
            formattedAmount,
            category: tx.category,
            date: tx.date,
            formattedDate,
            description: tx.description,
            month,
        };
    })
}

export const getPieCategory = (transactions, categories) => {
  const result = {};

  transactions.forEach((tx) => {
    if (!tx.category) return;
    result[tx.category] = (result[tx.category] || 0) + tx.amount;
  });

  return Object.entries(result).map(([key, value]) => {
    const cat = categories?.find((c) => c.value === key);
    return {
      name: cat?.label || key,
      value: value,
      color: cat?.color || "#ccc",
    };
  });
};



export function getBudgetData(budgets, transactions, selectedMonth, selectedYear) {
  const result = CATEGORIES.map((category) => {
    // Get budget for this category
    const budgetEntry = budgets.find((b) => {
      const date = new Date(b.monthDate);
      const month = date.toLocaleString("default", { month: "long" });
      const year = date.getFullYear();
      return (
        b.category === category.value &&
        month === selectedMonth &&
        year === Number(selectedYear)
      );
    });

    // Calculate spent from transactions
    const spent = transactions
      .filter((tx) => {
        const txDate = new Date(tx.date);
        const txMonth = txDate.toLocaleString("default", { month: "long" });
        const txYear = txDate.getFullYear();
        return (
          tx.category === category.value &&
          txMonth === selectedMonth &&
          txYear === Number(selectedYear)
        );
      })
      .reduce((sum, tx) => sum + tx.amount, 0);

    return {
      category: category.value.charAt(0).toUpperCase() + category.value.slice(1),
      budgeted: budgetEntry?.amount || 0,
      spent,
    };
  });

  return result;
}
