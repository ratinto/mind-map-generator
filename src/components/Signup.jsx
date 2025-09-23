import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import logo from "../assets/mind-tinker-logo.png";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    
    const result = await signup(username, email, password);
    
    if (result.success) {
      setSuccess("Signup successful! You can now log in.");
      // Redirect to login after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md flex flex-col items-center border border-gray-100">
        <img src={logo} alt="Mind Tinker Logo" className="w-14 h-14 rounded-full mb-4" />
        <h2 className="text-2xl font-bold mb-2 text-blue-800">Sign up for Mind Tinker</h2>
        <p className="mb-6 text-gray-500 text-center">Create your account to start using Mind Tinker.</p>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="block w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="block w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="block w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg"
            required
          />
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          {success && <div className="text-green-600 mb-4 text-center">{success}</div>}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-lg w-full font-semibold text-lg shadow disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
        <button
          type="button"
          className="mt-6 w-full text-blue-600 hover:text-blue-800 underline text-center text-base"
          onClick={() => navigate('/login')}
        >
          Already have an account? <span className="font-semibold">Log in</span>
        </button>
      </div>
    </div>
  );
} 