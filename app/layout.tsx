import { type Metadata } from "next";
import Link from "next/link";
import { GlowingLogo } from "@/app/components/Logo";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Problend",
  description: "An app to do issues and answers",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased `}
        >
          <header className="bg-amber-100 flex justify-between items-start p-4 gap-4 h-30 mask-b-from-10%">
            <nav>
              <ul className="flex items-center gap-6">
                <Link href="/">
                  <GlowingLogo className="w-full" />
                </Link>
                <div className="flex gap-6 font-semibold pt-2 text-neutral-800">
                  <Link
                    href="/issues"
                    className="hover:underline hover:decoration-amber-600 decoration-2"
                  >
                    <li>All Issues</li>
                  </Link>

                  <SignedOut>
                    <SignInButton mode="modal">
                      <button className="hover:underline decoration-amber-600 decoration-2">
                        My Issues
                      </button>
                    </SignInButton>
                  </SignedOut>

                  <SignedIn>
                    <Link
                      href="/myissues"
                      className="hover:underline decoration-amber-600 decoration-2 cursor-pointer"
                    >
                      <li>My Issues</li>
                    </Link>
                  </SignedIn>
                </div>
              </ul>
            </nav>
            <div className="flex gap-4 pt-4">
              <SignedOut>
                <SignInButton mode="modal" />
                <SignUpButton mode="modal" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </header>
          {modal}
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
