import type { Metadata } from "next";
import Reviewer from "./Reviewer";
import { boards } from "./copy";
import "./wireframe.css";

export const metadata: Metadata = {
  title: "DOWO · New Meta scripts",
  description: "9 video scripts, for review.",
  keywords: [],
  openGraph: { title: "DOWO · New Meta scripts", description: "9 video scripts, for review." },
  twitter: { title: "DOWO · New Meta scripts", description: "9 video scripts, for review." },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function Page() {
  return <Reviewer boards={boards} />;
}
