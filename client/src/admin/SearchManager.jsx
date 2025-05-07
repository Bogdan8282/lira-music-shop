import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";
import { Link } from "react-router-dom";

function AdminPage() {
  const [places, setPlaces] = useState([]);
  const [form, setForm] = useState({ name: "", address: "", email: "" });
  const [editId, setEditId] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const fetchPlaces = async () => {
    const res = await API.get("http://localhost:5000/api/places");
    setPlaces(res.data);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get("/current");
        setUser(res.data);
      } catch (err) {
        console.error("Auth check failed", err.response?.status, err.message);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };
    fetchUser();
    fetchPlaces();
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      await API.put(`http://localhost:5000/api/places/${editId}`, form);
    } else {
      await API.post("http://localhost:5000/api/places", form);
    }
    setForm({ name: "", address: "", email: "" });
    setEditId(null);
    fetchPlaces();
  };

  const handleEdit = (place) => {
    setForm({ name: place.name, address: place.address, email: place.email });
    setEditId(place._id);
  };

  const handleDelete = async (id) => {
    await API.delete(`http://localhost:5000/api/places/${id}`);
    fetchPlaces();
  };

  return (
    <main className="wrapper flex flex-col gap-5">
      <h2>Керування закладами</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          placeholder="Назва"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Адреса"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          required
        />
        <input
          placeholder="Ел. пошта"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded self-start"
        >
          {editId ? "Оновити" : "Додати"}
        </button>
      </form>
      <Link
        to="/admin"
        className="bg-yellow-500 text-white py-2 px-4 rounded self-start"
      >
        Назад
      </Link>
      <ul className="flex flex-col gap-2">
        {places.map((place) => (
          <li key={place._id}>
            <strong>{place.name}</strong> – {place.address}{" "}
            <button
              onClick={() => handleEdit(place)}
              className="bg-yellow-500 text-white py-2 px-4 rounded self-start"
            >
              Редагувати
            </button>{" "}
            <button
              onClick={() => handleDelete(place._id)}
              className="bg-red-500 text-white py-2 px-4 rounded self-start"
            >
              Видалити
            </button>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default AdminPage;
