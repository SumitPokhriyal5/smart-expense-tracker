import { useDateRange } from "../context/date-range-context";
import { type RangeKey } from "../context/date-range-context";

const options: { key: RangeKey; label: string }[] = [
  { key: "thisMonth", label: "This Month" },
  { key: "lastMonth", label: "Last Month" },
  { key: "last3Months", label: "Last 3 Months" },
];

export default function DateRangeSelector() {
  const { range, setRange } = useDateRange();

  return (
    <div className="inline-flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
      {options.map((o) => (
        <button
          key={o.key}
          onClick={() => setRange(o.key)}
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
            range === o.key
              ? "bg-white dark:bg-slate-700 text-brand-700 dark:text-brand-300 shadow-sm"
              : "text-slate-500 dark:text-slate-400"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
