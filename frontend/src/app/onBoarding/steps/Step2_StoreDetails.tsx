"use client";
import { OnboardingState } from "../../../lib/redux/slices/onBoarding.Slice";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Step2Schema, Step2Data } from "../validation/store-details.schema";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../lib/redux/store";
import { setField } from "../../../lib/redux/slices/onBoarding.Slice";
import { StepProps } from "../types/onboardingPageTypes";

export default function Step2_StoreDetails({ currentStepMetadata }: StepProps) {
  const dispatch = useDispatch();
  const { storeName, slogan, category, bio } = useSelector(
    (state: RootState) => state.onBoarding
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Step2Data>({
    resolver: zodResolver(Step2Schema),
    defaultValues: {
      storeName,
      slogan,
      category,
      bio,
    },
    mode: "onChange",
  });

  const categories = [
    { id: "clothing", value: "clothing", label: "Giyim" },
    { id: "jewelry", value: "jewelry", label: "Takı" },
    { id: "digital", value: "digital", label: "Dijital Ürün" },
    { id: "service", value: "service", label: "Hizmet" },
    { id: "other", value: "other", label: "Diğer" },
  ];

  console.log(storeName, slogan, category, bio);

  const onSubmit = (data: Step2Data) => {
    // Valid ise Redux'a yaz
    Object.entries(data).forEach(([key, value]) => {
      dispatch(
        setField({
          key: key as keyof OnboardingState,
          value,
        })
      );
    });
  };

  return (
    <div className="space-y-5 p-4">
      <h2 className="text-2xl font-semibold">Mağazanızı Tanımlayın</h2>
      <p className="text-muted-foreground">
        Mağaza isminizi, alanınızı ve kimliğinizi belirleyelim.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div>
          <Label>Mağaza Adı</Label>
          <Input {...register("storeName")} className="py-3 mt-1" />
          {errors.storeName && (
            <p className="text-red-500 text-sm">{errors.storeName.message}</p>
          )}
        </div>

        <div>
          <Label>Slogan</Label>
          <Input
            {...register("slogan")}
            placeholder="İsteğe bağlı"
            className="py-3 mt-1"
          />
          {errors.slogan && (
            <p className="text-red-500 text-sm">{errors.slogan.message}</p>
          )}
        </div>
        <div>
          <Label>Kategori</Label>
          <Select
            defaultValue={category}
            onValueChange={(value) => {
              setValue("category", value); // ✅ react-hook-form'a yaz
              dispatch(setField({ key: "category", value })); // ✅ Redux'a yaz
            }}
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
            onFileSelected={() =>
              dispatch(setField({ key: "logo", value: 'file' }))
            }
          />
        </div>

        <div>
          <Label>Mağaza Açıklaması</Label>
          <Textarea
            {...register("bio")}
            placeholder="300 karaktere kadar mağaza açıklaması"
            className="h-28 mt-1"
          />
          {errors.bio && (
            <p className="text-red-500 text-sm">{errors.bio.message}</p>
          )}
        </div>
      </form>
      {currentStepMetadata && (
        <p className="text-sm text-muted-foreground text-right underline hover:text-primary cursor-pointer">
          Bu adımı daha sonra tamamlamak için ileri butonuna basabilirsiniz.
        </p>
      )}
    </div>
  );
}
