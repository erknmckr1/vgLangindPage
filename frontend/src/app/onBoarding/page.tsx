import OnboardingStepManager from "./steps/OnBoardingStepManager";
import { redirect } from "next/navigation";
import { getCurrentUser } from "src/lib/helper/auth";

export default async function OnBoardingPage() {
  const user = await getCurrentUser();
  console.log(user);
  if (!user) {
    redirect("/signin");
  }

  if (user.isOnboardingCompleted) {
    redirect("/dashboard/home");
  }

  return <OnboardingStepManager />;
}
