import Button from "./Button";

type Props = {
  title?: string;
  message: string;
  confirmlabel?: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  title = "Are you sure?",
  message,
  confirmlabel = "Delete",
  loading = false,
  onConfirm,
  onCancel,
}: Props) {
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm px-4"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-800 p-6 shadow-xl animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 mb-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 dark:bg-red-900/30 text-xl">
            ⚠️
          </span>
          <div>
            <h3 className="font-semibold text-slate-800 dark:text-slate-100">
              {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {message}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            className="flex-1"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            className="flex-1"
            disabled={loading}
          >
            {loading ? "Deleting..." : confirmlabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
