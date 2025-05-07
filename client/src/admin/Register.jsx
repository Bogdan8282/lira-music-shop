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
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <input
          placeholder="Profile Picture URL"
          onChange={(e) => setForm({ ...form, profilePicture: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
      <Link to="/login">Login instead</Link>
    </>
  );
}
