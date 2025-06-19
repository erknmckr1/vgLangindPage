// src/app/components/ProductPerformanceSummary.tsx

"use client";

import Image from "next/image";
import { TrendingUp, Eye, AlertCircle } from "lucide-react";

const performanceCards = [
  {
    title: "En Çok Satan Ürün",
    productName: "Siyah T-Shirt",
    salesCount: 124,
    revenue: "₺3.720",
    icon: <TrendingUp className="w-5 h-5 text-green-600" />,
    image: "/avatar.png",   
  },
  {
    title: "En Çok Görüntülenen Ürün",
    productName: "Oversize Hoodie",
    views: 980,
    icon: <Eye className="w-5 h-5 text-blue-500" />,
    image: "/avatar.png",
  },
  {
    title: "Düşük Stok - Yüksek Talep",
    productName: "Minimal Cüzdan",
    remainingStock: 5,
    lastWeekSales: 48,
    icon: <AlertCircle className="w-5 h-5 text-yellow-500" />,
    image: "/avatar.png",
  },
];

export default function ProductPerformanceSummary() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {performanceCards.map((card, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-4 border rounded-lg bg-card shadow-sm"
        >
          <div className="relative w-16 h-16 shrink-0">
            <Image
              src={card.image}
              alt={card.productName}
              layout="fill"
              objectFit="cover"
              className="rounded"
            />
          </div>
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 text-sm font-semibold">
              {card.icon}
              <span>{card.title}</span>
            </div>
            <p className="text-sm text-muted-foreground">{card.productName}</p>
            <div className="text-xs text-muted-foreground mt-1">
              {card.salesCount && `Satış: ${card.salesCount}`}
              {card.revenue && ` • Gelir: ${card.revenue}`}
              {card.views && `Görüntülenme: ${card.views}`}
              {card.remainingStock !== undefined &&
                `Stok: ${card.remainingStock} • Son hafta: ${card.lastWeekSales} satış`}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
