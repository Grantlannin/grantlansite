import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Lead Generation Guide | GrantLannin.com",
  description:
    "How coaches are solving their not enough clients problem with lead-generation systems.",
};

export default function MakeSalesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
