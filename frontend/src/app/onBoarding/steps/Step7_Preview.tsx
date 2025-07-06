"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";

// Tema listesi
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

// Tek satır gösterimi için component
const Field = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-muted-foreground">{label}</p>
    <p>{value || "-"}</p>
  </div>
);

export default function Step7_Preview() {
  const {
    storeName,
    slogan,
    category,
    logo,
    profileType,
    productTypes,
    theme: selectedThemeId,
    accountType,
    iban,
    bankName,
    taxId,
    invoiceTitle,
    bio,
  } = useSelector((state: RootState) => state.onBoarding);

  // Seçili temayı theme ID'sine göre themes listesinde bul
  const selectedTheme = themes.find((t) => t.id === selectedThemeId);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Bilgileri Gözden Geçirin</h2>
      <p className="text-muted-foreground">
        Tüm bilgilerinizi son kez kontrol edin ve kaydı tamamlayın.
      </p>

      <div className="grid gap-6 mt-6">
        {/* Mağaza Bilgileri */}
        <div>
          <h3 className="text-lg font-medium">Mağaza Bilgileri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <Field label="Adı" value={storeName} />
            <Field label="Slogan" value={slogan} />
            <Field label="Kategori" value={category} />
            <Field label="Açıklama" value={bio} />
            {logo && (
              <div>
                <p className="text-sm text-muted-foreground">Logo</p>
                {/* <Image
                  src={logo}
                  alt="logo"
                  width={100}
                  height={60}
                  className="rounded mt-1"
                /> */}
              </div>
            )}
          </div>
        </div>
        {/* Profil ve Ürün Bilgileri */}
        <div>
          <h3 className="text-lg font-medium">Profil ve Ürün Bilgileri</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {profileType || "-"}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {productTypes?.length ? (
              productTypes.map((item: string) => (
                <span
                  key={item}
                  className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
                >
                  {item}
                </span>
              ))
            ) : (
              <span className="text-xs text-muted-foreground">
                Belirtilmedi
              </span>
            )}
          </div>
        </div>
        {/* Tema Bilgisi */}
        {selectedTheme && (
          <div>
            <h3 className="text-lg font-medium">Tema</h3>
            <div className="flex items-center gap-4 mt-2">
              <Image
                src={selectedTheme.image}
                alt={selectedTheme.name}
                width={100}
                height={60}
                className="rounded"
              />
              <span>{selectedTheme.name}</span>
            </div>
          </div>
        )}
        {/* Hesap Tipi */}
        <div>
          <h3 className="text-lg font-medium">Hesap Tipi</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {accountType || "-"}
          </p>
        </div>
        {/* Ödeme Bilgileri */}
        <div>
          <h3 className="text-lg font-medium">Ödeme / Fatura Bilgileri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <Field label="Fatura Baslıgı" value={invoiceTitle} />
            <Field label="IBAN" value={iban} />
            <Field label="Banka" value={bankName} />
            <Field label="Vergi No / TCKN" value={taxId} />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground mt-8">
        Tüm bilgiler kayıt işlemleri için kullanılacak ve daha sonra panelden
        düzenlenebilir.
      </p>
    </div>
  );
}
