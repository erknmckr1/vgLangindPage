"use client";

import { AlertTriangle } from "lucide-react";
import Link from "next/link";
const lowStockItems = [
  { name: "Kablosuz Klavye", stock: 4 },
  { name: "Gaming Mouse", stock: 7 },
  { name: "USB-C Adaptör", stock: 2 },
];

export default function StockAlerts() {
  return (
    <div className="mt-10 bg-card p-6 rounded-xl shadow-sm border">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-red-600">Stok Uyarıları</h3>
        <div className="flex items-center gap-x-2">
          <span className="text-sm text-muted-foreground">
            {lowStockItems.length} kritik ürün
          </span>
          <Link href={""} className="text-sm text-muted-foreground underline">
            stokları gör
          </Link>
        </div>
      </div>

      <div className="space-y-3">
        {lowStockItems.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-red-50 p-3 rounded-md border border-red-100"
          >
            <div className="flex items-center gap-3">
              <AlertTriangle className="text-red-500 w-5 h-5" />
              <span className="text-sm font-medium text-red-700">
                {item.name}
              </span>
            </div>
            <span className="text-sm font-semibold text-red-600">
              {item.stock} adet kaldı
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
