import React from "react";
import { Link } from "react-router-dom";

const IconGithub = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 0.5C5.37 0.5 0 5.87 0 12.5C0 17.85 3.438 22.3 8.205 23.98C8.805 24.08 9.025 23.72 9.025 23.4C9.025 23.12 9.015 22.39 9.01 21.39C5.672 21.99 4.968 19.74 4.968 19.74C4.422 18.33 3.633 17.96 3.633 17.96C2.547 17.18 3.717 17.2 3.717 17.2C4.922 17.29 5.555 18.44 5.555 18.44C6.63 20.26 8.438 19.74 9.125 19.42C9.225 18.66 9.56 18.12 9.938 17.78C7.265 17.45 4.468 16.38 4.468 11.66C4.468 10.33 4.922 9.25 5.695 8.41C5.565 8.08 5.145 6.82 5.805 5.12C5.805 5.12 6.805 4.78 9.01 6.35C9.955 6.06 10.975 5.92 12 5.92C13.025 5.92 14.045 6.06 14.99 6.35C17.195 4.78 18.195 5.12 18.195 5.12C18.855 6.82 18.435 8.08 18.305 8.41C19.08 9.25 19.53 10.33 19.53 11.66C19.53 16.39 16.725 17.45 14.045 17.78C14.505 18.18 14.905 18.96 14.905 20.12C14.905 21.79 14.895 22.95 14.895 23.4C14.895 23.72 15.115 24.09 15.725 23.98C20.492 22.3 24 17.85 24 12.5C24 5.87 18.63 0.5 12 0.5Z"/>
  </svg>
);

const IconTwitter = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M23 4.6c-.8.35-1.6.58-2.4.69.86-.52 1.5-1.35 1.8-2.35-.79.47-1.66.82-2.6 1C19.7 3 18.6 2.5 17.4 2.5c-2.2 0-3.98 1.78-3.98 3.98 0 .31.03.62.1.91C9.7 7.1 6.1 5.4 3.9 2.7c-.34.58-.53 1.25-.53 1.97 0 1.36.69 2.56 1.74 3.26-.64-.02-1.24-.2-1.77-.5v.05c0 1.9 1.36 3.48 3.16 3.84-.33.09-.67.14-1.02.14-.25 0-.5-.02-.74-.07.5 1.56 1.94 2.7 3.64 2.73-1.33 1.04-2.99 1.66-4.8 1.66-.31 0-.61-.02-.91-.05 1.74 1.12 3.8 1.77 6.02 1.77 7.22 0 11.17-5.98 11.17-11.17 0-.17 0-.34-.01-.5.77-.56 1.44-1.27 1.97-2.07z"/>
  </svg>
);

