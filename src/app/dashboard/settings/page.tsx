import StoreInfoForm from "./components/StoreInfoForm";
import ThemeSelector from "./components/ThemeSelector";
import SecuritySettings from "./components/SecuritySetting";
import PaymentSettingsForm from "./components/PaymentSettingForm";

export default function SettingPage() {
  return (
    <div className="space-y-6">
      {/* Üstte yer alan kutular: Mağaza + Güvenlik + Tema */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <div className="bg-card rounded-lg border p-1 lg:p-6 shadow-sm  ">
          <StoreInfoForm />
        </div>

        <div className="bg-card rounded-lg border p-1 lg:p-6 shadow-sm">
          <SecuritySettings />
        </div>

        <div className="bg-card rounded-lg border p-1 lg:p-6 shadow-sm">
          <ThemeSelector />
        </div>
        <div className="bg-card rounded-lg border p-1 lg:p-6 shadow-sm ">
          <PaymentSettingsForm />
        </div>
      </div>
    </div>
  );
}
  