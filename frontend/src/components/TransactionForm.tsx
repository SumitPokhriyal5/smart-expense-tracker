import { useState, type FormEvent } from "react";
import { api } from "../lib/api";
import {
  type Transaction,
  type TxType,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  PAYMENT_METHODS,
} from "../lib/types";
import Card from "./ui/Card";
import Button from "./ui/Button";
import Select from "./ui/Select";

export default function TransactionForm({
  onAdded,
}: {
  onAdded: (tx: Transaction) => void;
}) {
  const [type, setType] = useState<TxType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(
    () => new Date().toISOString().split("T")[0]
  );
  const [loading, setLoading] = useState(false);

  const categories =
    type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const switchType = (newType: TxType) => {
    setType(newType);
    setCategory(
      newType === "expense" ? EXPENSE_CATEGORIES[0] : INCOME_CATEGORIES[0]
    );
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setLoading(true);
    try {
      const tx = await api<Transaction>("/transactions", {
        method: "POST",
        body: {
          type,
          amount: Number(amount),
          category,
          paymentMethod,
          note,
          date,
        },
      });
      onAdded(tx);
      setAmount("");
      setNote("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to add transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Add Transaction
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 dark:bg-slate-700 p-1">
          <button
            type="button"
            onClick={() => switchType("expense")}
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
            onClick={() => switchType("income")}
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
            placeholder="0"
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
            Payment Method
          </label>
          <Select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            options={PAYMENT_METHODS}
            className="w-full"
          />
        </div>

        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
            placeholder="e.g. Lunch with friends"
            className={inputClass}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Adding..." : "Add Transaction"}
        </Button>
      </form>
    </Card>
  );
}
