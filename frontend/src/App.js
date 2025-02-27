import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MyBlogs from "./pages/MyBlogs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddBlog from "./pages/AddEditBlog";
import EditBlog from "./pages/EditBlog";
import ShowBlog from "./pages/BlogDetail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
  
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/my-blogs" element={isLoggedIn ? <MyBlogs /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/add-blog" element={isLoggedIn ? <AddBlog /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/edit-blog/:id" element={isLoggedIn ? <EditBlog /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/register" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/blogs/:id" element={<ShowBlog />} /> 
      </Routes>
    </Router>
  );
}

export default App;
