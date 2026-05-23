import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { IDENTITY_MINICOURSE } from "@/lib/courses/identity-minicourse";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-course",
});

export const metadata: Metadata = {
  title: `${IDENTITY_MINICOURSE.title} | GrantLannin.com`,
  description: IDENTITY_MINICOURSE.description,
};

export default function IdentityMiniCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={spaceGrotesk.variable}>{children}</div>;
}
