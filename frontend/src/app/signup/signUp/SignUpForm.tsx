"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpSchema,
  SignUpFormData,
} from "src/app/validations/signup/signup.schema";

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
import axiosInstance from "../../../lib/axios";
import axios from "axios";
export default function SignUpPage() {
  const router = useRouter();

  //  RHF + Zod entegrasyonu
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(SignUpSchema),
  });

  //  RHF submit
  const onSubmit = async (formData: SignUpFormData) => {
    try {
      const response = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_USER_URL}/users/register`,
        formData,
        { withCredentials: true }
      );
      if (response.status === 201) {
        router.push("/onBoarding");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const data = err.response?.data;
        // Backend'ten field + message gelmişse
        if (data?.field && data?.message) {
          setError(data.field as keyof SignUpFormData, {
            type: "server",
            message: data.message,
          });
        }
      }
    }
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
      name: "phone",
      type: "text",
      placeholder: "05XXXXXXXXX",
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
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-muted text-foreground p-6 rounded-radius"
      >
        <h2 className="text-2xl font-extrabold text-primary tracking-tight">
          Vega
        </h2>
        <h2 className="text-2xl font-semibold mb-3 text-center">
          Hesap Oluştur
        </h2>

        <p className="text-muted-foreground">
          10 Günlük deneme sürümünüzü başlatın
        </p>
        <p className="text-xs py-4 text-muted-foreground">
          Dakikalar içerisinde kişisel mağazanızı oluşturup satış yapmaya
          başlayın...
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
              placeholder={field.placeholder}
              {...register(field.name as keyof SignUpFormData)}
              className="w-full p-4 h-[50px] rounded border border-border bg-muted text-muted-foreground"
            />
            {errors[field.name as keyof SignUpFormData] && (
              <p className="text-xs text-red-500 mt-1">
                {errors[
                  field.name as keyof SignUpFormData
                ]?.message?.toString()}
              </p>
            )}
          </div>
        ))}

        <div className="w-full flex flex-col gap-y-4 mt-2">
          <p>
            <Checkbox id="agreement" />{" "}
            <span className="text-xs">
              Vega Üyelik Sözleşmesini kabul ediyorum.
            </span>
          </p>
          <p>
            <Checkbox id="kvkk" />{" "}
            <span className="text-xs">KVKK Aydınlatma Metni’ni okudum.</span>
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
