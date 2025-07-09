// 📁 PaymentSettingsForm.tsx
"use client";
import { useState } from "react";
import BillingForm from "src/features/settings/billing-info/CreateBillingForm";
import BillingAccountList from "src/features/settings/billing-info/BillingAccountList";
import { useSelector } from "react-redux";
import { RootState } from "src/lib/redux/store";
export default function PaymentSettingsForm() {
  const [selectedPrimary, setSelectedPrimary] = useState<string | null>(null);
  const { billingInfo } = useSelector((state: RootState) => state.billingInfo);
  return (
    <div className="flex gap-8 border p-6 rounded-lg shadow bg-background h-[500px] overflow-y-auto">
      <div className="w-1/2">
        <BillingForm />
      </div>
      <div className="w-1/2">
        <BillingAccountList
          accounts={billingInfo || []}
          selectedPrimary={selectedPrimary}
          onPrimaryChange={(iban) => setSelectedPrimary(iban)}
        />
      </div>
    </div>
  );
}
