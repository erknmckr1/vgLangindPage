'"use client";';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "@/lib/redux/slices/onBoarding.Slice";
import { RootState } from "@/lib/redux/store";
import type { OnboardingState } from "@/lib/redux/slices/onBoarding.Slice";
import { StepProps } from "@/app/types/onboardingPageTypes";
export default function Step6_PaymentSetting({currentStepMetadata}:StepProps) {
  const dispatch = useDispatch();
  const { taxId, bankName, iban, invoiceTitle } = useSelector(
    (state: RootState) => state.onBoarding
  );

const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  dispatch(setField({
    key: e.target.name as keyof OnboardingState,
    value: e.target.value,
  }));
};


  const inputFields = [
    {
      id: 0,
      name: "invoiceTitle",
      title: "Fatura Başlığı",
      placeholder: "Firma Adı ya da Ad Soyad",
      type: "text",
      value: invoiceTitle,
    },
    {
      id: 1,
      name: "iban",
      title: "IBAN",
      placeholder: "TR00 0000 0000 0000 0000 0000 00",
      type: "text",
      value: iban,
    },
    {
      id: 2,
      name: "bankName",
      title: "Banka Adı",
      placeholder: "Örn: Ziraat Bankası",
      type: "text",
      value: bankName,
    },
    {
      id: 3,
      name: "taxId",
      title: "Vergi No / TCKN",
      placeholder: "Vergi Kimlik No",
      type: "text",
      value: taxId,
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Ödeme alabilmeniz ve faturalandırma işlemleriniz için aşağıdaki
        bilgileri doldurun.
      </p>
      <form className="grid gap-4">
        {inputFields.map((field) => (
          <div key={field.id}>
            <Label>{field.title}</Label>
            <Input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={handleFormChange}
              className="py-3 mt-1"
              required
            />
          </div>
        ))}
      </form>
      <p className="text-sm text-muted-foreground">
        Bu bilgiler, ödeme işlemleri ve faturalandırma için kullanılacaktır.
      </p>
      {currentStepMetadata && <p className="text-sm text-muted-foreground text-right underline hover:text-primary cursor-pointer">
        Bu adımı daha sonra tamamlamak için ileri butonuna basabilirsiniz.
      </p>}
    </div>
  );
}
