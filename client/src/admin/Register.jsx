import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    profilePicture: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/register", form);
      localStorage.setItem("token", res.data.token);
      navigate("/admin");
    } catch (err) {
      alert(err.response.data);
    }
  };

  return (
    <main className="wrapper">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5 mb-10">
        <input
          placeholder="Ім'я"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          placeholder="Пароль"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          placeholder="URL картинки профілю"
          onChange={(e) => setForm({ ...form, profilePicture: e.target.value })}
        />
        <button type="submit" className="btn">Зареєструватись</button>
      </form>
      <Link to="/login" className="link">Вже маєте акаунт? Увійти</Link>
    </main>
  );
}
