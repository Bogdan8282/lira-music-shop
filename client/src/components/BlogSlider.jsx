import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import { formatDistanceToNow, format } from "date-fns";
import { uk } from "date-fns/locale";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./BlogSlider.css";

function formatPostDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  if (diffInDays > 365) {
    return formatDistanceToNow(date, { addSuffix: true, locale: uk });
  } else if (diffInDays > 30) {
    return formatDistanceToNow(date, { addSuffix: true, locale: uk });
  } else if (diffInDays > 7) {
    return format(date, "d MMM", { locale: uk });
  } else {
    return formatDistanceToNow(date, { addSuffix: true, locale: uk });
  }
}

function estimateReadingTime(text) {
  const charactersPerMinute = 1000;
  const minutes = Math.ceil(text.length / charactersPerMinute);
  return `${minutes} хв`;
}

const PostSlider = ({ posts }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);

  useEffect(() => {
    if (
      swiperRef.current &&
      swiperRef.current.params &&
      swiperRef.current.params.navigation
    ) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  if (!posts || posts.length === 0) {
    return (
      <p className="text-gray-500 text-center">Упс! Блог поки що пустий.</p>
    );
  }

  return (
    <div className="relative w-full posts">
      <button
        ref={prevRef}
        className="arrow-prev absolute top-1/2 -translate-y-1/2 z-10"
      >
        <ChevronLeft size={60} strokeWidth={1.5} />
      </button>
      <button
        ref={nextRef}
        className="arrow-next absolute top-1/2 -translate-y-1/2 z-10"
      >
        <ChevronRight size={60} strokeWidth={1.5} />
      </button>
      <Swiper
        className="w-full post-slider"
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={40}
        slidesPerView={1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        loop={posts.length > 3}
        breakpoints={{
          800: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
        }}
      >
        {posts.map((post) => (
          <SwiperSlide key={post._id} className="rounded">
            <Link
              to={`/post/${post._id}`}
              className="no-underline hover:no-underline flex flex-col gap-5"
            >
              {post.image && (
                <img
                  src={`http://localhost:5000${post.image}`}
                  alt="preview"
                  className="w-full object-cover h-[210px] rounded-lg"
                />
              )}
              <h2 className="text-xl text-black font-semibold">{post.title}</h2>
              <p className="text-lg text-black mb-2">{post.desc}</p>
              {post.author?.username && (
                <div className="flex gap-2 items-center">
                  {post.author.profilePicture && (
                    <img
                      src={`${post.author.profilePicture}`}
                      alt="author"
                      className="inline-block ml-2 w-9 h-9 rounded-full"
                    />
                  )}
                  <div className="flex flex-col">
                    <span className="font-medium text-base">{post.author.username}</span>
                    <span className="text-gray-500 text-xs">
                      {formatPostDate(post.createdAt)} &bull;{" "}
                      {estimateReadingTime(post.content)}
                    </span>
                  </div>
                </div>
              )}
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PostSlider;
