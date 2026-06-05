import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export default function Card({ children, className = "" }: Props) {
  return (
    <div
      className={`rounded-2xl bg-white dark:bg-slate-800 shadow-card border border-slate-100 dark:border-slate-700 transition-colors ${className}`}
    >
      {children}
    </div>
  );
}
