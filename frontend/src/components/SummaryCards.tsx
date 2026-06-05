import { type Summary, formatCurrency } from "../lib/types";

type Props = { summary: Summary };

export default function SummaryCards({ summary }: Props) {
  const cards = [
    {
      label: "Total Income",
      value: summary.totalIncome,
      color: "text-income",
      bg: "bg-green-50",
      icon: "📈",
    },
    {
      label: "Total Expense",
      value: summary.totalExpense,
      color: "text-expense",
      bg: "bg-red-50",
      icon: "📉",
    },
    {
      label: "Balance",
      value: summary.balance,
      color: summary.balance >= 0 ? "text-brand-600" : "text-expense",
      bg: "bg-brand-50",
      icon: "💼",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div key={card.label} className="bg-white shadow-card rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-500">
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
        </div>
      ))}
    </div>
  );
}
