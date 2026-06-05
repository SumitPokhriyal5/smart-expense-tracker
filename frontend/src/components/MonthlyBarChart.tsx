import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { type MonthlyDatum, formatCurrency } from "../lib/types";

type Props = { data: MonthlyDatum[] };

export default function MonthlyBarChart({ data }: Props) {
  return (
    <div className="bg-white shadow-card rounded-2xl p-6">
      <h3 className="font-semibold text-slate-800 mb-4">Income vs Expense</h3>
      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400">
          No data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
            <Bar dataKey="income" fill="#22c55e" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
