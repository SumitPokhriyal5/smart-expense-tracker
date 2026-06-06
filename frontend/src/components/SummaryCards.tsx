import Card from "./ui/Card";
import { type Summary, formatCurrency } from "../lib/types";

export default function SummaryCards({ summary }: { summary: Summary }) {
  const cards = [
    {
      label: "Total Income",
      value: summary.totalIncome,
      icon: "📈",
      gradient: "from-green-500/10 to-emerald-500/5",
      ring: "ring-green-500/20",
      valueColor: "text-income",
    },
    {
      label: "Total Expense",
      value: summary.totalExpense,
      icon: "📉",
      gradient: "from-red-500/10 to-rose-500/5",
      ring: "ring-red-500/20",
      valueColor: "text-expense",
    },
    {
      label: "Balance",
      value: summary.balance,
      icon: "💼",
      gradient: "from-brand-500/10 to-indigo-500/5",
      ring: "ring-brand-500/20",
      valueColor:
        summary.balance >= 0
          ? "text-brand-600 dark:text-brand-400"
          : "text-expense",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <Card
          key={card.label}
          hover
          className={`relative overflow-hidden p-5 ring-1 ${card.ring}`}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${card.gradient} pointer-events-none`}
          />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                {card.label}
              </span>
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/60 dark:bg-slate-700/60 text-lg shadow-sm">
                {card.icon}
              </span>
            </div>
            <p
              className={`mt-3 text-2xl font-bold tracking-tight ${card.valueColor}`}
            >
              {formatCurrency(card.value)}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
}
