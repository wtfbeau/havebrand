"use client";

import { useEffect, useState } from "react";

interface Props {
  score: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
}

export default function ScoreRing({ score, size = 120, strokeWidth = 9, label = "/100" }: Props) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 80);
    return () => clearTimeout(t);
  }, []);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - score / 100);
  const scoreColor =
    score >= 80 ? "#3D9A5C" : score >= 60 ? "#E8A838" : "#D94F3D";

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-label={`Clarity score: ${score} out of 100`}
      >
        {/* Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E5DDD0"
          strokeWidth={strokeWidth}
          opacity="0.5"
        />
        {/* Progress */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={scoreColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? offset : circumference}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{
            transition: "stroke-dashoffset 1.3s cubic-bezier(0.22, 1, 0.36, 1) 0.1s",
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span
          className="text-ink font-semibold leading-none"
          style={{
            fontFamily: "var(--font-playfair)",
            fontSize: size * 0.22,
            color: scoreColor,
          }}
        >
          {score}
        </span>
        <span className="text-ink-light leading-none mt-0.5" style={{ fontSize: size * 0.1 }}>
          {label}
        </span>
      </div>
    </div>
  );
}
