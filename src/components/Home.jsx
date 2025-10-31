import React from "react";
import { useNavigate } from "react-router-dom";
import { FiCheck, FiZap, FiShield, FiUsers } from "react-icons/fi";
import logo from "../assets/mind-tinker-logo-new.png";
import Footer from "./Footer";
import { FiSun, FiMoon } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext";

export default function Home() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 animated-bg">

      
      {/* Floating Particles */}
      <div className="particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      {/* Navigation Header */}
      <nav className="relative z-10 px-6 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="Mind Tinker" className="w-10 h-10 rounded-lg object-contain" />
            <span className="text-gray-900 dark:text-gray-100 font-bold text-lg">Mind Tinker AI</span>
          </div>

          {/* Auth Buttons + Theme Toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              title={isDark ? "Switch to light" : "Switch to dark"}
              aria-label="Toggle theme"
            >
              {isDark ? (
                <FiSun className="w-5 h-5 text-amber-400" />
              ) : (
                <FiMoon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={() => navigate('/login')}
              className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors px-4 py-2"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors font-medium"
            >
              Get Started Free
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-24 bg-transparent">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
            Create Mind Maps in <span className="text-blue-600">Seconds</span>
          </h1>

          {/* Subtext */}
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
            Transform your ideas into beautiful, organized mind maps with the power of AI. 
            Save hours of manual work and focus on what matters.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-medium text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Start Creating for Free
          </button>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center space-x-8 mt-12 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <FiCheck className="w-4 h-4 text-green-500 mr-1" />
              No credit card required
            </div>
            <div className="flex items-center">
              <FiCheck className="w-4 h-4 text-green-500 mr-1" />
              Free forever
            </div>
            <div className="flex items-center">
              <FiCheck className="w-4 h-4 text-green-500 mr-1" />
              Setup in 30 seconds
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="relative z-10 px-6 py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              How it works
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Three simple steps to transform your ideas into visual mind maps.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">1</span>
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 font-bold text-xl mb-3">Input Your Ideas</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Simply type your concepts, topics, or project ideas into our intuitive interface.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">2</span>
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 font-bold text-xl mb-3">AI Creates Structure</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our AI analyzes your input and automatically creates logical connections and hierarchies.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <span className="text-white font-bold text-2xl">3</span>
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 font-bold text-xl mb-3">Export & Share</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Download your beautiful mind map or share it with your team for collaboration.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Why choose Mind Tinker?
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiZap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-lg mb-3">Lightning Fast</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create complex mind maps in seconds, not hours. Our AI processes your ideas instantly.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-lg mb-3">Secure & Private</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data is encrypted and stored securely. You maintain complete control over your information.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-gray-900 dark:text-gray-100 font-semibold text-lg mb-3">Team Collaboration</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Share mind maps with your team and collaborate in real-time on projects and ideas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20 bg-gray-50 dark:bg-gray-950">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Start creating mind maps today
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Join thousands of users who save hours every week with AI-powered mind mapping.
          </p>
          <button
            onClick={() => navigate('/signup')}
            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-lg font-medium text-lg transition-all hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
