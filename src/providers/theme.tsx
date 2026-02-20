"use client";

import { ThemeProvider } from "next-themes";

export function Theme({ children }: { children: React.ReactNode }) {
    return (
        // Dark mode disabled - force light mode
        <ThemeProvider
            attribute="class"
            value={{ light: "light-mode", dark: "dark-mode" }}
            forcedTheme="light"
            enableSystem={false}
        >
            {children}
        </ThemeProvider>
    );
}
