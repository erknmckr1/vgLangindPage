// Doldurulması gereken alanlar ve adımların yapılandırması
export const onboardingSteps = [
  {
    id: 1,
    title: "Hesap Türü Seçimi",
    fields: ["accountType"],
    skippable: false,
    component: "Step1_ProfileType",
  },
  {
    id: 2,
    title: "Profil Tipi",
    fields: ["profileType"],
    skippable: false,
    component: "Step2_StoreDetarils",
  },
  {
    id: 3,
    title: "Mağaza Bilgileri",
    fields: ["storeName", "slogan", "category", "bio", "logo"],
    skippable: true,
    component: "Step3_ProductType",
  },
  {
    id: 4,
    title: "Ürün Türleri",
    fields: ["productTypes"],
    skippable: true,
    component: "Step4_ThemeCollection",
  },
  {
    id: 5,
    title: "Kolay Temalar",
    fields: ["theme"],
    skippable: true,
    component: "Step5_AccountTypeSelection",
  },
  {
    id: 6,
    title: "Ödeme ve Fatura Bilgileri",
    fields: ["iban", "bankName", "taxId", "invoiceTitle"],
    skippable: true,
    component: "Step6_PaymentSetting",
  },
  {
    id: 7,
    title: "Önizleme",
    fields: [],
    skippable: true,
    component: "Step7_Preview",
  },
];
