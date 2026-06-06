import { type Pagination as PaginationType } from "../lib/types";
import Button from "./ui/Button";

type Props = {
  pagination: PaginationType;
  onPageChange: (page: number) => void;
};

export default function Pagination({ pagination, onPageChange }: Props) {
  const { page, totalPages, total } = pagination;
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between">
      <p className="text-sm text-slate-400 dark:text-slate-500">
        Page {page} of {totalPages} · {total} transactions
      </p>
      <div className="flex gap-2">
        <Button
          variant="secondary"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
        >
          ← Prev
        </Button>
        <Button
          variant="secondary"
          disabled={page >= totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          Next →
        </Button>
      </div>
    </div>
  );
}
