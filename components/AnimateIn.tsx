"use client";

import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right" | "scale";

const hidden: Record<Direction, CSSProperties> = {
  up:    { opacity: 0, transform: "translateY(28px)" },
  left:  { opacity: 0, transform: "translateX(-28px)" },
  right: { opacity: 0, transform: "translateX(28px)" },
  scale: { opacity: 0, transform: "scale(0.93)" },
};

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  from?: Direction;
  threshold?: number;
}

export default function AnimateIn({
  children,
  className = "",
  delay = 0,
  from = "up",
  threshold = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const style: CSSProperties = visible
    ? {
        opacity: 1,
        transform: "none",
        transition: `opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }
    : hidden[from];

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
