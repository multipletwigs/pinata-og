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
        <title>{}</title>
        <meta
          property="og:image"
          content="https://pinata.nightly.ink/api/get-og?cid=bafybeigmarnob5xgrgvjbny2swrbgkti6iusorve2lkypt75vykmhlv7ke"
        />
        <meta
          property="og:image:secure_url"
          content="https://pinata.nightly.ink/api/get-og?cid=bafybeigmarnob5xgrgvjbny2swrbgkti6iusorve2lkypt75vykmhlv7ke"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="og:pinata" />
        <meta property="og:title" content="og:pinata" />
        <meta
          property="og:description"
          content="Generate beautiful OpenGraph Images with Pinata!"
        />
        <meta property="og:site_name" content="https://pinata.nightly.ink" />
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
