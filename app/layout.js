import { Bricolage_Grotesque, Instrument_Sans } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["500", "800"] });
const body = Instrument_Sans({ subsets: ["latin"], variable: "--font-body", weight: ["400", "600"] });

export const metadata = {
  title: "Kapil Dhimal – Web Developer Portfolio",
  description: "Kapil Dhimal, BCA student and aspiring web developer from Nepal. Projects in React, JavaScript and Java.",
  openGraph: { title: "Kapil Dhimal – Web Developer", description: "Projects, skills and contact.", type: "website" },
};
export const viewport = { width: "device-width", initialScale: 1, viewportFit: "cover", themeColor: "#0D1330" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
