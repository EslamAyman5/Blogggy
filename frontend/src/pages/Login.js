import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setIsLoggedIn(true);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen text-white">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="space-y-4" onSubmit={handleLogin}>
          <input className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-white" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="border border-gray-600 p-2 w-full rounded bg-gray-700 text-white" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full rounded transition" type="submit">Login</button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          Don't have an account? <a href="/register" className="text-blue-400 hover:underline">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;