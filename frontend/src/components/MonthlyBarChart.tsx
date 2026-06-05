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
import Card from "./ui/Card";
import { type MonthlyDatum, formatCurrency } from "../lib/types";
import { useTheme } from "../context/theme-context";

export default function MonthlyBarChart({ data }: { data: MonthlyDatum[] }) {
  const { theme } = useTheme();
  const axis = "#94a3b8";
  const grid = theme === "dark" ? "#334155" : "#f1f5f9";
  const tooltipStyle = {
    backgroundColor: theme === "dark" ? "#1e293b" : "#fff",
    border: `1px solid ${theme === "dark" ? "#334155" : "#e2e8f0"}`,
    borderRadius: "0.75rem",
    color: theme === "dark" ? "#f1f5f9" : "#1e293b",
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">
        Income vs Expense
      </h3>
      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400 dark:text-slate-500">
          No data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: axis }}
              stroke={axis}
            />
            <YAxis tick={{ fontSize: 12, fill: axis }} stroke={axis} />
            <Tooltip
              contentStyle={tooltipStyle}
              cursor={{ fill: theme === "dark" ? "#1e293b80" : "#f1f5f980" }}
              formatter={(value: number) => formatCurrency(value)}
            />
            <Legend wrapperStyle={{ fontSize: "13px" }} />
            <Bar dataKey="income" fill="#22c55e" radius={[6, 6, 0, 0]} />
            <Bar dataKey="expense" fill="#ef4444" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
