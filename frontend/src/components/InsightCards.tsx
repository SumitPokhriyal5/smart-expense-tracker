import Card from "./ui/Card";
import { type Insights, formatCurrency } from "../lib/types";

type Props = { insights: Insights };

export default function InsightCards({ insights }: Props) {
  const stats = [
    {
      label: "Savings Rate",
      value: `${insights.savingsRate}%`,
      hint: insights.savingsRate >= 20 ? "Healthy" : "Could improve",
      color:
        insights.savingsRate >= 20
          ? "text-income"
          : insights.savingsRate > 0
          ? "text-amber-500"
          : "text-expense",
    },
    {
      label: "vs Last Month",
      value:
        insights.expenseChange === null
          ? "—"
          : `${insights.expenseChange > 0 ? "+" : ""}${
              insights.expenseChange
            }%`,
      hint: "Spending change",
      color:
        insights.expenseChange === null
          ? "text-slate-400"
          : insights.expenseChange > 0
          ? "text-expense"
          : "text-income",
    },
    {
      label: "Top Category",
      value: insights.topCategory?.category || "—",
      hint: insights.topCategory
        ? formatCurrency(insights.topCategory.amount)
        : "No expenses",
      color: "text-brand-600 dark:text-brand-400",
    },
    {
      label: "Projected Spend",
      value: formatCurrency(insights.projectedExpense),
      hint: "End of month estimate",
      color: "text-slate-700 dark:text-slate-200",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="p-5">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {s.label}
          </p>
          <p className={`mt-2 text-xl font-bold ${s.color}`}>{s.value}</p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            {s.hint}
          </p>
        </Card>
      ))}
    </div>
  );
}
