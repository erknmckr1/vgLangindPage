import OnboardingStepManager from "./steps/OnBoardingStepManager";
import { redirect } from "next/navigation";
import { getCurrentUser } from "src/lib/helper/auth";
export default async function OnBoardingPage() {
  const user = await getCurrentUser();
  if (user) {
    redirect("/dashboard/home");
  }
  return (
    <>
      <OnboardingStepManager />
    </>
  );
}
