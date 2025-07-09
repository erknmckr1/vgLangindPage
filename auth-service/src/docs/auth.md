# 🔐 Auth-Service API Dokümantasyonu

Bu servis, kullanıcı doğrulama, token üretimi, oturum yönetimi ve şifre hashleme işlemlerini gerçekleştirir. `user-service` ile haberleşir, token bilgilerini cookie olarak yönetir.

---

## 📍 Endpoint Listesi

| Method | Route                        | Açıklama                                   | Auth |
| ------ | ---------------------------- | ------------------------------------------ | ---- |
| POST   | `/auth/login`                | Kullanıcı girişi yapar, token üretir       | ❌   |
| POST   | `/auth/refresh-token`        | Yeni access ve refresh token üretir        | ❌   |
| POST   | `/auth/logout`               | Kullanıcının oturumunu sonlandırır         | ✅   |
| GET    | `/auth/me`                   | JWT içindeki kullanıcı payload’unu döner   | ✅   |
| POST   | `/auth/hash-password`        | Düz şifreyi hash’ler ve döner              | ❌   |
| POST   | `/auth/token-after-register` | Kayıt sonrası token üretir, cookie işlemez | ❌   |
| GET    | `/auth/test`                 | Test amaçlı sabit yanıt döner              | ❌   |

---

## 🧾 DTO: LoginUserDto

```ts
export class LoginUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
```
## ✅ Response Örnekleri

### POST /auth/login

``` json
{
  "statusCode": 200,
  "message": "Giriş Başarılı",
  "data": {
    "userId": "abc123"
  }
}
```

### POST /auth/refresh-token
```json
{
  "message": "Token yenilendi"
}
```

### POST /auth/logout
```json
{
  "message": "Çıkış başarılı."
}
```

### POST /auth/hash-password
```json
{
  "hashedPassword": "$2b$10$..."
}
```

### POST /auth/token-after-register
```json
{
  "message": "Tokenlar oluşturuldu ve cookie yazıldı.",
  "accessToken": "<access_token>",
  "refreshToken": "<refresh_token>"
}
```
## İş Kuralları

###  `login` işlemi:
- `user-service` üzerinden kullanıcı alınır.
- Şifre `bcrypt.compare` ile doğrulanır.
- `access_token` ve `refresh_token` üretilir.
- `refresh_token`, `bcrypt.hash` ile şifrelenerek `user-service`'e `PATCH` ile kaydedilir.
- Token’lar HTTP-only cookie olarak kullanıcıya set edilir.

---

###  `hash-password` işlemi:
- Düz (plaintext) şifre alınır.
- `bcrypt.hash(password, saltRounds)` algoritması ile güvenli şekilde şifrelenir.
- Sistem genelinde `saltRounds = 10` olarak kullanılmaktadır.
- Bu işlem, kayıt ve şifre güncelleme senaryolarında yeniden kullanılabilir.

---

###  `refresh-token` işlemi:
- Gelen `refresh_token`, JWT olarak doğrulanır.
- DB’deki hash ile karşılaştırılır (`bcrypt.compare`).
- Yeni token'lar üretilir.
- Yeni `refresh_token`, tekrar hashlenerek veritabanına kaydedilir.
- `logout` log kaydı (`/logs/logout`) API'ye gönderilir.

---

###  `logout` işlemi:
- `refresh_token` eşleşmesi kontrol edilir.
- Kullanıcının `refresh_token` değeri veritabanında null’lanır.
- `access_token` ve `refresh_token` cookie'leri temizlenir.
- Çıkış işlemi loglanır (`POST /logs/logout`).

---

###  `token-after-register` işlemi:
- Sadece token üretir.
- Cookie setlemesi yapılmaz.
- Amaç: Kayıt sonrası frontend tarafının JWT ile işlem yapabilmesini sağlamak.

##  Planlanan Geliştirmeler

-  **Token revocation listesi (JWT blacklist):**  
  Oturumdan çıkmış veya yetkisiz token’ların yeniden kullanımını engellemek için.

-  **Google / Apple OAuth entegrasyonu:**  
  Kullanıcıların Google veya Apple hesaplarıyla giriş yapabilmesi.

-  **MFA (Two-Factor Authentication):**  
  Giriş işlemlerinde SMS veya uygulama tabanlı 2FA desteği.

-  **Swagger / OpenAPI desteği:**  
  Tüm auth servis endpoint'lerinin interaktif olarak test edilebilmesi ve dökümantasyonun otomatik sunulması.

