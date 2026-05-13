import Link from "next/link";

interface Props {
  variant?: "light" | "dark";
  size?: "sm" | "md";
}

export default function Logo({ variant = "light", size = "md" }: Props) {
  const markPx = size === "sm" ? 22 : 26;
  const textColor = variant === "dark" ? "text-white" : "text-ink";

  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <svg
        width={markPx}
        height={markPx}
        viewBox="0 0 26 26"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer diamond, rotated square with rounded stroke linejoin */}
        <path
          d="M13 1.5 L24.5 13 L13 24.5 L1.5 13 Z"
          fill="#C44B5F"
          stroke="#C44B5F"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        {/* Inner gradient overlay for depth */}
        <path
          d="M13 4 L22 13 L13 22 L4 13 Z"
          fill="url(#logoGrad)"
          opacity="0.25"
        />
        {/* Clarity checkmark */}
        <path
          d="M9.5 13.5 L12.2 16.5 L16.5 10"
          stroke="white"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <defs>
          <linearGradient id="logoGrad" x1="4" y1="4" x2="22" y2="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="#8B2337" />
          </linearGradient>
        </defs>
      </svg>
      <span
        className={`${textColor} font-semibold tracking-tight`}
        style={{ fontFamily: "var(--font-inter)", fontSize: size === "sm" ? 13 : 15 }}
      >
        HaveBrand
      </span>
    </Link>
  );
}
