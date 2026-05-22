import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GrantLannin.com",
  description:
    "Life design and business tools — become aware of who you are and build what gives you freedom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
