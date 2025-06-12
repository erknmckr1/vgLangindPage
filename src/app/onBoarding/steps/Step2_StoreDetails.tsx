"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectItem } from "@/components/ui/select";
import { UploadDropzone } from "@/app/components/custom/UploadDropzone";
import {
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
type Form = {
  storeName: string;
  slogan: string;
  category: string;
  bio: string;
  logo: File | null;
};

export default function Step2_StoreDetails() {
  const [form, setForm] = useState<Form>({
    storeName: "",
    slogan: "",
    category: "",
    bio: "",
    logo: null,
  });

  const categories = [
    { id: "clothing", value: "clothing", label: "Giyim" },
    { id: "jewelry", value: "jewelry", label: "Takı" },
    { id: "digital", value: "digital", label: "Dijital Ürün" },
    { id: "service", value: "service", label: "Hizmet" },
    { id: "other", value: "other", label: "Diğer" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-5  p-4">
      <h2 className="text-2xl font-semibold">Mağazanızı Tanımlayın</h2>
      <p className="text-muted-foreground">
        Mağaza isminizi, alanınızı ve kimliğinizi belirleyelim.
      </p>

      <div className="grid gap-4">
        <div>
          <Label>Mağaza Adı</Label>
          <Input
            name="storeName"
            value={form.storeName}
            onChange={handleChange}
            className="py-3 mt-1"
          />
        </div>

        <div>
          <Label>Slogan</Label>
          <Input
            name="slogan"
            value={form.slogan}
            onChange={handleChange}
            placeholder="İsteğe bağlı"
            className="py-3 mt-1"
          />
        </div>

        <div>
          <Label>Kategori</Label>
          {/* select */}
          <Select
            value={form.category}
            onValueChange={(value) =>
              setForm((prev) => ({ ...prev, category: value }))
            }
          >
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Kategori seçin" />
            </SelectTrigger>

            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {/* logo */}
        <div>
          <Label className="mb-1">Logo Yükle</Label>
          <UploadDropzone
            onFileSelected={(file) => setForm({ ...form, logo: file })}
          />
        </div>

        <div>
          <Label>Mağaza Açıklaması</Label>
          <Textarea
            name="bio"
            value={form.bio}
            onChange={handleChange}
            placeholder="300 karaktere kadar mağaza açıklaması"
            className="h-28 mt-1"
          />
        </div>
      </div>
    </div>
  );
}
