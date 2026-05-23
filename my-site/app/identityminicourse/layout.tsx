import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import { IDENTITY_MINICOURSE } from "@/lib/courses/identity-minicourse";

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-course-display",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-course-body",
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
  return (
    <div className={`${bebas.variable} ${inter.variable}`}>{children}</div>
  );
}
