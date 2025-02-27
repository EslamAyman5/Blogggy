import { useEffect, useState } from "react";
import axios from "axios";

const MyBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs/my-blogs", {
      headers: { Authorization: localStorage.getItem("token") }
    })
    .then((res) => setBlogs(res.data))
    .catch((err) => console.error(err));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: localStorage.getItem("token") }
      });

      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      console.error(err.response?.data || err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-12 p-6 bg-gray-900 text-white shadow-xl rounded-lg">
      <h1 className="text-4xl font-extrabold text-center mb-6">My Blogs</h1>

      {blogs.length === 0 ? (
        <div className="text-center text-gray-400 text-lg">
          <p>No blogs yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transform transition duration-300 hover:shadow-2xl"
            >
              {blog.image && (
                <img
                  src={`http://localhost:5000${blog.image}`}
                  alt="Blog Cover"
                  className="w-full h-48 object-cover rounded-lg"
                />
              )}

              <h3 className="text-2xl font-semibold text-white mt-4">
                {blog.title.length > 15 ? blog.title.slice(0, 15) + "..." : blog.title}
              </h3>

              <p className="text-gray-400 text-sm mt-1">
                Published on {" "}
                <span className="font-medium">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </p>

              <div className="mt-4 flex justify-between items-center">
                <div className="flex space-x-2">
                  <a href={`/edit-blog/${blog._id}`}>
                    <button
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>
                  </a>

                  <button
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                    onClick={() => handleDelete(blog._id)}
                  >
                    Delete
                  </button>
                </div>

                <a href={`/blogs/${blog._id}`} className="text-blue-400 hover:underline">
                  View Details →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;