import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Geçerli bir email girin."),
  password: z.string().min(8, "Şifre en az 8 karakter olmalı"),
});

export type SignInFormData = z.infer<typeof SignInSchema>;
