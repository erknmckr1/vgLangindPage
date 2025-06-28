import { useSelector } from "react-redux";
import { RootState } from "../../lib/redux/store";
import { onboardingSteps } from "./onboardingStepConfig";
export const useStepValidation = (stepIndex: number): boolean => {
  const onboarding = useSelector((state: RootState) => state.onBoarding);
  // Stepdeki fieldları aldık...
  const step = onboardingSteps[stepIndex];

  return step.fields.every((field) => {
    const value = onboarding[field as keyof typeof onboarding];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "boolean") return true;
    return Boolean(value);
  });
};
