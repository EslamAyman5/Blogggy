import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = ({ setIsLoggedIn }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    
    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
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
    <div className="flex items-center justify-center min-h-screen text-white">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        {error.length > 0 && (
          <ul className="text-red-400 text-sm bg-red-900 p-3 rounded mb-4">
            {error.map((err, index) => (
              <li key={index} className="mb-1">• {err.msg}</li>
            ))}
          </ul>
        )}
        <form className="space-y-4" onSubmit={handleRegister}>
          <input className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <input className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input className="w-full p-3 rounded bg-gray-700 text-white border border-gray-600" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition" type="submit">Register</button>
        </form>
        <p className="text-center mt-4 text-gray-400">
          Already have an account? <a href="/login" className="text-blue-400 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;