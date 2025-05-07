import React, { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { Menu } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-gray-300 z-50">
      <div className="wrapper min-w-full py-4 flex items-center justify-between relative">
        {/* Логотип */}
        <Link to="/" className="flex font-[Kurale] gap-2 items-center z-10">
          <img src="/lyre.svg" alt="logo" />
          <h2 className="text-4xl font-bold mb-1">Ліра</h2>
        </Link>

        {/* Навігація по центру (тільки для desktop) */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 gap-10 items-center">
          <HashLink smooth to="/#about" className="hover:opacity-80">
            Про нас
          </HashLink>
          <HashLink smooth to="/#gallery" className="hover:opacity-80">
            Галерея
          </HashLink>
          <HashLink smooth to="/#services" className="hover:opacity-80">
            Послуги
          </HashLink>
          <HashLink smooth to="/#blog" className="hover:opacity-80">
            Блог
          </HashLink>
        </nav>

        {/* Контакти (праворуч на desktop) */}
        <HashLink
          smooth
          to="/contacts"
          className="hidden md:flex gap-2 items-center hover:opacity-80 z-10"
        >
          Контакти
          <img src="/mail.svg" alt="mail-icon" className="my-auto" />
        </HashLink>

        {/* Бургер-меню (мобільний) */}
        <div className="md:hidden z-10">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <Menu size={30} className="mt-1" />
          </button>
        </div>
      </div>

      {/* Мобільне меню */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 p-4 bg-white border-t border-gray-200">
          <HashLink
            smooth
            to="/#about"
            onClick={() => setMenuOpen(false)}
            className="hover:opacity-80"
          >
            Про нас
          </HashLink>
          <HashLink
            smooth
            to="/#gallery"
            onClick={() => setMenuOpen(false)}
            className="hover:opacity-80"
          >
            Галерея
          </HashLink>
          <HashLink
            smooth
            to="/#services"
            onClick={() => setMenuOpen(false)}
            className="hover:opacity-80"
          >
            Послуги
          </HashLink>
          <HashLink
            smooth
            to="/#blog"
            onClick={() => setMenuOpen(false)}
            className="hover:opacity-80"
          >
            Блог
          </HashLink>
          <HashLink
            smooth
            to="/contacts"
            onClick={() => setMenuOpen(false)}
            className="flex gap-2 hover:opacity-80"
          >
            Контакти
            <img src="/mail.svg" alt="mail-icon" className="my-auto" />
          </HashLink>
        </div>
      )}
    </header>
  );
};

export default Header;
