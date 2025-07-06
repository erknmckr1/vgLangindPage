"use client";
import Step1_ProfileType from "./Step1_ProfileType";
import Step2_StoreDetails from "./Step2_StoreDetails";
import Step3_ProductType from "./Step3_ProductType";
import Step4_ThemeSelection from "./Step4_ThemeCollection";
import Step5_AccountTypeSelection from "./Step5_AccountTypeSelection";
import Step6_PaymentSetting from "./Step6_PaymentSetting";
import Step7_Preview from "./Step7_Preview";
import { useStepValidation } from "../useStepValidation";
import { onboardingSteps } from "../onboardingStepConfig";
import { useState } from "react";
import axios from "../../../lib/axios";
import { useSelector } from "react-redux";
import { RootState } from "src/lib/redux/store";

const steps = [
  { id: 1, title: "Hesap Türü Seçimi", component: Step5_AccountTypeSelection },
  { id: 2, title: "Profil Tipi", component: Step1_ProfileType },
  { id: 3, title: "Mağaza Bilgileri", component: Step2_StoreDetails },
  { id: 4, title: "Ürün Türleri", component: Step3_ProductType },
  { id: 5, title: "Kolay Temalar", component: Step4_ThemeSelection },
  {
    id: 6,
    title: "Ödeme ve Fatura Bilgileri",
    component: Step6_PaymentSetting,
  },
  { id: 7, title: "Ödeme ve Fatura Bilgileri", component: Step7_Preview },
];

export default function OnboardingStepManager() {
  const {
    storeName,
    slogan,
    category,
    bio,
    productTypes,
    theme,
    accountType,
    iban,
    bankName,
    taxId,
    profileType,
    invoiceTitle,
  } = useSelector((state: RootState) => state.onBoarding);

  const [currentStep, setCurrentStep] = useState(0);
  const StepComponent = steps[currentStep].component;
  const isStepValid = useStepValidation(currentStep);
  const currentStepMetadata = onboardingSteps.find(
    (s) => s.id === steps[currentStep].id
  );
  if (!currentStepMetadata) return null; // veya default değer
  const totalSteps = steps.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleCompletedOnboarding = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_USER_URL}/onboarding/complete`,
        {
          storeName,
          slogan,
          category,
          bio,
          logo: "/uploads/logo.pdf",
          productTypes,
          theme,
          accountType,
          iban,
          bankName,
          taxId,
          profileType,
          invoiceTitle,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        window.location.href = "/dashboard/home";
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="w-full max-w-2xl mx-auto min-h-[calc(100vh-73px)]  py-12 px-6 flex flex-col justify-between">
      {/* PROGRESS BAR */}
      <div className="mb-6">
        <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <p className="text-right text-xs text-muted-foreground mt-1">
          {Math.round(progress)}% tamamlandı
        </p>
      </div>

      {/* STEP HEADER */}
      <header className="mb-6 text-center">
        <h1 className="text-xl font-bold text-foreground">
          {steps[currentStep].title}
        </h1>
      </header>

      {/* ACTIVE STEP */}
      <div className="mb-6">
        <StepComponent currentStepMetadata={currentStepMetadata} />
      </div>

      {/* STEP CONTROLS */}
      <div className="flex justify-between">
        {/* Geri Butonu */}
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className="px-4 py-2 bg-muted rounded disabled:opacity-40"
        >
          Geri
        </button>

        {/* İleri Butonu (Step7 dışında ve valid ise) */}
        {currentStepMetadata.component !== "Step7_Preview" && (
          <button
            onClick={handleNext}
            disabled={!(isStepValid || currentStepMetadata.skippable)}
            className={`px-4 py-2 rounded ${
              isStepValid || currentStepMetadata.skippable
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground opacity-50 cursor-not-allowed"
            }`}
          >
            İleri
          </button>
        )}

        {/* Tamamla Butonu (Sadece Step7'de) */}
        {currentStepMetadata.component === "Step7_Preview" && (
          <button
            onClick={() => handleCompletedOnboarding()}
            className="px-4 py-2 bg-green-600 text-primary-foreground rounded"
          >
            Tamamla
          </button>
        )}
      </div>
    </section>
  );
}
