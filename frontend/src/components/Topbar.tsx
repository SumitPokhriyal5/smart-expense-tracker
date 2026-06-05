import { useAuth } from "../context/auth-context";
import { useNavigate, NavLink } from "react-router-dom";

export default function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">
          Hello, {user?.name?.split(" ")[0] || "there"} 👋
        </h2>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-700 font-semibold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <button
            onClick={handleLogout}
            className="rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
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
                  ? "bg-brand-50 text-brand-700"
                  : "text-slate-500 bg-slate-50"
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
