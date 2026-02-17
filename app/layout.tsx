import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

export const metadata: Metadata = {
    title: "ThreatAvoids — Reinventing LPG Safety with Embedded IoT Intelligence",
    description:
        "ThreatAvoids is building the Sentinel safety ecosystem for LPG cylinders — an IoT-powered, AI-driven safety platform designed for direct OEM integration with major energy providers.",
    icons: {
        icon: "/threatavoids-logo.png",
        shortcut: "/threatavoids-logo.png",
        apple: "/threatavoids-logo.png",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${inter.className}`}>
            <body className="antialiased">{children}</body>
        </html>
    );
}
