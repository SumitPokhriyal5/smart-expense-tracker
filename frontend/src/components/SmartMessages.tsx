import Card from "./ui/Card";
import { type InsightMessage } from "../lib/types";

const styles: Record<InsightMessage["type"], { dot: string; bg: string }> = {
  positive: { dot: "bg-green-500", bg: "bg-green-50 dark:bg-green-900/20" },
  neutral: { dot: "bg-slate-400", bg: "bg-slate-50 dark:bg-slate-700/40" },
  negative: { dot: "bg-red-500", bg: "bg-red-50 dark:bg-red-900/20" },
};

export default function SmartMessages({
  messages,
}: {
  messages: InsightMessage[];
}) {
  if (messages.length === 0) return null;

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-900/40 text-base">
          💡
        </span>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
          Smart Insights
        </h3>
      </div>
      <ul className="space-y-2">
        {messages.map((m, i) => (
          <li
            key={i}
            className={`flex items-start gap-3 rounded-xl px-3 py-2.5 ${
              styles[m.type].bg
            }`}
          >
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                styles[m.type].dot
              }`}
            />
            <span className="text-sm text-slate-700 dark:text-slate-200">
              {m.text}
            </span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
