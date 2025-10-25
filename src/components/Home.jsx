import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiZap, FiShield, FiUsers } from "react-icons/fi";
import logo from "../assets/mind-tinker-logo-new.png";
import Footer from "./Footer";

export default function Home() {
  const navigate = useNavigate();
  const particlesRef = useRef(null);

  // Parallax effect for particles
  useEffect(() => {
    const handleScroll = () => {
      if (particlesRef.current) {
        const scrollTop = window.pageYOffset;
        particlesRef.current.style.transform = `translateY(${scrollTop * 0.3}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 animated-bg overflow-x-hidden flex flex-col transition-colors duration-1000 ease-in-out">

      {/* Floating Particles with Parallax */}
      <div ref={particlesRef} className="particles pointer-events-none fixed inset-0 z-0 opacity-60">
        {[...Array(9)].map((_, i) => (
          <div key={i} className="particle animate-pulse-slow rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 opacity-30 blur-xl mix-blend-screen" style={{
            width: `${30 + i * 10}px`,
            height: `${30 + i * 10}px`,
            top: `${(i * 11) * 8}%`,
            left: `${(i * 13) * 7}%`,
            position: 'absolute',
            filter: 'blur(20px)',
            animationDelay: `${i * 1.5}s`
          }}></div>
        ))}
      </div>

      {/* Sleek Gradient Glassmorphism Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 w-full flex justify-center transition-all duration-700">
        <div className="flex w-full max-w-7xl mx-auto items-center justify-between px-8 py-5 sm:px-12 sm:py-5
          bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700
          bg-opacity-80 backdrop-blur-xl shadow-xl border-b border-white/10
          rounded-b-2xl
          glass-navbar
          transition-all duration-700
        ">
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 min-w-[0]">
            <img src={logo} alt="Mind Tinker" className="w-14 h-14 rounded-xl object-contain drop-shadow-md" />
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold select-none tracking-wide
              bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent
              font-title
              ">
              Mind Tinker AI
            </span>
          </div>
          {/* Navigation Buttons */}
          <div className="flex items-center gap-2 sm:gap-6">
            <button
              onClick={() => navigate('/login')}
              className="relative px-7 py-3 rounded-xl font-semibold text-lg
                bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 bg-clip-padding
                text-white shadow-md shadow-pink-900/30
                transition-all duration-300
                hover:shadow-pink-400/60 hover:shadow-lg
                hover:scale-105
                focus:outline-none
                after:content-[''] after:absolute after:left-2 after:right-2 after:bottom-1 after:h-1 after:rounded-full after:bg-gradient-to-r after:from-pink-400 after:to-indigo-400 after:opacity-0 hover:after:opacity-80 after:transition-opacity after:duration-300
              "
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="relative px-9 py-3 rounded-2xl font-semibold text-lg
                bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600
                text-white shadow-lg shadow-pink-500/40
                border-2 border-transparent
                transition-all duration-300
                hover:shadow-pink-400/80 hover:scale-105
                hover:border-pink-300
                focus:outline-none
                glow-cta
              "
              style={{ fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Section Divider with Gradient Wave */}
      <div className="relative w-full h-16 mt-[90px] sm:mt-[100px]">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="url(#waveGradient)" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          <defs>
            <linearGradient id="waveGradient" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.2)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Hero Section */}
      <section className="relative z-20 px-4 sm:px-8 py-28 sm:py-36 max-w-5xl mx-auto text-center flex flex-col items-center
        bg-white bg-opacity-30 backdrop-blur-2xl rounded-[2.5rem] shadow-[0_8px_48px_0_rgba(139,92,246,0.22)] animate-fadeInUp transition-all duration-700
        hero-section-gradient overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(ellipse at top left,rgba(99,102,241,0.19) 0%,rgba(236,72,153,0.09) 60%,rgba(255,255,255,0) 100%)' }}
      >
        {/* Subtle animated gradient overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-70 animate-floatGradient" style={{
          background: "linear-gradient(120deg,rgba(139,92,246,0.11),rgba(236,72,153,0.10),rgba(255,255,255,0.06))"
        }} />
        {/* Main Heading */}
        <h1
          className="relative z-10 text-3xl sm:text-4xl font-extrabold mb-8 leading-tight max-w-4xl
            bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent
            select-none tracking-wide animate-fadeInUp font-title"
          style={{
            animationDelay: '0.2s',
            fontWeight: 800,
          }}
        >
          Create Mind Maps in <span className="whitespace-nowrap">Seconds</span>
        </h1>

        {/* Subtext */}
        <p
          className="relative z-10 text-lg sm:text-2xl text-indigo-900/90 mb-14 sm:mb-16 max-w-2xl mx-auto px-2 sm:px-0 font-medium leading-relaxed animate-fadeInUp font-body tracking-wide"
          style={{ animationDelay: '0.4s' }}
        >
          Transform your ideas into beautiful, organized mind maps with the power of AI.<br className="hidden sm:inline" />
          <span className="">Save hours of manual work and focus on what matters.</span>
        </p>

        {/* CTA Button */}
        <button
          onClick={() => navigate('/signup')}
          className="relative z-10 bg-gradient-to-r from-indigo-700 via-purple-800 to-pink-700 text-white px-12 sm:px-16 py-4 sm:py-5 rounded-[2rem] font-semibold text-xl sm:text-2xl shadow-xl transition-all transform hover:scale-105 hover:shadow-pink-600/90 focus:outline-none duration-300 animate-fadeInUp pulse-animation border-2 border-transparent hover:border-pink-400 floating-btn"
          style={{ animationDelay: '0.6s', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
        >
          Start Creating for Free
        </button>

        {/* Trust Indicators */}
        <div
          className="relative z-10 flex flex-wrap justify-center gap-x-12 gap-y-4 mt-14 sm:mt-20 text-sm sm:text-base text-indigo-900/90 max-w-3xl font-semibold leading-relaxed animate-fadeInUp"
          style={{ animationDelay: '0.8s' }}
        >
          <div className="flex items-center gap-2">
            <FiCheck className="w-6 h-6 text-green-400" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheck className="w-6 h-6 text-green-400" />
            <span>Free forever</span>
          </div>
          <div className="flex items-center gap-2">
            <FiCheck className="w-6 h-6 text-green-400" />
            <span>Setup in 30 seconds</span>
          </div>
        </div>
      </section>

      {/* Section Divider with Gradient Wave */}
      <div className="relative w-full h-20 mt-12 -mb-4">
        <svg className="absolute top-0 w-full h-full" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="url(#waveGradient2)" d="M0,40 C360,0 1080,80 1440,40 L1440,0 L0,0 Z" />
          <defs>
            <linearGradient id="waveGradient2" x1="0" y1="80" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.2)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* How it Works Section */}
      <section className="relative z-20 px-4 sm:px-8 py-24 sm:py-28 bg-white bg-opacity-35 backdrop-blur-2xl rounded-[2.5rem] max-w-6xl mx-auto animate-fadeInUp shadow-[0_8px_48px_0_rgba(139,92,246,0.17)] transition-all duration-700
        how-section-gradient overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(circle at 70% 20%,rgba(139,92,246,0.16) 0,rgba(236,72,153,0.10) 60%,rgba(255,255,255,0) 100%)' }}
      >
        {/* Animated overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-60 animate-floatGradient" style={{
          background: "linear-gradient(100deg,rgba(139,92,246,0.11),rgba(236,72,153,0.10),rgba(255,255,255,0.09))"
        }} />
        <div className="relative z-10">
          {/* Section Header */}
          <div className="text-center mb-20 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8
              bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent
              select-none tracking-wide font-title
            ">
              How it works
            </h2>
            <p className="text-base sm:text-lg text-indigo-900/90 max-w-xl mx-auto px-2 sm:px-0 font-medium leading-relaxed font-body">
              Three simple steps to transform your ideas into visual mind maps.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-10 sm:gap-16 px-2 sm:px-0">
            {/* Step 1 */}
            <div className="text-center bg-white bg-opacity-70 rounded-[2rem] shadow-xl p-8 sm:p-10 transition-transform duration-300 transform hover:scale-105 hover:shadow-pink-600/70 hover:cursor-pointer hover:glow-effect hover:-translate-y-2 ease-in-out flex flex-col items-center perspective-1000 card-float"
              tabIndex={0}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-700 to-pink-700 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 text-white font-bold text-2xl sm:text-3xl select-none shadow-lg shadow-indigo-500/15">
                1
              </div>
              <h3 className="text-gray-900 font-bold text-xl sm:text-2xl mb-3 sm:mb-4 leading-snug">Input Your Ideas</h3>
              <p className="text-gray-800 max-w-xs font-medium leading-relaxed text-base sm:text-lg">
                Simply type your concepts, topics, or project ideas into our intuitive interface.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center bg-white bg-opacity-70 rounded-[2rem] shadow-xl p-8 sm:p-10 transition-transform duration-300 transform hover:scale-105 hover:shadow-pink-600/70 hover:cursor-pointer hover:glow-effect hover:-translate-y-2 ease-in-out flex flex-col items-center perspective-1000 card-float"
              tabIndex={0}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-700 to-pink-700 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 text-white font-bold text-2xl sm:text-3xl select-none shadow-lg shadow-indigo-500/15">
                2
              </div>
              <h3 className="text-gray-900 font-bold text-xl sm:text-2xl mb-3 sm:mb-4 leading-snug">AI Creates Structure</h3>
              <p className="text-gray-800 max-w-xs font-medium leading-relaxed text-base sm:text-lg">
                Our AI analyzes your input and automatically creates logical connections and hierarchies.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center bg-white bg-opacity-70 rounded-[2rem] shadow-xl p-8 sm:p-10 transition-transform duration-300 transform hover:scale-105 hover:shadow-pink-600/70 hover:cursor-pointer hover:glow-effect hover:-translate-y-2 ease-in-out flex flex-col items-center perspective-1000 card-float"
              tabIndex={0}
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-700 to-pink-700 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 text-white font-bold text-2xl sm:text-3xl select-none shadow-lg shadow-indigo-500/15">
                3
              </div>
              <h3 className="text-gray-900 font-bold text-xl sm:text-2xl mb-3 sm:mb-4 leading-snug">Export & Share</h3>
              <p className="text-gray-800 max-w-xs font-medium leading-relaxed text-base sm:text-lg">
                Download your beautiful mind map or share it with your team for collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider with Gradient Wave */}
      <div className="relative w-full h-20 mt-12 -mb-4">
        <svg className="absolute top-0 w-full h-full" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="url(#waveGradient3)" d="M0,40 C360,0 1080,80 1440,40 L1440,0 L0,0 Z" />
          <defs>
            <linearGradient id="waveGradient3" x1="0" y1="80" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.15)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Features Section */}
      <section className="relative z-20 px-4 sm:px-8 py-24 sm:py-28 bg-white bg-opacity-35 backdrop-blur-2xl rounded-[2.5rem] max-w-6xl mx-auto animate-fadeInUp shadow-[0_8px_48px_0_rgba(236,72,153,0.13)] transition-all duration-700
        features-section-gradient overflow-hidden"
        style={{ backgroundImage: 'radial-gradient(circle at 30% 80%,rgba(236,72,153,0.14) 0,rgba(99,102,241,0.09) 60%,rgba(255,255,255,0) 100%)' }}
      >
        {/* Animated overlay */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-60 animate-floatGradient" style={{
          background: "linear-gradient(110deg,rgba(236,72,153,0.10),rgba(139,92,246,0.10),rgba(255,255,255,0.07))"
        }} />
        <div className="relative z-10">
          <div className="text-center mb-20 sm:mb-24">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 sm:mb-8
              bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-transparent
              select-none tracking-wide font-title
            ">
              Why choose Mind Tinker?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10 sm:gap-16 px-2 sm:px-0">
            {/* Feature 1 */}
            <div className="text-center bg-white bg-opacity-70 rounded-[2rem] shadow-xl p-8 sm:p-10 transition-transform duration-300 transform hover:scale-105 hover:shadow-pink-600/70 hover:cursor-pointer hover:glow-effect hover:-translate-y-2 ease-in-out flex flex-col items-center perspective-1000 card-float"
              tabIndex={0}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-pink-500 rounded-xl flex items-center justify-center mb-5 sm:mb-6 text-white shadow-lg shadow-indigo-500/15">
                <FiZap className="w-7 h-7" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg sm:text-xl mb-3 sm:mb-4 leading-snug">Lightning Fast</h3>
              <p className="text-gray-800 max-w-xs font-medium leading-relaxed text-base sm:text-lg">
                Create complex mind maps in seconds, not hours. Our AI processes your ideas instantly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center bg-white bg-opacity-70 rounded-[2rem] shadow-xl p-8 sm:p-10 transition-transform duration-300 transform hover:scale-105 hover:shadow-pink-600/70 hover:cursor-pointer hover:glow-effect hover:-translate-y-2 ease-in-out flex flex-col items-center perspective-1000 card-float"
              tabIndex={0}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-pink-500 rounded-xl flex items-center justify-center mb-5 sm:mb-6 text-white shadow-lg shadow-indigo-500/15">
                <FiShield className="w-7 h-7" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg sm:text-xl mb-3 sm:mb-4 leading-snug">Secure & Private</h3>
              <p className="text-gray-800 max-w-xs font-medium leading-relaxed text-base sm:text-lg">
                Your data is encrypted and stored securely. You maintain complete control over your information.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center bg-white bg-opacity-70 rounded-[2rem] shadow-xl p-8 sm:p-10 transition-transform duration-300 transform hover:scale-105 hover:shadow-pink-600/70 hover:cursor-pointer hover:glow-effect hover:-translate-y-2 ease-in-out flex flex-col items-center perspective-1000 card-float"
              tabIndex={0}
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-pink-500 rounded-xl flex items-center justify-center mb-5 sm:mb-6 text-white shadow-lg shadow-indigo-500/15">
                <FiUsers className="w-7 h-7" />
              </div>
              <h3 className="text-gray-900 font-semibold text-lg sm:text-xl mb-3 sm:mb-4 leading-snug">Team Collaboration</h3>
              <p className="text-gray-800 max-w-xs font-medium leading-relaxed text-base sm:text-lg">
                Share mind maps with your team and collaborate in real-time on projects and ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Divider with Gradient Wave */}
      <div className="relative w-full h-20 mt-12 -mb-4">
        <svg className="absolute top-0 w-full h-full" viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path fill="url(#waveGradient4)" d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" />
          <defs>
            <linearGradient id="waveGradient4" x1="0" y1="0" x2="1440" y2="80" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgba(255,255,255,0.15)" />
              <stop offset="1" stopColor="rgba(255,255,255,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* CTA Section */}
      <section className="relative z-20 px-6 sm:px-8 py-24 max-w-4xl mx-auto text-center rounded-3xl overflow-hidden animate-fadeInUp transition-all duration-700 cta-gradient-section">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 via-purple-900 to-pink-800 opacity-90 rounded-3xl -z-10 shadow-lg shadow-pink-700/50 glass-footer"></div>
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-6 bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 bg-clip-text text-transparent select-none tracking-wide animate-gradient-text font-title">
          Start creating mind maps today
        </h2>
        <p className="text-lg sm:text-xl text-white mb-14 max-w-xl mx-auto px-4 sm:px-0 font-semibold leading-relaxed font-body">
          Join thousands of users who save hours every week with AI-powered mind mapping.
        </p>
        <button
          onClick={() => navigate('/signup')}
          className="relative inline-block px-16 py-5 rounded-3xl font-semibold text-lg bg-gradient-to-r from-indigo-600 via-purple-700 to-pink-600 text-white shadow-lg shadow-pink-600/80 transition transform hover:scale-105 focus:outline-none ease-in-out duration-300 pulse-animation border-2 border-transparent hover:border-pink-400 glow-cta"
          style={{ boxShadow: '0 0 15px 3px rgba(219,39,119,0.7)', fontFamily: "'Inter', 'Segoe UI', sans-serif" }}
        >
          Get Started for Free
          <span className="absolute inset-0 rounded-3xl border border-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
        </button>
      </section>

      {/* Footer */}
      <Footer />

      <style>{`
        /* Floating/fade animation for cards and buttons */
        @keyframes floatCard {
          0% { transform: translateY(0px) scale(1); box-shadow: 0 8px 32px 0 rgba(139,92,246,0.13);}
          50% { transform: translateY(-8px) scale(1.025); box-shadow: 0 16px 36px 0 rgba(236,72,153,0.14);}
          100% { transform: translateY(0px) scale(1);}
        }
        .card-float {
          animation: floatCard 6s ease-in-out infinite;
        }
        @media (max-width: 640px) {
          .card-float {
            animation: none;
          }
        }
        @keyframes floatGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-floatGradient {
          background-size: 200% 200%;
          animation: floatGradient 20s ease-in-out infinite;
        }
        /* Floating CTA button */
        .floating-btn {
          animation: floatCard 4.2s ease-in-out infinite;
        }
        /* Typography Consistency */
        .font-title {
          font-family: 'Inter', 'Segoe UI', sans-serif;
          letter-spacing: -0.01em;
        }
        .font-body {
          font-family: 'Inter', 'Segoe UI', sans-serif;
        }

        /* Sleek Glassmorphism Navbar */
        .glass-navbar {
          box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.18), 0 2px 8px 0 rgba(236, 72, 153, 0.09);
          border-bottom: 1.5px solid rgba(255,255,255,0.13);
          backdrop-filter: blur(16px) saturate(180%);
          -webkit-backdrop-filter: blur(16px) saturate(180%);
        }

        /* Sleek Glassmorphism Footer */
        .glass-footer {
          box-shadow: 0 0 30px 0 rgba(99,102,241,0.12), 0 4px 24px 0 rgba(236,72,153,0.11);
          border-top: 1.5px solid rgba(255,255,255,0.13);
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(18px) saturate(180%);
        }

        /* Navbar Glow Hover Effect for Buttons */
        .navbar-glow:hover,
        .hover\\:navbar-glow:hover {
          box-shadow: 0 0 18px 4px rgba(139,92,246,0.25), 0 0 0 2px rgba(236,72,153,0.16);
          border: 1.5px solid rgba(236,72,153,0.18);
        }

        /* CTA Button Glow */
        .glow-cta {
          box-shadow: 0 0 16px 4px rgba(236,72,153,0.25), 0 0 0 2px rgba(139,92,246,0.11);
        }
        .glow-cta:hover, .glow-cta:focus {
          box-shadow: 0 0 32px 8px rgba(236,72,153,0.45), 0 0 0 2px rgba(139,92,246,0.19);
        }

        /* Elegant Gradient Section Backgrounds */
        .hero-section-gradient {
          background-image:
            radial-gradient(ellipse 120% 80% at 60% 10%, rgba(236,72,153,0.10), transparent 90%),
            linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0));
        }
        .how-section-gradient {
          background-image:
            radial-gradient(circle 60% at 80% 20%, rgba(139,92,246,0.13), transparent 75%),
            linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0));
        }
        .features-section-gradient {
          background-image:
            radial-gradient(circle 70% at 30% 80%, rgba(236,72,153,0.13), transparent 80%),
            linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0));
        }
        .cta-gradient-section {
          background-image:
            radial-gradient(ellipse 80% 50% at 80% 90%, rgba(139,92,246,0.12), transparent 80%);
        }

        /* Section Spacing and Transitions */
        section {
          margin-top: 3.5rem;
          margin-bottom: 3.5rem;
          transition: background 0.8s cubic-bezier(.4,0,.2,1);
        }
        @media (max-width: 640px) {
          section {
            margin-top: 2.2rem;
            margin-bottom: 2.2rem;
          }
        }
        /* Animations */
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(32px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(.4,0,.2,1) forwards;
        }
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 10px 0 rgba(219,39,119,0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 20px 5px rgba(219,39,119,0.9);
          }
        }
        .pulse-animation {
          animation: pulse 3s ease-in-out infinite;
        }
        @keyframes gradientText {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        .animate-gradient-text {
          background-size: 200% 200%;
          animation: gradientText 4s ease infinite;
        }
        @keyframes pulseSlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse-slow {
          animation: pulseSlow 6s ease-in-out infinite;
        }
        /* Glow effect for cards (subtle, matches navbar) */
        .glow-effect, .hover\:navbar-glow:hover {
          box-shadow: 0 2px 32px 0 rgba(236,72,153,0.22), 0 0 0 2px rgba(139,92,246,0.13);
          border: 1.5px solid rgba(236,72,153,0.13);
          transition: box-shadow 0.3s cubic-bezier(.4,0,.2,1), border 0.3s cubic-bezier(.4,0,.2,1);
        }
        /* Perspective for 3D tilt */
        .perspective-1000 {
          perspective: 1000px;
        }
        /* Animated background gradient */
        .animated-bg {
          background-size: 400% 400%;
          animation: bgGradient 15s ease infinite;
        }
        @keyframes bgGradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        /* Navbar & Footer Responsive */
        @media (max-width: 640px) {
          .glass-navbar {
            border-radius: 0 0 1.2rem 1.2rem;
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }

        /* Responsive Logo and Button Alignment */
        @media (max-width: 420px) {
          .glass-navbar > div:first-child img {
            width: 2.3rem !important;
            height: 2.3rem !important;
          }
          .glass-navbar > div:first-child span {
            font-size: 1.12rem !important;
          }
        }

        /* Button Hover Effects (glow/underline) */
        .glass-navbar button,
        .glass-navbar a {
          position: relative;
          outline: none;
        }
        .glass-navbar button:after,
        .glass-navbar a:after {
          content: "";
          display: block;
          position: absolute;
          left: 20%;
          right: 20%;
          bottom: 0.5rem;
          height: 2px;
          background: linear-gradient(90deg, #ec4899 0%, #818cf8 100%);
          border-radius: 2px;
          opacity: 0;
          transition: opacity 0.25s;
        }
        .glass-navbar button:hover:after,
        .glass-navbar a:hover:after {
          opacity: 1;
        }

        .glass-navbar button:hover,
        .glass-navbar a:hover {
          filter: brightness(1.09);
          text-shadow: 0 0 10px #ec4899aa, 0 0 2px #818cf8aa;
        }

        /* Section backgrounds and subtle textures */
        section {
          box-shadow: 0 2px 32px 0 rgba(139,92,246,0.09), 0 0px 8px 0 rgba(236,72,153,0.07);
        }

        /* General Responsive Typography */
        html {
          font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
        }
        body {
          color: #f3f4f6;
          background: transparent;
        }

        /* Improved text contrast for all body sections */
        .hero-section-gradient, .how-section-gradient, .features-section-gradient, .cta-gradient-section {
          color: #232336;
        }
        .hero-section-gradient h1,
        .hero-section-gradient p,
        .hero-section-gradient .text-indigo-50,
        .hero-section-gradient .text-white,
        .hero-section-gradient .text-gray-100,
        .hero-section-gradient .text-gray-100\/95 {
          color: #f9fafb !important;
          text-shadow: 0 1px 8px rgba(31,41,55,0.12);
        }
        .how-section-gradient h2,
        .how-section-gradient p,
        .how-section-gradient .text-indigo-900\/90 {
          color: #2d225a !important;
        }
        .features-section-gradient h2,
        .features-section-gradient p {
          color: #2d225a !important;
        }

        /* Subtle radial background for body */
        .min-h-screen {
          background-image:
            radial-gradient(circle at 70% 30%, rgba(139,92,246,0.13) 0, transparent 70%),
            radial-gradient(circle at 10% 90%, rgba(236,72,153,0.14) 0, transparent 80%);
        }

        /* Heading and paragraph font size refinement */
        h1, .text-5xl, .text-6xl, .text-7xl {
          line-height: 1.12;
        }
        h1, .text-5xl {
          font-size: 2.6rem;
        }
        @media (min-width: 640px) {
          .text-5xl, h1 {
            font-size: 3.1rem;
          }
        }
        @media (min-width: 1024px) {
          .text-5xl, h1 {
            font-size: 4rem;
          }
        }
        h2, .text-4xl {
          font-size: 2.1rem;
        }
        @media (min-width: 640px) {
          h2, .text-4xl {
            font-size: 2.5rem;
          }
        }
        h3, .text-2xl {
          font-size: 1.25rem;
        }
        @media (min-width: 640px) {
          h3, .text-2xl {
            font-size: 1.5rem;
          }
        }
        p, .text-base {
          font-size: 1.06rem;
        }
        @media (min-width: 640px) {
          p, .text-base {
            font-size: 1.13rem;
          }
        }
      `}</style>
    </div>
  );
}
