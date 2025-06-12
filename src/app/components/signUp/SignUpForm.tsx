"use client";

import { useState } from "react";
import { Input } from "../../../components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../../components/ui/tooltip";
import { Info } from "lucide-react";
import { Checkbox } from "../../../components/ui/checkbox";
import { useRouter } from "next/navigation";
export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    storeName: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Kayıt verileri:", formData);
    router.push("/onBoarding")
  };

  const formFields = [
    {
      label: "Adınız",
      name: "name",
      type: "text",
      placeholder: "Adınızı girin",
    },
    {
      label: "Mağaza Adı",
      name: "storeName",
      type: "text",
      placeholder: "Mağazanızın ismi",
    },
    {
      label: "Cep Telefonu",
      name: "tel",
      type: "text",
      placeholder: "ornek@mail.com",
    },
    {
      label: "E-posta",
      name: "email",
      type: "email",
      placeholder: "ornek@mail.com",
    },
    {
      label: "Şifre",
      name: "password",
      type: "password",
      placeholder: "••••••••",
    },
  ];

  return (
    <main className="min-h-[calc(100vh-73px)] flex items-center justify-center bg-background text-foreground">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-muted text-foreground p-6 rounded-radius  ]"
      >
        <div className="w-full">
          <h2 className="text-2xl font-extrabold text-primary tracking-tight">
            Vega
          </h2>
          <h2 className="text-2xl font-semibold mb-3 text-center text-foreground">
            Hesap Oluştur
          </h2>
        </div>
        <p className="text-muted-foreground">
          10 Günlük deneme sürümünüzü başlatın
        </p>
        <p className="text-xs py-4 text-muted-foreground">
          Dakikalar içerisinde kişisel mağazanızı oluşturup satış yapmaya
          başlayın...{" "}
        </p>
        {formFields.map((field) => (
          <div className="mb-4" key={field.name}>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm text-muted-foreground">
                {field.label}
              </label>
              {field.name === "storeName" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>
                        Mağazanızın görünen ismi, /vega.magazaadi olarak da
                        kullanılacak.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            <Input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              required
              className="w-full p-4 h-[50px] rounded border border-border bg-muted text-muted-foreground"
            />
          </div>
        ))}
        <div className="w-full flex flex-col gap-y-4">
            <p>
            <Checkbox/> <span className="text-xs">{'Vega Üyelik Sözleşmesi"ni kabul edliyorum.'}</span>
        </p>
        <p>
            <Checkbox/> <span className="text-xs">{'Kişisel Verilerin Korunmasına İlişkin Aydınlatma Metni’ni okudum.'}</span>
        </p>
        </div>

        <button
          type="submit"
          className="bg-primary text-primary-foreground px-4 py-2 mt-4 rounded hover:opacity-90 transition cursor-pointer"
        >
          Hesap Oluştur
        </button>
      </form>
    </main>
  );
}
