export type FreeCourse = {
  title: string;
  description: string;
  slug: string;
  href: string;
  external?: boolean;
};

export const FREE_COURSES: FreeCourse[] = [
  {
    title: "Change Your Identity Mini Course",
    description:
      "Five lessons on identity and becoming who you choose to be.",
    slug: "identityminicourse",
    href: "/identityminicourse/join",
  },
  {
    title: "Confidence Course",
    description: "Build unshakable self-confidence from the inside out.",
    slug: "confidence",
    href: "https://psychoticselfconfidence.com",
    external: true,
  },
];
