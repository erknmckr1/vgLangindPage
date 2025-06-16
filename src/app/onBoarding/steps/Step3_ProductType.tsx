"use client";

import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setField } from "@/lib/redux/slices/onBoarding.Slice";
import { RootState } from "@/lib/redux/store";
import { StepProps } from "@/app/types/onboardingPageTypes";
const productOptions = [
  {
    id: "physical",
    title: "Fiziksel Ürünler",
    description: "Kendi ürettiğiniz ya da stokladığınız ürünler.",
  },
  {
    id: "digital",
    title: "Dijital Ürünler",
    description: "PDF, tasarım, müzik veya video gibi indirilebilir içerikler.",
  },
  {
    id: "service",
    title: "Hizmet",
    description: "Danışmanlık, eğitim, bakım, temizlik gibi hizmetler.",
  },
  {
    id: "dropshipping",
    title: "Dropshipping / Tedarik",
    description: "Ürünleri siz değil, tedarikçi gönderiyor.",
  },
  {
    id: "customPrint",
    title: "Baskılı Ürünler",
    description: "Kendi tasarımınızı 3. taraf üreticiyle basıp satıyorsunuz.",
  },
  {
    id: "notSure",
    title: "Kararsızım",
    description: "Henüz karar vermedim, sistemi incelemek istiyorum.",
  },
];

export default function Step3_ProductType({currentStepMetadata}: StepProps) {
  const dispatch = useDispatch();
  const { productTypes } = useSelector((state: RootState) => state.onBoarding);
  const toggleSelect = (id: string) => {
    const newSelection = productTypes.includes(id)
    ? productTypes.filter((type) => type !== id)
    : [...productTypes, id];

    dispatch(setField({ key: "productTypes", value: newSelection }));
  };
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Ne Tür Ürünler Satacaksınız?</h2>
      <p className="text-muted-foreground">
        Size uygun araçları önerebilmemiz için birden fazla seçenek
        belirtebilirsiniz.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {productOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => toggleSelect(option.id)}
            className={cn(
              "border text-left rounded p-4 hover:bg-accent transition flex items-start gap-3",
              productTypes.includes(option.id) && "border-primary bg-muted/70"
            )}
          >
            <div className="flex-1">
              <div className="font-semibold text-base text-foreground">
                {option.title}
              </div>
              <div className="text-sm text-muted-foreground">
                {option.description}
              </div>
            </div>
            {productTypes.includes(option.id) && (
              <CheckCircle2 className="text-primary mt-1" size={20} />
            )}
          </button>
        ))}
      </div>
      {currentStepMetadata && <p className="text-sm text-muted-foreground text-right underline hover:text-primary cursor-pointer">
        Bu adımı daha sonra tamamlamak istiyorsanız ileri butonuna tıklayabilirsiniz.
      </p>}
    </div>
  );
}
