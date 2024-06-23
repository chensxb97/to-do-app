import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import Link from 'next/link';
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NextJS To-Do App",
  description: "A To-Do App created using NextJS and PocketBase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>
          <h1>My To-Do App</h1>
          {/* <nav>
            <Link href="/">
              Home
            </Link>
            <Link href="/notes">
              
            </Link>
          </nav> */}
          {children}
        </main>
      </body>
    </html>
  );
}
