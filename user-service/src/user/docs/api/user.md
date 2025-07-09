#  Users API Dokümantasyonu

Bu modül, kullanıcı oluşturma, bilgileri çekme, güncelleme ve doğrulama işlemlerini kapsar.

---

## 🔐 Yetkilendirme

Header'da `Authorization: Bearer <token>` formatında gönderilmelidir.

---

##  Endpoint Listesi

| Method | Route                   | Açıklama                                      | Auth |
|--------|-------------------------|-----------------------------------------------|------|
| POST   | `/users/register`       | Yeni kullanıcı oluşturur ve token döner       | ❌   |
| GET    | `/users/by-email/:email`| E-posta ile kullanıcı getirir                 | ❌   |
| GET    | `/users/user-info`      | Giriş yapmış kullanıcının temel bilgilerini döner |  ✔  |
| PATCH  | `/users/:id`            | Kullanıcı bilgilerini günceller               |  ✔    |
| GET    | `/users/:id`            | ID ile kullanıcıyı getirir                    |  ✔    |

---

##   DTO Tanımları

###  CreateUserDto

```ts
export class CreateUserDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  storeName: string;

  @IsNotEmpty()
  phone: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
```

---

## İş Kuralları
Her kullanıcı için email, phone ve storeName alanları benzersiz olmalıdır.

Kayıt sırasında şifre auth-service üzerinden hashlenir.

Kayıt sonrası access_token ve refresh_token, cookie olarak set edilir.

isOnboardingCompleted, kullanıcı onboarding akış kontrolü için kullanılır.

GET /user-info sadece login olmuş kullanıcı için çalışır.

PATCH /users/:id endpoint'inde sadece güncellenmek istenen alanlar gönderilebilir (partial update).

refreshToken DB'de şifreli (hashed) olarak tutulur.

## Response Örnekleri

### POST /users/register
201 Created
```json
{
  "id": "4f3a9bba-8f87-4e67-bf9c-6c8bfb4c8e9e",
  "name": "Erkan Çakır",
  "email": "erkan@example.com",
  "storeName": "erkanstore",
  "phone": "+905555555555",
  "isOnboardingCompleted": false,
  "onboardingStep": 1
}
```

### GET /users/user-info
200 OK
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "email": "user@example.com",
  "name": "abc xyz",
  "phone": "+905555555555",
  "storeName": "xmarket"
}
```

### PATCH /users/:id
200 OK
```json
{
  "message": "User updated"
}
```

### PATCH /users/:id
200 OK
```json
{
  "id": "abc-123",
  "name": "Hakan",
  "email": "Hkaan@example.com",
  "storeName": "hakansoft",
  "phone": "+905556667788"
}
```


##  Hata Kodları

| Status | Sebep               | Açıklama                                              |
|--------|---------------------|--------------------------------------------------------|
| 400    | ValidationError     | Eksik veya hatalı alan gönderildi                     |
| 400    | DuplicateUser       | E-posta, telefon veya storeName daha önce kullanılmış |
| 400    | PasswordHashFailed  | Şifre `auth-service` üzerinden hashlenemedi           |
| 401    | Unauthorized        | JWT token yok veya geçersiz                           |
| 404    | NotFound            | Belirtilen ID veya email ile kullanıcı bulunamadı     |

---

##  Cookie Bilgisi

`POST /users/register` sonrası response’ta aşağıdaki **HTTP-only** cookie’ler set edilir:

| Cookie Adı      | Açıklama              | Süre        |
|------------------|-----------------------|-------------|
| `access_token`   | 15 dk geçerli JWT     | 15 dakika   |
| `refresh_token`  | 7 gün geçerli JWT     | 7 gün       |

---

##  Planlanan Geliştirmeler

-  E-posta doğrulama sistemi  
-  Şifre sıfırlama akışı  
-  Kullanıcı silme (`DELETE /users/:id`)  
-  Admin tarafından kullanıcı engelleme (block/unblock)
