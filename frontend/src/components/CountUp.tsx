import { useEffect, useState } from "react";
import { useReveal } from "../hooks/useReveal";

type Props = {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
};

export default function CountUp({
  end,
  prefix = "",
  suffix = "",
  duration = 1500,
}: Props) {
  const { ref, visible } = useReveal<HTMLSpanElement>();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!visible) return;
    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(tick);
      else setValue(end);
    };
    requestAnimationFrame(tick);
  }, [visible, end, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}
