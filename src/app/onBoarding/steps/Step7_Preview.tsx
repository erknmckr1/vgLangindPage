"use client";

import Image from "next/image";

// Bunlar gerçek datadan props ile alınmalı (şimdilik mock)
const mockData = {
  store: {
    name: "Vega Mağaza",
    slogan: "Kalitenin adresi",
    category: "Giyim",
    description: "En özel ürünlerle karşınızdayız",
    logo: "/image1.png",
  },
  profileType: "Küçük İşletme / Butik",
  products: ["El yapımı ürünler", "Hizmetler"],
  theme: {
    id: "classic",
    name: "Klasik Tema",
    image: "/image1.png",
  },
  accountType: "Bireysel Hesap",
  payment: {
    iban: "TR00 0000 0000 0000 0000 0000 00",
    bankName: "Ziraat Bankası",
    taxId: "12345678901",
  },
};

export default function Step7_Preview() {
  const data = mockData;

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
            <div>
              <p className="text-sm text-muted-foreground">Adı</p>
              <p>{data.store.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Slogan</p>
              <p>{data.store.slogan}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Kategori</p>
              <p>{data.store.category}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Açıklama</p>
              <p>{data.store.description}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Logo</p>
              <Image
                src={data.store.logo}
                alt="logo"
                width={100}
                height={60}
                className="rounded mt-1"
              />
            </div>
          </div>
        </div>

        {/* Profil ve Ürün Bilgileri */}
        <div>
          <h3 className="text-lg font-medium">Profil ve Ürün Bilgileri</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {data.profileType}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.products.map((item) => (
              <span
                key={item}
                className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Tema */}
        <div>
          <h3 className="text-lg font-medium">Tema</h3>
          <div className="flex items-center gap-4 mt-2">
            <Image
              src={data.theme.image}
              alt="tema"
              width={100}
              height={60}
              className="rounded"
            />
            <span>{data.theme.name}</span>
          </div>
        </div>

        {/* Hesap Tipi */}
        <div>
          <h3 className="text-lg font-medium">Hesap Tipi</h3>
          <p className="text-sm text-muted-foreground mt-2">
            {data.accountType}
          </p>
        </div>

        {/* Ödeme Bilgileri */}
        <div>
          <h3 className="text-lg font-medium">Ödeme / Fatura Bilgileri</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm text-muted-foreground">IBAN</p>
              <p>{data.payment.iban}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Banka</p>
              <p>{data.payment.bankName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Vergi No / TCKN</p>
              <p>{data.payment.taxId}</p>
            </div>
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
