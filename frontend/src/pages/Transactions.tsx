import { useEffect, useState } from "react";
import { api } from "../lib/api";
import {
  type Transaction,
  type TransactionsResponse,
  type Pagination as PaginationType,
} from "../lib/types";
import { useToast } from "../context/toast-context";
import TransactionForm from "../components/TransactionForm";
import TransactionList from "../components/TransactionList";
import TransactionFilters, {
  type Filters,
} from "../components/TransactionFilters";
import Pagination from "../components/Pagination";
import EditTransactionModal from "../components/EditTransactionModal";
import Button from "../components/ui/Button";
import { SkeletonCard } from "../components/Skeleton";
import ConfirmDialog from "../components/ui/ConfirmDialog";

const defaultFilters: Filters = {
  search: "",
  type: "",
  category: "",
  paymentMethod: "",
  sortBy: "date",
  order: "desc",
};

export default function Transactions() {
  const toast = useToast();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<PaginationType | null>(null);
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          limit: "8",
          sortBy: filters.sortBy,
          order: filters.order,
        });
        if (filters.search) params.set("search", filters.search);
        if (filters.type) params.set("type", filters.type);
        if (filters.category) params.set("category", filters.category);
        if (filters.paymentMethod)
          params.set("paymentMethod", filters.paymentMethod);

        const data = await api<TransactionsResponse>(
          `/transactions?${params.toString()}`
        );
        if (cancelled) return;
        setTransactions(data.transactions);
        setPagination(data.pagination);
      } catch {
        if (!cancelled) setTransactions([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [filters, page]);

  const refresh = () => setFilters((f) => ({ ...f }));

  const handleAdded = () => {
    toast("Transaction added");
    setPage(1);
    refresh();
  };

  const handleUpdated = () => {
    toast("Transaction updated");
    refresh();
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    const id = deletingId;
    const prev = transactions;
    setTransactions((t) => t.filter((x) => x._id !== id));
    setDeletingId(null);
    try {
      await api(`/transactions/${id}`, { method: "DELETE" });
      toast("Transaction deleted");
    } catch {
      setTransactions(prev);
      toast("Failed to delete", "error");
    }
  };

  const handleExport = () => {
    const token = localStorage.getItem("token");
    const params = new URLSearchParams({
      sortBy: filters.sortBy,
      order: filters.order,
    });
    if (filters.search) params.set("search", filters.search);
    if (filters.type) params.set("type", filters.type);
    if (filters.category) params.set("category", filters.category);
    if (filters.paymentMethod)
      params.set("paymentMethod", filters.paymentMethod);

    fetch(
      `${
        import.meta.env.VITE_API_URL
      }/transactions/export?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.blob())
      .then((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "transactions.csv";
        a.click();
        URL.revokeObjectURL(url);
        toast("CSV exported");
      })
      .catch(() => toast("Export failed", "error"));
  };

  const handleFilterChange = (f: Filters) => {
    setFilters(f);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
            Transactions
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-0.5">
            Add and manage your income and expenses.
          </p>
        </div>
        <Button variant="secondary" onClick={handleExport}>
          ⬇ Export CSV
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <TransactionForm onAdded={handleAdded} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <TransactionFilters filters={filters} onChange={handleFilterChange} />

          {loading ? (
            <div className="space-y-3">
              <SkeletonCard height="h-16" />
              <SkeletonCard height="h-16" />
              <SkeletonCard height="h-16" />
            </div>
          ) : (
            <TransactionList
              transactions={transactions}
              onDelete={(id) => setDeletingId(id)}
              onEdit={setEditing}
            />
          )}

          {pagination && (
            <Pagination pagination={pagination} onPageChange={setPage} />
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
      {deletingId && (
        <ConfirmDialog
          message="This transaction will be permanently deleted."
          onConfirm={confirmDelete}
          onCancel={() => setDeletingId(null)}
        />
      )}
    </div>
  );
}
