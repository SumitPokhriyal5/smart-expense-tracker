import { useState, type FormEvent } from "react";
import { api } from "../lib/api";
import { EXPENSE_CATEGORIES } from "../lib/types";
import Button from "./ui/Button";
import Select from "./ui/Select";

type Props = {
  month: string;
  existingCategories: string[];
  onClose: () => void;
  onSaved: () => void;
};

export default function BudgetModal({
  month,
  existingCategories,
  onClose,
  onSaved,
}: Props) {
  const available = EXPENSE_CATEGORIES.filter(
    (c) => !existingCategories.includes(c)
  );
  const [category, setCategory] = useState(
    available[0] || EXPENSE_CATEGORIES[0]
  );
  const [limit, setLimit] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!limit || Number(limit) <= 0) return;
    setLoading(true);
    try {
      await api("/budgets", {
        method: "POST",
        body: { category, limit: Number(limit), month },
      });
      onSaved();
      onClose();
    } catch {
      alert("Failed to save budget");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">
            Set Budget
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Category
            </label>
            <Select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              options={EXPENSE_CATEGORIES.map((c) => ({ value: c, label: c }))}
              className="w-full"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Monthly Limit (₹)
            </label>
            <input
              type="number"
              value={limit}
              onChange={(e) => setLimit(e.target.value)}
              placeholder="5000"
              min="1"
              required
              className="w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Saving..." : "Save Budget"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
