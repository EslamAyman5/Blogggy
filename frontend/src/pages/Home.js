import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/blogs")
      .then((res) => setBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold text-white mb-8 text-center bg-gradient-to-b from-gray-900 to-gray-700 p-4 rounded-lg shadow-lg">
        Latest Blogs
      </h1>

      {/* Blog Grid */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div key={blog._id} className="bg-gray-900 text-white shadow-lg rounded-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl duration-300">
            {/* Image */}
            {blog.image && (
              <img src={`http://localhost:5000${blog.image}`} alt={blog.title} className="w-full h-52 object-cover rounded-t-xl" />
            )}
            
            {/* Blog Content */}
            <div className="p-5">
              {/* Title */}
              <h3 className="text-2xl font-semibold truncate hover:text-blue-400 transition duration-300">
                {blog.title}
              </h3>
              
              {/* Author */}
              <p className="text-gray-400 text-sm mt-1">By <span className="font-medium text-blue-400">{blog.author.name}</span></p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-3">
                {blog.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded-full">#{tag}</span>
                ))}
              </div>
              
              {/* Created At */}
              <p className="text-gray-400 text-xs mt-2">Published on {new Date(blog.createdAt).toLocaleDateString()}</p>
              
              {/* Read More */}
              <Link to={`/blogs/${blog._id}`} className="inline-block mt-4 text-blue-400 font-semibold hover:text-blue-300 transition">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;