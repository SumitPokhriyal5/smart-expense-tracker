export type TxType = "income" | "expense";

export type Transaction = {
  _id: string;
  type: TxType;
  amount: number;
  category: string;
  note: string;
  date: string;
};

export const EXPENSE_CATEGORIES = [
  "Food",
  "Rent",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Health",
  "Other",
];

export const INCOME_CATEGORIES = [
  "Salary",
  "Freelance",
  "Business",
  "Gift",
  "Other",
];

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export type Summary = {
  totalIncome: number;
  totalExpense: number;
  balance: number;
};

export type CategoryDatum = {
  category: string;
  total: number;
};

export type MonthlyDatum = {
  month: string;
  income: number;
  expense: number;
};
