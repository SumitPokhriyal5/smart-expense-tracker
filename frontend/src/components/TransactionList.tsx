import Card from "./ui/Card";
import Badge from "./ui/Badge";
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
      <Card className="p-10 text-center">
        <div className="text-4xl mb-3">📭</div>
        <p className="text-slate-500 dark:text-slate-400">
          No transactions match your filters.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {transactions.map((tx) => (
          <div
            key={tx._id}
            className="flex items-center gap-4 px-5 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-700/40 transition"
          >
            <div
              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
                tx.type === "income"
                  ? "bg-green-50 dark:bg-green-900/30"
                  : "bg-red-50 dark:bg-red-900/30"
              }`}
            >
              {tx.type === "income" ? "💰" : "🛒"}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-slate-800 dark:text-slate-100 truncate">
                  {tx.category}
                </p>
                <Badge tone="neutral">{tx.paymentMethod}</Badge>
              </div>
              <p className="text-sm text-slate-400 dark:text-slate-500 truncate">
                {tx.note || "—"} · {formatDate(tx.date)}
                {tx.tags?.length > 0 &&
                  ` · ${tx.tags.map((t) => `#${t}`).join(" ")}`}
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
    </Card>
  );
}
