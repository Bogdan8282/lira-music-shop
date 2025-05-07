import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../api";

function EditPost() {
  const { id } = useParams();
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
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.title);
        setDesc(data.desc);
        setContent(data.content);
      });
  }, [id, navigate]);

  if (!user) return <div>Loading...</div>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("desc", desc);
    formData.append("content", content);
    if (image) formData.append("image", image);

    try {
      await API.put(`/posts/${id}`, formData);
      navigate("/admin");
    } catch (err) {
      console.error(
        "Не вдалося оновити пост:",
        err.response?.status,
        err.message
      );
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/login");
      }
    }
  };

  return (
    <main className="wrapper">
      <h1 className="text-2xl font-bold mb-4">Редагувати пост</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2"
          required
        />
        <input
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          className="border p-2"
          required
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2"
          required
        ></textarea>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded self-start"
        >
          Оновити
        </button>
      </form>
    </main>
  );
}

export default EditPost;
