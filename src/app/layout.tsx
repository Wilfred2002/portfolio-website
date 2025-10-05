import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/common/Navigation";
import CommandPalette from "@/components/common/CommandPalette";
import QueryProvider from "@/components/providers/QueryProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wilfred Naraga | Full-Stack Developer",
  description: "Computer Science Graduate & Full-Stack Developer. Crafting innovative solutions through clean code, creative problem-solving, and cutting-edge technology.",
  keywords: ["Wilfred Naraga", "full-stack developer", "computer science", "React", "Node.js", "TypeScript", "web development", "software engineering"],
  authors: [{ name: "Wilfred Naraga" }],
  creator: "Wilfred Naraga",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://wilfrednaraga.dev",
    title: "Wilfred Naraga | Full-Stack Developer",
    description: "Computer Science Graduate & Full-Stack Developer. Crafting innovative solutions through clean code and cutting-edge technology.",
    siteName: "Wilfred Naraga Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wilfred Naraga | Full-Stack Developer",
    description: "Computer Science Graduate & Full-Stack Developer. Crafting innovative solutions through clean code and cutting-edge technology.",
    creator: "@wilfrednaraga",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <QueryProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="relative">
              {children}
            </main>
            <CommandPalette />
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
