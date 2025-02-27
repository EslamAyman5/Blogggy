import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    onLogout();
    navigate("/login");
  };

  useEffect(() => {
    const fetchResults = async () => {
      if (!query) {
        setResults([]);
        return;
      }
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/search?query=${query}`);
        setResults(res.data);
        setShowResults(true);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-gray-900 text-white p-4 sticky top-0 z-50 shadow-lg backdrop-blur-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex space-x-6">
          <Link to="/" className="hover:text-blue-400 transition duration-300">
            Home
          </Link>
          {isLoggedIn && (
            <>
              <Link
                to="/my-blogs"
                className="hover:text-blue-400 transition duration-300"
              >
                My Blogs
              </Link>
              <Link
                to="/add-blog"
                className="hover:text-blue-400 transition duration-300"
              >
                Add Blog
              </Link>
            </>
          )}
        </div>

        <div className="relative" ref={searchRef}>
          <input
            type="text"
            className="p-3 pl-10 rounded-full text-black w-72 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all duration-300"
            placeholder="Search....."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          {showResults && results.length > 0 && (
            <div className="absolute top-12 left-0 w-80 bg-white text-black shadow-xl rounded-lg max-h-80 overflow-y-auto border border-gray-200 transition-all duration-300">
              {results.map((blog) => (
                <div
                  key={blog._id}
                  className="flex items-center p-3 gap-3 hover:bg-gray-100 cursor-pointer transition-all duration-200"
                  onClick={() => {
                    navigate(`/blogs/${blog._id}`);
                    setShowResults(false);
                  }}
                >
                  {blog.image && (
                    <img
                      src={`http://localhost:5000${blog.image}`}
                      alt="Blog Cover"
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  )}

                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-gray-800">{blog.title}</h3>
                    <p className="text-xs text-gray-500">
                      By <span className="font-medium">{blog.author.name}</span> •{" "}
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-4 py-2 border border-gray-500 rounded-full hover:bg-gray-700 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 rounded-full hover:bg-red-600 transition duration-300 shadow-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
