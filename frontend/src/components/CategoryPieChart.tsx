import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { type CategoryDatum, formatCurrency } from "../lib/types";

const COLORS = [
  "#6366f1",
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#ec4899",
  "#8b5cf6",
  "#64748b",
];

type Props = { data: CategoryDatum[] };

export default function CategoryPieChart({ data }: Props) {
  return (
    <div className="bg-white shadow-card rounded-2xl p-6">
      <h3 className="font-semibold text-slate-800 mb-4">
        Expenses by Category
      </h3>
      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400">
          No expense data
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={55}
              paddingAngle={2}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
