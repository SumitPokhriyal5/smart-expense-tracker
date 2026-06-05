import { useEffect, useState } from "react";
import { api } from "../lib/api";
import {
  type Summary,
  type CategoryDatum,
  type MonthlyDatum,
} from "../lib/types";
import SummaryCards from "../components/SummaryCards";
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import { DashboardSkeleton } from "../components/Skeleton";

export default function Dashboard() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [categories, setCategories] = useState<CategoryDatum[]>([]);
  const [monthly, setMonthly] = useState<MonthlyDatum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api<Summary>("/analytics/summary"),
      api<CategoryDatum[]>("/analytics/category"),
      api<MonthlyDatum[]>("/analytics/monthly"),
    ])
      .then(([s, c, m]) => {
        setSummary(s);
        setCategories(c);
        setMonthly(m);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-500">Your financial overview at a glance.</p>
      </div>

      {summary && <SummaryCards summary={summary} />}

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryPieChart data={categories} />
        <MonthlyTrendChart data={monthly} />
      </div>

      <MonthlyBarChart data={monthly} />
    </div>
  );
}
