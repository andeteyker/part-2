import type { Metadata } from "next";
import { DesignStudio } from "./DesignStudio";

export const metadata: Metadata = {
  title: "Designvergleich",
  description: "Drei Designrichtungen für die SofortTools-Startseite.",
  robots: { index: false, follow: false },
};

export default function DesignsPage() {
  return <DesignStudio />;
}
