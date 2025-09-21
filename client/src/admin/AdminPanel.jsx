import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api";

const AdminPanel = () => {
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

  return (
    <main className="wrapper flex flex-col gap-5">
      <h2>Панель адміністратора</h2>
      <div>
        <Link className="link" to="/admin/posts">
          Керувати блогом
        </Link>
      </div>
      <div>
        <Link className="link" to="/admin/search">
          Керувати пошуком
        </Link>
      </div>
    </main>
  );
};

export default AdminPanel;
