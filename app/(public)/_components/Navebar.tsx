"use client";

import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/AmarjeetLogo.png";
import { ThemeToggle } from "@/components/ui/themeToggle";
import { authClient } from "@/lib/auth-client";
import { Button, buttonVariants } from "@/components/ui/button";
import { UserDropdown } from "./UserDropdown";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";

const navigationItem = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Courses",
    href: "/courses",
  },
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export default function Navebar() {
  const { data: session, isPending } = authClient.useSession();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-[backdrop-filter]:bg-background/60">
      <div className="container flex min-h-16 items-center mx-auto px-4 md:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 mr-4">
          <Image src={Logo} alt="Logo" className="size-9" />
          <span className="font-bold">AmarjeetLMS</span>
        </Link>
        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:flex-1 md:items-center md:justify-between">
          <div className="flex items-center space-x-2">
            {navigationItem.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {isPending ? null : session ? (
              <UserDropdown
                email={session.user.email}
                image={
                  session?.user.image ??
                  `https://avatar.vercel.sh/${session?.user.email}`
                }
                name={
                  session?.user.name && session.user.name.length > 0
                    ? session.user.name
                    : session?.user.email.split("@")[0]
                }
              />
            ) : (
              <>
                <Link
                  href="/login"
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Login
                </Link>
                <Link href="/login" className={buttonVariants()}>
                  Get started
                </Link>
              </>
            )}
          </div>
        </nav>
        {/* Mobile Navigation */}
        <div className="md:hidden flex flex-1 justify-end items-center space-x-2">
          <ThemeToggle />
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="size-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href="/"
                    className="flex items-center space-x-2"
                    onClick={() => setIsSheetOpen(false)}
                  >
                    <Image src={Logo} alt="Logo" className="size-9" />
                    <span className="font-bold">AmarjeetLMS</span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full py-6">
                <div className="flex flex-col space-y-3">
                  {navigationItem.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setIsSheetOpen(false)}
                      className="text-lg font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
                <div className="mt-auto flex flex-col space-y-3">
                  {isPending ? null : session ? (
                    <UserDropdown
                      email={session.user.email}
                      image={
                        session?.user.image ??
                        `https://avatar.vercel.sh/${session?.user.email}`
                      }
                      name={
                        session?.user.name && session.user.name.length > 0
                          ? session.user.name
                          : session?.user.email.split("@")[0]
                      }
                    />
                  ) : (
                    <>
                      <Link
                        href="/login"
                        onClick={() => setIsSheetOpen(false)}
                        className={buttonVariants({ variant: "secondary" })}
                      >
                        Login
                      </Link>
                      <Link
                        href="/login"
                        onClick={() => setIsSheetOpen(false)}
                        className={buttonVariants()}
                      >
                        Get started
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
