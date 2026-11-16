import type { Metadata } from "next";
import Reviewer from "./Reviewer";
import { boards } from "./copy";
import "../dowo/wireframe.css";

export const metadata: Metadata = {
  title: "DOWO · New Meta scripts, fresh set",
  description: "New video scripts, for review.",
  keywords: [],
  openGraph: { title: "DOWO · New Meta scripts, fresh set", description: "New video scripts, for review." },
  twitter: { title: "DOWO · New Meta scripts, fresh set", description: "New video scripts, for review." },
  robots: { index: false, follow: false, nocache: true, googleBot: { index: false, follow: false } },
  alternates: { canonical: null },
};

export default function Page() {
  return <Reviewer boards={boards} store="dowo-v4" heading="New Meta scripts · fresh set" />;
}
