export const CATEGORIES = [
  { value: "food", label: "Food", color: "#FF6B6B" },
  { value: "transport", label: "Transport", color: "#4ECDC4" },
  { value: "shopping", label: "Shopping", color: "#45B7D1" },
  { value: "entertainment", label: "Entertainment", color: "#96CEB4" },
  { value: "bills", label: "Bills", color: "#FFEAA7" },
  { value: "healthcare", label: "Healthcare", color: "#DDA0DD" },
  { value: "education", label: "Education", color: "#98D8C8" },
  { value: "other", label: "Other", color: "#F7DC6F" },
];

export const CATEGORY_MAP = Object.fromEntries(CATEGORIES.map(c => [c.value, c]));