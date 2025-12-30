import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://special-wish-2026.vercel.app"),
  title: "Happy New Year 2026 💝",
  description: "A special New Year wish just for you! Wishing you joy, love, and endless happiness in 2026! 🎉✨",
  keywords: ["new year", "2026", "wishes", "happy new year", "celebration"],
  authors: [{ name: "₦ł₵₭ ₣ɄⱤɎ ⚒" }],
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  openGraph: {
    title: "🎉 Happy New Year 2026! 💝",
    description: "A special wish made just for you! Click to experience the magic ✨",
    url: "https://special-wish-2026.vercel.app",
    siteName: "Special Wish 2026",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Happy New Year 2026 - A Special Wish",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "🎉 Happy New Year 2026! 💝",
    description: "A special wish made just for you! Click to experience the magic ✨",
    images: ["/og-image.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-[#0a0a0a]`}>
        {children}
      </body>
    </html>
  );
}
