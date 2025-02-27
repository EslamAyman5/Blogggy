import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to add a blog.");
      return navigate("/login");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("body", body);
    formData.append("tags", tags);
    if (image) formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/blogs", formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });
      navigate("/");
    } catch (err) {
      if (err.response?.data?.errors) {
        setError(err.response.data.errors);
      } else {
        setError([{ msg: err.response?.data?.error || "Something went wrong" }]);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 mb-12 p-6 bg-gray-900 text-white shadow-xl rounded-lg transform transition duration-300 hover:shadow-2xl">
      <h2 className="text-4xl font-extrabold text-center mb-6">Add a New Blog</h2>
      {error.length > 0 && (
        <ul className="text-red-400 text-sm bg-red-800 p-3 rounded-lg mb-4">
          {error.map((err, index) => (
            <li key={index} className="mb-1">• {err.msg}</li>
          ))}
        </ul>
      )}
      <form className="space-y-6" onSubmit={handleSubmit}>
        <input
          className="bg-gray-800 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="bg-gray-800 p-4 w-full rounded-lg resize-none h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your blog content here..."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
        <input
          className="bg-gray-800 p-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <input
          className="bg-gray-800 p-4 w-full rounded-lg file:bg-blue-500 file:text-white file:px-4 file:py-2 file:rounded-lg file:border-none file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          className="bg-blue-600 text-white text-lg font-semibold px-6 py-3 w-full rounded-lg transition-all duration-300 hover:bg-blue-700 focus:ring-2 focus:ring-blue-400"
          type="submit"
        >
          Publish Blog
        </button>
      </form>
    </div>
  );
};

export default AddBlog;