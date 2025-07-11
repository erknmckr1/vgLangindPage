import { getCurrentUser } from "src/lib/helper/auth";
import { redirect } from "next/navigation";
import SignInForm from "./signInForm/SignInForm";

export default async function SignInPage() {
  const user = await getCurrentUser();

  if (user?.isOnboardingCompleted) {
    redirect("/dashboard/home");
  }

  if (user && !user.isOnboardingCompleted) {
    redirect("/onBoarding");
  }

  return <SignInForm />;
}
