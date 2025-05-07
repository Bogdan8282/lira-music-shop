import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import GallerySlider from "../components/GallerySlider";
import BlogSlider from "../components/BlogSlider";
import BlogVideo from "../components/BlogVideo";
import Footer from "../components/Footer";

function Home() {
  const myRef = useRef(null);
  const [posts, setPosts] = useState([]);

  const scrollToElement = () => {
    myRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <>
      <main>
        <div id="intro" className="intro wrapper mb-16">
          <div className="intro__wrap flex flex-col md:flex-row gap-14">
            <div className="intro__text flex flex-col justify-center gap-10 md:w-1/2 mb-10 md:mb-0">
              <h1>Майстерня музичних інструментів “Ліра”</h1>
              <p className="text-xl">
                Створюємо унікальні музичні шедеври на замовлення, виконуємо
                налаштування, фарбування та реставрацію – все, щоб ви
                насолоджувалися ідеальним звучанням!
              </p>
              <button className="btn" onClick={scrollToElement}>
                Детальніше
              </button>
            </div>
            <div className="intro__img md:w-1/2 max-h-[600px]">
              <img
                src="/craftsman-working1.jpg"
                alt="craftsman-working"
                className="intro__img-pic object-cover w-full h-full max-h-[400px] md:max-h-[560px] rounded-lg"
              />
            </div>
          </div>
        </div>
        <div id="about" className="about wrapper mb-16" ref={myRef}>
          <h2 className="mb-10 text-center">Про нас</h2>
          <div className="about__wrap flex flex-col-reverse md:flex-row gap-14">
            <div className="about__img md:w-1/2 max-h-[400px] md:max-h-[480px]">
              <img
                src="/guitar-setup.jpg"
                alt="guitar-setup"
                className="object-cover w-full h-full rounded-lg max-h-[400px] md:max-h-[480px]"
              />
            </div>
            <div className="about__text flex flex-col justify-center gap-5 md:w-1/2">
              <p>
                Майстерня “Ліра” – це команда професійних майстрів, які
                присвятили своє життя створенню унікальних музичних
                інструментів. Ми поєднуємо досвід минулих поколінь із сучасними
                технологіями, щоб кожен інструмент мав свій неповторний голос.
              </p>
              <ul className="flex flex-col">
                <li>➢ Працюємо понад 10 років</li>
                <li>➢ Використовуємо натуральні матеріали</li>
                <li>➢ Виготовляємо інструменти на замовлення</li>
              </ul>
              <p>
                Наші інструменти – це не просто дерево та струни. Це звук, що
                передає емоції, історію та культуру України.
              </p>
            </div>
          </div>
        </div>
        <GallerySlider />
        <div id="services" className="services wrapper mb-16">
          <h2 className="text-center mb-10">Послуги</h2>
          <div className="services__wrap">
            <ul className="services__list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <li className="service__item flex flex-col h-[500px] rounded-lg border border-gray-300 overflow-hidden">
                <img
                  src="/craftsman-working2.jpg"
                  alt="craftsman-working"
                  className="h-[248px] w-full object-cover"
                />
                <div className="service_text flex-1 px-5 py-8 flex flex-col gap-5 justify-center">
                  <h4 className="font-semibold text-lg">
                    Виготовлення інструментів на замовлення
                  </h4>
                  <p>
                    Ми створюємо скрипки, бандури, гітари, ліри та інші
                    унікальні інструменти за вашими побажаннями.
                  </p>
                </div>
              </li>
              <li className="service__item flex flex-col h-[500px] rounded-lg border border-gray-300 overflow-hidden">
                <img
                  src="/kobza.jpg"
                  alt="kobza"
                  className="max-h-[248px] h-full w-full object-cover rounded-t-lg"
                />
                <div className="service_text flex-1 p-5 flex flex-col gap-5 justify-center">
                  <h4 className="font-semibold text-lg">
                    Реставрація та ремонт
                  </h4>
                  <p>
                    Відновлюємо старовинні інструменти, замінюємо пошкоджені
                    деталі, налаштовуємо звук.
                  </p>
                </div>
              </li>
              <li className="service__item flex flex-col h-[500px] rounded-lg border border-gray-300 overflow-hidden">
                <img
                  src="/guitar-strings.jpg"
                  alt="guitar-strings"
                  className="max-h-[248px] h-full w-full object-cover rounded-t-lg"
                />
                <div className="service_text flex-1 px-5 py-8 flex flex-col gap-5 justify-center">
                  <h4 className="font-semibold text-lg">
                    Налаштування та обслуговування
                  </h4>
                  <p>
                    Правильне налаштування – це запорука чистого та виразного
                    звучання. Наші майстри подбають про це.
                  </p>
                </div>
              </li>
              <li className="service__item flex flex-col h-[500px] rounded-lg border border-gray-300 overflow-hidden">
                <img
                  src="/man-playing-harp.jpg"
                  alt="man-playing-harp"
                  className="max-h-[248px] h-full w-full object-cover rounded-t-lg"
                />
                <div className="service_text flex-1 px-5 py-8 flex flex-col gap-5 justify-center">
                  <h4 className="font-semibold text-lg">
                    Майстер-класи та консультації
                  </h4>
                  <p>
                    Проводимо навчальні зустрічі для тих, хто хоче пізнати
                    мистецтво створення музичних інструментів.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div id="search" className="search w-full mb-16">
          <div className="search__wrap px-10 text-center relative flex flex-col justify-center items-center bg-[url('/music-instruments.jpg')] bg-cover bg-center py-32 gap-5">
            <div className="absolute z-10 inset-0 bg-black/25"></div>
            <h2 className="text-white z-20">Зацікавили наші послуги?</h2>
            <p className="text-white z-20">
              Дізнайтесь чи є магазин “Ліра” у вашому місті!
            </p>
            <Link className="btn z-20 py-4 px-10" to="/search">
              Шукати
            </Link>
          </div>
        </div>
        <div id="blog" className="blog wrapper mb-16">
          <div className="blog__wrap">
            <h2 className="text-2xl text-center font-bold mb-10">Блог</h2>
            <div className="flex flex-col md:flex-row gap-5 md:gap-16 mb-10">
              <BlogVideo />
              <div className="flex flex-col md:w-1/2 gap-5 md:gap-10 justify-center">
                <h2>Як створити бандуру своїми руками?</h2>
                <p>
                  Бандура — український народний струнно-щипковий музичний
                  інструмент. Як його створюють майстри дивіться у відео.
                </p>
                <span className="flex gap-2.5 items-center">
                  <img
                    src="/author-pic.png"
                    alt="author-pic"
                    className="rounded-[999px] w-9 h-9 object-cover"
                  />
                  <div className="flex flex-col">
                    <span className="text-base font-medium">Богдан Сорокін</span>
                    <div className="flex gap-0.5 text-xs text-gray-400">
                      <span className="">25 лют.</span>
                      <div className="">•</div>
                      <span className="">7 хв.</span>
                    </div>
                  </div>
                </span>
              </div>
            </div>
            <BlogSlider posts={posts} />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Home;
