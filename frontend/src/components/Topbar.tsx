import { useAuth } from "../context/auth-context";
import { useNavigate, NavLink } from "react-router-dom";
import { useTheme } from "../context/theme-context";

export default function Topbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-6 py-4 transition-colors">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          Hello, {user?.name?.split(" ")[0] || "there"} 👋
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
            title="Toggle theme"
          >
            {theme === "light" ? "🌙" : "☀️"}
          </button>

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 dark:bg-brand-900/50 text-brand-700 dark:text-brand-300 font-semibold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 dark:border-slate-600 px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition"
          >
            Logout
          </button>
        </div>
      </div>

      <nav className="mt-3 flex gap-2 md:hidden">
        {[
          { to: "/dashboard", label: "Dashboard" },
          { to: "/transactions", label: "Transactions" },
        ].map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `rounded-lg px-3 py-1.5 text-sm font-medium ${
                isActive
                  ? "bg-brand-50 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300"
                  : "text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
