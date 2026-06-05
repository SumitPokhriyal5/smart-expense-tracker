import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { type Transaction } from "../lib/types";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api<Transaction[]>("/transactions")
      .then(setTransactions)
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAdded = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this transaction?")) return;
    const previous = transactions;
    setTransactions((prev) => prev.filter((t) => t._id !== id));
    try {
      await api(`/transactions/${id}`, { method: "DELETE" });
    } catch {
      setTransactions(previous);
      alert("Failed to delete. Please try again.");
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Transactions</h1>
      <p className="text-slate-500 mb-6">
        Add and manage your income and expenses.
      </p>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TransactionForm onAdded={handleAdded} />
        </div>
        <div className="lg:col-span-2">
          {loading ? (
            <div className="bg-white shadow-card rounded-2xl p-10 text-center text-slate-400">
              Loading...
            </div>
          ) : (
            <TransactionList
              transactions={transactions}
              onDelete={handleDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
}
