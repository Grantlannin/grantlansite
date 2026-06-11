import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Waitlist | GrantLannin.com",
  description:
    "Join the waitlist for an extremely simple productivity system for hyper-active brains.",
};

export default function WorkWaitlistLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
