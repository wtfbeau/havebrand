"use client";

import { useEffect, useState } from "react";

interface Props {
  label: string;
  value: number;
  color?: "green" | "orange" | "red" | "gold";
}

const colorMap: Record<string, string> = {
  green:  "#3D9A5C",
  orange: "#E8A838",
  red:    "#D94F3D",
  gold:   "#C44B5F",
};

export default function MetricBar({ label, value, color = "green" }: Props) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 120);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-ink-mid text-sm">{label}</span>
        <span className="text-ink text-sm font-medium tabular-nums">{value}%</span>
      </div>
      <div className="h-1.5 bg-cream-border rounded-full overflow-hidden">
        <div
          className="h-full rounded-full"
          style={{
            backgroundColor: colorMap[color],
            width: animate ? `${value}%` : "0%",
            transition: "width 1s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
          }}
        />
      </div>
    </div>
  );
}
