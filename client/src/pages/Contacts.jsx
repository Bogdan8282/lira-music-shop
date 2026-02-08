import React from "react";

const Contacts = () => {
  return (
    <main className="wrapper flex flex-col md:flex-row gap-10 mt-[82px] items-center h-[calc(100vh-82px)]">
      <div className="flex flex-col gap-5 md:w-1/2 justify-center">
        <h2>Зворотній зв'язок</h2>
        <p>
          Якщо у вас виникли питання, напишіть нам на електронну пошту і ми
          відповімо на протязі 2-х діб або зателефонуйте за номером вказаним нижче.
        </p>
        <ul>
          <li>Ел. пошта: lyre-shop@gmail.com</li>
          <li>Телефон: +38 (099) 281 82 04</li>
        </ul>
      </div>
      <img
        src="/man-playing-guitar.jpg"
        alt="man-playing-guitar"
        className="md:w-1/2 rounded-lg h-100"
      />
    </main>
  );
};

export default Contacts;
