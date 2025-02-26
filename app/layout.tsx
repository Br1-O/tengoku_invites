import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import siteConfig from "@/config/site";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import LoadingOverlay from "./components/loadingOverlay/LoadingOverlay";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tengokugame.vercel.app"),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/favicon.ico",
      href: "/favicon.ico"
    }
  ],
  keywords: ["convencion", "anime", "Tengoku", "juegos del calamar", "squid game", "squid games", "concurso", "vida real", "cosplay", "premios", "mar del plata", "buenos aires"],
  authors: [{ name: "Bruno O.", url: "www.linkedin.com/in/bortuno" }],
  publisher: "Tengoku Imperial",
  generator: "Next.js",
  referrer: "no-referrer-when-downgrade",
  robots: "index, follow",
  alternates: {
    canonical: "https://tengokugame.vercel.app"
  },
  openGraph: {
    type: "website",
    url: "https://tengokugame.vercel.app",
    siteName: "Tengoku Games",
    title: "Tengoku Games | Bienvenido",
    description: "¡Vení a participar de los más emocionantes juegos y sé el único ganador del premio!",
    images: [
      {
        url: "/images/poster_promo.png",
        width: 1200,
        height: 630,
        alt: "Imagen promocional de Tengoku games",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@TengokuGames",
    title: "Tengoku Games | Bienvenido",
    description: "¡Vení a participar de los más emocionantes juegos y sé el único ganador del premio!",
    images: ["/images/poster_promo.png"],
  }
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingOverlay />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

