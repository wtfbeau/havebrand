import AnimateIn from "./AnimateIn";
import BrandDriftMap from "./BrandDriftMap";

export default function BrandDriftSection() {
  return (
    <section style={{ backgroundColor: "#1C1814" }}>
      <div className="mx-auto max-w-3xl px-6 pt-20 md:pt-28 text-center">
        <AnimateIn from="up">
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "10px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#C44B5F",
              marginBottom: "16px",
            }}
          >
            Live demo
          </p>
          <h2
            style={{
              fontFamily: "var(--font-playfair)",
              color: "#FAFAF7",
              fontSize: "clamp(1.9rem, 3vw, 2.8rem)",
              lineHeight: 1.15,
              marginBottom: "16px",
            }}
          >
            Every asset your team creates,
            <br />
            audited in real time
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.38)",
              fontSize: "clamp(0.95rem, 1.15vw, 1.05rem)",
              maxWidth: "48ch",
              margin: "0 auto",
              fontFamily: "var(--font-inter)",
              lineHeight: 1.7,
            }}
          >
            HaveBrand Brain watches every channel you publish on, and corrects
            brand drift before it reaches buyers.
          </p>
        </AnimateIn>
      </div>
      <BrandDriftMap layout="standalone" />
    </section>
  );
}
