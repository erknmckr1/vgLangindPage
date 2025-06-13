// src/app/onBoarding/steps/Step1_ProfileType.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

const profileOptions = [
  {
    id: "individual",
    title: "Bireysel Üretici",
    description: "El yapımı veya kişisel ürünler satıyorum."
  },
  {
    id: "small_business",
    title: "Küçük İşletme / Butik",
    description: "Ürün stoğum ya da fiziksel mağazam var."
  },
  {
    id: "service_provider",
    title: "Hizmet Sağlayıcı",
    description: "Danışmanlık, eğitim veya özel hizmet sunuyorum."
  },
  {
    id: "dropshipping",
    title: "Dropshipping / Tedarik",
    description: "Ürünleri ben üretmiyorum, dışarıdan temin ediyorum."
  },
  {
    id: "exploring",
    title: "Kararsızım",
    description: "Sisteme göz atmak istiyorum."
  }
];

export default function Step1_ProfileType() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Sizi daha yakından tanıyalım</h2>
      <p className="text-muted-foreground">
        İhtiyacınıza en uygun sistemi sunabilmemiz için kullanıcı tipinizi seçin.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {profileOptions.map((option) => (
          <button
            type="button"
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={cn(
              "border relative text-left rounded p-4 hover:bg-accent transition flex items-start gap-3",
              selected === option.id && "border-primary bg-muted/70"
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
            {selected === option.id && <CheckCircle2 className="absolute bg-muted top-2 right-2 text-primary mt-1" size={20} />}
          </button>
        ))}
      </div>
    </div>
  );
}
