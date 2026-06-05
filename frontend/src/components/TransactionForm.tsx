import { useState, type FormEvent } from "react";
import { api } from "../lib/api";
import {
  type Transaction,
  type TxType,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../lib/types";

type Props = {
  onAdded: (tx: Transaction) => void;
};

export default function TransactionForm({ onAdded }: Props) {
  const [type, setType] = useState<TxType>("expense");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("Food");
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;
    setLoading(true);
    try {
      const tx = await api<Transaction>("/transactions", {
        method: "POST",
        body: { type, amount: Number(amount), category, note, date },
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
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-card rounded-2xl p-6 space-y-4"
    >
      <h3 className="font-semibold text-slate-800">Add Transaction</h3>

      <div className="grid grid-cols-2 gap-2 rounded-xl bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => switchType("expense")}
          className={`rounded-lg py-2 text-sm font-medium transition ${
            type === "expense"
              ? "bg-white text-expense shadow-sm"
              : "text-slate-500"
          }`}
        >
          Expense
        </button>
        <button
          type="button"
          onClick={() => switchType("income")}
          className={`rounded-lg py-2 text-sm font-medium transition ${
            type === "income"
              ? "bg-white text-income shadow-sm"
              : "text-slate-500"
          }`}
        >
          Income
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Amount
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0"
          min="1"
          required
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700">
          Note (optional)
        </label>
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. Lunch with friends"
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-xl bg-brand-600 py-2.5 font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
      >
        {loading ? "Adding..." : "Add Transaction"}
      </button>
    </form>
  );
}
