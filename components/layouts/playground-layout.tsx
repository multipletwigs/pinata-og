"use client";
import Link from "next/link";
import { Home, Menu, Package, Twitter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ReactNode } from "react";
import { ModeToggle } from "@/components/theme-toggle";
import ProfileDisplay from "./profile-display";
import { usePathname } from "next/navigation";
import PinataHackathonSubmissionCard from "./submission-card";

const navigationItems = [
  { href: "/", label: "Image Builder", icon: Home },
  { href: "/collections", label: "Collections", icon: Package },
];

export default function PlaygroundLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 lg:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="">Pinata OG!</span>
            </Link>
            <div className="ml-auto">
              <ModeToggle />
            </div>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    pathname === item.href
                      ? "bg-muted text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto p-4">
            <PinataHackathonSubmissionCard />
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full">
        <header className="flex h-14 items-center justify-between gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 lg:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                {navigationItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                      pathname === item.href
                        ? "bg-muted text-primary"
                        : "text-muted-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto">
                <PinataHackathonSubmissionCard />
              </div>
              <div className="gap-2 text-xs text-center sm:text-left sm:text-sm">
                Created with love by{" "}
                <a
                  href="https://x.com/bashtwigs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-all"
                >
                  <Twitter className="w-4 h-4" />
                  @bashtwigs
                </a>
              </div>
            </SheetContent>
          </Sheet>
          <div className="hidden sm:inline-flex items-center gap-2 text-xs text-center sm:text-left sm:text-sm">
            Created with love by{" "}
            <a
              href="https://x.com/bashtwigs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 transition-all"
            >
              <Twitter className="w-4 h-4" />
              @bashtwigs
            </a>
          </div>
          <ProfileDisplay />
        </header>
        <main className="flex-1 overflow-auto">
          <div className=" gap-4 p-4 h-full 2xl:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
