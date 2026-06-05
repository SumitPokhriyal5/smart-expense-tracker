import { Link } from "react-router-dom";
import Card from "./ui/Card";
import { type BudgetStatus, formatCurrency } from "../lib/types";

const barColor: Record<BudgetStatus["state"], string> = {
  ok: "bg-income",
  warning: "bg-amber-500",
  over: "bg-expense",
};

export default function BudgetHealth({ data }: { data: BudgetStatus[] }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
          Budget Health
        </h3>
        <Link
          to="/budgets"
          className="text-sm font-medium text-brand-600 dark:text-brand-400 hover:underline"
        >
          Manage
        </Link>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-slate-400 dark:text-slate-500 py-6 text-center">
          No budgets set yet.
        </p>
      ) : (
        <div className="space-y-4">
          {data.slice(0, 5).map((b) => (
            <div key={b._id}>
              <div className="flex justify-between text-sm mb-1.5">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {b.category}
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {formatCurrency(b.spent)} / {formatCurrency(b.limit)}
                </span>
              </div>
              <div className="h-2 rounded-full bg-slate-100 dark:bg-slate-700 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${
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
