import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-(--black)">
      <div className="wrapper min-w-full py-4 justify-between flex">
        <div className="flex font-[Kurale] gap-2 items-center">
          <img src="/lyre-bordo.svg" alt="logo" />
          <h2 className="text-4xl font-bold mb-1 text-(--accent)">Ліра</h2>
        </div>
        <div className="flex gap-5 items-center">
          <Link className="flex items-center">
            <img
              src="/twitter.svg"
              alt="twitter"
              className="hover:opacity-80 w-8"
            />
          </Link>
          <Link className="flex items-center">
            <img
              src="/instagram.svg"
              alt="instagram"
              className="hover:opacity-80 w-8"
            />
          </Link>
          <Link className="flex items-center">
            <img
              src="/youtube.svg"
              alt="youtube"
              className="hover:opacity-80 w-8"
            />
          </Link>
          <Link className="flex items-center">
            <img
              src="/facebook.svg"
              alt="facebook"
              className="hover:opacity-80 w-8"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
