import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export default function Card({
  children,
  className = "",
  hover = false,
}: Props) {
  return (
    <div
      className={`rounded-2xl bg-white dark:bg-slate-800/80 shadow-card border border-slate-100 dark:border-slate-700/60 transition-all duration-200 ${
        hover ? "hover:shadow-lg hover:-translate-y-0.5" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
