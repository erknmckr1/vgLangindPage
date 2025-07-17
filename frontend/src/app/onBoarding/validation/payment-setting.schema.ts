import { z } from "zod";

export const Step6Schema = z.object({
  invoiceTitle: z
    .string()
    .min(2, "Fatura başlığı en az 2 karakter olmalıdır.")
    .max(100, "Fatura başlığı en fazla 100 karakter olabilir."),

  iban: z
    .string()
    .regex(
      /^TR\d{2}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{4}\s?\d{2}$/,
      "Geçerli bir IBAN girin. (TR ile başlayarak)"
    ),

  bankName: z
    .string()
    .min(2, "Banka adı en az 2 karakter olmalıdır.")
    .max(50, "Banka adı en fazla 50 karakter olabilir."),

  taxId: z
    .string()
    .regex(/^\d{10,11}$/, "Vergi No / TCKN 10 veya 11 haneli olmalıdır."),
});

export type Step6Data = z.infer<typeof Step6Schema>;
