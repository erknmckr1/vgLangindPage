// components/ImageModalWithSwiper.tsx
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "../../../../components/ui/dialog";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";

type Props = {
  images: string[];
  isOpen: boolean;
  onClose: () => void;
  initialIndex: number;
};

export default function ImageModalWithSwiper({
  images,
  isOpen,
  onClose,
  initialIndex,
}: Props) {
  console.log(isOpen, initialIndex);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] max-h-[90vh] w-full p-4 overflow-y-auto flex flex-col items-center justify-center">
        <DialogHeader>
          <DialogTitle>Mağaza Önizleme</DialogTitle>
          <DialogClose asChild></DialogClose>
        </DialogHeader>

        <Swiper
          key={initialIndex}
          modules={[Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop
          autoplay={{ delay: 3000 }}
          initialSlide={initialIndex}
          className="h-[700px] w-full mt-4" // ✨ Burası kritik!
        >
          {images.map((img, i) => (
            <SwiperSlide
              key={i}
              className="flex items-center justify-center h-full"
            >
              {" "}
              {/* 🧠 Yükseklik burada */}
              <Image
                src={`/${img}.png`}
                alt={`image-${i}`}
                width={800}
                height={500}
                className="rounded-xl object-contain"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </DialogContent>
    </Dialog>
  );
}
