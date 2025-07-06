import SignUpForm from "./signUp/SignUpForm";
import { redirect } from "next/navigation";
import { getCurrentUser } from "src/lib/helper/auth";

export default async function SignUp() {
  const user = await getCurrentUser();

  if (user?.isOnboardingCompleted) {
    redirect("/dashboard/home");
  }

  if (user && !user.isOnboardingCompleted) {
    redirect("/onBoarding");
  }

  return <SignUpForm />;
}
