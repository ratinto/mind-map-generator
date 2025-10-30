import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiEye, FiEyeOff, FiUser, FiLock } from "react-icons/fi";
import logo from "../assets/mind-tinker1.png";
// Shadcn UI imports (adjust path if your project places UI components elsewhere)
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(username, password);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen bg-gradient-to-br bg-white/80 flex items-center justify-center p-2 overflow-hidden">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-sm w-full max-h-[95vh] flex flex-col">
        {/* Blue Header Section */}
        <div className="bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-6 text-center text-white flex-shrink-0">
          <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mx-auto mb-3">
            <img 
              src={logo} 
              alt="Mind Tinker Logo" 
              className="w-10 h-10 rounded-md object-contain"
            />
          </div>
          <h1 className="text-xl font-bold mb-1">Welcome Back!</h1>
          <p className="text-blue-100 text-xs">Sign in to continue your application journey</p>
        </div>

        {/* Form Section (Shadcn UI inputs/buttons) */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-xs font-medium text-gray-700 mb-1 block">
                Username
              </Label>
              <div className="relative">
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="pr-10 text-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <FiUser className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="password" className="text-xs font-medium text-gray-700 mb-1 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="pr-10 text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="text-right">
              <button
                type="button"
                className="text-xs text-blue-600 hover:text-blue-800 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-2">
                <p className="text-xs text-red-700">{error}</p>
              </div>
            )}

            <Button type="submit" disabled={loading} className="w-full flex items-center justify-center text-sm">
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                <span className="flex items-center">
                  Sign In
                  <svg className="ml-2 -mr-1 w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </span>
              )}
            </Button>

            <div className="relative my-3">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <Button type="button" variant="outline" className="w-full flex items-center justify-center py-2 px-4 text-sm">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Sign in with Google
            </Button>

            <div className="text-center pt-3">
              <p className="text-xs text-gray-600">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Sign up for free
                </button>
              </p>
            </div>
          </form>

          <div className="mt-4 flex justify-center space-x-3 text-xs text-gray-500">
            <button
              onClick={() => navigate('/')}
              className="hover:text-gray-700 transition-colors"
            >
              Home
            </button>
            <span>•</span>
            <button 
              onClick={() => navigate('/privacy-policy')}
              className="hover:text-gray-700 transition-colors cursor-pointer"
            >
              Privacy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
