"use client";

import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
// import { Button } from "../../../../components/ui/button";
import { useSelector } from "react-redux";
import { RootState } from "src/lib/redux/store";
export default function StoreInfoForm() {
  const { phone, email, storeName } = useSelector(
    (state: RootState) => state.userInfo
  );
  const { billingInfo } = useSelector((state: RootState) => state.billingInfo);
  const isPrimaryBillingInfo = billingInfo?.find(
    (billingInfo) => billingInfo.isPrimary === true
  );
  return (
    <div className="space-y-6 border p-6 rounded-lg shadow bg-background h-auto lg:h-[450px]">
      <div>
        <h2 className="text-xl font-semibold">Mağaza Bilgileri</h2>
        <p className="text-sm text-muted-foreground">
          Mağazanıza ait temel bilgileri aşağıda görebilirsiniz.
        </p>
      </div>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Mağaza Adı - sadece okunabilir */}
        <div className="space-y-2">
          <Label htmlFor="storeName">Mağaza Adı</Label>
          <Input
            id="storeName"
            value={storeName ?? ""}
            readOnly
            className="bg-muted h-10 cursor-not-allowed"
          />
        </div>

        {/* Vergi Numarası - sadece okunabilir */}
        <div className="space-y-2">
          <Label htmlFor="taxNo">Vergi Numarası</Label>
          <Input
            id="taxNo"
            value={isPrimaryBillingInfo?.taxId ?? ""}
            readOnly
            className="bg-muted h-10  cursor-not-allowed"
          />
        </div>

        {/* Telefon Numarası */}
        <div className="space-y-2">
          <Label htmlFor="phone">Telefon Numarası</Label>
          <Input
            value={phone ?? ""}
           className="bg-muted h-10 cursor-not-allowed"
            readOnly
            id="phone"
            placeholder="0 (5xx) xxx xx xx"
          />
        </div>

        {/* E-posta */}
        <div className="space-y-2">
          <Label htmlFor="email">E-posta</Label>
          <Input
            value={email ?? ""}
            readOnly
            className="bg-muted h-10 cursor-not-allowed"
            id="email"
            placeholder="mail@ornek.com"
          />
        </div>

        {/* Adres */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="address">Mağaza Adresi</Label>
          <Input
            className="bg-muted h-10 cursor-not-allowed"
            id="address"
            placeholder="Adres bilgisi..."
          />
        </div>

        {/* <div className="md:col-span-2">
          <Button type="submit">Bilgileri Güncelle</Button>
        </div> */}
      </form>
    </div>
  );
}
