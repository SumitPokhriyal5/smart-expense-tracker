import Card from "./ui/Card";
import { type Summary, formatCurrency } from "../lib/types";

type Props = { summary: Summary };

export default function SummaryCards({ summary }: Props) {
  const cards = [
    {
      label: "Total Income",
      value: summary.totalIncome,
      color: "text-income",
      bg: "bg-green-50 dark:bg-green-900/30",
      icon: "📈",
    },
    {
      label: "Total Expense",
      value: summary.totalExpense,
      color: "text-expense",
      bg: "bg-red-50 dark:bg-red-900/30",
      icon: "📉",
    },
    {
      label: "Balance",
      value: summary.balance,
      color:
        summary.balance >= 0
          ? "text-brand-600 dark:text-brand-400"
          : "text-expense",
      bg: "bg-brand-50 dark:bg-brand-900/30",
      icon: "💼",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <Card key={card.label} className="p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {card.label}
            </span>
            <span
              className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.bg}`}
            >
              {card.icon}
            </span>
          </div>
          <p className={`mt-3 text-2xl font-bold ${card.color}`}>
            {formatCurrency(card.value)}
          </p>
        </Card>
      ))}
    </div>
  );
}
