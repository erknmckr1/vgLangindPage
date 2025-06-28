// src/app/onBoarding/steps/Step4_ThemeSelection.tsx

"use client";
import { useState } from "react";
import { CheckCircle2, ZoomInIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "../../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";
import { setField } from "../../../lib/redux/slices/onBoarding.Slice";
import { StepProps } from "../../types/onboardingPageTypes";

const themes = [
  {
    id: "classic",
    name: "Klasik Tema",
    image: "/image1.png",
  },
  {
    id: "modern",
    name: "Modern Tema",
    image: "/image2.png",
  },
  {
    id: "minimal",
    name: "Minimal Tema",
    image: "/image3.png",
  },
  {
    id: "dogal",
    name: "Doğal Tema",
    image: "/image3.png",
  },
  {
    id: "yumusak",
    name: "Yumuşak Tema",
    image: "/image3.png",
  },
];

export default function Step4_ThemeSelection({
  currentStepMetadata,
}: StepProps) {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const dispatch = useDispatch();
  const { theme } = useSelector((state: RootState) => state.onBoarding);
  const handleSelectedTheme = (themeId: string) => {
    dispatch(setField({ key: "theme", value: themeId }));
  };
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Tema Seçimi</h2>
      <p className="text-muted-foreground">
        Mağazanızın görünümünü belirlemek için bir tema seçin.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {themes.map((themE) => (
          <button
            key={themE.id}
            onClick={() => handleSelectedTheme(themE.id)}
            className={cn(
              "rounded border p-3 relative hover:shadow-md transition group",
              theme === themE.id && "border-primary ring-2 ring-primary/50",
            )}
          >
            <div className="aspect-video relative">
              <Image
                src={themE.image}
                alt={themE.name}
                fill
                className="object-cover rounded"
              />
              <div className="absolute top-2 left-2 z-10 bg-white hover:scale-110 rounded-full p-1 opacity-0 group-hover:opacity-100 transition">
                <ZoomInIcon
                  onClick={() => setPreviewImage(themE.image)}
                  className="text-muted-foreground size-4"
                />
              </div>
            </div>
            <div className="mt-3 font-medium text-center">{themE.name}</div>
            {theme === themE.id && (
              <CheckCircle2 className="absolute top-2 right-2 text-primary bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
          onClick={() => setPreviewImage(null)}
        >
          <Image
            src={previewImage}
            alt="Preview"
            width={800}
            height={450}
            className="rounded shadow-lg"
          />
        </div>
      )}
      {currentStepMetadata && (
        <p className="text-sm text-muted-foreground text-right underline hover:text-primary cursor-pointer">
          Bu adımı daha sonra tamamlamak için ileri butonuna basabilirsiniz.
        </p>
      )}
    </div>
  );
}
