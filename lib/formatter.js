//reusable function

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
            date: tx.date,
            formattedDate,
            description: tx.description,
            month,
        };
    })
}