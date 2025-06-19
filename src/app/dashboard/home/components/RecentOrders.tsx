"use client";

import { PackageCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

const mockOrders = [
  {
    id: "#ORD-2456",
    customer: "Ahmet Yıldız",
    product: "Kablosuz Mouse",
    total: "₺249,90",
    date: "17 Haziran 2025",
    status: "onaylandı",
  },
  {
    id: "#ORD-2457",
    customer: "Zeynep Aksoy",
    product: "Bluetooth Kulaklık",
    total: "₺499,00",
    date: "17 Haziran 2025",
    status: "beklemede",
  },
  {
    id: "#ORD-2458",
    customer: "Mehmet Şahin",
    product: "Laptop Soğutucu",
    total: "₺179,90",
    date: "16 Haziran 2025",
    status: "onaylandı",
  },
];

export default function RecentOrders() {
  const todayCount = mockOrders.filter((o) =>
    o.date.includes("17 Haz")
  ).length;

  return (
    <div className="mt-10 bg-card p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Son Siparişler</h3>
        <span className="text-sm text-muted-foreground">
          Bugün {todayCount} yeni sipariş
        </span>
      </div>

      {/* Masaüstü için Tablo */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm text-left table-fixed">
          <thead>
            <tr className="text-muted-foreground border-b">
              <th className="py-2 w-[100px] whitespace-nowrap">Sipariş No</th>
              <th className="w-[120px] whitespace-nowrap">Müşteri</th>
              <th className="w-[160px] whitespace-nowrap">Ürün</th>
              <th className="w-[100px] whitespace-nowrap">Tutar</th>
              <th className="w-[120px] whitespace-nowrap">Tarih</th>
              <th className="w-[120px] whitespace-nowrap">Durum</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-muted/30 transition">
                <td className="py-2 whitespace-nowrap">{order.id}</td>
                <td className="whitespace-nowrap">{order.customer}</td>
                <td className="whitespace-nowrap">{order.product}</td>
                <td className="whitespace-nowrap">{order.total}</td>
                <td className="whitespace-nowrap">{order.date}</td>
                <td className="whitespace-nowrap">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium",
                      order.status === "onaylandı"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    )}
                  >
                    {order.status === "onaylandı" ? (
                      <PackageCheck className="w-4 h-4" />
                    ) : (
                      <Clock className="w-4 h-4" />
                    )}
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobil için Kart Görünüm Daha sornada değiştirilebilir...  */}
      <div className="space-y-4 sm:hidden">
        {mockOrders.map((order) => (
          <div key={order.id} className="border rounded-md p-4 bg-muted shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">{order.id}</span>
              <span
                className={cn(
                  "inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium",
                  order.status === "onaylandı"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                )}
              >
                {order.status === "onaylandı" ? (
                  <PackageCheck className="w-4 h-4" />
                ) : (
                  <Clock className="w-4 h-4" />
                )}
                {order.status}
              </span>
            </div>
            <p className="text-sm mt-1">{order.customer}</p>
            <p className="text-xs text-muted-foreground">{order.product}</p>
            <p className="text-sm mt-2">
              {order.total} - {order.date}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
