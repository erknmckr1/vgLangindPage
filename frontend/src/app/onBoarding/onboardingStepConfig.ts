// Doldurulması gereken alanlar ve adımların yapılandırması
export const onboardingSteps = [
  {
    id: 1,
    title: "Hesap Türü Seçimi",
    fields: ["accountType"],
    skippable: false,
  },
  {
    id: 2,
    title: "Profil Tipi",
    fields: ["profileType"],
    skippable: false,
  },
  {
    id: 3,
    title: "Mağaza Bilgileri",
    fields: ["storeName", "slogan", "category", "bio", "logo"],
    skippable: true,
  },
  {
    id: 4,
    title: "Ürün Türleri",
    fields: ["productTypes"],
    skippable: true,
  },
  {
    id: 5,
    title: "Kolay Temalar",
    fields: ["theme"],
    skippable: true,
  },
  {
    id: 6,
    title: "Ödeme ve Fatura Bilgileri",
    fields: ["iban", "bankName", "taxId", "invoiceTitle"],
    skippable: true,
  },
  {
    id: 7,
    title: "Önizleme",
    fields: [],
    skippable: true,
  },
];
