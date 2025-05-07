import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "./GallerySlider.css";

const slides = [
  "/craftsman-with-guitar.jpg",
  "/guitar-strings.jpg",
  "/man-playing-harp.jpg",
  "/craftsman-working3.jpg",
];

export default function CenteredSlider() {
  return (
    <div id="gallery" className="slider-container mb-16">
      <Swiper
        modules={[Navigation]}
        slidesPerView={1}
        centeredSlides={true}
        spaceBetween={20}
        navigation={true}
        loop={true}
        speed={400}
        breakpoints={{
          600: {
            slidesPerView: 1.5,
          },
          1000: {
            slidesPerView: 1.8,
          },
        }}
      >
        {slides.map((url, index) => (
          <SwiperSlide key={index}>
            <img src={url} alt={`Slide ${index}`} className="slide-image" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
