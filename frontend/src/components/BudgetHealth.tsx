import { Link } from "react-router-dom";
import Card from "./ui/Card";
import { type BudgetStatus, formatCurrency } from "../lib/types";

const barColor: Record<BudgetStatus["state"], string> = {
  ok: "bg-gradient-to-r from-green-400 to-emerald-500",
  warning: "bg-gradient-to-r from-amber-400 to-orange-500",
  over: "bg-gradient-to-r from-red-400 to-rose-500",
};

const dotColor: Record<BudgetStatus["state"], string> = {
  ok: "bg-income",
  warning: "bg-amber-500",
  over: "bg-expense",
};

export default function BudgetHealth({ data }: { data: BudgetStatus[] }) {
  return (
    <Card className="p-6 h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
          Budget Health
        </h3>
        <Link
          to="/budgets"
          className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline"
        >
          Manage →
        </Link>
      </div>

      {data.length === 0 ? (
        <div className="py-8 text-center">
          <div className="text-3xl mb-2">🎯</div>
          <p className="text-sm text-slate-400 dark:text-slate-500">
            No budgets set yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.slice(0, 5).map((b) => (
            <div key={b._id}>
              <div className="flex items-center justify-between text-sm mb-1.5">
                <span className="flex items-center gap-2 font-medium text-slate-700 dark:text-slate-300">
                  <span
                    className={`h-2 w-2 rounded-full ${dotColor[b.state]}`}
                  />
                  {b.category}
                </span>
                <span className="text-slate-500 dark:text-slate-400 text-xs">
                  {formatCurrency(b.spent)} / {formatCurrency(b.limit)}
                </span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-[width] duration-700 ease-out ${
                    barColor[b.state]
                  }`}
                  style={{ width: `${Math.min(100, b.percentage)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
