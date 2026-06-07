import { useEffect, useState, type FormEvent } from "react";
import { api } from "../lib/api";
import {
  type Recurring,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  type TxType,
  formatCurrency,
} from "../lib/types";
import { useToast } from "../context/toast-context";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import Select from "../components/ui/Select";
import Badge from "../components/ui/Badge";
import ConfirmDialog from "../components/ui/ConfirmDialog";
import { SkeletonCard } from "../components/Skeleton";

export default function RecurringPage() {
  const toast = useToast();
  const [items, setItems] = useState<Recurring[]>([]);
  const [loading, setLoading] = useState(true);
  const [refetch, setRefetch] = useState(0);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [type, setType] = useState<TxType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Rent");
  const [note, setNote] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState("1");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      setLoading(true);
      try {
        const data = await api<Recurring[]>("/recurring");
        if (!cancelled) setItems(data);
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    load();
    return () => {
      cancelled = true;
    };
  }, [refetch]);

  const categories =
    type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const inputClass =
    "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900";

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setSaving(true);
    try {
      await api("/recurring", {
        method: "POST",
        body: {
          type,
          amount: Number(amount),
          category,
          note,
          dayOfMonth: Number(dayOfMonth),
        },
      });
      toast("Recurring rule added");
      setAmount("");
      setNote("");
      setRefetch((k) => k + 1);
    } catch {
      toast("Failed to add", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleGenerate = async (id: string) => {
    try {
      await api(`/recurring/${id}/generate`, { method: "POST" });
      toast("Transaction added for this month");
    } catch {
      toast("Failed to generate", "error");
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    const id = deletingId;
    setItems((arr) => arr.filter((x) => x._id !== id));
    setDeletingId(null);
    try {
      await api(`/recurring/${id}`, { method: "DELETE" });
      toast("Recurring rule deleted");
    } catch {
      toast("Failed to delete", "error");
      setRefetch((k) => k + 1);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          Recurring
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-0.5">
          Set up repeating transactions and add them each month with one click.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">
              New Recurring Rule
            </h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 dark:bg-slate-700 p-1">
                <button
                  type="button"
                  onClick={() => {
                    setType("expense");
                    setCategory(EXPENSE_CATEGORIES[0]);
                  }}
                  className={`rounded-lg py-2 text-sm font-medium transition ${
                    type === "expense"
                      ? "bg-white dark:bg-slate-800 text-expense shadow-sm"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setType("income");
                    setCategory(INCOME_CATEGORIES[0]);
                  }}
                  className={`rounded-lg py-2 text-sm font-medium transition ${
                    type === "income"
                      ? "bg-white dark:bg-slate-800 text-income shadow-sm"
                      : "text-slate-500 dark:text-slate-400"
                  }`}
                >
                  Income
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  required
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Category
                </label>
                <Select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  options={categories.map((c) => ({ value: c, label: c }))}
                  className="w-full"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Day of Month (1–28)
                </label>
                <input
                  type="number"
                  value={dayOfMonth}
                  onChange={(e) => setDayOfMonth(e.target.value)}
                  min="1"
                  max="28"
                  className={inputClass}
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Note (optional)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className={inputClass}
                />
              </div>

              <Button type="submit" disabled={saving} className="w-full">
                {saving ? "Adding..." : "Add Rule"}
              </Button>
            </form>
          </Card>
        </div>

        <div className="lg:col-span-2">
          {loading ? (
            <div className="space-y-3">
              <SkeletonCard height="h-20" />
              <SkeletonCard height="h-20" />
            </div>
          ) : items.length === 0 ? (
            <Card className="p-12 text-center">
              <div className="text-4xl mb-3">🔁</div>
              <p className="text-slate-500 dark:text-slate-400">
                No recurring rules yet.
              </p>
            </Card>
          ) : (
            <div className="space-y-3">
              {items.map((r) => (
                <Card key={r._id} hover className="p-4 flex items-center gap-4">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
                      r.type === "income"
                        ? "bg-green-50 dark:bg-green-900/30"
                        : "bg-red-50 dark:bg-red-900/30"
                    }`}
                  >
                    {r.type === "income" ? "💰" : "🛒"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-slate-800 dark:text-slate-100 truncate">
                        {r.category}
                      </p>
                      <Badge tone="brand">Day {r.dayOfMonth}</Badge>
                    </div>
                    <p className="text-sm text-slate-400 dark:text-slate-500 truncate">
                      {r.note || "Monthly"}
                    </p>
                  </div>
                  <span
                    className={`font-semibold ${
                      r.type === "income" ? "text-income" : "text-expense"
                    }`}
                  >
                    {r.type === "income" ? "+" : "−"}
                    {formatCurrency(r.amount)}
                  </span>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="secondary"
                      onClick={() => handleGenerate(r._id)}
                      className="!px-3 !py-1.5 text-xs"
                    >
                      Add this month
                    </Button>
                    <button
                      onClick={() => setDeletingId(r._id)}
                      className="text-slate-300 hover:text-expense transition px-1"
                      title="Delete"
                    >
                      ✕
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {deletingId && (
        <ConfirmDialog
          message="This recurring rule will be permanently deleted."
          onConfirm={confirmDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
