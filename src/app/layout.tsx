import type { Metadata } from "next";
import { Playfair_Display, Nunito } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Școala Gimnazială Moieciu de Jos | Site Oficial",
  description: "Site-ul oficial al Școlii Gimnaziale Moieciu de Jos, județul Brașov.",
  icons: {
    icon: "/icon.png",
    shortcut: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <body className={`${playfair.variable} ${nunito.variable} antialiased`}>
        <Toaster />
        {children}
      </body>
    </html>
  );
}
