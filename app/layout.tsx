import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/CartProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IntroModal } from "@/components/IntroModal";

const display = Cinzel({
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kcdtrip.cz"),
  title: {
    default: "KCD TRIP — Kolekce oblečení pro dobrodruhy",
    template: "%s — KCD TRIP",
  },
  description:
    "Audentes fortuna iuvat. Prémiová kolekce oblečení a doplňků inspirovaná cestami, přátelstvím a příběhy, které se nezapomínají.",
  keywords: ["KCD TRIP", "oblečení", "dobrodruh", "merch", "mikina", "tričko", "kšiltovka"],
  openGraph: {
    title: "KCD TRIP — Kolekce pro dobrodruhy",
    description: "Není to jen výlet. Je to příběh. Audentes fortuna iuvat.",
    type: "website",
    locale: "cs_CZ",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-dvh font-sans antialiased">
        <CartProvider>
          <a
            href="#obsah"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-gold focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#12100c]"
          >
            Přeskočit na obsah
          </a>
          <IntroModal />
          <Navbar />
          <main id="obsah">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
