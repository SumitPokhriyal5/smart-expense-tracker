import { useState, type ReactNode } from "react";
import { DateRangeContext, type RangeKey } from "../context/date-range-context";

function shiftMonth(delta: number) {
  const d = new Date();
  d.setMonth(d.getMonth() + delta);
  return d.toISOString().slice(0, 7);
}

export default function DateRangeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [range, setRange] = useState<RangeKey>("thisMonth");

  const month = range === "lastMonth" ? shiftMonth(-1) : shiftMonth(0);

  return (
    <DateRangeContext.Provider value={{ range, setRange, month }}>
      {children}
    </DateRangeContext.Provider>
  );
}
