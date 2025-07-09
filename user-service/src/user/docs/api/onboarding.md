#  Onboarding API Dokümantasyonu

Bu endpoint, kayıt olan kullanıcının onboarding sürecini tamamlamasını sağlar. Kullanıcının mağaza profili, fatura bilgileri, ürün türleri ve tema tercihleri bu endpoint ile veritabanına kaydedilir. İşlem sonunda token’lar güncellenir.

## Yetkilendirme

`JWT token` zorunludur.  
Header'da `Authorization: Bearer <token>` formatında gönderilmelidir.


---

## 📍 Endpoint

| Method | Route                  | Açıklama                                  | Auth |
|--------|------------------------|-------------------------------------------|------|
| POST   | `/onboarding/complete` | Kullanıcının onboarding sürecini tamamlar | ✔ |

---

## 📤 Request Body – `OnboardinCompleteDto`

```json
{
  "storeName": "vegosoft",
  "slogan": "vega ",
  "category": "organik",
  "logo": "https://cdn.site.com/logo.jpg",
  "profileType": "product",
  "productTypes": ["digital", "soft"],
  "theme": "minimal",
  "accountType": "individual",
  "iban": "TR123456789012345678901234",
  "bankName": "Ziraat Bankası",
  "taxId": "12345678901",
  "invoiceTitle": "Vega Soft",
  "bio": "Vega soft"
}

## 📦 DTO Açıklamaları

| Alan Adı        | Tür       | Zorunlu | Açıklama                                 |
|------------------|-----------|---------|-------------------------------------------|
| `storeName`      | string    | ❌      | Mağaza adı (tercihe bağlı)                |
| `slogan`         | string    | ❌      | Kısa tanıtım cümlesi                      |
| `category`       | string    | ❌      | Kategori adı                              |
| `logo`           | string    | ❌      | Logo görsel URL’si                        |
| `profileType`    | string    |  ✔      | `product` veya `service` olmalı           |
| `productTypes`   | string[]  | ❌      | Ürün türü listesi                         |
| `theme`          | string    | ❌      | Tema adı                                  |
| `accountType`    | string    |  ✔      | `individual` veya `corporate`             |
| `iban`           | string    | ❌      | IBAN bilgisi                              |
| `bankName`       | string    | ❌      | Banka adı                                 |
| `taxId`          | string    | ❌      | Vergi numarası                            |
| `invoiceTitle`   | string    | ❌      | Fatura başlığı (şirket adı)               |
| `bio`            | string    | ❌      | Mağaza açıklaması                         |

---

## ✅ Response

```json
{
  "message": "Onboarding başarıyla tamamlandı."
}
```

## 🛠️ İş Kuralları

- Kullanıcıya ait tüm onboarding verileri `userId` ile eşleştirilerek kaydedilir.
- Aşağıdaki tablolar ile birebir ilişki kurulup kayıt yapılır:
  - `storeProfile`
  - `billingInfo`
  - `productTypes`
  - `theme`

- Kullanıcı (`users` tablosu) aşağıdaki alanlarla güncellenir:
  - `isOnboardingCompleted: true`
  - `onboardingStatus: 'completed'`
  - `accountType`
  - `profileType`

- TokenManager servisi aracılığıyla yeni:
  - `access_token`
  - `refresh_token`

  HTTP-only cookie olarak set edilir.

- Her kullanıcı bu işlemi yalnızca **bir kez** gerçekleştirebilir.  
  Onboarding daha önce tamamlanmışsa tekrar çağrılmamalıdır.

## 🍪 Cookie Bilgisi

Başarılı onboarding sonrası aşağıdaki **HTTP-only** cookie’ler güncellenir:

| Cookie Adı       | Açıklama              | Süre        |
|------------------|-----------------------|-------------|
| `access_token`   | 15 dk geçerli JWT     | 15 dakika   |
| `refresh_token`  | 7 gün geçerli JWT     | 7 gün       |

