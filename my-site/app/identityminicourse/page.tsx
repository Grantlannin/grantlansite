import { cookies } from "next/headers";
import { IdentityMiniCourseClient } from "./IdentityMiniCourseClient";

export default async function IdentityMiniCoursePage() {
  const cookieStore = await cookies();
  const initialUnlocked =
    cookieStore.get("identity-minicourse-unlocked")?.value === "1";

  return <IdentityMiniCourseClient initialUnlocked={initialUnlocked} />;
}
