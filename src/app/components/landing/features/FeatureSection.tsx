'use client'
import FeaturesCard from "./FeaturedCard";
import { RocketIcon, ShieldCheckIcon, TrendingUpIcon } from "lucide-react";

// Özellik listesi
const features = [
  {
    icon: <RocketIcon />,
    title: "Hızlı Kurulum",
    description: "Dakikalar içinde mağazanızı kurun.",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Güvenli Ödeme",
    description: "İyzico & PayTR ile entegre.",
  },
  {
    icon: <TrendingUpIcon />,
    title: "Satış Analizi",
    description: "Gerçek zamanlı kâr & ciro takibi.",
  },
  {
    icon: <RocketIcon />,
    title: "Sipariş Otomasyonu",
    description: "Siparişten tahsilata tüm süreçler otomatik.",
  },
  {
    icon: <ShieldCheckIcon />,
    title: "Alt Alan Adı (Subdomain)",
    description: "Her satıcıya özel mağaza adresi ile marka inşası.",
  },
  {
    icon: <RocketIcon />,
    title: "Raporlama Paneli",
    description: "İş zekâsı paneli ile en çok satan ürünleri takip edin.",
  },
];

// Infinite scroll için 3 kat çoğaltıyoruz
const duplicatedFeatures = [...features, ...features, ...features];

export default function FeaturesSection() {
    return (
    <div id="features" className="group overflow-hidden bg-background py-20">
      <div className="whitespace-nowrap flex gap-10 animate-marquee group-hover:[animation-play-state:paused]">
        {duplicatedFeatures.map((f, i) => (
          <div
            key={i}
            className="inline-block transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <FeaturesCard {...f} index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}
