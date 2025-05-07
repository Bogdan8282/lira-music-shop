import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./admin/Register";
import Login from "./admin/Login";
import Home from "./pages/Home";
import Contacts from "./pages/Contacts";
import SearchPage from "./pages/SearchPage";
import SearchManager from "./admin/SearchManager";
import PostPage from "./pages/PostPage";
import AddPost from "./admin/AddPost";
import EditPost from "./admin/EditPost";
import BlogManager from "./admin/BlogManager";
import AdminPanel from "./admin/AdminPanel";
import Header from "./components/Header"

function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />} />

        <Route path="/search" element={<SearchPage />} />
        <Route path="/admin/search" element={<SearchManager />} />

        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/admin/posts" element={<BlogManager />} />
        <Route path="/admin/add-post" element={<AddPost />} />
        <Route path="/admin/edit-post/:id" element={<EditPost />} />
      </Routes>
    </Router>
  );
}

export default App;
