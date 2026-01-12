"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

export default function HeroSlider() {
  const slides = [
    { id: 1, image: "/assets/img/slider/banner-1.jpg", subtitle: "Accessories", discount: "40%" },
    { id: 2, image: "/assets/img/slider/banner-2.jpg", subtitle: "Accessories", discount: "35%" },
    { id: 3, image: "/assets/img/slider/banner-3.jpg", subtitle: "Accessories", discount: "45%" },
  ];

  return (
    <div className="h-[500px] rounded-lg overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{ delay: 5000 }}
        pagination={{ clickable: true }}
        loop
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <Image src={slide.image} alt={`Slide ${slide.id}`} fill className="object-cover" priority />

              <div className="absolute inset-0 flex items-center">
                <div className="px-12">
                  <p className="text-gray-600 mb-2">{slide.subtitle}</p>
                  <h2 className="text-5xl font-bold mb-6">
                    Up To <span className="text-pink-600">{slide.discount} Off</span>
                    <br />
                    latest Creations
                  </h2>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded hover:bg-gray-100 font-medium transition-colors"
                  >
                    Shop Now <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
