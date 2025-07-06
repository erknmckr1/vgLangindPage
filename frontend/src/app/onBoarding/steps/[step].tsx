import { onboardingSteps } from "../onboardingStepConfig";
import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
export default function OnBoardingStepPage() {
  const params = useParams();
  const currentStep = Number(params.step); // önce currentStep tanımlanmalı
  const stepData = onboardingSteps.find((s) => s.id === currentStep);
  if (!stepData) return <div>Geçersiz adım</div>;

  const StepComponent = dynamic(() => import(`../steps/${stepData.component}`));

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">{stepData.title}</h1>
      <StepComponent />
    </div>
  );
}
