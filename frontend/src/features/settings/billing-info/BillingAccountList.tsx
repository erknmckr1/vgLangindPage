// 📁 BillingAccountList.tsx
"use client";
import BillingAccountItem from "./BillingAccountItem";
import { BillingAccount } from "src/features/settings/billing-info/types/billing";
interface BillingAccountListProps {
  accounts: BillingAccount[];
  selectedPrimary: string | null;
  onPrimaryChange: (iban: string) => void;
}

export default function BillingAccountList({
  accounts,
  selectedPrimary,
  onPrimaryChange,
}: BillingAccountListProps) {
  if (!accounts || accounts.length === 0) {
    return (
      <p className="text-sm text-muted">Henüz kayıtlı banka hesabınız yok.</p>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Kayıtlı Hesaplar</h2>
      <p className="text-xs text-muted-foreground">
        Mevcut banka hesaplarınızı buradan görebilir ve birincil olanı
        seçebilirsiniz.
      </p>
      {accounts.map((item, idx) => (
        <BillingAccountItem
          key={idx}
          account={item}
          isSelected={selectedPrimary === item.iban}
          onSelect={() => onPrimaryChange(item.iban)}
        />
      ))}
    </div>
  );
}
