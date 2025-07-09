// src/types/onboardingTypes.ts

export type StepMetadata = {
  id: number;
  title: string;
  fields: string[];
  skippable: boolean;
};

export type StepProps = {
  currentStepMetadata: StepMetadata;
};
