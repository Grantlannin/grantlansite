import type { Metadata } from "next";
import { IdentityOptInClient } from "./IdentityOptInClient";

export const metadata: Metadata = {
  title: "Change Your Identity Mini Course | GrantLannin.com",
  description:
    "Enter your email to access Change Your Identity Mini Course.",
};

export default function IdentityOptInPage() {
  return <IdentityOptInClient />;
}
