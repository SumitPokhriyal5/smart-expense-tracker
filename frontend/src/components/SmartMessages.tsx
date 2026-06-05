import Card from "./ui/Card";
import { type InsightMessage } from "../lib/types";

const styles: Record<InsightMessage["type"], { dot: string; text: string }> = {
  positive: { dot: "bg-green-500", text: "text-slate-700 dark:text-slate-200" },
  neutral: { dot: "bg-slate-400", text: "text-slate-700 dark:text-slate-200" },
  negative: { dot: "bg-red-500", text: "text-slate-700 dark:text-slate-200" },
};

export default function SmartMessages({
  messages,
}: {
  messages: InsightMessage[];
}) {
  if (messages.length === 0) return null;

  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">💡</span>
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
          Smart Insights
        </h3>
      </div>
      <ul className="space-y-2.5">
        {messages.map((m, i) => (
          <li key={i} className="flex items-start gap-3">
            <span
              className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${
                styles[m.type].dot
              }`}
            />
            <span className={`text-sm ${styles[m.type].text}`}>{m.text}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
