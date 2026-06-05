import { useEffect, useState } from "react";
import { api } from "../lib/api";
import {
  type Summary,
  type CategoryDatum,
  type MonthlyDatum,
  type Insights,
  type BudgetStatus,
} from "../lib/types";
import { useDateRange } from "../context/date-range-context";
import SummaryCards from "../components/SummaryCards";
import InsightCards from "../components/InsightCards";
import SmartMessages from "../components/SmartMessages";
import BudgetHealth from "../components/BudgetHealth";
import CategoryPieChart from "../components/CategoryPieChart";
import MonthlyTrendChart from "../components/MonthlyTrendChart";
import MonthlyBarChart from "../components/MonthlyBarChart";
import DateRangeSelector from "../components/DateRangeSelector";
import { DashboardSkeleton } from "../components/Skeleton";

export default function Dashboard() {
  const { month } = useDateRange();
  const [summary, setSummary] = useState<Summary | null>(null);
  const [categories, setCategories] = useState<CategoryDatum[]>([]);
  const [monthly, setMonthly] = useState<MonthlyDatum[]>([]);
  const [insights, setInsights] = useState<Insights | null>(null);
  const [budgets, setBudgets] = useState<BudgetStatus[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      setLoading(true);
      try {
        const [s, c, m, i, b] = await Promise.all([
          api<Summary>("/analytics/summary"),
          api<CategoryDatum[]>("/analytics/category"),
          api<MonthlyDatum[]>("/analytics/monthly"),
          api<Insights>(`/insights?month=${month}`),
          api<BudgetStatus[]>(`/budgets/status?month=${month}`),
        ]);
        if (cancelled) return;
        setSummary(s);
        setCategories(c);
        setMonthly(m);
        setInsights(i);
        setBudgets(b);
      } catch {
        // ignore
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => {
      cancelled = true;
    };
  }, [month]);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            Your financial overview at a glance.
          </p>
        </div>
        <DateRangeSelector />
      </div>

      {summary && <SummaryCards summary={summary} />}
      {insights && <InsightCards insights={insights} />}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {insights && <SmartMessages messages={insights.messages} />}
        </div>
        <div className="lg:col-span-1">
          <BudgetHealth data={budgets} />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <CategoryPieChart data={categories} />
        <MonthlyTrendChart data={monthly} />
      </div>

      <MonthlyBarChart data={monthly} />
    </div>
  );
}
