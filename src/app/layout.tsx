import type { Metadata } from "next";
import "./globals.css";
import ScrollAssist from "@/components/ScrollAssist";
import SmoothScrollShell from "@/components/SmoothScrollShell";
import SiteLoader from "@/components/SiteLoader";
import ThemePointer from "@/components/ThemePointer";

export const metadata: Metadata = {
  title: "ONVI — Made to Be Seen",
  description: "Discover ONVI designer wear in considered editions, created for everyday life.",
  metadataBase: new URL("https://onvi.lk"),
  openGraph: { title: "ONVI — Made to Be Seen", description: "Discover ONVI designer wear in considered editions, created for everyday life.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><SmoothScrollShell>{children}</SmoothScrollShell><SiteLoader /><ScrollAssist /><ThemePointer /></body></html>;
}
