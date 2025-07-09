# 🏬 Store Profile API Dokümantasyonu

Kullanıcının mağaza profilini getiren bir endpointtir. JWT doğrulaması gereklidir.

---
##  Yetkilendirme

Tüm isteklerde `JWT token` zorunludur.  
Header'da `Authorization: Bearer <token>` formatında gönderilmelidir.
---

##  Endpoint Listesi

| Method | Route            | Açıklama                          | Auth |
|--------|------------------|-----------------------------------|------|
| GET    | `/store-profile` | Kullanıcının mağaza profilini getirir |  ✔    |

---

## 🧾 DTO Tanımı

###  StoreProfileResponseDto

```ts
export class StoreProfileResponseDto {
  slogan: string;
  logo: string;
  bio: string;
  category: string;
}

## 📤 Response - StoreProfileResponseDto

```json
{
  "slogan": "abc",
  "logo": "https://cdn.site.com/uploads/logo.jpg",
  "bio": "xyz",
  "category": "digital"
}
```
###  **Status Kodları ve Hatalar**

### Hata Durumları

| Status | Sebep                      | Açıklama                         |
| ------ | -------------------------- | -------------------------------- |
| 401    | Unauthorized               | Token yok veya geçersiz          |
| 404    | NotFound                   | Kullanıcıya ait store-profile yok      |