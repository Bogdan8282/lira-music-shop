import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

function BlogManager() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

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
    fetch("/api/posts")
      .then((res) => res.json())
      .then((data) => setPosts(data));
  }, [navigate]);

  if (!user) return <div>Loading...</div>;

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");

    const res = await fetch(`/api/posts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.status === 200) {
      setPosts(posts.filter((post) => post._id !== id));
    } else {
      console.error("Помилка видалення:", res.status);
    }
  };

  return (
    <main className="wrapper">
      <h2 className="text-2xl font-bold mb-4">Список постів</h2>
      <div className="mb-4">
        <Link to="/admin" className="bg-green-500 text-white px-3 py-1 rounded">
          Назад
        </Link>
      </div>
      <div className="mb-6">
        <Link
          to="/admin/add-post"
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Новий пост
        </Link>
      </div>
      {posts.map((post) => (
        <div
          key={post._id}
          className="flex justify-between items-center border p-2 mb-2"
        >
          <span>{post.title}</span>
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/admin/edit-post/${post._id}`)}
              className="bg-yellow-500 text-white px-3 py-1 rounded"
            >
              Редагувати
            </button>
            <button
              onClick={() => handleDelete(post._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Видалити
            </button>
          </div>
        </div>
      ))}
    </main>
  );
}

export default BlogManager;
