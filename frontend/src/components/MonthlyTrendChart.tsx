import {
  LineChart,
  Line,
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

export default function MonthlyTrendChart({ data }: { data: MonthlyDatum[] }) {
  const { theme } = useTheme();
  const axis = theme === "dark" ? "#94a3b8" : "#94a3b8";
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
        Monthly Trend
      </h3>
      {data.length === 0 ? (
        <div className="h-64 flex items-center justify-center text-slate-400 dark:text-slate-500">
          No data yet
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ left: -10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: axis }}
              stroke={axis}
            />
            <YAxis tick={{ fontSize: 12, fill: axis }} stroke={axis} />
            <Tooltip
              contentStyle={tooltipStyle}
              formatter={(value) =>
                formatCurrency(typeof value === "number" ? value : 0)
              }
            />
            <Legend wrapperStyle={{ fontSize: "13px" }} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="#22c55e"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="#ef4444"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
}
