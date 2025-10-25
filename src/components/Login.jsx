import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { FiEye, FiEyeOff, FiUser, FiLock } from "react-icons/fi";
import logo from "../assets/mind-tinker1.png";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || "/dashboard";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    const result = await login(username, password);
    
    if (result.success) {
      // Redirect to intended destination or dashboard
      navigate(from, { replace: true });
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen relative flex items-center justify-center p-2 overflow-hidden bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900">
      {/* Animated Gradient Circles and Shapes for Depth */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gradient-to-br from-blue-500 via-purple-700 to-transparent opacity-40 animate-[float1_8s_ease-in-out_infinite] blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[28rem] h-[28rem] rounded-full bg-gradient-to-br from-purple-600 via-blue-700 to-transparent opacity-30 animate-[float2_10s_ease-in-out_infinite] blur-4xl" />
        <div className="absolute top-1/2 left-1/2 w-60 h-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-blue-400 via-purple-400 to-transparent opacity-15 animate-[float3_12s_ease-in-out_infinite] blur-3xl" />
        <style>{`
          @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(30px)} }
          @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-40px)} }
          @keyframes float3 { 0%,100%{transform:translateX(0)} 50%{transform:translateX(40px)} }
        `}</style>
      </div>
      {/* Glassmorphism Card */}
      <div className="relative z-10 max-w-sm w-full max-h-[95vh] flex flex-col rounded-3xl shadow-[0_12px_24px_rgba(88,80,255,0.35)] overflow-hidden
        bg-gradient-to-tr from-blue-800/80 via-purple-900/70 to-blue-900/90 backdrop-blur-3xl border border-white/25
        transition-all duration-400
        animate-fadein
        "
        style={{
          boxShadow: "0 10px 30px 0 rgba(88,80,255,0.4), 0 3px 12px 0 rgba(0,0,0,0.12)"
        }}
      >
        {/* Header with Gradient Overlay, Logo Glow, and Dynamic Typography */}
        <div className="relative px-8 py-10 text-center flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/90 via-purple-800/85 to-blue-900/85 z-0 pointer-events-none rounded-3xl" />
          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-white/30 shadow-neumorphism border border-white/30
              ring-4 ring-purple-500/50 ring-offset-4 ring-offset-blue-900/20
              "
            >
              <img
                src={logo}
                alt="Mind Tinker Logo"
                className="w-12 h-12 rounded-lg object-contain drop-shadow-[0_0_20px_rgba(138,90,255,0.8)]"
                style={{
                  filter: "drop-shadow(0 0 20px #8A5AFFCC)"
                }}
              />
            </div>
            <h1 className="text-3xl font-extrabold tracking-wide bg-gradient-to-br from-purple-300 via-white to-blue-400 bg-clip-text text-transparent
              drop-shadow-[0_2px_16px_rgba(138,90,255,0.6)] mb-2
              "
              style={{ letterSpacing: '0.025em' }}
            >
              Welcome <span className="font-black italic tracking-widest">Back!</span>
            </h1>
            <p className="text-purple-200 text-sm font-semibold tracking-wide mb-2 drop-shadow-[0_0_6px_rgba(138,90,255,0.5)]">Sign in to continue your application journey</p>
          </div>
        </div>
        {/* Form Section */}
        <div className="px-8 py-6 flex-1 overflow-y-auto">
          <form onSubmit={handleSubmit} className="space-y-6 animate-fadein-slow">
            {/* Username Field */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-purple-200/90 mb-2 tracking-wide drop-shadow-[0_0_3px_rgba(138,90,255,0.7)]">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 drop-shadow-[0_0_2px_rgba(138,90,255,0.8)]">
                  <FiUser className="h-6 w-6" />
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  className="w-full pl-14 pr-4 py-3 bg-gradient-to-tr from-blue-800/70 via-purple-800/50 to-blue-900/70 border border-transparent rounded-2xl shadow-neumorphism-inner text-purple-100 text-lg placeholder-purple-300/90 font-semibold focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-60 focus:border-transparent transition-all duration-300 hover:scale-[1.02] hover:shadow-neumorphism-glow"
                  placeholder="Enter your username"
                />
              </div>
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-purple-200/90 mb-2 tracking-wide drop-shadow-[0_0_3px_rgba(138,90,255,0.7)]">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-purple-400 drop-shadow-[0_0_2px_rgba(138,90,255,0.8)]">
                  <FiLock className="h-6 w-6" />
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-14 pr-14 py-3 bg-gradient-to-tr from-blue-800/70 via-purple-800/50 to-blue-900/70 border border-transparent rounded-2xl shadow-neumorphism-inner text-purple-100 text-lg placeholder-purple-300/90 font-semibold focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-60 focus:border-transparent transition-all duration-300 hover:scale-[1.02] hover:shadow-neumorphism-glow"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-4 flex items-center text-purple-300 hover:text-purple-500 transition-colors focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <FiEyeOff className="h-6 w-6 drop-shadow-[0_0_6px_rgba(138,90,255,0.8)]" />
                  ) : (
                    <FiEye className="h-6 w-6 drop-shadow-[0_0_6px_rgba(138,90,255,0.8)]" />
                  )}
                </button>
              </div>
            </div>
            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-purple-400 hover:text-purple-600 font-semibold transition-all underline underline-offset-2 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(138,90,255,0.7)]"
              >
                Forgot Password?
              </button>
            </div>
            {/* Error Message */}
            {error && (
              <div className="bg-red-100/80 border border-red-300 rounded-xl p-3 shadow-md text-sm text-red-800 font-semibold animate-fadein-fast">
                {error}
              </div>
            )}
            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className={`
                w-full py-3 px-6 rounded-2xl font-bold flex items-center justify-center text-lg
                bg-gradient-to-br from-purple-600 via-blue-700 to-purple-700
                shadow-neumorphism hover:scale-[1.03] hover:shadow-neumorphism-glow
                transition-all duration-300
                text-white
                focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-70
                disabled:opacity-60 disabled:cursor-not-allowed
                group
              `}
              style={{
                backgroundSize: '200% 200%',
                transition: 'background-position 0.3s, box-shadow 0.3s, transform 0.3s'
              }}
            >
              {loading ? (
                <div className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                <>
                  Sign In
                  <svg className="ml-3 -mr-1 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </>
              )}
            </button>
            {/* Divider */}
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-purple-700/40"></div>
              </div>
              <div className="relative flex justify-center text-sm text-purple-300 font-semibold drop-shadow-[0_0_4px_rgba(138,90,255,0.6)]">
                <span className="px-3 bg-blue-900/90">or</span>
              </div>
            </div>
            {/* Google Sign In */}
            <button
              type="button"
              className={`
                w-full flex items-center justify-center py-3 px-6 border border-transparent rounded-2xl
                bg-gradient-to-r from-purple-700 via-blue-800 to-purple-800 text-white
                hover:from-purple-800 hover:to-blue-900 hover:shadow-neumorphism-glow
                transition-all duration-300
                shadow-neumorphism
                group
                focus:outline-none focus:ring-4 focus:ring-purple-600 focus:ring-opacity-80
              `}
            >
              <svg className="w-6 h-6 mr-3 group-hover:scale-110 transition-transform drop-shadow-[0_0_6px_rgba(138,90,255,0.8)]" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="font-bold text-lg drop-shadow-[0_0_6px_rgba(138,90,255,0.8)]">Sign in with Google</span>
            </button>
            {/* Sign Up Link */}
            <div className="text-center pt-6">
              <p className="text-sm text-purple-300 font-semibold drop-shadow-[0_0_4px_rgba(138,90,255,0.6)]">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/signup')}
                  className="text-purple-400 hover:text-purple-600 font-bold transition-all underline underline-offset-2 hover:scale-105 hover:drop-shadow-[0_0_10px_rgba(138,90,255,0.9)]"
                >
                  Sign up for free
                </button>
              </p>
            </div>
          </form>
          {/* Footer Links */}
          <div className="mt-7 flex justify-center space-x-6 text-sm text-purple-400/90 drop-shadow-[0_0_4px_rgba(138,90,255,0.5)]">
            <button
              onClick={() => navigate('/')}
              className="hover:text-purple-600 transition-all underline underline-offset-2 hover:scale-105"
            >
              Home
            </button>
            <span>•</span>
            <button
              onClick={() => navigate('/privacy-policy')}
              className="hover:text-purple-600 transition-all underline underline-offset-2 cursor-pointer hover:scale-105"
            >
              Privacy
            </button>
          </div>
        </div>
      </div>
      {/* Fade-in Animations */}
      <style>{`
        .animate-fadein {
          animation: fadeinLogin 0.8s cubic-bezier(.4,0,.2,1) both;
        }
        .animate-fadein-slow {
          animation: fadeinLogin 1.1s cubic-bezier(.4,0,.2,1) both;
          animation-delay: 0.15s;
        }
        .animate-fadein-fast {
          animation: fadeinLogin 0.5s cubic-bezier(.4,0,.2,1) both;
        }
        @keyframes fadeinLogin {
          0% { opacity: 0; transform: translateY(30px) scale(0.97);}
          80% { opacity: 1; }
          100% { opacity: 1; transform: translateY(0) scale(1);}
        }
        /* Neumorphism shadows */
        .shadow-neumorphism {
          box-shadow:
            6px 6px 16px rgba(0,0,0,0.25),
            -6px -6px 16px rgba(138,90,255,0.6);
        }
        .shadow-neumorphism-inner {
          box-shadow:
            inset 4px 4px 8px rgba(0,0,0,0.3),
            inset -4px -4px 8px rgba(138,90,255,0.5);
        }
        .shadow-neumorphism-glow {
          box-shadow:
            0 0 12px 3px rgba(138,90,255,0.8),
            0 0 20px 6px rgba(138,90,255,0.6);
        }
      `}</style>
    </div>
  );
}
