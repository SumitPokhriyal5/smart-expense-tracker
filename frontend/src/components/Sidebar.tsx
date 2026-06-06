import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: "📊" },
  { to: "/transactions", label: "Transactions", icon: "💳" },
  { to: "/budgets", label: "Budgets", icon: "🎯" },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 px-4 py-6 transition-colors">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white font-bold">
          ₹
        </div>
        <span className="font-bold text-slate-800 dark:text-slate-100">
          ExpenseTracker
        </span>
      </div>

      <nav className="space-y-1">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700"
              }`
            }
          >
            <span>{link.icon}</span>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
