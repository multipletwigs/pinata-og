"use client";
import localFont from "next/font/local";
import "./globals.css";
import PlaygroundLayout from "@/components/layouts/playground-layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { useAuthStore } from "./(og-playground)/store/auth-user";
import { LoginDialog } from "@/components/login-dialog";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoginModalOpen = useAuthStore((state) => state.isLoginModalOpen);
  return (
    <html lang="en">
      <head>
        <title>Pinata OG!</title>
        <meta
          name="description"
          content="Generate beautiful images with Pinata File API and Image Optimizations!"
        />

        <meta property="og:url" content="https://pinata.nightly.ink" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Pinata OG!" />
        <meta
          property="og:description"
          content="Generate beautiful images with Pinata File API and Image Optimizations!"
        />
        <meta
          property="og:image"
          content="https://pinata.nightly.ink/api/get-og?cid=bafybeibk7fs3tb7gzxav36j3cxdaapq5bcn4rqlcaomhofcys5wnvglhpi"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="https://pinata.nightly.ink" />
        <meta property="twitter:url" content="https://pinata.nightly.ink" />
        <meta name="twitter:title" content="Pinata OG!" />
        <meta
          name="twitter:description"
          content="Generate beautiful images with Pinata File API and Image Optimizations!"
        />
        <meta
          name="twitter:image"
          content="https://pinata.nightly.ink/api/get-og?cid=bafybeibk7fs3tb7gzxav36j3cxdaapq5bcn4rqlcaomhofcys5wnvglhpi"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PlaygroundLayout>{children}</PlaygroundLayout>
          <Toaster />
          {isLoginModalOpen && <LoginDialog />}
        </ThemeProvider>
      </body>
    </html>
  );
}
