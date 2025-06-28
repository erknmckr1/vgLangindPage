"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { cn } from "../../../../lib/utils";
import { Button } from "../../../../components/ui/button";
import UseTheme from "../../../components/ui/UseTheme";
import { Moon, Sun } from "lucide-react";
const themes = [
  {
    id: "classic",
    name: "Klasik Tema",
    image: "/image3.png",
  },
  {
    id: "modern",
    name: "Modern Tema",
    image: "/image2.png",
  },
  {
    id: "minimal",
    name: "Minimal Tema",
    image: "/image1.png",
  },
];

export default function ThemeSelector() {
  const [selectedTheme, setSelectedTheme] = useState("modern"); // default değer
  const { theme, handleChangeTheme } = UseTheme();
  const handleSelect = (id: string) => {
    setSelectedTheme(id);
  };

  const handleSubmit = () => {
    // TODO: Backend'e PATCH isteği atılacak
    console.log("Tema güncellendi:", selectedTheme);
  };

  return (
    <div className="space-y-6 border p-6 rounded-lg shadow bg-background h-auto lg:h-[450px] ">
      <h2 className="text-xl font-semibold">Tema Seçimi</h2>
      <p className="text-sm text-muted-foreground">
        Mağazanızın vitrini için bir tema seçin.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {themes.map((theme) => (
          <button
            key={theme.id}
            type="button"
            onClick={() => handleSelect(theme.id)}
            className={cn(
              "relative rounded-lg border hover:ring-2 ring-primary transition overflow-hidden",
              selectedTheme === theme.id && "border-primary ring-2",
            )}
          >
            <Image
              src={theme.image}
              alt={theme.name}
              width={300}
              height={180}
              className="w-full object-cover"
            />
            <div className="p-2 text-sm font-medium">{theme.name}</div>
            {selectedTheme === theme.id && (
              <CheckCircle2 className="absolute top-2 right-2 text-primary" />
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <Button onClick={handleSubmit}>Temayı Güncelle</Button>
        <button
          onClick={handleChangeTheme}
          className="p-2 rounded-md border border-border hover:bg-muted transition-colors"
          aria-label="Tema Değiştir"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </div>
  );
}
