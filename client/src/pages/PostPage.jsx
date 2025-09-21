import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { formatDistanceToNow, format } from "date-fns";
import { uk } from "date-fns/locale";
import ReactMarkdown from "react-markdown";

function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`/api/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <div>Завантаження...</div>;

  function formatPostDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

    if (diffInDays > 365) {
      return formatDistanceToNow(date, { addSuffix: true, locale: uk });
    } else if (diffInDays > 30) {
      return formatDistanceToNow(date, { addSuffix: true, locale: uk });
    } else if (diffInDays > 7) {
      return format(date, "d MMM", { locale: uk });
    } else {
      return formatDistanceToNow(date, { addSuffix: true, locale: uk });
    }
  }

  function estimateReadingTime(text) {
    const charactersPerMinute = 1000;
    const minutes = Math.ceil(text.length / charactersPerMinute);
    return `${minutes} хв`;
  }

  return (
    <main className="wrapper px-12 flex flex-col gap-8">
      <div className="flex gap-5">
        {post.image && (
          <img
            src={`http://localhost:5000${post.image}`}
            alt="post"
            className="w-full max-w-1/2 max-h-[460px] object-cover rounded-lg"
          />
        )}
        <div className="flex flex-col gap-5 w-full max-w-1/2 justify-center">
          <h1 className="text-2xl font-bold">{post.title}</h1>
          <p className="text-xl">{post.desc}</p>
          {post.author?.username && (
            <div className="flex gap-2 items-center">
              {post.author.profilePicture && (
                <img
                  src={`${post.author.profilePicture}`}
                  alt="author"
                  className="inline-block ml-2 w-9 h-9 rounded-full"
                />
              )}
              <div className="flex flex-col">
                <span className="font-medium text-base">
                  {post.author.username}
                </span>
                <span className="text-gray-500 text-xs">
                  {formatPostDate(post.createdAt)} &bull;{" "}
                  {estimateReadingTime(post.content)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="article prose max-w-none flex flex-col gap-2 text-lg">
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <Link to="/" className="btn">
        На головну
      </Link>
    </main>
  );
}

export default PostPage;
