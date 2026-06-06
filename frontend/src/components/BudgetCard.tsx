import Card from "./ui/Card";
import Badge from "./ui/Badge";
import { type BudgetStatus, formatCurrency } from "../lib/types";

const config: Record<
  BudgetStatus["state"],
  { bar: string; tone: "success" | "warning" | "danger"; label: string }
> = {
  ok: {
    bar: "bg-gradient-to-r from-green-400 to-emerald-500",
    tone: "success",
    label: "On track",
  },
  warning: {
    bar: "bg-gradient-to-r from-amber-400 to-orange-500",
    tone: "warning",
    label: "Almost there",
  },
  over: {
    bar: "bg-gradient-to-r from-red-400 to-rose-500",
    tone: "danger",
    label: "Over budget",
  },
};

type Props = {
  budget: BudgetStatus;
  onDelete: (id: string) => void;
};

export default function BudgetCard({ budget, onDelete }: Props) {
  const c = config[budget.state];

  return (
    <Card hover className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-slate-800 dark:text-slate-100">
            {budget.category}
          </h4>
          <Badge tone={c.tone}>{c.label}</Badge>
        </div>
        <button
          onClick={() => onDelete(budget._id)}
          className="text-slate-300 hover:text-expense transition"
          title="Delete budget"
        >
          ✕
        </button>
      </div>

      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-lg font-bold text-slate-800 dark:text-slate-100">
          {formatCurrency(budget.spent)}
        </span>
        <span className="text-sm text-slate-400 dark:text-slate-500">
          of {formatCurrency(budget.limit)}
        </span>
      </div>

      <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
        <div
          className={`h-full rounded-full transition-[width] duration-700 ease-out ${c.bar}`}
          style={{ width: `${Math.min(100, budget.percentage)}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-xs">
        <span className="text-slate-400 dark:text-slate-500">
          {budget.percentage}% used
        </span>
        <span
          className={
            budget.remaining < 0
              ? "text-expense font-medium"
              : "text-slate-400 dark:text-slate-500"
          }
        >
          {budget.remaining < 0
            ? `${formatCurrency(Math.abs(budget.remaining))} over`
            : `${formatCurrency(budget.remaining)} left`}
        </span>
      </div>
    </Card>
  );
}
