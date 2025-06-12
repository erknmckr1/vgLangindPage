"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import "swiper/css";
import Image from "next/image";
import { Autoplay } from "swiper/modules";
import FadeInSection from "../../ui/FadeInSection";
import ImageModalWithSwiper from "./ImageCarouselModal";
export default function TemplateCarousel() {
  const themeImages = ["image1", "image2", "image3", "image4", "image5"];
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickImage = (index: number) => {
    setActiveIndex(index);
    setIsOpen(true);
  };
  return (
    <FadeInSection>
      <section className="py-16 bg-card">
        <h2 className="heading-xl text-foreground text-center mb-8 ">
          Mağaza Örnekleri
        </h2>

        <div className="max-w-5xl mx-auto px-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1.2}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            breakpoints={{
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3.2 },
            }}
          >
            {themeImages.map((tema, i) => (
              <SwiperSlide key={i}>
                <div className="bg-white p-4 rounded-xl shadow-md text-center hover:scale-110 cursor-pointer transition">
                  <Image
                    src={`/${tema}.png`}
                    alt={tema}
                    width={500}
                    height={300}
                    className="rounded-md mx-auto h-[400px] "
                    onClick={() => handleClickImage(i)}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <ImageModalWithSwiper
          images={themeImages}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          initialIndex={activeIndex}
        />
      </section>
    </FadeInSection>
  );
}
