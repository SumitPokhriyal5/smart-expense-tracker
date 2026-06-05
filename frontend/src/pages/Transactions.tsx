import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { type Transaction } from "../lib/types";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import EditTransactionModal from "../components/EditTransactionModal";
import { useToast } from "../context/toast-context";

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const toast = useToast();

  useEffect(() => {
    api<Transaction[]>("/transactions")
      .then(setTransactions)
      .catch(() => setTransactions([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAdded = (tx: Transaction) => {
    setTransactions((prev) => [tx, ...prev]);
    toast("Transaction added successfully", "success");
  };

  const handleUpdated = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t._id === updated._id ? updated : t))
    );
    toast("Transaction updated successfully", "success");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this transaction?")) return;
    const previous = transactions;
    setTransactions((prev) => prev.filter((t) => t._id !== id));
    try {
      await api(`/transactions/${id}`, { method: "DELETE" });
      toast("Transaction deleted successfully", "success");
    } catch {
      setTransactions(previous);
      toast("Failed to delete. Please try again.", "error");
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
              onEdit={setEditing}
            />
          )}
        </div>
      </div>

      {editing && (
        <EditTransactionModal
          transaction={editing}
          onClose={() => setEditing(null)}
          onUpdated={handleUpdated}
        />
      )}
    </div>
  );
}
