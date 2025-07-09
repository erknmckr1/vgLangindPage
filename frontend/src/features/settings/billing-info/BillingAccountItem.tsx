"use client";
import { BillingAccount } from "src/features/settings/billing-info/types/billing";
interface BillingAccountItemProps {
  account: BillingAccount;
  isSelected: boolean;
  onSelect: () => void;
}

export default function BillingAccountItem({
  account,
  isSelected,
  onSelect,
}: BillingAccountItemProps) {
  return (
    <div className="border p-4 rounded-md bg-card shadow-sm space-y-2 overflow-y-auto text-xs">
      <p>
        <strong>Banka:</strong> {account.bankName}
      </p>
      <p>
        <strong>IBAN:</strong> {account.iban}
      </p>
      <p>
        <strong>Ünvan:</strong> {account.invoiceTitle}
      </p>
      <p>
        <strong>Vergi No:</strong> {account.taxId}
      </p>

      <div className="flex items-center gap-2">
        {account.isPrimary ? (
          <span className="text-green-600 font-medium flex items-center gap-1">
            ✅ Aktif Hesap
          </span>
        ) : (
          <>
            <input
              type="radio"
              name="primaryAccount"
              checked={isSelected}
              onChange={onSelect}
              className="cursor-pointer"
            />
            <span className="text-xs">Birincil Hesap Olarak Kullan</span>
          </>
        )}
      </div>
    </div>
  );
}
