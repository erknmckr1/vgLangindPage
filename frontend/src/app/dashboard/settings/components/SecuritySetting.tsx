// src/app/dashboard/settings/components/SecuritySettings.tsx

"use client";

import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";

export default function SecuritySettings() {
  return (
    <div className="space-y-6 border p-6 rounded-lg shadow bg-background h-[450px] ">
      <div>
        <h2 className="text-xl font-semibold">Hesap Güvenliği</h2>
        <p className="text-sm text-muted-foreground">
          Şifrenizi güncelleyin ve hesabınızı güvende tutun.
        </p>
      </div>

      <form className="space-y-4">
        {/* Eski Şifre */}
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Eski Şifre</Label>
          <Input
            id="currentPassword"
            type="password"
            placeholder="••••••••"
            className="h-10"
          />
        </div>

        {/* Yeni Şifre */}
        <div className="space-y-2">
          <Label htmlFor="newPassword">Yeni Şifre</Label>
          <Input
            id="newPassword"
            type="password"
            placeholder="En az 8 karakter"
            className="h-10"
          />
        </div>

        {/* Yeni Şifre Tekrar */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Yeni Şifre (Tekrar)</Label>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Şifreyi tekrar girin"
            className="h-10"
          />
        </div>

        <div>
          <Button type="submit">Şifreyi Güncelle</Button>
        </div>
      </form>
    </div>
  );
}
