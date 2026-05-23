import type { Metadata } from "next";
import { IDENTITY_MINICOURSE } from "@/lib/courses/identity-minicourse";

export const metadata: Metadata = {
  title: `${IDENTITY_MINICOURSE.title} | GrantLannin.com`,
  description: IDENTITY_MINICOURSE.description,
};

export default function IdentityMiniCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
