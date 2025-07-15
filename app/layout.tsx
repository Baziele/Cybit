import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Cybit Tech Club",
    description: "Empowering the next generation of tech professionals",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    defaultTheme="system"
                    defaultAccentColor="blue"
                    storageKey="cybit-ui-theme"
                    accentStorageKey="cybit-ui-accent"
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
