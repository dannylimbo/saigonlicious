import type { Metadata } from "next";
import { Bebas_Neue, Dancing_Script, Archivo } from "next/font/google";
import "./globals.css";
import { LocalBusinessJsonLd } from "@/components/LocalBusinessJsonLd";
import { siteConfig } from "@/lib/site-data";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Saigonlicious Lüneburg – Asia-Imbiss & Lieferservice",
  description: siteConfig.description,
  keywords: [
    "Saigonlicious Lüneburg",
    "Asia Imbiss Lüneburg",
    "Asia Lieferservice Lüneburg",
    "Asiatisch bestellen Lüneburg",
    "Saigonlicious Lieferservice",
    "Mittagstisch Lüneburg",
    "Zeppelinstraße Lüneburg",
    "Asiatische Küche Lüneburg",
  ],
  openGraph: {
    title: "Saigonlicious Lüneburg – Asia-Imbiss & Lieferservice",
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "de_DE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${archivo.variable} ${bebas.variable} ${dancing.variable}`}
    >
      <body className="antialiased">
        <LocalBusinessJsonLd />
        {children}
      </body>
    </html>
  );
}
