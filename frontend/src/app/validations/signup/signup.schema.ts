import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(3, "İsim en az 3 karakter olmalıdır."),
  storeName: z.string().min(2, "Mağaza adı zorunludur"),
  phone: z.string().min(10, "Geçerli telefon numarası giriniz."),
  email: z.string().email("Geçerli bir email girin"),
  password: z
    .string()
    .min(8, "Şifre en az 8 karakter olmalı")
    .refine((val) => /[A-Z]/.test(val), {
      message: "Şifre en az bir büyük harf içermelidir",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Şifre en az bir küçük harf içermelidir",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Şifre en az bir rakam içermelidir",
    }),
});

export type SignUpFormData = z.infer<typeof SignUpSchema>; 
