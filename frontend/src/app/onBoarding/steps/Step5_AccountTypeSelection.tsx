"use client";
import { CheckCircle2 } from "lucide-react";
import { cn } from "../../../lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";
import { setField } from "../../../lib/redux/slices/onBoarding.Slice";
const accountTypes = [
  {
    id: "individual",
    title: "Bireysel Hesap",
    description:
      "Bireysel şirket sahibi olmayan kişiler için uygundur. Kendi adınıza ödeme alabilirsiniz.",
  },
  {
    id: "corporate",
    title: "Kurumsal Hesap",
    description:
      "Şirketler ve tüzel kişilikler için uygundur. Sanal POS, Fiziki POS, Link Yöntemi gibi tüm ödeme çözümlerini kullanabilirsiniz.",
  },
];

export default function Step5_AccountTypeSelection() {
  const dispatch = useDispatch();
  const { accountType } = useSelector((state: RootState) => state.onBoarding);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Hesap Tipinizi Seçin</h2>
      <p className="text-muted-foreground">
        Ödeme altyapınızı yapılandırabilmemiz için size uygun hesap tipini
        belirtin.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {accountTypes.map((type) => (
          <button
            key={type.id}
            type="button"
            onClick={() =>
              dispatch(setField({ key: "accountType", value: type.id }))
            }
            className={cn(
              "border relative text-left rounded p-4 hover:bg-accent transition flex items-start gap-3",
              accountType === type.id && "border-primary bg-muted/70",
            )}
          >
            <div className="flex-1">
              <div className="font-semibold text-base text-foreground">
                {type.title}
              </div>
              <div className="text-sm text-muted-foreground">
                {type.description}
              </div>
            </div>
            {accountType === type.id && (
              <CheckCircle2 className="absolute top-2 right-2 text-primary bg-muted rounded-rounded" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
