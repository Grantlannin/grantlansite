import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Focus Guide | GrantLannin.com",
  description:
    "How to tame your hyper-active mind and use it to get rich — free PDF guide.",
};

export default function FocusSystemLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
