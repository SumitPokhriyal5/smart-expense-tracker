import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../context/auth-context";
import { useToast } from "../context/toast-context";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";
import ConfirmDialog from "../components/ui/ConfirmDialog";

export default function Settings() {
  const { user, login, token, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const [name, setName] = useState(user?.name || "");
  const [saving, setSaving] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 px-4 py-2.5 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 dark:focus:ring-brand-900";

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    setSaving(true);
    try {
      const updated = await api<{ _id: string; name: string; email: string }>(
        "/auth/profile",
        {
          method: "PUT",
          body: { name: name.trim() },
        }
      );
      if (token) login(updated, token);
      toast("Profile updated");
    } catch {
      toast("Failed to update", "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api("/auth/account", { method: "DELETE" });
      logout();
      navigate("/");
    } catch {
      toast("Failed to delete account", "error");
      setDeleting(false);
      setConfirmDeleteOpen(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-0.5">
          Manage your profile and account.
        </p>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">
          Profile
        </h3>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className={inputClass}
            />
          </div>
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className={`${inputClass} opacity-60 cursor-not-allowed`}
            />
            <p className="text-xs text-slate-400 dark:text-slate-500">
              Email cannot be changed.
            </p>
          </div>
          <Button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>

      <Card className="p-6 border-red-200 dark:border-red-900/50">
        <h3 className="font-semibold text-expense mb-1">Danger Zone</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Permanently delete your account and all associated data. This cannot
          be undone.
        </p>
        <Button variant="danger" onClick={() => setConfirmDeleteOpen(true)}>
          Delete Account
        </Button>
      </Card>

      {confirmDeleteOpen && (
        <ConfirmDialog
          title="Delete your account?"
          message="All your transactions, budgets, and recurring rules will be permanently deleted. This action cannot be undone."
          confirmlabel="Delete Account"
          loading={deleting}
          onConfirm={handleDelete}
          onCancel={() => setConfirmDeleteOpen(false)}
        />
      )}
    </div>
  );
}
