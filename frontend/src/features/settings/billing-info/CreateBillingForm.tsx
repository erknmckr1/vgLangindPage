// 📁 BillingForm.tsx
"use client";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

export default function BillingForm() {
  return (
    <form className="space-y-4">
      <h2 className="text-xl font-semibold">Ödeme Ayarları</h2>
      <p className="text-sm text-muted-foreground">
        Mağazanız için ödeme bilgilerini girin.
      </p>

      <div className="space-y-2">
        <Label htmlFor="bank">Banka Adı</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Banka Seçin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ziraat">Ziraat Bankası</SelectItem>
            <SelectItem value="isbank">İş Bankası</SelectItem>
            <SelectItem value="garanti">Garanti BBVA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="iban">IBAN Numarası</Label>
        <Input id="iban" placeholder="TR00 0000 0000 0000 0000 00" />
      </div>

      <div className="space-y-2">
        <Label htmlFor="accountName">Hesap Sahibi</Label>
        <Input id="accountName" placeholder="Ad Soyad" />
      </div>

      <div className="space-y-2">
        <Label>Ödeme Sağlayıcı</Label>
        <Input
          value="PayTR (yakında)"
          readOnly
          className="bg-muted cursor-not-allowed"
        />
      </div>

      <Button type="submit">Kaydet</Button>
    </form>
  );
}
