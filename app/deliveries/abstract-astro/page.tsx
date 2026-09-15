import type { Metadata } from "next";
import Reviewer from "./Reviewer";
import { boards } from "./copy";
import "./wireframe.css";

export const metadata: Metadata = {
  title: "Abstract Astro · Transformation Window Report",
  description: "Advertorial and sales page for review.",
  keywords: [],
  openGraph: { title: "Abstract Astro · Transformation Window Report", description: "Advertorial and sales page for review." },
  twitter: { title: "Abstract Astro · Transformation Window Report", description: "Advertorial and sales page for review." },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function Page() {
  return <Reviewer boards={boards} />;
}
