import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function AddPost() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

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
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    formData.append("image", image);

    try {
      await API.post("/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/posts");
    } catch (err) {
      console.error(
        "Помилка при додаванні поста:",
        err.response?.data || err.message
      );
    }
  };

  return (
    <main className="wrapper">
      <h1 className="text-2xl font-bold mb-4">Додати пост</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Назва"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="text"
          placeholder="Короткий опис"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border p-2"
          required
        />
        <textarea
          placeholder="Текст"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2"
          required
        ></textarea>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          Опублікувати
        </button>
        <div>
          <Link
            to="/admin/posts"
            className="bg-red-500 text-white px-4 py-2 rounded w-full"
          >
            Назад
          </Link>
        </div>
      </form>
    </main>
  );
}

export default AddPost;
