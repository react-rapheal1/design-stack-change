import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import "../styles/globals.css";
import { cx } from "@/utils/cx";

const ibmPlexSans = IBM_Plex_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "Rayda — Remote Employees",
    description: "Employee portal for remote device management",
};

export const viewport: Viewport = {
    themeColor: "#003999",
    colorScheme: "light dark",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={cx(ibmPlexSans.variable, "bg-primary antialiased")}>
                <RouteProvider>
                    <Theme>{children}</Theme>
                </RouteProvider>
            </body>
        </html>
    );
}
