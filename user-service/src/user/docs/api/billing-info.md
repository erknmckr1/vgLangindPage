# Billing Info API Dokümantasyonu

## Bu endpoint, bir kullanıcının fatura/banka bilgilerini eklemesini, güncellemesini, silmesini ve varsayılan (`primary`) hesap olarak işaretlemesini sağlar.

## Yetkilendirme

Tüm isteklerde `JWT token` zorunludur.  
Header'da `Authorization: Bearer <token>` formatında gönderilmelidir.

---

## Endpoint Listesi

| Method | Route                           | Açıklama                                     | Auth |
| ------ | ------------------------------- | -------------------------------------------- | ---- |
| GET    | `/billing-info`                 | Kullanıcının tüm billing kayıtlarını getirir |  ✔    |
| POST   | `/billing-info`                 | Yeni billing kaydı oluşturur                 |  ✔    |
| PATCH  | `/billing-info/:id`             | Mevcut kaydı günceller                       |  ✔    |
| DELETE | `/billing-info/:id`             | Mevcut kaydı siler                           |  ✔    |
| PATCH  | `/billing-info/set-primary/:id` | Bir billing kaydını varsayılan yapar         |  ✔    |


## DTO Yapıları

### CreateBillingDto
```ts
{
  bankName: string;      // Zorunlu
  iban: string;          // Zorunlu
  taxId?: string;        // Opsiyonel
  invoiceTitle?: string; // Opsiyonel
}
```
### UpdateBillingDto

{
  bankName: string;      // Opsiyonel
  iban: string;          // Opsiyonel
  taxId?: string;        // Opsiyonel
  invoiceTitle?: string; // Opsiyonel
}
### POST /billing-info

#### Request Body

```json
{
  "bankName": "Ziraat Bankası",
  "iban": "TR330006100519786457841326",
  "taxId": "12345678901",
  "invoiceTitle": "Vega Yazılım"
}
```

#### Response

```json
{
  "id": "b12345",
  "bankName": "Ziraat Bankası",
  "iban": "TR330006100519786457841326",
  "isPrimary": false,
  "user": {
    "id": "u12345"
  }
}
```

###  **Status Kodları ve Hatalar**

### Hata Durumları

| Status | Sebep                      | Açıklama                         |
| ------ | -------------------------- | -------------------------------- |
| 400    | ValidationError            | Eksik veya hatalı alan           |
| 401    | Unauthorized               | Token yok veya geçersiz          |
| 403    | Forbidden (Geliştirilirse) | Başkasının kaydına erişme durumu |
| 404    | NotFound                   | Güncellenecek ID bulunamadı      |

###  Edge Case / İş Kuralları

## İş Kuralları

- Her kullanıcı birden fazla billing kaydına sahip olabilir.
- Aynı anda yalnızca 1 `isPrimary: true` kayıt olabilir.
- `set-primary/:id` endpointi çağrıldığında diğer kayıtların `isPrimary` değeri otomatik olarak `false` yapılır.

###  **Gelecek Geliştirme Notları (Opsiyonel)**


##  Planlanan Geliştirmeler

- Form format validasyonu
- Benzer değerler ile kayıt imkanını engelleme
- Swagger entegrasyonu

