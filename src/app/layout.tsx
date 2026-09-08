import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import LoadingOverlay from "../components/loadingOverlay/LoadingOverlay";
import ConditionalLayout from "./conditionalLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Configuración unificada del sitio
const siteConfig = {
  name: "Tengoku Imperial",
  description:
    "¡Disfrutá de concursos de cosplay, baile, canto, juegos, salas temáticas, stands, invitados y más!",
  url: "https://tengokugame.vercel.app",
  ogImage: "https://tengokugame.vercel.app/images/tengoku-banner-email.webp",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Tengoku Imperial | Anime, Cosplay, Juegos y más",
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [{ url: "/favicon.ico", href: "/favicon.ico" }],
  keywords: [
    "convencion",
    "anime",
    "Tengoku",
    "cosplay",
    "juegos",
    "concurso",
    "mar del plata",
    "buenos aires",
  ],
  authors: [{ name: "Bruno O.", url: "https://www.linkedin.com/in/bortuno" }],
  publisher: "Tengoku Imperial",
  generator: "Next.js",
  referrer: "no-referrer-when-downgrade",
  robots: "index, follow",
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: "Convención Tengoku Imperial | Anime, Cosplay y Cultura Japonesa",
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: "Imagen promocional de Tengoku Imperial",
      },
    ],
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Convención Tengoku Imperial | Anime, Cosplay y Cultura Japonesa",
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
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
   <html lang="es">
      <head>
        {/* Preload de recursos críticos nativo */}
        <link rel="preload" as="image" href="/images/bg-anime.webp" />
        <link rel="preload" as="image" href="/images/voting-room.webp" />
        <link rel="preload" as="image" href="/logo-tengoku-game.webp" />
        <link rel="preload" as="video" href="/videos/stairs.mp4" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-[100vh] flex justify-center items-center`}
      >
        <ConditionalLayout>
          <main className="w-full">
            <LoadingOverlay />
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
        </ConditionalLayout>
      </body>
    </html>
  );
}

