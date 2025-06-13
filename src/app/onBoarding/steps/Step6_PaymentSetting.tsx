import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type PaymentSettingProps = {
  invoiceTitle: string;
  iban: string;
  bankName: string;
  taxId: string;
  isCompany: boolean;
};

export default function Step6_PaymentSetting() {
  const [paymentSetting, setPaymentSetting] = useState<PaymentSettingProps>({
    invoiceTitle: "", // ileride step5'ten alınacak
    iban: "",
    bankName: "",
    taxId: "",
    isCompany: false, // ileride step5'ten alınacak
  });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentSetting((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const inputFields = [
    {
      id: 0,
      name: "invoiceTitle",
      title: "Fatura Başlığı",
      placeholder: "Firma Adı ya da Ad Soyad",
      type: "text",
      value: paymentSetting.invoiceTitle,
      onChange: handleFormChange,
      className: "py-3 mt-1",
      required: true,
    },
    {
      id: 1,
      name: "iban",
      title: "IBAN",
      type: "text",
      placeholder: "TR00 0000 0000 0000 0000 0000 00",
      value: paymentSetting.iban,
      onChange: handleFormChange,
      className: "py-3 mt-1",
      required: true,
    },
    {
      id: 2,
      name: "bankName",
      title: "Banka Adı",
      type: "text",
      placeholder: "Örn: Ziraat Bankası",
      value: paymentSetting.bankName,
      onChange: handleFormChange,
      className: "py-3 mt-1",
      required: true,
    },
    {
      id: 3,
      name: "taxId",
      title: "Vergi No / TCKN",
      type: "text",
      placeholder: "Vergi Kimlik No",
      value: paymentSetting.taxId,
      onChange: handleFormChange,
      className: "py-3 mt-1",
      required: true,
    },
  ];

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">
        Ödeme alabilmeniz ve faturalandırma işlemleriniz için aşağıdaki
        bilgileri doldurun.
      </p>
      <form className="grid gap-4">
        {inputFields.map((field) => (
          <div key={field.id}>
            <Label>{field.title}</Label>
            <Input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              value={field.value}
              onChange={field.onChange}
              className={field.className}
              required={field.required}
            />
          </div>
        ))}
      </form>
      <p className="text-sm text-muted-foreground">
        Bu bilgiler, ödeme işlemleri ve faturalandırma için kullanılacaktır.
      </p>
      <p className="text-sm text-muted-foreground text-right underline hover:text-primary cursor-pointer">
        Bu adımı daha sonra tamamla...
      </p>
    </div>
  );
}
