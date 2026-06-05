import { createContext, useContext } from "react";

export type RangeKey = "thisMonth" | "lastMonth" | "last3Months";

export type DateRangeContextType = {
  range: RangeKey;
  setRange: (r: RangeKey) => void;
  month: string;
};

export const DateRangeContext = createContext<DateRangeContextType | undefined>(
  undefined
);

export function useDateRange() {
  const ctx = useContext(DateRangeContext);
  if (!ctx)
    throw new Error("useDateRange must be used within DateRangeProvider");
  return ctx;
}
