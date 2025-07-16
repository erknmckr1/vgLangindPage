import { z } from "zod";

export const Step2Schema = z.object({
  storeName: z
    .string()
    .min(2, "Mağaza adı en az 2 karakter olmalıdır.")
    .max(50, "Mağaza adı en fazla 50 karakter olabilir."),

  slogan: z
    .string()
    .max(100, "Slogan en fazla 100 karakter olabilir.")
    .optional()
    .or(z.literal("")), // boş bırakılabilir

  category: z
    .string()
    .min(1, "Kategori seçilmelidir."),

  bio: z
    .string()
    .max(300, "Açıklama en fazla 300 karakter olabilir.")
    .optional()
    .or(z.literal("")), // boş bırakılabilir

  logo: z.any().optional(), // opsiyonel dosya alanı, file veya string olabilir
});

export type Step2Data = z.infer<typeof Step2Schema>;
