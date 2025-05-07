import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <div>Завантаження...</div>;

  return (
    <main className="wrapper flex flex-col gap-5">
      <h1 className="text-2xl font-bold">{post.title}</h1>
      {post.image && (
        <img
          src={`http://localhost:5000${post.image}`}
          alt="post"
          className="w-full max-h-[460px] object-cover rounded-lg"
        />
      )}
      <p className="">{post.content}</p>
      <Link to="/" className="btn">
        На головну
      </Link>
    </main>
  );
}

export default PostPage;
