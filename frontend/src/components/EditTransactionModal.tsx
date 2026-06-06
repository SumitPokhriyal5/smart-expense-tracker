import { useState, type FormEvent } from "react";
import { api } from "../lib/api";
import {
  type Transaction,
  type TxType,
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  PAYMENT_METHODS,
} from "../lib/types";
import Button from "./ui/Button";
import Select from "./ui/Select";

type Props = {
  transaction: Transaction;
  onClose: () => void;
  onUpdated: (tx: Transaction) => void;
};

export default function EditTransactionModal({
  transaction,
  onClose,
  onUpdated,
}: Props) {
  const [type, setType] = useState<TxType>(transaction.type);
  const [amount, setAmount] = useState(String(transaction.amount));
  const [category, setCategory] = useState(transaction.category);
  const [paymentMethod, setPaymentMethod] = useState(
    transaction.paymentMethod || "cash"
  );
  const [note, setNote] = useState(transaction.note);
  const [date, setDate] = useState(transaction.date.split("T")[0]);
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
      const updated = await api<Transaction>(
        `/transactions/${transaction._id}`,
        {
          method: "PUT",
          body: {
            type,
            amount: Number(amount),
            category,
            paymentMethod,
            note,
            date,
          },
        }
      );
      onUpdated(updated);
      onClose();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to update");
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
        className="w-full max-w-md rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-semibold text-slate-800 dark:text-slate-100">
            Edit Transaction
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition"
          >
            ✕
          </button>
        </div>

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
              className={inputClass}
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
              {loading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
