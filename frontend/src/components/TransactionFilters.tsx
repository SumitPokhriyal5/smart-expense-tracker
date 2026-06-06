import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
  PAYMENT_METHODS,
} from "../lib/types";
import Select from "./ui/Select";

export type Filters = {
  search: string;
  type: string;
  category: string;
  paymentMethod: string;
  sortBy: string;
  order: string;
};

type Props = {
  filters: Filters;
  onChange: (f: Filters) => void;
};

export default function TransactionFilters({ filters, onChange }: Props) {
  const set = (key: keyof Filters, value: string) =>
    onChange({ ...filters, [key]: value });

  const allCategories = Array.from(
    new Set([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])
  );

  return (
    <div className="flex flex-wrap items-center gap-2">
      <input
        type="text"
        value={filters.search}
        onChange={(e) => set("search", e.target.value)}
        placeholder="🔍 Search notes, categories, tags..."
        className="flex-1 min-w-[200px] rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 px-4 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900"
      />
      <Select
        value={filters.type}
        onChange={(e) => set("type", e.target.value)}
        options={[
          { value: "", label: "All Types" },
          { value: "income", label: "Income" },
          { value: "expense", label: "Expense" },
        ]}
      />
      <Select
        value={filters.category}
        onChange={(e) => set("category", e.target.value)}
        options={[
          { value: "", label: "All Categories" },
          ...allCategories.map((c) => ({ value: c, label: c })),
        ]}
      />
      <Select
        value={filters.paymentMethod}
        onChange={(e) => set("paymentMethod", e.target.value)}
        options={[{ value: "", label: "All Methods" }, ...PAYMENT_METHODS]}
      />
      <Select
        value={`${filters.sortBy}-${filters.order}`}
        onChange={(e) => {
          const [sortBy, order] = e.target.value.split("-");
          onChange({ ...filters, sortBy, order });
        }}
        options={[
          { value: "date-desc", label: "Newest first" },
          { value: "date-asc", label: "Oldest first" },
          { value: "amount-desc", label: "Highest amount" },
          { value: "amount-asc", label: "Lowest amount" },
        ]}
      />
    </div>
  );
}
