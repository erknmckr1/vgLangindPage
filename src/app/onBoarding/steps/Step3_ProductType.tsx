"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2 } from "lucide-react";

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

export default function Step3_ProductType() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
              selected.includes(option.id) && "border-primary bg-muted/70"
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
            {selected.includes(option.id) && (
              <CheckCircle2 className="text-primary mt-1" size={20} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
