import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { type BudgetStatus } from "../lib/types";
import { useDateRange } from "../context/date-range-context";
import { useToast } from "../context/toast-context";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import BudgetCard from "../components/BudgetCard";
import BudgetModal from "../components/BudgetModal";
import DateRangeSelector from "../components/DateRangeSelector";
import { SkeletonCard } from "../components/Skeleton";

export default function Budgets() {
  const { month } = useDateRange();
  const toast = useToast();
  const [budgets, setBudgets] = useState<BudgetStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [refetchKey, setRefetchKey] = useState(0);

  const refresh = () => setRefetchKey((k) => k + 1);
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const data = await api<BudgetStatus[]>(
          `/budgets/status?month=${month}`
        );
        if (!cancelled) setBudgets(data);
      } catch {
        if (!cancelled) setBudgets([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [month, refetchKey]);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this budget?")) return;
    const prev = budgets;
    setBudgets((b) => b.filter((x) => x._id !== id));
    try {
      await api(`/budgets/${id}`, { method: "DELETE" });
      toast("Budget deleted");
    } catch {
      setBudgets(prev);
      toast("Failed to delete", "error");
    }
  };

  const totalBudget = budgets.reduce((sum, b) => sum + b.limit, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const overCount = budgets.filter((b) => b.state === "over").length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Budgets
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5">
            Set limits and track your spending.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <DateRangeSelector />
          <Button onClick={() => setShowModal(true)}>+ Add Budget</Button>
        </div>
      </div>

      {!loading && budgets.length > 0 && (
        <Card className="p-5">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Total Budget
              </p>
              <p className="mt-1 text-lg font-bold text-slate-800 dark:text-slate-100">
                ₹{totalBudget.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Total Spent
              </p>
              <p className="mt-1 text-lg font-bold text-brand-600 dark:text-brand-400">
                ₹{totalSpent.toLocaleString("en-IN")}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400 dark:text-slate-500">
                Over Budget
              </p>
              <p
                className={`mt-1 text-lg font-bold ${
                  overCount > 0 ? "text-expense" : "text-income"
                }`}
              >
                {overCount} {overCount === 1 ? "category" : "categories"}
              </p>
            </div>
          </div>
        </Card>
      )}

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SkeletonCard height="h-40" />
          <SkeletonCard height="h-40" />
          <SkeletonCard height="h-40" />
        </div>
      ) : budgets.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="text-4xl mb-3">🎯</div>
          <h3 className="font-semibold text-slate-700 dark:text-slate-200">
            No budgets yet
          </h3>
          <p className="text-sm text-slate-400 dark:text-slate-500 mt-1 mb-5">
            Set spending limits to stay on top of your finances.
          </p>
          <Button onClick={() => setShowModal(true)}>
            + Create your first budget
          </Button>
        </Card>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {budgets.map((b) => (
            <BudgetCard key={b._id} budget={b} onDelete={handleDelete} />
          ))}
        </div>
      )}

      {showModal && (
        <BudgetModal
          month={month}
          existingCategories={budgets.map((b) => b.category)}
          onClose={() => setShowModal(false)}
          onSaved={refresh}
        />
      )}
    </div>
  );
}
