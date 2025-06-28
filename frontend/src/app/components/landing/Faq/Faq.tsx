// components/FaqList.tsx
"use client";
import { useState } from "react";
import FaqItem from "./FaqItems";
import { motion } from "motion/react";

const faqs = [
  {
    question: "Her satıcıya özel mağaza mı açılıyor?",
    answer:
      "Evet. Her kullanıcıya özel bir subdomain (örn. saticiadi.platform.com) tanımlanır. Satıcılar bu mağazada kendi markasını, ürünlerini ve iş tarzını yansıtır. Platform, pazar yeri gibi değil; size özel bir sistem sunar.",
  },
  {
    question: "Müşteri siparişi nasıl veriyor?",
    answer:
      "Siparişler doğrudan müşteri tarafından girilir. Satıcının paneline düşen her sipariş; fatura, ödeme ve kargo süreciyle entegre şekilde işler. Arayüz basit, güvenilir ve mobil uyumludur.",
  },
  {
    question: "Ödeme süreci nasıl çalışıyor?",
    answer:
      "PayTR ve İyzico altyapıları ile çalışıyoruz. Sipariş sonrası müşteriye otomatik ödeme linki gönderilir. Dilerseniz IBAN ile manuel tahsilat opsiyonu da vardır.",
  },
  {
    question: "Kargo süreci nasıl ilerliyor?",
    answer:
      "Sistem sipariş geldiğinde otomatik barkod oluşturur. Anlaşmalı kargo firmalarıyla entegrasyon sağlanır. Satıcı sadece ürünü teslim eder, sistem takibi yapar.",
  },
  {
    question: "Satışlarımı ve performansımı nasıl takip ederim?",
    answer:
      "İş zekâsı paneli ile anlık ciro, sipariş adedi, stok durumu ve kârlılık verilerini izleyebilirsiniz. Tüm veriler kullanıcı dostu grafiklerle sunulur.",
  },
  {
    question: "Otomasyon desteği var mı?",
    answer:
      "Evet. Sistem sipariş, hazırlık, teslim ve takip adımlarında RPA ile desteklenir. Süreçlerde bildirimler, zamanlayıcılar ve otomatik görevler tanımlanır.",
  },
  {
    question: "Fiyat analizi yapabiliyor muyum?",
    answer:
      "Sistem, ürünlerinizi benzer pazarlardaki fiyatlarla karşılaştırır ve yapay zekâ destekli öneriler sunar. Amaç: rekabetçi ama kârlı bir satış stratejisi oluşturmak.",
  },
  {
    question: "Pazaryerleriyle bağlantı kurulabilir mi?",
    answer:
      "Evet. Faz 2’de Trendyol, Hepsiburada gibi platformlara API entegrasyonu planlandı. Siparişler, kargo durumu ve stok tek panelden yönetilebilecek.",
  },
  {
    question: "Mağaza tasarımını özelleştirebilir miyim?",
    answer:
      "Evet. Hazır tema şablonları ve 'kendi temanı oluştur' seçeneği ile mağazanızın renklerini, yazı tiplerini ve buton stillerini belirleyebilirsiniz.",
  },
  {
    question: "SEO desteğiniz var mı?",
    answer:
      "SEO modülü sayesinde mağazanız Google’da daha görünür hale gelir. Ürün sayfaları ve başlıklar arama motorları için optimize edilir.",
  },
  {
    question: "Sizi diğer sistemlerden ayıran nedir?",
    answer:
      "Biz bir pazar yeri değiliz. Her kullanıcıya kendi işini yönetebileceği bir sistem sunarız. Mağaza, müşteri verisi, kontrol ve büyüme stratejisi satıcının elindedir.",
  },
  {
    question: "Sistemi kimler kullanabilir?",
    answer:
      "Dijitalde işini büyütmek isteyen tüm bireysel satıcılar, küçük işletmeler ve hizmet sağlayıcılar. Teknik bilgi gerekmeden mağaza kurup sipariş yönetebilirsiniz.",
  },
];

export default function FaqList() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  return (
    <motion.section
      id="faq"
      className="py-16 bg-background px-4"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="heading-xl text-center mb-8">Sıkça Sorulan Sorular</h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq, i) => (
          <FaqItem
            key={i}
            index={i}
            {...faq}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        ))}
      </div>
    </motion.section>
  );
}
