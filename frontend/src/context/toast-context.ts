import { createContext, useContext } from "react";

export type ToastType = "success" | "error";
export type ToastFn = (message: string, type?: ToastType) => void;

export const ToastContext = createContext<ToastFn | undefined>(undefined);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx;
}
