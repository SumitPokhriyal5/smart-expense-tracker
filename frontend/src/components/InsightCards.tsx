import Card from "./ui/Card";
import { type Insights, formatCurrency } from "../lib/types";

export default function InsightCards({ insights }: { insights: Insights }) {
  const expChange = insights.expenseChange;

  const stats = [
    {
      label: "Savings Rate",
      value: `${insights.savingsRate}%`,
      sub:
        insights.savingsRate >= 20
          ? "Healthy"
          : insights.savingsRate > 0
          ? "Could improve"
          : "Overspending",
      arrow: "",
      color:
        insights.savingsRate >= 20
          ? "text-income"
          : insights.savingsRate > 0
          ? "text-amber-500"
          : "text-expense",
    },
    {
      label: "vs Last Month",
      value: expChange === null ? "—" : `${Math.abs(expChange)}%`,
      sub: "Spending change",
      arrow: expChange === null ? "" : expChange > 0 ? "↑" : "↓",
      color:
        expChange === null
          ? "text-slate-400"
          : expChange > 0
          ? "text-expense"
          : "text-income",
    },
    {
      label: "Top Category",
      value: insights.topCategory?.category || "—",
      sub: insights.topCategory
        ? formatCurrency(insights.topCategory.amount)
        : "No expenses",
      arrow: "",
      color: "text-brand-600 dark:text-brand-400",
    },
    {
      label: "Projected Spend",
      value: formatCurrency(insights.projectedExpense),
      sub: "Month-end estimate",
      arrow: "",
      color: "text-slate-700 dark:text-slate-200",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} hover className="p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400 dark:text-slate-500">
            {s.label}
          </p>
          <p
            className={`mt-2 flex items-baseline gap-1 text-xl font-bold ${s.color}`}
          >
            {s.arrow && <span className="text-lg">{s.arrow}</span>}
            <span className="truncate">{s.value}</span>
          </p>
          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            {s.sub}
          </p>
        </Card>
      ))}
    </div>
  );
}
