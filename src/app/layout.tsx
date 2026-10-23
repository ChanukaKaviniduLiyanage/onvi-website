import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ONVI — Made to Be Seen",
  description: "Thoughtful pieces for real days. Discover ONVI's considered everyday fashion collection.",
  metadataBase: new URL("https://onvi.lk"),
  openGraph: { title: "ONVI — Made to Be Seen", description: "Thoughtful pieces for real days and every version of you.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
