import type { Metadata } from "next";
import { IdentityOptInClient } from "./IdentityOptInClient";

export const metadata: Metadata = {
  title: "Unlock Your Identity Mini Course | GrantLannin.com",
  description:
    "Enter your email to access Your Identity Mini Course.",
};

export default function IdentityOptInPage() {
  return <IdentityOptInClient />;
}
