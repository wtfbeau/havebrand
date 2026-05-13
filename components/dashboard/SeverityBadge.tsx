interface Props {
  level: "HIGH" | "MED" | "LOW";
}

const styles = {
  HIGH: { bg: "rgba(217,79,61,0.10)", text: "#D94F3D", border: "rgba(217,79,61,0.22)" },
  MED:  { bg: "rgba(232,168,56,0.10)", text: "#B8840A", border: "rgba(232,168,56,0.22)" },
  LOW:  { bg: "rgba(61,154,92,0.10)",  text: "#2D7A4A", border: "rgba(61,154,92,0.22)" },
};

export default function SeverityBadge({ level }: Props) {
  const s = styles[level];
  return (
    <span
      className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border tracking-wide"
      style={{ backgroundColor: s.bg, color: s.text, borderColor: s.border }}
    >
      {level}
    </span>
  );
}
