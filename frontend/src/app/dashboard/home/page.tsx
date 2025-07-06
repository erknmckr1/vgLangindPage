"use client";

import StatCard from "./components/StatCards";
import {
  PackageIcon,
  DollarSignIcon,
  UsersIcon,
  Sparkles,
  Bell,
} from "lucide-react";
import FadeInSection from "../../components/ui/FadeInSection";
import RecentOrders from "./components/RecentOrders";
import StockAlerts from "./components/StockAlert";
import ProductPerformanceSummary from "./components/ProductPerformanceSummary";

const statCardsProps = [
  {
    title: "Toplam Ürün",
    value: 124,
    icon: <PackageIcon />,
  },
  {
    title: "Bu Ayki Gelir",
    value: "₺12.540",
    icon: <DollarSignIcon />,
  },
  {
    title: "Yeni Müşteri",
    value: 37,
    icon: <UsersIcon />,
  },
  {
    title: "Toplam Ürün",
    value: 124,
    icon: <PackageIcon />,
  },
  {
    title: "Bu Ayki Gelir",
    value: "₺12.540",
    icon: <DollarSignIcon />,
  },
  {
    title: "Yeni Müşteri",
    value: 37,
    icon: <UsersIcon />,
  },
];

export default function DashboardHome() {
  return (
    <div className="lg:p-6">
      <FadeInSection>
        {/* HEADER START */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 w-full max-w-full">
          {/* USER INFO */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Hoş geldiniz, Erkan!</h2>
              <Sparkles className="w-6 h-6 text-yellow-400 animate-pulse" />
            </div>
            <p className="text-sm text-muted-foreground">
              Bugünkü özet aşağıda seni bekliyor.
            </p>
            <p className="text-sm text-muted-foreground">
              {/* {new Date().toLocaleDateString("tr-TR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })} */}
            </p>
            <p className="text-xs text-muted-foreground">
              İstanbul, 24°C Güneşli
            </p>
          </div>

          {/* NOTIFICATION BUTTON */}
          <button
            className="text-yellow-600 hover:text-yellow-400 p-2 rounded-lg transition hover:bg-yellow-100"
            title="Bildirimler"
          >
            <Bell className="w-6 h-6" />
          </button>
        </div>
        {/* HEADER END */}

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCardsProps.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              className="px-4 py-8"
            />
          ))}
        </div>
        {/* STAT CARDS END */}
        <RecentOrders />
        <StockAlerts />
        <ProductPerformanceSummary />
      </FadeInSection>
    </div>
  );
}
