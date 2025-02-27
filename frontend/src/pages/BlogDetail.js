import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!blog)
    return (
      <div className="text-center text-gray-400 mt-10 animate-pulse">
        Loading...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto p-8 mt-10 bg-gray-900 text-white rounded-2xl shadow-2xl transition-opacity duration-500 animate-fade-in">
      <div className="mb-4">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-lg shadow-md transition-all duration-200 hover:opacity-80"
        >
          ⬅ Back
        </button>
      </div>

      {blog.image && (
        <img
          src={`http://localhost:5000${blog.image}`}
          alt="Blog Cover"
          className="w-full h-80 object-cover rounded-xl shadow-lg transition-transform duration-300"
        />
      )}

      <h1 className="text-4xl font-bold mt-6 text-blue-400">{blog.title}</h1>
      <p className="text-gray-300 mt-2">
        By <span className="font-semibold text-white">{blog.author.name}</span>
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {blog.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-blue-600 text-white text-sm px-4 py-1 rounded-full shadow-md"
          >
            #{tag}
          </span>
        ))}
      </div>

      <p className="mt-6 text-gray-200 leading-relaxed text-lg">{blog.body}</p>

      <p className="text-sm text-gray-400 mt-6">
        Published on {new Date(blog.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default BlogDetail;
