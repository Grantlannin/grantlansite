import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free ADHD Guide | GrantLannin.com",
  description:
    "How to tame your ADHD and use it to get rich — free PDF guide.",
};

export default function AdhdSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
