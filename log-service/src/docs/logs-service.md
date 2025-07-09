# 📜 Log Service API Dokümantasyonu

Bu mikro servis, kullanıcıların oturum hareketlerini (login, logout, expired) kaydeden merkezi bir log servisidir.

---

##  Endpoint Listesi

| Method | Route             | Açıklama                                       | Auth |
|--------|-------------------|------------------------------------------------|------|
| POST   | `/logs/login`     | Login olduğunda log kaydı oluşturur            | ❌   |
| POST   | `/logs/logout`    | Kullanıcı çıkışını loglar (`logoutAt` yazar)   | ❌   |
| POST   | `/logs/expired`   | Oturum süresi dolduysa logu günceller          | ❌   |

---

##  Entity: `LoginLog`

| Alan        | Tip      | Açıklama                          |
|-------------|----------|-----------------------------------|
| id          | number   | Otomatik arttırılan PK             |
| userId      | string   | Kullanıcı ID                       |
| ipAddress   | string   | IP adresi (header + socket)       |
| loginAt     | Date     | Giriş tarihi (otomatik)           |
| logoutAt    | Date     | Çıkış tarihi (nullable)           |
| status      | enum     | `'LOGIN'`, `'LOGOUT'`, `'EXPIRED'`|
| userAgent   | string   | (İleride eklenebilir)              |
| sessionId   | string   | Oturum eşlemesi için opsiyonel    |

---

##  Örnek Kullanım Senaryoları

### 1. Login Kaydı Oluşturma (`/logs/login`)

```json
POST /logs/login
{
  "userId": "abc123",
  "userAgent": "Mozilla/5.0",
  "sessionId": "xyz789"
}

```
##  2. Logout Log Güncelleme

###  Endpoint

#### POST /logs/logout
```json

###  İstek Gövdesi

```json
{
  "userId": "abc123",
  "sessionId": "xyz789"
}
```

- Son LOGIN statüsündeki kayıt bulunur.

- logoutAt alanı güncellenir.

- status değeri 'LOGOUT' olarak değiştirilir.

- sessionId opsiyoneldir ama varsa eşleşme için kullanılır.

#### POST /logs/expired
```json
{
  "userId": "abc123"
}

```

- Kullanıcı uzun süre boyunca aktifse ve düzgün bir logout işlemi gerçekleşmemişse,

- Son LOGIN statüsündeki kayıt status: 'EXPIRED' olarak güncellenir.

- logoutAt alanı güncellenir.

- Genellikle refresh token süresi dolduğunda veya bağlantı beklenmedik şekilde kesildiğinde tetiklenir.

##  İş Kuralları

- Aynı kullanıcı için birden fazla açık (logout edilmemiş) login kaydı **olmamalıdır**.
- `createLoginLog()` fonksiyonu, önceki açık login kaydını bulur ve `EXPIRED` durumuna getirir.
- Logout işlemleri `sessionId` ile eşleştirilebilir (**opsiyoneldir**).
- Her yeni login:
  - `loginAt` zamanı ile
  - `ipAddress` bilgisiyle
  otomatik olarak kaydedilir.
- `userAgent` bilgisi şu an için **opsiyonel** tutulur. (Gelecekte kapsam genişletilebilir.)

---

##  Güvenlik Notları

- Bu servis doğrudan kimlik doğrulaması (**JWT Auth**) istemez.
- Yalnızca **auth-service** tarafından tetiklenir.
- Dışarıya açık servis haline gelirse **rate-limit** uygulanması şiddetle önerilir.
- IP adresi:
  - Öncelikle `x-forwarded-for` başlığından,
  - Yoksa `req.socket.remoteAddress` üzerinden alınır.

---

##  Planlanan Geliştirmeler

-  Redis caching ile son aktif kullanıcı kontrolü
  - Örn: Birden fazla cihazdan login olup olmadığını kontrol etme.
  - Otomatik oturum sonlandırma / uyarı mekanizmaları.
  - Kullanıcının bir çok işleminin loglanması
