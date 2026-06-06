import { type ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";

type Props = { children: ReactNode; delay?: number; className?: string };

export default function Reveal({ children, delay = 0, className = "" }: Props) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </div>
  );
}
