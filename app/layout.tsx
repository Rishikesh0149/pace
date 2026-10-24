import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "Pace — Study planner", description: "A study plan that works with your week." };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html>; }
