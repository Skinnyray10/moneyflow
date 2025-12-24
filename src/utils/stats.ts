import { Transaction } from "../models/Transaction";

export function expensesByCategory(
  transactions: Transaction[]
) {
  const map: Record<string, number> = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map[t.category] =
        (map[t.category] || 0) + t.amount;
    });

  return Object.entries(map).map(([category, amount]) => ({
    category,
    amount,
  }));
}
