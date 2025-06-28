"use client";
import { ChangeEvent } from "react";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../../../components/ui/select";
import { UploadDropzone } from "../../components/custom/UploadDropzone";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";
import { setField } from "../../../lib/redux/slices/onBoarding.Slice";
import { StepProps } from "../../types/onboardingPageTypes";

export default function Step2_StoreDetails({ currentStepMetadata }: StepProps) {
  const dispatch = useDispatch();
  const { storeName, slogan, category, bio } = useSelector(
    (state: RootState) => state.onBoarding,
  );

  const categories = [
    { id: "clothing", value: "clothing", label: "Giyim" },
    { id: "jewelry", value: "jewelry", label: "Takı" },
    { id: "digital", value: "digital", label: "Dijital Ürün" },
    { id: "service", value: "service", label: "Hizmet" },
    { id: "other", value: "other", label: "Diğer" },
  ];

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    dispatch(setField({ key: name as keyof RootState["onBoarding"], value }));
  };

  return (
    <div className="space-y-5 p-4">
      <h2 className="text-2xl font-semibold">Mağazanızı Tanımlayın</h2>
      <p className="text-muted-foreground">
        Mağaza isminizi, alanınızı ve kimliğinizi belirleyelim.
      </p>

      <div className="grid gap-4">
        <div>
          <Label>Mağaza Adı</Label>
          <Input
            name="storeName"
            value={storeName}
            onChange={handleChange}
            className="py-3 mt-1"
          />
        </div>

        <div>
          <Label>Slogan</Label>
          <Input
            name="slogan"
            value={slogan}
            onChange={handleChange}
            placeholder="İsteğe bağlı"
            className="py-3 mt-1"
          />
        </div>

        <div>
          <Label>Kategori</Label>
          <Select
            value={category}
            onValueChange={(value) =>
              dispatch(setField({ key: "category", value }))
            }
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat.id} value={cat.value}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="mb-1">Logo Yükle</Label>
          <UploadDropzone
            onFileSelected={(file) =>
              dispatch(setField({ key: "logo", value: file }))
            }
          />
        </div>

        <div>
          <Label>Mağaza Açıklaması</Label>
          <Textarea
            name="bio"
            value={bio}
            onChange={handleChange}
            placeholder="300 karaktere kadar mağaza açıklaması"
            className="h-28 mt-1"
          />
        </div>
      </div>
      {currentStepMetadata && (
        <p className="text-sm text-muted-foreground text-right underline hover:text-primary cursor-pointer">
          Bu adımı daha sonra tamamlamak için ileri butonuna basabilirsiniz.
        </p>
      )}
    </div>
  );
}
