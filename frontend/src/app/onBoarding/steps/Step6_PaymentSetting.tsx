"use client";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "../../../lib/redux/slices/onBoarding.Slice";
import { RootState } from "../../../lib/redux/store";
import type { OnboardingState } from "../../../lib/redux/slices/onBoarding.Slice";
import { StepProps } from "../types/onboardingPageTypes";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step6Schema, Step6Data } from "../validation/payment-setting.schema";

export default function Step6_PaymentSetting({
  currentStepMetadata,
}: StepProps) {
  const dispatch = useDispatch();
  const { taxId, bankName, iban, invoiceTitle } = useSelector(
    (state: RootState) => state.onBoarding
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Step6Data>({
    resolver: zodResolver(Step6Schema),
    defaultValues: {
      invoiceTitle,
      iban,
      bankName,
      taxId,
    },
    mode: "onChange", 
  });

  const onSubmit = (data: Step6Data) => {
    // Valid ise Redux'a yaz
    Object.entries(data).forEach(([key, value]) => {
      dispatch(
        setField({
          key: key as keyof OnboardingState,
          value,
        })
      );
    });
  };

  const inputFields = [
    {
      id: 0,
      name: "invoiceTitle",
      title: "Fatura Başlığı",
      placeholder: "Firma Adı ya da Ad Soyad",
      type: "text",
    },
    {
      id: 1,
      name: "iban",
      title: "IBAN",
      placeholder: "TR00 0000 0000 0000 0000 0000 00",
      type: "text",
    },
    {
      id: 2,
      name: "bankName",
      title: "Banka Adı",
      placeholder: "Örn: Ziraat Bankası",
      type: "text",
    },
    {
      id: 3,
      name: "taxId",
      title: "Vergi No / TCKN",
      placeholder: "Vergi Kimlik No",
      type: "text",
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Ödeme alabilmeniz ve faturalandırma işlemleriniz için aşağıdaki
        bilgileri doldurun.
      </p>

      <form className="grid gap-4" onBlur={handleSubmit(onSubmit)}>
        {inputFields.map((field) => (
          <div key={field.id}>
            <Label htmlFor={field.name}>{field.title}</Label>
            <Input
              id={field.name}
              {...register(field.name as keyof Step6Data)}
              placeholder={field.placeholder}
              className="py-3 mt-1"
            />
            {errors[field.name as keyof Step6Data] && (
              <p className="text-red-500 text-xs mt-1">
                {errors[field.name as keyof Step6Data]?.message}
              </p>
            )}
          </div>
        ))}
      </form>

      <p className="text-sm text-muted-foreground">
        Bu bilgiler, ödeme işlemleri ve faturalandırma için kullanılacaktır.
      </p>

      {currentStepMetadata && (
        <p className="text-sm text-muted-foreground text-right underline hover:text-primary cursor-pointer">
          Bu adımı daha sonra tamamlamak için ileri butonuna basabilirsiniz.
        </p>
      )}
    </div>
  );
}
