import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import Card from "./ui/Card";
import { type CategoryDatum, formatCurrency } from "../lib/types";
import { useTheme } from "../context/theme-context";

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

export default function CategoryPieChart({ data }: { data: CategoryDatum[] }) {
  const { theme } = useTheme();
  const tooltipStyle = {
    backgroundColor: theme === "dark" ? "#1e293b" : "#fff",
    border: `1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`,
    borderRadius: "0.75rem",
    color: theme === "dark" ? "#f1f5f9" : "#1e293b",
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Expenses by Category
      </h3>
      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400 dark:text-slate-500">
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
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) =>
                formatCurrency(typeof value === "number" ? value : 0)
              }
            />
            <Legend
              wrapperStyle={{
                fontSize: "13px",
                color: theme === "dark" ? "#cbd5e1" : "#475569",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
