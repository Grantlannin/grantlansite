import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Courses | GrantLannin.com",
  description: "Free courses on identity and confidence.",
};

export default function FreeCoursesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
