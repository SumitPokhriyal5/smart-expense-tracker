import { type Transaction, formatCurrency, formatDate } from "../lib/types";

type Props = {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onEdit: (tx: Transaction) => void;
};

export default function TransactionList({
  transactions,
  onDelete,
  onEdit,
}: Props) {
  if (transactions.length === 0) {
    return (
      <div className="bg-white shadow-card rounded-2xl p-10 text-center">
        <div className="text-4xl mb-3">📭</div>
        <p className="text-slate-500">
          No transactions yet. Add your first one!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-card rounded-2xl overflow-hidden">
      <div className="divide-y divide-slate-100">
        {transactions.map((tx) => (
          <div
            key={tx._id}
            className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
                tx.type === "income" ? "bg-green-50" : "bg-red-50"
              }`}
            >
              {tx.type === "income" ? "💰" : "🛒"}
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-medium text-slate-800 truncate">
                {tx.category}
              </p>
              <p className="text-sm text-slate-400 truncate">
                {tx.note || "—"} · {formatDate(tx.date)}
              </p>
            </div>

            <div
              className={`font-semibold ${
                tx.type === "income" ? "text-income" : "text-expense"
              }`}
            >
              {tx.type === "income" ? "+" : "−"}
              {formatCurrency(tx.amount)}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => onEdit(tx)}
                className="text-slate-300 hover:text-brand-600 transition px-1.5"
                title="Edit"
              >
                ✎
              </button>
              <button
                onClick={() => onDelete(tx._id)}
                className="text-slate-300 hover:text-expense transition px-1.5"
                title="Delete"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