const IconDiscord = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 71 55" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
    <path d="M60.104 4.5C53.984 1.8 47.505 0 40.87 0 40.441 0 39.997.01 39.567.02 36.864 1.2 34.2 2.6 31.7 4.24 30.2 3.37 28.7 2.7 27.2 2.1 24.8 1.08 22.4.31 20 .01 14.2 0 8.41 1.35 2.84 4.5-.16 9.29-.16 15.29c0 10.48 6.78 18.98 16.07 22.41 1.05.41 2.14.78 3.27 1.1C22.8 44.97 26.44 46.28 30.24 47.11c.11.03.23.05.34.07.74.15 1.49.28 2.24.38.09.01.18.01.27.02.26.02.51.04.77.04 8.76 0 16.39-2.5 23.01-7.5 5.8-4.4 9.86-10.54 11.3-17.41.9-4.36.58-8.38-.93-12.08-1.12-2.78-2.85-5.35-5.17-7.42zM23.3 37.18c-3.71 0-6.74-3.28-6.74-7.32 0-4.04 3.01-7.32 6.74-7.32 3.74 0 6.77 3.28 6.74 7.32 0 4.04-3.01 7.32-6.74 7.32zm24.4 0c-3.71 0-6.74-3.28-6.74-7.32 0-4.04 3.01-7.32 6.74-7.32 3.74 0 6.77 3.28 6.74 7.32 0 4.04-3.01 7.32-6.74 7.32z"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="relative z-50 bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-700 backdrop-blur-lg shadow-lg shadow-pink-700/50 border-t-4 border-transparent border-gradient-to-r animate-gradient-x overflow-hidden">
      {/* Animated gradient border at the top */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 animate-gradient-x"></div>
      <div className="max-w-7xl mx-auto px-6 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-x-16 gap-y-10 mb-12 text-center md:text-left">
          {/* Branding */}
          <div className="md:col-span-2 opacity-0 animate-fadeScale delay-100 flex flex-col items-center md:items-start text-center md:text-left" style={{animationFillMode: 'forwards'}}>
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 font-extrabold text-lg mb-6 tracking-wide select-none">
              Mind Tinker
            </h1>
            <p className="text-white text-base md:text-base mb-5 leading-relaxed max-w-xl">
              Create beautiful mind maps in seconds with AI.<br/>Transform your ideas into organized visual structures.
            </p>
            <p className="text-pink-300 text-sm italic tracking-wide select-none max-w-xs mx-auto md:mx-0">
              Create. Connect. Remember.
            </p>
          </div>

          {/* Quick Links */}
          <div className="opacity-0 animate-fadeScale delay-200 flex flex-col items-center md:items-start text-center md:text-left" style={{animationFillMode: 'forwards'}}>
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 font-extrabold text-lg mb-6 tracking-wide select-none">Quick Links</h3>
            <nav className="flex flex-col gap-4">
              <Link to="/" className="text-white hover:text-pink-300 transition text-base cursor-pointer" aria-label="Home">Home</Link>
              <Link to="/dashboard" className="text-white hover:text-pink-300 transition text-base cursor-pointer" aria-label="Dashboard">Dashboard</Link>
              <Link to="/signup" className="text-white hover:text-pink-300 transition text-base cursor-pointer" aria-label="Sign Up">Sign Up</Link>
              <Link to="/login" className="text-white hover:text-pink-300 transition text-base cursor-pointer" aria-label="Login">Login</Link>
              <Link
                to="/privacy-policy"
                className="text-white hover:text-pink-300 transition text-base cursor-pointer"
                aria-label="Privacy Policy"
              >
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Resources */}
          <div className="opacity-0 animate-fadeScale delay-300 flex flex-col items-center md:items-start text-center md:text-left" style={{animationFillMode: 'forwards'}}>
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 font-extrabold text-lg mb-6 tracking-wide select-none">Resources</h3>
            <nav className="flex flex-col gap-4">
              <a href="https://github.com/ratinto/mind-map-generator" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition text-base cursor-pointer" aria-label="GitHub">GitHub</a>
              <a href="https://github.com/ratinto/mind-map-generator/issues" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition text-base cursor-pointer" aria-label="Issues">Report Issues</a>
              <a href="https://github.com/ratinto/mind-map-generator#readme" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition text-base cursor-pointer" aria-label="Documentation">Documentation</a>
              <a href="https://github.com/ratinto/mind-map-generator#api" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-300 transition text-base cursor-pointer" aria-label="API">API</a>
            </nav>
          </div>
        </div>

        {/* Social & Copyright */}
        <div className="pt-10 border-t border-purple-700 flex flex-col md:flex-row md:items-center md:justify-between gap-6 opacity-0 animate-fadeScale delay-400" style={{animationFillMode: 'forwards'}}>
          <p className="text-white text-base select-none text-center md:text-left max-w-xl mx-auto md:mx-0">
            © {new Date().getFullYear()} Mind Tinker AI. Built with React &amp; ReactFlow.<br/>
            Made with <span aria-label="love" role="img" className="text-pink-400">❤️</span> by Mind Tinker Team
          </p>
          
          {/* Social Icons */}
          <div className="flex items-center gap-6 justify-center md:justify-start">
            <a href="https://github.com/ratinto/mind-map-generator" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-3 rounded-lg bg-gradient-to-tr from-purple-700 to-pink-600 text-white shadow-lg shadow-pink-700/70 transform transition duration-300 hover:scale-110 hover:shadow-[0_0_15px_5px_rgba(219,39,119,0.7)]">
              <IconGithub className="w-6 h-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="p-3 rounded-lg bg-gradient-to-tr from-purple-700 to-pink-600 text-white shadow-lg shadow-pink-700/70 transform transition duration-300 hover:scale-110 hover:shadow-[0_0_15px_5px_rgba(219,39,119,0.7)]">
              <IconTwitter className="w-6 h-6" />
            </a>
            <a href="https://discord.gg" target="_blank" rel="noopener noreferrer" aria-label="Discord" className="p-3 rounded-lg bg-gradient-to-tr from-purple-700 to-pink-600 text-white shadow-lg shadow-pink-700/70 transform transition duration-300 hover:scale-110 hover:shadow-[0_0_15px_5px_rgba(219,39,119,0.7)]">
              <IconDiscord className="w-6 h-6" />
            </a>
          </div>
        </div>
        
        <p className="text-pink-300 text-sm mt-6 max-w-xl mx-auto text-center select-none opacity-90">
          Open source and free forever. Contribute on{" "}
          <a href="https://github.com/ratinto/mind-map-generator" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 underline cursor-pointer transition">
            GitHub
          </a>
        </p>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-fadeScale {
          animation-name: scaleIn;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
        @keyframes gradient-x {
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
        .animate-gradient-x {
          background-size: 300% 300%;
          animation: gradient-x 10s ease infinite;
        }
      `}</style>
    </footer>
  );
}